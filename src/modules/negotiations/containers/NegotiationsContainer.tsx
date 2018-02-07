import * as React from 'react';
import {Component} from 'react';
import {Negotiations} from '../components/Negotiations';

interface NegotiationsContainerState {
    loading: boolean;
}

export class NegotiationsContainer extends Component<{}, NegotiationsContainerState> {

    constructor(props) {
        super(props);
        this.state = {loading: false};
    }

    render() {
        return (<Negotiations/>);
    }
}
