import * as React from 'react';
import propTypes from "prop-types";

function TextInput (props) {
    const {attributes: attr = {}, handlers: {handleChangeText}} = props;

    return (
        <input
        className='text_input'
        id={attr?.id}
        placeholder={attr?.placeholder}
        value={attr?.value}
        onChange={handleChangeText}
        type={attr?.type}
        />
    )
}

TextInput.propTypes = {
    attributes: propTypes.object.isRequired,
    handlers: propTypes.object.isRequired,
}

export default TextInput;