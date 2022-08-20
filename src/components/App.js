
import React, { useState, useEffect } from 'react';
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
    playername: " ",
    playercount: "2",
    playtime: "30"
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [presentList, setPresentList] = useState([]);

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
    console.log("Submitted:", formData);
    fetch(`https://boardgamegeek.com/xmlapi2/collection?username=${formData.playername}&own=1&excludesubtype=boardgameexpansion`)
      .then(response => response.text())
      .then(data => {
        const collectionData = new XMLParser().parseFromString(data);
        //console.log(collectionData);
        const gameIds = collectionData?.children.map(game => game.attributes.objectid);
        //console.log(gameIds);
        fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${gameIds.join(',')}`)
          .then(response => response.text())
          .then(data => {
            //console.log('game data!');
            const bggData = new XMLParser().parseFromString(data);
            setPresentList(SortFunction(formData, reformatBGGData(bggData)));
          });
      });
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
        <SetupScreen formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      </AppContainer>
    )
  }
}

export default App;
