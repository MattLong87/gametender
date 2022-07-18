import React from 'react';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';
import returnedData from '../games.json';
import GameCard from './GameCard';

const CardContainer = styled.div`
    position: relative;
    margin: 10vh 5vw;
`

export default function RatingScreen() {

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    var games = returnedData.items.item;
    console.log(games);

    var cards = games.map((game, key) => (
        <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']} key={key}>
            <GameCard game={game} />
        </TinderCard>
    ))

    return (
        <CardContainer>
            {cards.reverse()}
        </CardContainer>
    )
}