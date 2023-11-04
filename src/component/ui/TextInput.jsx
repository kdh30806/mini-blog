import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
    width: calc(100% - 32px);
    ${(props) =>
        props.height &&
        `height: ${props.height}px`
    }
    padding: 16px;
    font-size: 16px;
    line-height: 20px;
`

function TextInput(props) {
    const { name, height, value, onChange } = props;

    return <StyledTextarea cols={30} rows={10} name={name} height={height} value={value} onChange={onChange} ></StyledTextarea>;
}

export default TextInput;