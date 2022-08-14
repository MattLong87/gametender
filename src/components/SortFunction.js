import React from 'react';
import returnedData from '../games.json';


export default function SortFunction({formData, workableArray}) {

    var games = workableArray.layerThree

   const gamesByPlayerCount = games.filter((game) =>
     game.maxplayers >= formData.playercount 
     && game.minplayers <= formData.playercount 
    );

   const gamesAtTarget = gamesByPlayerCount.filter((game) =>  //select games at the target length
   parseInt(game.playingtime) == formData.playtime 
  );

  const gamesUnderTarget = gamesByPlayerCount.filter((game) =>  //select games shorter than target...
  parseInt(game.playingtime)  < formData.playtime 
  );

   const sortedGamesUnder = gamesUnderTarget.sort((gameA, gameB) => //and order them descending (closest to target and down)
   (gameA.playingtime < gameB.playingtime ? 1 : -1)
   );

   const gamesOverTarget = gamesByPlayerCount.filter((game) => //select games longer than target...
   parseInt(game.playingtime)  > formData.playtime 
   );

   const sortedGamesOver = gamesOverTarget.sort((gameA, gameB) => //and order them ascending (closet to target and up)
   (gameA.playingtime > gameB.playingtime ? 1 : -1)
   );

   const joinedArray = gamesAtTarget.concat(sortedGamesUnder, sortedGamesOver);

   const outputArray = joinedArray.map((game) => {
        return { ...game, votes: 0} //if there's no votes property, sets it to 1, otherwise increment by 1
    })

 console.log ("Sorted:", outputArray); 
 //console.log ("Workable Array:", workableArray); 
 //return them in priority of target, shorter than, longer than
//ultimately want to do this differently, just practice right now

    return (outputArray);
}