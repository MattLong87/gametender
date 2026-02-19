export default function SortFunction(formData, games) {

   const gamesByPlayerCount = games.filter((game) =>
      game.maxplayers >= formData.playercount
      && game.minplayers <= formData.playercount
   );

   let shuffledArray = gamesByPlayerCount             //shuffles matching games, so we're not always seeing the same cards on top
   .map(value => ({ value, sort: Math.random() }))   //pulled this logic from StackOverflow
   .sort((a, b) => a.sort - b.sort)
   .map(({ value }) => value);

   if (formData.playtime == 99) {
      const shorterArray = shuffledArray.slice(0,gamesToReturn); //take only the top X in the sorted array, where X is gamesReturned

      const outputArray = shorterArray.map((game) => {
         return { ...game, votes: 0 } //if there's no votes property, sets it to 1, otherwise increment by 1
      });
   
      console.log("Sorted:", outputArray);
      //console.log ("Workable Array:", workableArray); 
      //return them in priority of target, shorter than, longer than
      //ultimately want to do this differently, just practice right now
   
      return (outputArray);

   }

   const gamesAtTarget = shuffledArray.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) == formData.playtime
   );

   const gamesJustBelowTarget = shuffledArray.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) < formData.playtime && parseInt(game.playingtime) > formData.playtime - 30
   );

   const sortedJustBelowTarget = gamesJustBelowTarget.sort((gameA, gameB) => //and order them descending (closest to target and down)
      (gameA.playingtime < gameB.playingtime ? 1 : -1)
   );

   const gamesJustAboveTarget = shuffledArray.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) > formData.playtime && parseInt(game.playingtime) < formData.playtime + 30
   );

   const sortedJustAboveTarget = gamesJustAboveTarget.sort((gameA, gameB) => //and order them ascending (closet to target and up)
      (gameA.playingtime > gameB.playingtime ? 1 : -1)
   );

   const gamesBelowTarget = shuffledArray.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) < formData.playtime - 30 && parseInt(game.playingtime) > formData.playtime - 90
   );

   const sortedBelowTarget = gamesBelowTarget.sort((gameA, gameB) => //and order them descending (closest to target and down)
      (gameA.playingtime < gameB.playingtime ? 1 : -1)
   );

   const gamesAboveTarget = shuffledArray.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) > formData.playtime + 30 && parseInt(game.playingtime) < formData.playtime + 90
   );

   const sortedAboveTarget = gamesAboveTarget.sort((gameA, gameB) => //and order them ascending (closet to target and up)
      (gameA.playingtime > gameB.playingtime ? 1 : -1)
   );

   const gamesFarBelowTarget = shuffledArray.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) < formData.playtime - 90
   );

   const sortedFarBelowTarget = gamesFarBelowTarget.sort((gameA, gameB) => //and order them descending (closest to target and down)
      (gameA.playingtime < gameB.playingtime ? 1 : -1)
   );


   const gamesFarAboveTarget = shuffledArray.filter((game) =>  //select games at the target length
      parseInt(game.playingtime) > formData.playtime + 90
   );

   const sortedFarAboveTarget = gamesFarAboveTarget.sort((gameA, gameB) => //and order them ascending (closet to target and up)
      (gameA.playingtime > gameB.playingtime ? 1 : -1)
   );

   const joinedArray = gamesAtTarget.concat(sortedJustBelowTarget, sortedJustAboveTarget, sortedBelowTarget, sortedAboveTarget, sortedFarBelowTarget, sortedFarAboveTarget);
<<<<<<< Updated upstream

   const truncatedArray = joinedArray.slice(0,20); //take only the top 20 in the sorted array.
=======
      
   const truncatedArray = joinedArray.slice(0,gamesToReturn); //take only the top X in the sorted array, where X is gamesReturned
>>>>>>> Stashed changes

   const outputArray = truncatedArray.map((game) => {
      return { ...game, votes: 0 } //if there's no votes property, sets it to 1, otherwise increment by 1
   });

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