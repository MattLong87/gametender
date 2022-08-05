import React, { useState } from 'react';
import styled from 'styled-components';
import './radio-options.css';

const SetupForm = styled.form`
    align-items: center;
    justify-content: center;
    min-height: 100%;
    color: #333;
    padding: 20px;
    display: grid;
    grid-template-rows: 1fr max-content;
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

const Title = styled.h1`
    text-align: center;
    font-weight: 800;
    font-size: 35px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 0;
`

const Filter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 40px;
`

const Label = styled.label`
    font-size: 30px;
    font-weight: 300;
    margin-bottom: 10px;
`

const DropDown = styled.select`
    font-size: 30px;
    padding: 10px 32px;
`

const Button = styled.button`
    background-color: #08AEEA;
    background-image: linear-gradient(342deg, #08AEEA 0%, #2AF598 100%);    
    border: none;
    color: white;
    border-radius: 8px;
    padding: 20px 0;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 30px 0 10px 0;
    box-shadow: 0 2px 0px 1px hsl(194deg 77% 37%);
    width: 100%;
    &:active{
      background-image: linear-gradient(342deg,#08AEEA 0%,#1f7d52 100%);
      box-shadow: inset 0 2px 0px 1px hsl(194deg 77% 37%);
    }
`

const Input = styled.input`
    font-size: 30px;
    padding: 10px 32px;
    width: 100%;
`

const RadioOption = styled.div``;

export default function SetupScreen({ formData, handleChange, handleSubmit }) {

  return (
    <SetupForm onSubmit={handleSubmit}>
      <SetupCard>
        <Title>Setup</Title>
        
          <Filter>
            <Label>BGG Username</Label>
            <Input onChange={(e) => console.log(e.target.value)} />
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
            <div className="radio-options">
              <RadioOption>
                <input
                  id="short"
                  type="radio"
                  name="playtime"
                  onChange={handleChange}
                  value="30"
                  checked={formData.playtime === "30"}
                />
                <Label htmlFor="short">
                  Short
                </Label>
              </RadioOption>
              <RadioOption>
                <input
                  id="average"
                  type="radio"
                  name="playtime"
                  onChange={handleChange}
                  value="60"
                  checked={formData.playtime === "60"}
                />
                <Label htmlFor="average">
                  Medium
                </Label>
              </RadioOption>
              <RadioOption>
                <input
                  id="long"
                  type="radio"
                  name="playtime"
                  onChange={handleChange}
                  value="120"
                  checked={formData.playtime === "120"}
                />
                <Label htmlFor="long">
                  Long
                </Label>
              </RadioOption>
              <RadioOption>
                <input
                  id="very long"
                  type="radio"
                  name="playtime"
                  onChange={handleChange}
                  value="240"
                  checked={formData.playtime === "240"}
                />
                <Label htmlFor="very long">
                  Very Long
                </Label>
              </RadioOption>
            </div>
          </Filter>
      </SetupCard>
      <Button onClick={() => handleSubmit}>START</Button>
    </SetupForm>
  );
};