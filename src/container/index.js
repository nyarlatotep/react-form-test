import * as React from 'react';

import ComponentsJson from '../json/components.json';
import KeyComponents from "../components";

export class ContainerForm extends React.Component {
    constructor(props) {
        super(props);

        this.inputSelected = '';
        this.extraComponents = [];

        this.state = {
            value: {
                text: '',
                select: '',
                radio: ''
            },
            components: ComponentsJson.components
        }

        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeOptions = this.handleChangeOptions.bind(this);
    }

    // componentDidUpdate(prevProps,prevState) {
    //     if (this.inputSelected = this.extraComponents[0].type) {
    //         console.log('form didUpdate',prevProps, prevState, this.extraComponents);
    //         this.setState({
    //             components: [
    //                 ...(prevState.components),
    //                 this.extraComponents
    //             ]
    //         })
    //     }
    // }

    handleChangeText(ev) {
        ev.preventDefault();
        const {text} = this.state.value;
        const {target} = ev;
        const {value} = target;

        if (this.inputSelected !== target.name)
            this.inputSelected = target.name;

        this.setState({
            [text]: value,
        });
    }

    handleChangeSelect(ev) {
        ev.preventDefault();
        const {select} = this.state.value;
        const {target} = ev;
        const {value} = target;

        if (this.inputSelected !== target.name)
            this.inputSelected = target.name;

        this.setState({
            [select]: value,
        })
    }

    handleChangeOptions(ev) {
        ev.preventDefault();
        const {radio} = this.state.value;
        const {target} = ev;
        const {value} = target;

        if (this.inputSelected !== target.name)
            this.inputSelected = target.name;

        this.setState({
            [radio]: value,
        })
    }

    handleAddComponents = (ev, component) => {
        const {components} = ComponentsJson;
        const newComponent = components.find((item) => item.type === component);

        if (ev.target.name === component)
            this.setState((prevState) => ({
                components: [
                    ...prevState.components,
                    newComponent
                ]
            }));
        this.inputSelected = component;
    }

    handleRemoveComponents = (ev, component) => {
        ev.preventDefault()
        const {components} = ComponentsJson;
        const removeComponent = components.find((item) => item.type === component);

        if (ev.target.name === component)
            this.setState((prevState) => {
                const newState = prevState.components.filter((item) => item.type !== component );
                console.log('indexComponent', newState)
                return {
                    components:[
                        newState[0]
                    ]

                }
            });
        this.inputSelected = component;
    }

    render() {
        console.log('components', this.state.components);
        return (
            <>
                <main>
                    <form>
                        {
                            this.state.components.map((component, i) => {
                                const {attributes} = component;
                                const Component = KeyComponents[component.type];

                                return (
                                    <>
                                        <fieldset key={`${attributes?.keycomponent}_fieldset_${i}`} style={{border: 0}}>
                                            <button key={`${attributes?.keycomponent}_button_remove_${i}`}
                                                    name={component.type}
                                                    className='removeComponentsBtn'
                                                    onClick={(e) => this.handleRemoveComponents(e, component.type)}
                                            >
                                                x
                                            </button>
                                            <Component
                                                key={`${attributes?.keycomponent}_${i}`}
                                                {...{
                                                    ...component,
                                                    attributes: {
                                                        ...attributes
                                                    },
                                                    handlers: {
                                                        handleChangeText: this.handleChangeText,
                                                        handleChangeSelect: this.handleChangeSelect,
                                                        handleChangeOption: this.handleChangeOptions
                                                    }
                                                }}
                                            />
                                        </fieldset>
                                    </>
                                )
                            })
                        }
                    </form>

                    <nav>
                        <p>
                            Add Inputs
                        </p>
                        <ul>
                            {
                                ComponentsJson.components.map((component, i) => {
                                    return (
                                        <li key={`list_components_${i}`} style={{listStyle: 'none'}}>
                                            <button
                                                key={`button_list_components_${i}`}
                                                name={component.type}
                                                className='addComponentsBtn'
                                                onClick={(e) => this.handleAddComponents(e, component.type)}
                                                type='button'
                                            >
                                                {component.type}
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </main>
            </>
        )
    }
}