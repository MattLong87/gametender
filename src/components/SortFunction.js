import React from 'react';
import styled from 'styled-components';
import returnedData from '../games.json';



export default function SortFunction({input}) {

    var games = returnedData.items.item;

   const gamesByPlayerCount = games.filter((game) =>
     game.maxplayers['_value'] >= input.playercount 
     && game.minplayers['_value'] <= input.playercount 
    );
   console.log(gamesByPlayerCount);


   const gamesAtTarget = gamesByPlayerCount.filter((game) =>  //select games at the target length
   parseInt(game.playingtime['_value']) == input.playtime 
  );

  const gamesUnderTarget = gamesByPlayerCount.filter((game) =>  //select games shorter than target...
  parseInt(game.playingtime['_value'])  < input.playtime 
  );

   const sortedGamesUnder = gamesUnderTarget.sort((gameA, gameB) => //and order them descending (closest to target and down)
   (gameA.playingtime['_value'] < gameB.playingtime['_value'] ? 1 : -1)
   );

   const gamesOverTarget = gamesByPlayerCount.filter((game) => //select games longer than target...
   parseInt(game.playingtime['_value'])  > input.playtime 
   );

   const sortedGamesOver = gamesOverTarget.sort((gameA, gameB) => //and order them ascending (closet to target and up)
   (gameA.playingtime['_value'] > gameB.playingtime['_value'] ? 1 : -1)
   );

   const outputArray = gamesAtTarget.concat(sortedGamesUnder, sortedGamesOver);

 console.log (outputArray); //return them in priority of target, shorter than, longer than
//ultimately want to do this differently, just practice right now

    return {outputArray};
    
}