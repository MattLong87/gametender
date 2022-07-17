import React from 'react';
import styled from 'styled-components';

const Screen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Filter = styled.div`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    font-size: 20px;

`

const DropDown = styled.select`
    font-size: 20px;
`

export default class SetupScreen extends React.Component {
    render() {
      return (
        <Screen>
          <h1>Setup</h1>
          <Filter>
              <Label>Players</Label>
              <DropDown>
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
          <button>Start</button>
        </Screen>
      );
    }
  }