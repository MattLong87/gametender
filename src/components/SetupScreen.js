import React, {useState} from 'react';
import styled from 'styled-components';

const Screen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    font-weight: 800;
    font-size: 66px;
    margin-top: 0;
    letter-spacing: -1px;
`

const Filter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
`

const Label = styled.label`
    font-size: 30px;
    font-weight: 300;
    margin-bottom: 10px;
`

const DropDown = styled.select`
    font-size: 30px;
    padding: 20px 32px;
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
    margin-top: 20px;
    box-shadow: 0 2px 0px 1px hsl(194deg 77% 37%);
    position: fixed;
    bottom: 40px;
    left: 5vw;
    width: 90vw;
`

const Input = styled.input`
    font-size: 30px;
    padding: 20px 32px;
    width: 100%;
`

export default function SetupScreen({createInput}) {
    let initialFormState = {
        playercount: "2",
        playtime: "short"
      };

      const [formData, setFormData] = useState({ ...initialFormState });
      const handleChange = ({ target }) => {
        const value =  target.value;
        setFormData({
          ...formData,
          [target.name]: value,
        });
      };
     
    
      const handleSubmit = (event) => {
        event.preventDefault();
        createInput(formData);
        console.log("Submitted:", formData); //Replace...
        //setFormData({ ...initialFormState }); This will clear the form...
      };

        return (
            <Screen>
                <Container>
                    <Title>Setup</Title>
                    <form onSubmit={handleSubmit}>
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
                       <Label htmlFor="short">
                        Under 30 minutes
                        <input
                          id="short"
                          type="radio"
                          name="playtime"
                          onChange={handleChange}
                          value="30"
                          checked={formData.playtime === "30"}
                        />
                       </Label>
                       <Label htmlFor="average">
                        About an hour
                        <input
                          id="average"
                          type="radio"
                          name="playtime"
                          onChange={handleChange}
                          value="60"
                          checked={formData.playtime === "60"}
                        />
                        </Label>
                        <Label htmlFor="long">
                        About two hours
                        <input
                          id="long"
                          type="radio"
                          name="playtime"
                          onChange={handleChange}
                          value="120"
                          checked={formData.playtime === "120"}
                        />
                        </Label>
                        <Label htmlFor="very long">
                        Over two hours
                        <input
                          id="very long"
                          type="radio"
                          name="playtime"
                          onChange={handleChange}
                          value="240"
                          checked={formData.playtime === "240"}
                        />
                        </Label>
                      </Filter>
                    <Button onClick={()=> handleSubmit}>START</Button>
                    </form>
                </Container>
            </Screen>
        );
    };