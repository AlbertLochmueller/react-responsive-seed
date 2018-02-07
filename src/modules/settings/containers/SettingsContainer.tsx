import * as React from 'react';
import {Component} from 'react';
import {Settings} from '../components/Settings';

interface SettingsContainerState {
    loading: boolean;
}

export class SettingsContainer extends Component<{}, SettingsContainerState> {

    constructor(props) {
        super(props);
        this.state = {loading: false};
    }

    render() {
        return (<Settings/>);
    }
}
