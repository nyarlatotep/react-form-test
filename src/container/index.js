import * as React from 'react';

import ComponentsJson from '../json/components.json';
import KeyComponents from "../components";

export class ContainerForm extends React.Component {
    constructor(props) {
        super(props);

        this.components = new Map();
        this.componentsLength = 0;
        this.componentIndex = 0
        this.prevIndex = ''

        this.state = {
            value: {
                text: '',
                select: '',
                radio: ''
            },
            components: []//ComponentsJson.components
        }

        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeOptions = this.handleChangeOptions.bind(this);
    }

    componentDidMount() {
        let result = [];
        ComponentsJson.components.forEach((component) => {
            this.components.set(component.type, component);
        });

        if (this.components.size > 0) {
            this.components.forEach((value, key) => {
                result.push(value);
            })
        }

        if (result) {
            console.log('componentDidMount', result, this.components);
            this.setState({
                components: result,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.components.length < this.componentsLength) {
            console.log('componentDidUpdate', this.componentsLength, prevState.components, this.components);
            let result = [];
            this.components.forEach((component) => {
                result.push(component);
            });

            if (result) {
                this.setState({
                    components: result,
                })
            }

        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.handleAddComponents)
            return true
    }

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

    handleAddComponents = (ev, component, index) => {
        let count = 0;
        const {components} = ComponentsJson;

        const {name} = ev.target;

        const newComponent = components.find((item) => item.type === component)
        const componentCopy = Object.assign({}, newComponent);
        const componentExistent = this.components.get(`${component}_${name}`);

        if (componentExistent){
            count++;
        this.componentIndex = count;
            this.components.set(`${component}_${name}_${count}`, componentCopy);
        }
        else
            this.components.set(`${component}_${name}`, componentCopy);

        this.componentsLength = this.components.size;
        console.log('handleAddComponent', this.components, name, count);

        this.setState((prevState) => {
            let result = [];
            const {components} = prevState;

            if (components.length < this.components.size) {
                this.components.forEach((value, key) => {
                    result.push(value);
                });
                if (result) {
                    return {
                        components: result,
                    }
                }
            }
        })
    }

    handleRemoveComponents = (ev, component, index) => {
        let count = 0;

        ev.preventDefault()

        const {name} = ev.target;
        const componentFound = this.components.get(`${component}_${name}`);

        if (componentFound) {
            this.components.delete(`${component}_${name}`);
        }
        else
            this.components.delete(`${component}_${name}_${index}`);

        console.log('handleRemoveComponents', this.components, component, index);
        this.componentsLength = this.components.size;
        this.setState((prevState) => {
            let result = [];
            const {components} = prevState;

            if (components.length > this.components.size) {
                this.components.forEach((value, key) => {
                    result.push(value);
                });
                if (result) {
                    return {
                        components: result,
                    }
                }
            }
        });
    }

    render() {
        console.log('components', this.state.components);
        return (
            <>
                <main>
                    <form>
                        {
                            this.state.components ?
                                this.state.components.map((component, i) => {
                                    const {attributes} = component;
                                    const Component = KeyComponents[component.type];
                                    const index = this.componentIndex;

                                    return (
                                        <>
                                            <fieldset key={`${attributes?.keycomponent}_fieldset_${i}`}
                                                      style={{border: 0}}>

                                                {
                                                    i > 2 ? (
                                                        <button key={`${attributes?.keycomponent}_button_remove_${i}`}
                                                                name={component.type}
                                                                className='removeComponentsBtn'
                                                                onClick={(e) => this.handleRemoveComponents(e, component.type, index)}
                                                        >
                                                            x
                                                        </button>
                                                    ) : null
                                                }
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
                                : null
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
                                                onClick={(e) => this.handleAddComponents(e, component.type, i)}
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