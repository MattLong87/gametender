import React from 'react';


export default function SortFunction({ratingState}) {

    var games = ratingState.ratingState.gamesList;
   const finalArray = games.sort((gameA, gameB) => 
   (gameA.votes < gameB.votes ? 1 : -1)
   );

 console.log ("Sorted:", finalArray); 

    return (finalArray);
}