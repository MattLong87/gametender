import styled from 'styled-components';
import { useState } from 'react';
import ReactTooltip from 'react-tooltip';

export default function DescriptionButton(props){
    console.log(props.description)
    // return <div>{props.description}</div>
    return (
        <>
            <button data-tip={`"${props.description}"`}>i</button>
            <ReactTooltip />
        </>
    );
}