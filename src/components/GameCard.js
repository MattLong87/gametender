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

export default function GameCard(game) {
    const gameData = game.game;
    const name = gameData.name[0]['_value'];
    return (
        <Card style={{transform: `rotate(${Math.random() * 6 - 3}deg) translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px)`}}>
            <GameImage style={{backgroundImage: 'url("' + gameData.image + '")'}}></GameImage>
            <GameName>{name}</GameName>
            <PlayTime>⏱ {gameData.playingtime['_value']} min</PlayTime>
        </Card>
    )
}