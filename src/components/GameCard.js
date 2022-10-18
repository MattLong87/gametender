import styled from 'styled-components';
import getTimeColorBasedOnPlaytime from '../utils/getTimeColorBasedOnPlaytime';
import { useState } from 'react';

const Card = styled.div`
    border: 1px solid #ccc;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 40px;
    background: white;
    height: 60vh;
    background-size: cover;
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    --shadow-color: 0deg 0% 63%;
    box-shadow:     ${props => props.frontCard ?
        `0px 0.5px 0.6px hsl(var(--shadow-color) / 0.34),
    0px 3px 3.4px -0.4px hsl(var(--shadow-color) / 0.34),
    0.1px 5.5px 6.2px -0.7px hsl(var(--shadow-color) / 0.34),
    0.1px 9.1px 10.2px -1.1px hsl(var(--shadow-color) / 0.34),
    0.1px 14.5px 16.3px -1.4px hsl(var(--shadow-color) / 0.34),
    0.2px 22.7px 25.5px -1.8px hsl(var(--shadow-color) / 0.34),
    0.3px 34.4px 38.7px -2.1px hsl(var(--shadow-color) / 0.34),
    0.5px 50.7px 57px -2.5px hsl(var(--shadow-color) / 0.34);`
        :
        `0px 0.5px 0.6px hsl(var(--shadow-color) / 0.34),
        0px 0.8px 0.9px -1.2px hsl(var(--shadow-color) / 0.34),
        0px 2px 2.3px -2.5px hsl(var(--shadow-color) / 0.34);`};
`
const GameImage = styled.div`
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
`
const GameName = styled.span`
    font-size: 36px;
    margin-top: 20px;
    font-weight: 300;
    letter-spacing: -1px;
`
const PlayTime = styled.div`
    font-size: 18px;
`
const TutorialCard = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 70% 30%;
    height: 100%;
    text-align: center;
    margin: 0 -20px;
`
const TutorialSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
`
const TutorialIcon = styled.i`
    font-size: 30px;
`
const GameDescription = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`

export default function GameCard(props) {
    const [showDescription, setShowDescription] = useState(false);

    if (props.tutorial) {
        return (
            <Card style={{ background: '#ffffffe8' }}>
                <TutorialCard>
                    <TutorialSection style={{ borderRight: '1px solid #dfdfdf' }}><TutorialIcon>👈</TutorialIcon>Swipe Left to pass on a game.</TutorialSection>
                    <TutorialSection><TutorialIcon>👉</TutorialIcon>Swipe Right to vote for a game.</TutorialSection>
                    <TutorialSection style={{ gridColumn: 'span 2', borderTop: '1px solid #dfdfdf' }}>Tap the Button to move on to the next player.<TutorialIcon>👇</TutorialIcon></TutorialSection>
                </TutorialCard>
            </Card>
        )
    }

    const gameData = props.game;
    const name = gameData.name;
    const playtime = gameData.playingtime;

    //this is crazy but I found (very) pseudo random numbers from the game data to ensure they stayed consistent on re-render
    //nothing else seemed to work (including useMemo())
    const id = gameData.id;
    const rotation = gameData.name.length % 2 == 0 ? id % 1000 / 1000 : -1 * id % 1000 / 1000;
    const xTranslation = gameData.thumbnail.length % 2 == 0 ? id % 100 / 100 : -1 * id % 100 / 100;
    const yTranslation = gameData.name.length & 2 == 0 ? id % 10 / 10 : -1 * id % 10 / 10;

    return (
        <Card style={{ transform: `rotate(${rotation * 6 - 3}deg) translate(${xTranslation * 6 - 3}px, ${yTranslation * 6 - 3}px)` }} frontCard={props.frontCard}>
            <GameImage style={{ backgroundImage: 'url("' + gameData.image + '")' }}></GameImage>
            {showDescription && <GameDescription>{gameData.description}</GameDescription>}
            <GameName>{name}</GameName>
            <p>Votes: {`${gameData.votes}`}</p>
            <PlayTime style={{ color: getTimeColorBasedOnPlaytime(playtime, props.requestedPlayTime) }}>⏱ {playtime} min</PlayTime>
        </Card>
    )
}