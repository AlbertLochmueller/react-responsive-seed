import * as React from 'react';
import {Component} from 'react';
import {UserHttpService} from '../services/UserHttpService';
import {AuthService} from '../../auth/AuthService';
import {HISTORY_TOKEN, History} from '../../common/history';
import {Inject} from 'react.di';
import {IUserCredentials} from '../interfaces/IUserCredentials';
import {UserRegistration} from '../components/UserRegistration/UserRegistration';
import {Role} from '../enums/Role';
import {parse} from 'query-string';

interface RegisterContainerState {
    loading: boolean;
    advertiser: boolean;
}

export class RegisterContainer extends Component<{}, RegisterContainerState> {

    @Inject(HISTORY_TOKEN) history: History;
    @Inject authService: AuthService;
    @Inject userHttpService: UserHttpService;

    constructor(props) {
        super(props);

        const queryParams = parse(location.search, {arrayFormat: 'bracket'});
        const isAdvertiser = 'advertiser' in queryParams;

        this.state = {
            loading: false,
            advertiser: isAdvertiser
        };
    }

    async handleRegister(userData: { credentials: IUserCredentials, role: Role }) {
        this.setState({loading: true});
        try {
            const {data} = await this.userHttpService.createUser(userData);
            // TODO Validate Data
            this.handleLogin(userData.credentials);
        } catch (e) {
            this.setState({loading: false});
        }
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
        const {advertiser} = this.state;

        return (
            <UserRegistration
            onSubmit={e => this.handleRegister(e)}
            isLoading={this.state.loading}
            startIndex={advertiser ? 0 : 1}
            />);
    }
}
