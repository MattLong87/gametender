import React from 'react';
import styled from 'styled-components';

const Screen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default class SetupScreen extends React.Component {
    render() {
      return (
        <Screen>
          <h1>Setup</h1>
          <div>
              <label>Number of Players</label>
              <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8+</option>
              </select>
          </div>
          <button>Start</button>
        </Screen>
      );
    }
  }