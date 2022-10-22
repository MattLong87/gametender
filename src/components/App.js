
import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import SetupScreen from './SetupScreen';
import RatingScreen from './RatingScreen';
import Logo from './Logo';
import XMLParser from 'react-xml-parser';
import SortFunction from '../utils/SortFunction';
import reformatBGGData from '../utils/reformatBGGData';

const AppContainer = styled.div`
display: grid;
grid-template-rows: auto 1fr;
`

function App() {

  //States and Initial Variables

  let initialFormState = {
    playername: "",
    playercount: "2",
    playtime: "30",
    error: ''
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [presentList, setPresentList] = useState([]);
  const [waitingForData, setWaitingForData] = useState(false);

  //Handle functions

  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value.trim(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //remove any previous errors
    setFormData({ ...formData, error: '' });

    if (waitingForData) {
      return;
    }

    if (!formData.playername) {
      setFormData({ ...formData, error: 'Please enter your BoardGameGeek username.' })
      return;
    }

    setWaitingForData(true);
    console.log("Submitted:", formData);
    //Watch for response code and keep trying fetch while the backend prepares data - see https://boardgamegeek.com/wiki/page/BGG_XML_API
    var interval = setInterval(function () {
      fetch(`https://boardgamegeek.com/xmlapi2/collection?username=${formData.playername}&own=1&excludesubtype=boardgameexpansion`)
        .then(response => {
          if(response.ok){
          if (response.status === 202) {
            return Promise.resolve();
          }
          clearInterval(interval);
          return response.text();
        }
        throw new Error('Unable to contact BoardGameGeek');
        })
        .then(data => {
          if (data) {
            const collectionData = new XMLParser().parseFromString(data);
            //console.log(collectionData);
            const gameIds = collectionData?.children.map(game => game.attributes.objectid);
            //console.log(gameIds);
            fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${gameIds.join(',')}`)
              .then(response => response.text())
              .then(data => {
                // console.log('game data!');
                const bggData = new XMLParser().parseFromString(data);
                // console.log(bggData)
                if (bggData.children.length === 0) {
                  setFormData({ ...formData, error: 'No games found in collection' });
                }
                const formattedGames = SortFunction(formData, reformatBGGData(bggData));
                if(!formattedGames.length){
                  setFormData({ ...formData, error: 'No games in collection match specified filters' });
                  setWaitingForData(false);
                  return;
                }
                setPresentList(formattedGames);
                setWaitingForData(false);
              });
          }
        })
        .catch(error => {
          setFormData({ ...formData, error: 'BoardGameGeek user not found (or unable to contact BoardGameGeek)' });
          setWaitingForData(false);
          clearInterval(interval);
        })
    }, 2000);
  };

  //Returns:

  if (presentList.length >= 1) {
    return (
      <RatingScreen gamesList={presentList} formData={formData} />
    )
  } else {
    return (
      <AppContainer>
        <Logo name="GameTender" />
        <SetupScreen formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} waitingForData={waitingForData} />
      </AppContainer>
    )
  }
}

export default App;
