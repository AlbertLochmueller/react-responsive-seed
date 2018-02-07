import * as React from 'react';
import Select from 'react-select';
import {Component} from 'react';
import 'react-select/dist/react-select.css';

export interface MultiSelectProps {
    placeholder: string;
    label: string;
}

export interface MultiSelectState {
    value: any[];
}

const FLAVOURS = [
    {label: 'Chocolate', value: 'chocolate'},
    {label: 'Vanilla', value: 'vanilla'},
    {label: 'Strawberry', value: 'strawberry'},
    {label: 'Caramel', value: 'caramel'},
    {label: 'Cookies and Cream', value: 'cookiescream'},
    {label: 'Peppermint', value: 'peppermint'},
];

export class MultiSelect extends Component<MultiSelectProps, MultiSelectState> {
    constructor(props) {
        super(props);

        this.state = {
            value: []
        }
    }

    handleSelectChange(value) {
        console.log('selected:', value);
        this.setState({value});
    }

    render() {
        const {placeholder, label} = this.props;
        const {value} = this.state;

        return (
            <div className="section">
                <h6 className="section-heading">{label}</h6>
                <Select
                    className={"MultiSelectField"}
                    closeOnSelect={false}
                    disabled={false}
                    multi
                    onChange={(value) => this.handleSelectChange(value)}
                    options={FLAVOURS}
                    placeholder={placeholder}
                    removeSelected={true}
                    rtl={false}
                    simpleValue
                    value={value}
                />
            </div>
        );
    }
}




