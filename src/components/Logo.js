import styled from "styled-components";

const LogoText = styled.div`
text-align: center;
padding: 14px 0;
font-size: 34px;
font-weight: 600;
letter-spacing: -2px;
background: linear-gradient(360deg,#050191 0%,#ca78ff 100%);  ;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;`

export default function Logo(props) {
    return <LogoText>{props.name}</LogoText>
}