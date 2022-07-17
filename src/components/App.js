import React, { useState } from 'react';
import './App.css';
import TinderCard from 'react-tinder-card';
import xml2json from '../utils/xml2json';
import returnedData from '../games.json';
import GameCard from './GameCard';
import SetupScreen from './SetupScreen';

function App() {

  // const [bggData, setbggData] = useState();
  // const [dataFetched, setdataFetched] = useState(false);

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

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }

  var games = returnedData.items.item;
  console.log(games);

  var cards = games.map((game, key) => (
    <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']} key={key}>
      <GameCard game={game} />
    </TinderCard>
  ))

  return (
    <>
      {/* <SetupScreen /> */}
      {cards}
      {/* {bggData && bggData.items.item.map((game, key) => {
        return <img src={game.thumbnail} key={key} />
      })} */}
    </>
  )
}

export default App;
