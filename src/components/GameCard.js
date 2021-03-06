import styled from 'styled-components';

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

export default function GameCard(props) {
    const gameData = props.game;
    const name = gameData.name[0]['_value'];
    return (
        <Card style={{ transform: `rotate(${Math.random() * 6 - 3}deg) translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px)` }} frontCard={props.frontCard}>
            <GameImage style={{ backgroundImage: 'url("' + gameData.image + '")' }}></GameImage>
            <GameName>{name}</GameName>
            <p>Votes: {`${gameData.votes}`}</p>
            <PlayTime>⏱ {gameData.playingtime['_value']} min</PlayTime>
        </Card>
    )
}