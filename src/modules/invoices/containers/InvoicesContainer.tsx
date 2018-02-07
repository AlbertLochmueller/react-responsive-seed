import * as React from 'react';
import {Component} from 'react';
import {Invoices} from '../components/Invoices';

interface InvoicesContainerState {
    loading: boolean;
}

export class InvoicesContainer extends Component<{}, InvoicesContainerState> {

    constructor(props) {
        super(props);
        this.state = {loading: false};
    }

    render() {
        return (<Invoices/>);
    }
}
