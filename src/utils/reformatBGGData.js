export default function reformatBGGData(BGGData) {
    const layerOne = BGGData.children;
    // console.log(BGGData)
    const layerThree = [];
    const layerTwo = [];
    // console.log (layerOne);
    layerOne.forEach((element) => {  //for each...
      let currentGame = element.children;
      //add the id here to the end of the array
      currentGame.push({name: 'id', id: element.attributes.id});
      layerTwo.push(currentGame);
    })
    // console.log (layerTwo);
    layerTwo.forEach((game) => {   //for each in layerTwo...
      const gameContainer = {};                                 //create the hollow object
      const nameAttribute = game.find((attribute) => attribute.name == "name");                             //find each of the elements and put them in the hollow object
      const pulledName = nameAttribute.attributes.value;
      gameContainer.name = pulledName.replace(/&#39;/g, "'").replace(/&#38;/g, "&").replace(/&#34;/g, "\"");
       //added these lines to account for special charcters in xml
      const thumbnailAttribute = game.find((attribute) => attribute.name == "thumbnail");                             //find each of the elements and put them in the hollow object
      gameContainer.thumbnail = thumbnailAttribute.value;
      const minplayersAttribute = game.find((attribute) => attribute.name == "minplayers");                             //find each of the elements and put them in the hollow object
      gameContainer.minplayers = minplayersAttribute.attributes.value;
      const maxplayersAttribute = game.find((attribute) => attribute.name == "maxplayers");                             //find each of the elements and put them in the hollow object
      gameContainer.maxplayers = maxplayersAttribute.attributes.value;
      const playingtimeAttribute = game.find((attribute) => attribute.name == "playingtime");                             //find each of the elements and put them in the hollow object
      gameContainer.playingtime = playingtimeAttribute.attributes.value;
      const idAttribute = game.find((attribute) => attribute.name == "id");                             //find each of the elements and put them in the hollow object
      gameContainer.id = idAttribute.id;
      const imageAttribute = game.find((attribute) => attribute.name == "image");                             //find each of the elements and put them in the hollow object
      gameContainer.image = imageAttribute.value;
      const descriptionAttribute = game.find((attribute) => attribute.name == "description");                             //find each of the elements and put them in the hollow object
      pulledDescription = descriptionAttribute.value;
      gameContainer.description = pulledDescription.replace(/&#39;/g, "'").replace(/&#38;/g, "&").replace(/&#34;/g, "\"");
       //added these lines to account for special charcters in xml
      layerThree.push(gameContainer); //push now filled into layerThree 
    })
    //console.log (layerThree)
    return layerThree;
  }