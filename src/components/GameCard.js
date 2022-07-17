import styled from 'styled-components';

const Card = styled.div`
    border: 3px solid #ccc;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 40px;
    background: white;
    height: 60vh;
`

const GameName = styled.span`
    font-size: 36px;
    margin-top: 20px;
    font-weight: 300;
    letter-spacing: -1px;
`

export default function GameCard(game) {
    const gameData = game.game;
    const name = gameData.name[0]['_value'];
    return (
        <Card>
            <img src={gameData.image} />
            <GameName>{name}</GameName>
        </Card>
    )
}