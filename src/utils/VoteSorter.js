export default function VoteSorter(gameList) {

  const finalArray = gameList.sort((gameA, gameB) =>
    (gameA.votes < gameB.votes ? 1 : -1)
  );

  console.log("Sorted:", finalArray);

  return (finalArray);
}