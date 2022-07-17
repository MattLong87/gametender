import React from 'react';
import styled from 'styled-components';

const Screen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    height: 100vh;
    color: #333;
`

const Container = styled.div`
    border-radius: 8px;
    width: 90vw;
    min-height: 90vh;
    padding: 30px;
    box-sizing: border-box;
`
const Title = styled.h1`
    text-align: center;
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

const Button = styled.button`
    width: 100%;
    background-color: #08AEEA;
    background-image: linear-gradient(342deg, #08AEEA 0%, #2AF598 100%);    
    border: none;
    color: white;
    border-radius: 8px;
    padding: 20px 0;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-top: 20px;
    box-shadow: 0 2px 0px 1px hsl(194deg 77% 37%);
`

export default class SetupScreen extends React.Component {
    render() {
        return (
            <Screen>
                <Container>
                    <Title>Setup</Title>
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
                    <Button>START</Button>
                </Container>
            </Screen>
        );
    }
}