import * as React from 'react';
import propTypes from "prop-types";

function OptionsInput(props) {
    const {attributes: attr = {}, handlers: {handleChangeOption}} = props;
    const {items = []} = attr;
    return (
       <>
            {
                items ?
                    items.map((item, i) => {
                        const {attributes} = item;

                        return (
                            <>
                                <label
                                    className='radio_input_label'
                                    id={attr?.id}
                                    key={`${attr.id}_${i}`}
                                >
                                {attributes.label}
                            <input
                            key={`${attributes?.keycomponent || attributes.value}_${i}`}
                            type='radio'
                            className='radio_input'
                            value={attributes?.value}
                            onChange={handleChangeOption}
                        />
                                </label>
                            </>
                            )
                    })
                    : null
            }
        </>
    )
}

OptionsInput.propTypes = {
    attributes: propTypes.object.isRequired,
    handlers: propTypes.object.isRequired,
}

export default OptionsInput;