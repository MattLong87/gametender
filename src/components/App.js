
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import SetupScreen from './SetupScreen';
import RatingScreen from './RatingScreen';
import Logo from './Logo';
import XMLParser from 'react-xml-parser';
import SortFunction from './SortFunction';

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
  const [workableArray, setWorkableArray] = useState([]);
  const [callCounter, setCallCounter] = useState(0);


  //API CALL
  useEffect(() => {
    let url = "Sforzando";
    fetch(`https://boardgamegeek.com/xmlapi2/collection?username=${url}&excludesubtype=boardgameexpansion`)
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
            const games = new XMLParser().parseFromString(data);
            //console.log(games);
            reformatFunction(games)
          });
      });
  }, [callCounter]);


  //Handle functions

  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let updatedCounter = callCounter + 1;
    setCallCounter(updatedCounter);
    console.log("Submitted:", formData);
    const outputArray = SortFunction({ formData, workableArray });
    setPresentList(outputArray);
  };

  //I'll move this into a different component eventually, just trying to make it work...

  function reformatFunction(games) {
    const layerOne = games.children;
    const layerThree = [];
    const layerTwo = [];
    //console.log (layerOne);
    layerOne.forEach((element) => {  //for each...
      const currentGame = element.children;
      layerTwo.push(currentGame);
    })
    //console.log (layerTwo);
    layerTwo.forEach((game) => {   //for each in layerTwo...
      const gameContainer = {};                                 //create the hollow object
      const nameAttribute = game.find((attribute) => attribute.name == "name");                             //find each of the elements and put them in the hollow object
      gameContainer.name = nameAttribute.attributes.value;
      const thumbnailAttribute = game.find((attribute) => attribute.name == "thumbnail");                             //find each of the elements and put them in the hollow object
      gameContainer.thumbnail = thumbnailAttribute.value;
      const minplayersAttribute = game.find((attribute) => attribute.name == "minplayers");                             //find each of the elements and put them in the hollow object
      gameContainer.minplayers = minplayersAttribute.attributes.value;
      const maxplayersAttribute = game.find((attribute) => attribute.name == "maxplayers");                             //find each of the elements and put them in the hollow object
      gameContainer.maxplayers = maxplayersAttribute.attributes.value;
      const playingtimeAttribute = game.find((attribute) => attribute.name == "playingtime");                             //find each of the elements and put them in the hollow object
      gameContainer.playingtime = playingtimeAttribute.attributes.value;
      const idAttribute = game.find((attribute) => attribute.name == "link");                             //find each of the elements and put them in the hollow object
      gameContainer.id = idAttribute.attributes.id;
      const imageAttribute = game.find((attribute) => attribute.name == "image");                             //find each of the elements and put them in the hollow object
      gameContainer.image = imageAttribute.value;
      layerThree.push(gameContainer); //push now filled into layerThree 
    })
    //console.log (layerThree)
    setWorkableArray({ layerThree }); //It doesn't want to show up at first, but it does later?
    console.log(workableArray);
  }


  //Returns:

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




//OLD API Call
/*
  const [bggData, setbggData] = useState({});
  const [dataFetched, setdataFetched] = useState(false);


  useEffect(() => {
    fetch('https://boardgamegeek.com/xmlapi2/collection?username=ianlukefinley&excludesubtype=boardgameexpansion')
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      console.log(data);
      const collectionData = JSON.parse(xml2json(data, ''))
      console.log(collectionData);
      setbggData(collectionData); //This isn't getting set, even though collectionData exists!
      const gameIds = collectionData?.items.item.map(game => game['@objectid']);
      fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${gameIds.join(',')}`)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
          console.log(data)
          const games = JSON.parse(xml2json(data, ''))  //But it's not doing what I want...
          console.log(games)

          //setInitialFetch(data);
          //console.log (initialFetch); //hm. But it's not working...
        })
    });
  }, [])

*/
