import React, { useState, useEffect } from 'react';
import './App.css';
import SetupScreen from './SetupScreen';
import RatingScreen from './RatingScreen';
import xml2json from '../utils/xml2json';
import SortFunction from './SortFunction';

function App() {

  //States and Initial Variables

  let initialFormState = {
    playercount: "2",
    playtime: "30"
  };

  const [bggData, setbggData] = useState({});
  const [dataFetched, setdataFetched] = useState(false);
  const [formData, setFormData] = useState({ ...initialFormState });
  const [presentList, setPresentList] = useState([]);
  const [initialFetch, setInitialFetch] = useState ([]);
 

  
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
    console.log("Submitted:", formData); 
    const outputArray = SortFunction({formData});
    setPresentList(outputArray);
  };

  //API Call

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




  //Returns:

if (presentList.length >= 1)
  {
    console.log(presentList);
    return (
      <>
      <RatingScreen gamesList={presentList} formData={formData} />
    </>
    )
  } else {
    return (
    <>
      <SetupScreen formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
      {/* <RatingScreen /> */}
      {/* {bggData && bggData.items.item.map((game, key) => {
        return <img src={game.thumbnail} key={key} />
      })} */}
    </>
    )
  }
}

export default App;
