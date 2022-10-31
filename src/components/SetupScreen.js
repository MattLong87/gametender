import React from 'react';
import styled from 'styled-components';
import './radio-options.css';
import LoadingDots from './LoadingDots';

const SetupForm = styled.form`
    align-items: center;
    justify-content: center;
    min-height: 100%;
    color: #333;
    padding: 0 20px 20px 20px;
    display: grid;
    grid-template-rows: auto 1fr max-content;
`
const HelperText = styled.div`
    line-height: 1.3;
    margin-bottom: 20px;
    text-align: center;
`
const SetupCard = styled.div`
    border-radius: 8px;
    padding: 30px;
    box-sizing: border-box;
    background: #fff;
    --shadow-color: 0deg 0% 63%;
    box-shadow: 0px 0.5px 0.6px hsl(var(--shadow-color) / 0.37),
    0px 1.7px 1.9px -0.8px hsl(var(--shadow-color) / 0.37),
    0px 4.2px 4.7px -1.7px hsl(var(--shadow-color) / 0.37),
    0.1px 10.3px 11.6px -2.5px hsl(var(--shadow-color) / 0.37);
    border-radius: 20px;
`
const Filter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 40px;
`
const Label = styled.label`
    font-size: 22px;
    font-weight: 300;
    margin-bottom: 10px;
`
const DropDown = styled.select`
    font-size: 26px;
    padding: 12px 16px;
`
const Error = styled.div`
  margin-top: 20px;
  color: #9e0000;
  text-align: center;
`
const Button = styled.button`
    background-color: #08AEEA;
    background-image: linear-gradient(342deg, #08AEEA 0%, #2AF598 100%);    
    border: none;
    color: white;
    border-radius: 8px;
    padding: 10px 0;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 10px 0 10px 0;
    box-shadow: 0 2px 0px 1px hsl(194deg 77% 37%);
    width: 100%;
    min-height: 63px;
    &:active{
      background-image: linear-gradient(342deg,#08AEEA 0%,#1f7d52 100%);
      box-shadow: inset 0 2px 0px 1px hsl(194deg 77% 37%);
    }
`
const Input = styled.input`
    font-size: 20px;
    padding: 12px 16px;
    width: 100%;
`

export default function SetupScreen({ formData, handleChange, handleSubmit, waitingForData }) {
  return (
    <SetupForm onSubmit={handleSubmit}>
      <HelperText>
        Can't pick a game? No worries - we couldn't either. Enter your BoardGameGeek username and answer some questions about what you're looking for. Then, swipe to vote on what games sound fun. Once everyone has voted, you can see which games your party is most excited about!
      </HelperText>
      <SetupCard>
        {/* <Title>Setup</Title> */}

        <Filter>
          <Label>BGG Username</Label>
          <Input
            type="text"
            id="playername"
            name="playername"
            onChange={handleChange}
            value={formData.playername} />
        </Filter>
        <Filter>
          <Label htmlFor="playercount">Players</Label>
          <DropDown
            id="playercount"
            name="playercount"
            onChange={handleChange}
            value={formData.playercount}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8+</option>
          </DropDown>
        </Filter>
        <Filter>
          <Label>Game Length</Label>
          <DropDown
            id="playtime"
            name="playtime"
            onChange={handleChange}
            value={formData.playtime}>   
            <option value="99">Play time doesn't matter</option>
            <option value="30">About 30 mintutes</option>
            <option value="60">About an hour</option>
            <option value="120">About two hours</option>
            <option value="240">Over two hours</option>
          </DropDown>
        </Filter>
      </SetupCard>
      <Error>{formData.error}</Error>
      <Button onClick={() => handleSubmit}>{waitingForData ? <LoadingDots /> : 'START'}</Button>
    </SetupForm>
  );
};