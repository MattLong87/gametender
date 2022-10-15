export default function SortFunction(formData, games) {

   const gamesByPlayerCount = games.filter((game) =>
      game.maxplayers >= formData.playercount
      && game.minplayers <= formData.playercount
   );

   const gamesAtTarget = gamesByPlayerCount.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) == formData.playtime
   );

   const gamesJustBelowTarget = gamesByPlayerCount.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) < formData.playtime && parseInt(game.playingtime) > formData.playtime - 30
   );

   const sortedJustBelowTarget = gamesJustBelowTarget.sort((gameA, gameB) => //and order them descending (closest to target and down)
      (gameA.playingtime < gameB.playingtime ? 1 : -1)
   );

   const gamesJustAboveTarget = gamesByPlayerCount.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) > formData.playtime && parseInt(game.playingtime) < formData.playtime + 30
   );

   const sortedJustAboveTarget = gamesJustAboveTarget.sort((gameA, gameB) => //and order them ascending (closet to target and up)
      (gameA.playingtime > gameB.playingtime ? 1 : -1)
   );

   const gamesBelowTarget = gamesByPlayerCount.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) < formData.playtime - 30 && parseInt(game.playingtime) > formData.playtime - 90
   );

   const sortedBelowTarget = gamesBelowTarget.sort((gameA, gameB) => //and order them descending (closest to target and down)
      (gameA.playingtime < gameB.playingtime ? 1 : -1)
   );

   const gamesAboveTarget = gamesByPlayerCount.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) > formData.playtime + 30 && parseInt(game.playingtime) < formData.playtime + 90
   );

   const sortedAboveTarget = gamesAboveTarget.sort((gameA, gameB) => //and order them ascending (closet to target and up)
      (gameA.playingtime > gameB.playingtime ? 1 : -1)
   );

   const gamesFarBelowTarget = gamesByPlayerCount.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) < formData.playtime - 90
   );

   const sortedFarBelowTarget = gamesFarBelowTarget.sort((gameA, gameB) => //and order them descending (closest to target and down)
      (gameA.playingtime < gameB.playingtime ? 1 : -1)
   );


   const gamesFarAboveTarget = gamesByPlayerCount.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) > formData.playtime + 90
   );

   const sortedFarAboveTarget = gamesFarAboveTarget.sort((gameA, gameB) => //and order them ascending (closet to target and up)
      (gameA.playingtime > gameB.playingtime ? 1 : -1)
   );

   const joinedArray = gamesAtTarget.concat(sortedJustBelowTarget, sortedJustAboveTarget, sortedBelowTarget, sortedAboveTarget, sortedFarBelowTarget, sortedFarAboveTarget);

   const truncatedArray = joinedArray.slice(0,20) //take only the top 20 in the sorted array.

   const outputArray = truncatedArray.map((game) => {
      return { ...game, votes: 0 } //if there's no votes property, sets it to 1, otherwise increment by 1
   })

   console.log("Sorted:", outputArray);
   //console.log ("Workable Array:", workableArray); 
   //return them in priority of target, shorter than, longer than
   //ultimately want to do this differently, just practice right now

   return (outputArray);


      /*  Old Sort Functions
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
      */
}