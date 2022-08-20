export default function reformatBGGData(BGGData) {
    const layerOne = BGGData.children;
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
    // console.log (layerThree)
    return layerThree;
  }