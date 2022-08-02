import React from "react";
import styled from 'styled-components';

const Screen = styled.div`
padding: 20px;
`

const Title = styled.h1`
    text-align: center;
    font-weight: 800;
    font-size: 66px;
    margin-top: 0;
    letter-spacing: -1px;
`
const GameList = styled.ul`
    padding: 0;
`
const Game = styled.div`
    display: grid;
    grid-template-columns: 25% 1fr;
    align-items: center;
    margin-bottom: 24px;
    padding: 20px 16px;
    --shadow-color: 0deg 0% 67%;
    box-shadow: 0px 0.5px 0.7px hsl(var(--shadow-color) / 0.13),
    0px 1px 1.4px -0.4px hsl(var(--shadow-color) / 0.33),
    0.1px 2.2px 3.1px -0.7px hsl(var(--shadow-color) / 0.54);
    border-radius: 9px;
    background: white;
`
const GameThumbnail = styled.div`
    max-width: 100%;
`
const GameDetails = styled.div`
    padding: 0 0 0 24px;
    display: flex;
    flex-direction: column;
`
const GameName = styled.span`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
`
const GameDetail = styled.span`
    font-size: 14px;
    margin-bottom: 4px;
`

export default function ResultsScreen(props) {
    return (
        <Screen>
            <Title>Results</Title>
            <GameList>
                {props.finalDisplay.map((game) => (
                    <Game>
                        <GameThumbnail>
                            <img src={game.thumbnail} style={{maxWidth: '100%'}} />
                        </GameThumbnail>
                        <GameDetails>
                            <GameName>{game.name[0]['_value']}</GameName>
                            <GameDetail>{game.votes} votes</GameDetail>
                            <GameDetail>{game.minplayers['_value']} to {game.maxplayers['_value']} players</GameDetail>
                            <GameDetail>{game.playingtime['_value']} minutes playing time</GameDetail>
                        </GameDetails>
                    </Game>
                ))}
            </GameList>
        </Screen>
    )
}