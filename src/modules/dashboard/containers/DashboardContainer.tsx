import * as React from 'react';
import {Component} from 'react';
import {Dashboard} from '../components/Dashboard';

interface DashboardContainerState {
    loading: boolean;
}

export class DashboardContainer extends Component<{}, DashboardContainerState> {

    constructor(props) {
        super(props);
        this.state = {loading: false};
    }

    render() {
        return (<Dashboard/>);
    }
}
