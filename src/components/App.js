import React, { useState } from 'react';
import './App.css';
import SetupScreen from './SetupScreen';
import RatingScreen from './RatingScreen';
import xml2json from '../utils/xml2json';
import SortFunction from './SortFunction';

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
    const outputArray = SortFunction({formData});
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
