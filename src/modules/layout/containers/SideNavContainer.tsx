import * as React from 'react';
import {Component} from 'react';
import {SideNav} from '../components/SideNav/SideNav';
import {AuthService} from '../../auth/AuthService';
import {Inject} from 'react.di';

export interface SideNavContainerProps {
    open: boolean;
    toggle();
    goHome();
}

export class SideNavContainer extends Component<SideNavContainerProps, {}> {

    @Inject authService: AuthService;

    render() {
        const {open, toggle, goHome} = this.props;

        return (
            <SideNav
            toggle={() => toggle()}
            open={open}
            goHome={() => goHome()}
            isAdvertiser={this.authService.isValidAdvertiser()}
            />);
    }
}
