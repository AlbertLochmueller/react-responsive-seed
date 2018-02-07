import * as React from 'react';
import {Component} from 'react';
import {
    Router,
    Route,
    Switch as RouterSwitch,
    Redirect
} from 'react-router-dom';
import {Nav} from '../Nav/Nav';
import {MuiThemeProvider} from 'material-ui/styles';
import './App.scss';
import {theme} from './ui-theme';
import {style} from 'typestyle';
import {Dimensions} from '../../modules/utils/interfaces/Dimensions';
import {AuthService} from '../../modules/auth/AuthService';
import {Inject, Module} from 'react.di';
import {HISTORY_TOKEN} from '../../modules/common/history';
import {LoginContainer} from '../../modules/users/containers/UserLoginContainer';
import {AuthModule} from '../../modules/auth/AuthModule';
import {CommonModule} from '../../modules/common/CommonModule';
import {HttpModule} from '../../modules/http/HttpModule';
import {UserModule} from '../../modules/users/UserModule';
import {RegisterContainer} from '../../modules/users/containers/UserRegisterContainer';
import {StartModule} from '../../modules/start/StartModule';
import {LOGIN_PATH, START_PATH} from '../Main/Main';
import {CampaignModule} from '../../modules/campaigns/CampaignModule';
import {ScrollToTop} from '../../modules/layout/components/ScrollToTop/ScrollToTop';

interface AppState {
    dimensions: Dimensions;
}

@Module({
    imports: [
        AuthModule,
        CommonModule,
        HttpModule,
        UserModule,
        StartModule,
        CampaignModule
    ],
    providers: []
})
export class App extends Component<{}, AppState> {
    @Inject(HISTORY_TOKEN) history: History;
    @Inject authService: AuthService;

    constructor(props) {
        super(props);

        this.state = {
            dimensions: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    }

    componentDidMount() {
        window.addEventListener("resize", () => this.updateDimensions());
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.updateDimensions());
    }


    updateDimensions() {
        this.setState({
            ...this.state,
            dimensions: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        })
    }

    render() {
        const {dimensions} = this.state;
        const appClasses = {
            root: style({
                backgroundColor: theme.palette.background.default,
                width: dimensions.width,
                height: dimensions.height,
            })};

        return (
            <MuiThemeProvider theme={theme}>
                <div className={appClasses.root}>
                    <Router history={this.history}>
                            <RouterSwitch>
                                <Route path={'/login'} render={() => <LoginContainer/>}/>
                                <Route path={'/register'} render={() => <RegisterContainer/>}/>
                                <Route path={'/'} render={() => {
                                    if (this.authService.getValidToken()) {
                                        return <Nav isLoggedIn={true}/>;
                                    }
                                    return <Nav isLoggedIn={false}/>;
                                }}/>
                                <Route render={() => <Redirect to={START_PATH}/>}/>
                            </RouterSwitch>
                    </Router>
                </div>
            </MuiThemeProvider>
        );
    }
}
