import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';
import GameCard from './GameCard';
import VoteSorter from "../utils/VoteSorter";
import ResultsScreen from './ResultsScreen';

const Screen = styled.div`
    display: grid;
    grid-template-rows: 1fr max-content;
    height: 100vh;
    max-width: 400px;
`

const CardContainer = styled.div`
    position: relative;
    margin: 13vh 5vw 0 5vw;
`

const BottomSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
    width: 90vw;
    max-width: 400px;
    &:active{
      background-image: linear-gradient(342deg,#010014 0%,#751ab0 100%);
      box-shadow: inset 0 2px 0px 1px hsl(0deg 0% 0%);
    }
`

const Info = styled.div`
    font-size: 14px;
    color: #aaa;
    margin: 10px 0 15px;
`

const CompleteContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`

const CompleteIcon = styled.i`
    font-size: 60px;
    color: #999;
    margin-bottom: 20px;
`

export default function RatingScreen(props) {

    const [ratingState, setRatingState] = useState({
        showTutorial: true,
        currentPosition: 0,
        playersCompleted: 0,
        ratingComplete: false,
        gamesList: props.gamesList
    });

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
        if (direction === 'right') {
            const newGamesList = ratingState.gamesList.map((game, i) => {
                if (ratingState.currentPosition == i) {
                    return { ...game, votes: game.votes ? game.votes + 1 : 1 } //NOTE: all should start with votes of 0 now ... if there's no votes property, sets it to 1, otherwise increment by 1
                }
                else {
                    return game;
                }
            })
            setRatingState({ ...ratingState, showTutorial: false, gamesList: newGamesList, ratingState, currentPosition: ratingState.currentPosition + 1 })
        }
        else if (direction === 'left') {
            setRatingState({ ...ratingState, showTutorial: false, currentPosition: ratingState.currentPosition + 1 })
        }
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    var cards = ratingState.gamesList.map((game, key) => {
        //only showing a few cards at a time for performance reasons.
        if (key == ratingState.currentPosition) {
            return (
                <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']} key={key}>
                    <GameCard game={game} frontCard={true} requestedPlayTime={props.formData.playtime} />
                </TinderCard>
            )
        }
        else if (key > ratingState.currentPosition && key <= ratingState.currentPosition + 3) {
            return <GameCard game={game} key={key} requestedPlayTime={props.formData.playtime} />;
        }
        else {
            return;
        }
    })

    if(ratingState.showTutorial){
        cards.unshift(
            <TinderCard onSwipe={() => setRatingState({...ratingState, showTutorial: false})} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']} key="-1">
                <GameCard tutorial={true} />
            </TinderCard>
        )
    }

    const handleClick = () => {
        if (ratingState.playersCompleted + 1 == props.formData.playercount) {
            setRatingState({ ...ratingState, ratingComplete: true })
        }
        else {
            setRatingState({ ...ratingState, currentPosition: 0, playersCompleted: ratingState.playersCompleted + 1 });
            console.log(ratingState);
        }
    }

    if (ratingState.ratingComplete) {
        return (
            <ResultsScreen finalDisplay={VoteSorter(ratingState.gamesList)} />
        )
    } else {
        return (
            <Screen>
                {ratingState.currentPosition < ratingState.gamesList.length ? (
                    <CardContainer>
                        {cards.reverse()}
                    </CardContainer>)
                    :
                    <CompleteContainer>Voting Complete!<CompleteIcon>✔</CompleteIcon></CompleteContainer>}
                <BottomSection>
                    <Button onClick={handleClick}>
                        Next Player →
                    </Button>
                    {ratingState.currentPosition < ratingState.gamesList.length ? (
                    <Info>
                        Game {`${ratingState.currentPosition + 1}`} of {`${ratingState.gamesList.length}`}. Player {`${ratingState.playersCompleted + 1}`} of {`${props.formData.playercount}`}.
                    </Info>)
                    : (
                        <Info>
                            Voting Complete! {ratingState.playersCompleted + 1 == props.formData.playercount ? 'Tap to view results.' : `Pass to Player ${ratingState.playersCompleted + 2}.`}
                        </Info>)
                     }
                    </BottomSection>
            </Screen>
        )
    }
}