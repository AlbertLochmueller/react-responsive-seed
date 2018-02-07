import * as React from 'react';
import {Component} from 'react';
import {
    Router,
    Route,
    Switch as RouterSwitch,
    Redirect
} from 'react-router-dom';
import {MuiThemeProvider} from 'material-ui/styles';
import './App.scss';
import {theme} from './ui-theme';
import {style} from 'typestyle';
import {Dimensions} from '../../modules/utils/interfaces/Dimensions';
import {Inject, Module} from 'react.di';
import {HISTORY_TOKEN} from '../../modules/common/history';
import {CommonModule} from '../../modules/common/CommonModule';
import {TodosContainer} from "../../modules/todos/containers/TodosContainer";

interface AppState {
    dimensions: Dimensions;
}

@Module({
    imports: [
        CommonModule,
    ],
    providers: []
})
export class App extends Component<{}, AppState> {
    @Inject(HISTORY_TOKEN) history: History;

    constructor(props) {
        super(props);

        this.state = {
            dimensions: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
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
        });
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
                                <Route exact path={'/'} component={TodosContainer}/>
                            </RouterSwitch>
                    </Router>
                </div>
            </MuiThemeProvider>
        );
    }
}
