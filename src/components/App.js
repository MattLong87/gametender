import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import SetupScreen from './SetupScreen';
import RatingScreen from './RatingScreen';
import Logo from './Logo';
import xml2json from '../utils/xml2json';
import XMLParser from 'react-xml-parser';
import SortFunction from './SortFunction';

const AppContainer = styled.div`
display: grid;
grid-template-rows: auto 1fr;
`

function App() {

  // const [bggData, setbggData] = useState();
  // const [dataFetched, setdataFetched] = useState(false);

  let initialFormState = {
    playercount: "2",
    playtime: "30"
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const [presentList, setPresentList] = useState([])
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", formData);
    const outputArray = SortFunction({ formData });
    setPresentList(outputArray);
  };





  // if (!dataFetched) {
  //   setdataFetched(true);
  //   fetch('https://boardgamegeek.com/xmlapi2/collection?username=Sforzando&excludesubtype=boardgameexpansion')
  //     .then(response => response.text())
  //     .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  //     .then(data => {
  //       const collectionData = JSON.parse(xml2json(data, ''))
  //       setbggData(collectionData);
  //       const gameIds = collectionData?.items.item.map(game => game['@objectid']);
  //       fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${gameIds.join(',')}`)
  //         .then(response => response.text())
  //         .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  //         .then(data => {
  //           console.log('we have data')
  //           console.log(data)
  //           const games = JSON.parse(xml2json(data, ''));
  //           console.log(games);
  //         })
  //     });
  // }

  // fetch('https://boardgamegeek.com/xmlapi2/collection?username=Sforzando&excludesubtype=boardgameexpansion')
  //   .then(response => response.text())
  //   .then(data => {
  //     const collectionData = new XMLParser().parseFromString(data);
  //     console.log(collectionData);
  //     const gameIds = collectionData?.children.map(game => game.attributes.objectid);
  //     console.log(gameIds);
  //     fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${gameIds.join(',')}`)
  //       .then(response => response.text())
  //       .then(data => {
  //         console.log('game data!');
  //         const games = new XMLParser().parseFromString(data);
  //         console.log(games);
  //       });
  //   });


  if (presentList.length >= 1) {
    console.log(presentList);
    return (
      <RatingScreen gamesList={presentList} formData={formData} />
    )
  } else {
    return (
      <AppContainer>
        <Logo name="GameTender" />
        <SetupScreen formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        {/* <RatingScreen /> */}
        {/* {bggData && bggData.items.item.map((game, key) => {
        return <img src={game.thumbnail} key={key} />
      })} */}
      </AppContainer>
    )
  }
}

export default App;
