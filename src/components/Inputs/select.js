import * as React from 'react';
import propTypes from 'prop-types';

function SelectInput(props) {
    const {attributes: attr = {}, handlers: {handleChangeSelect}} = props;
    const {options = []} = attr;

    return (
        <select
            className='select_input'
            id={attr?.id}
            placeholder={attr?.placeholder}
            value={props?.value?.select}
            onChange={handleChangeSelect}
        >
            {
                options ?
                    options.map((option, i) => {
                        const {attributes} = option;

                        return <option
                            key={`${attributes?.keycomponent || attributes.value}_${i}`}
                            value={attributes.value}
                            className='select_option'>
                            {attributes.label}
                        </option>
                    })
                    : null
            }
        </select>
    )
}

SelectInput.propTypes = {
    attributes: propTypes.object.isRequired,
    handlers: propTypes.object.isRequired,
}

export default SelectInput;