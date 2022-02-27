import React, { useState } from 'react';
import './App.css';
import TinderCard from 'react-tinder-card';
import xml2json from './utils/xml2json';

function App() {

  const [bggData, setbggData] = useState();

  fetch('https://boardgamegeek.com/xmlapi2/collection?username=Sforzando&excludesubtype=boardgameexpansion')
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      var bggData = JSON.parse(xml2json(data, ''))
      setbggData(bggData);
    });

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }

  return (
    <>
      <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>Hello, World!</TinderCard>
      {bggData && bggData.items.item.map((game, key) => {
        return <img src={game.thumbnail} key={key} />
      })}
    </>
  )
}

export default App;
