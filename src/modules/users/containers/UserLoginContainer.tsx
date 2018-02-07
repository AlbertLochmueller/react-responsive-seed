import * as React from 'react';
import {Component} from 'react';
import {UserLogin} from '../components/UserLogin/UserLogin';
import {UserHttpService} from '../services/UserHttpService';
import {AuthService} from '../../auth/AuthService';
import {HISTORY_TOKEN, History} from '../../common/history';
import {Inject} from 'react.di';
import {IUserCredentials} from '../interfaces/IUserCredentials';

interface LoginContainerState {
    loading: boolean;
}

export class LoginContainer extends Component<{}, LoginContainerState> {

    @Inject(HISTORY_TOKEN) history: History;
    @Inject authService: AuthService;
    @Inject userHttpService: UserHttpService;

    constructor(props) {
        super(props);
        this.state = {loading: false};
    }

    async handleLogin({email, password}: IUserCredentials) {
        this.setState({loading: true});
        try {
            const {headers} = await this.userHttpService.getUserToken(email, password);
            this.authService.setToken(headers['access-token']);
            this.history.replace('/');
        } catch (e) {
            this.setState({loading: false});
        }
    }

    render() {
        return (<UserLogin onSubmit={e => this.handleLogin(e)} isLoading={this.state.loading}/>);
    }
}
