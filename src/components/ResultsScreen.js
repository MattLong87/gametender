import React from "react";
import styled from 'styled-components';

const Screen = styled.div`
padding: 20px;
`

const Title = styled.h1`
    text-align: center;
    font-weight: 500;
    font-size: 35px;
    letter-spacing: -1px;
    text-transform: uppercase;
    margin-top: 0;
`
const GameList = styled.ul`
    padding: 0;
`
const GameWrapper = styled.div`
    background: ${props => props.highestRated ? `linear-gradient(43deg,#00a3de 0%,#ff00f7 100%)` : `white`};
    padding: 3px;
    border-radius: 12px; /* border-radius = inner radius + distance between */
    margin-bottom: 24px;
    --shadow-color: 0deg 0% 67%;
    box-shadow: 0px 0.5px 0.7px hsl(var(--shadow-color) / 0.13),
    0px 1px 1.4px -0.4px hsl(var(--shadow-color) / 0.33),
    0.1px 2.2px 3.1px -0.7px hsl(var(--shadow-color) / 0.54);
`
const Game = styled.div`
    display: grid;
    grid-template-columns: 25% 1fr;
    align-items: center;
    padding: 20px 16px;
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
    var maxVotes = props.finalDisplay[0].votes;

    return (
        <Screen>
            <Title>Results</Title>
            <GameList>
                {props.finalDisplay.map((game, i) => (
                    <GameWrapper key={i} highestRated={game.votes == maxVotes ? true : false}> {/*wrapper lets me use give the top games a gradient border*/}
                        <Game>
                            <GameThumbnail>
                                <img src={game.thumbnail} style={{ maxWidth: '100%' }} />
                            </GameThumbnail>
                            <GameDetails>
                                <GameName>{game.name}</GameName>
                                <GameDetail>{game.votes} {game.votes == 1 ? 'vote' : 'votes'}</GameDetail>
                                <GameDetail>{game.minplayers} to {game.maxplayers} players</GameDetail>
                                <GameDetail>{game.playingtime} minutes playing time</GameDetail>
                            </GameDetails>
                        </Game>
                    </GameWrapper>
                ))}
            </GameList>
        </Screen>
    )
}