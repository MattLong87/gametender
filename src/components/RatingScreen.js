import React, { useState } from 'react';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';
import GameCard from './GameCard';

const CardContainer = styled.div`
    position: relative;
    margin: 10vh 5vw;
`

const Button = styled.button`
    background-color: #08AEEA;
    background-image: linear-gradient(342deg,#050191 0%,#ca78ff 100%);   
    border: none;
    color: white;
    border-radius: 8px;
    padding: 20px 0;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-top: 20px;
    box-shadow: 0 2px 0px 1px hsl(0deg 0% 0%);
    position: fixed;
    bottom: 40px;
    left: 5vw;
    width: 90vw;
    &:active{
      background-image: linear-gradient(342deg,#010014 0%,#751ab0 100%);
      box-shadow: inset 0 2px 0px 1px hsl(0deg 0% 0%);
    }
`

export default function RatingScreen(props) {

    const [ratingState, setRatingState] = useState({
        currentPosition: 0,
        playersCompleted: 0,
        gamesList: props.gamesList
    });

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
        if (direction === 'right') {
            const newGamesList = ratingState.gamesList.map((game, i) => {
                if (ratingState.currentPosition == i) {
                    return { ...game, votes: game.votes ? game.votes + 1 : 1 } //if there's no votes property, sets it to 1, otherwise increment by 1
                }
                else {
                    return game;
                }
            })
            setRatingState({ ...ratingState, gamesList: newGamesList, ratingState, currentPosition: ratingState.currentPosition + 1 })
        }
        else if (direction === 'left') {
            setRatingState({ ...ratingState, currentPosition: ratingState.currentPosition + 1 })
        }
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    var cards = ratingState.gamesList.map((game, key) => {
        //only showing a few cards at a time for performance reasons. Need to make sure that gamesList keys get updated when a card is swiped
        if (key == ratingState.currentPosition) {
            return (
                <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']} key={key}>
                    <GameCard game={game} />
                </TinderCard>
            )
        }
        else if (key > ratingState.currentPosition && key <= ratingState.currentPosition + 3) {
            return <GameCard game={game} key={key} />;
        }
        else {
            return;
        }
    })

    return (
        <>
            {ratingState.currentPosition < ratingState.gamesList.length ? (
                <CardContainer>
                    {cards.reverse()}
                </CardContainer>)
                :
                <div>RATING COMPLETE</div>}
            <Button onClick={() => setRatingState({ ...ratingState, currentPosition: 0, playersCompleted: ratingState.playersCompleted + 1 })}>Next Player →</Button>
        </>
    )
}