import * as React from 'react';
import {Component} from 'react';
import * as classNames from 'classnames';
import {IUserCredentials} from '../../interfaces/IUserCredentials';
import Card from 'material-ui/Card';
import {Link} from 'react-router-dom';
import './UserLogin.scss';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import {Home as HomeIcon} from 'material-ui-icons';
import Divider from 'material-ui/Divider';
import {style} from 'typestyle';
import {theme} from '../../../../components/App/ui-theme';

interface IUserLoginState extends IUserCredentials {
    emailHasError: boolean;
    passwordHasError: boolean;
    rememberMe: boolean;
}

export interface IUserLoginProps {
    isLoading: boolean;
    onSubmit(data: IUserCredentials);
}

const loginClasses = {
    frMainSignIn: style({
        backgroundColor: theme.palette.background.default,
        position: 'absolute' as 'absolute',
        left: 0,
        right: 0,
        top: 0,
        margin: '100px auto',
        display: 'block' as 'block',
    }),
    frMainGoHome: style({
        backgroundColor: theme.palette.background.default,
        position: 'absolute' as 'absolute',
        margin: 'auto',
        display: 'block' as 'block',
        left: 0,
        right: 0,
        bottom: 0,
    }),
    home: style({
        position: 'relative' as any,
        margin: 'auto' as any,
        width: 50,
        paddingBottom: 10,
        display: 'block' as any,
    }),
    menuButton: style({
        marginLeft: 0,
        marginRight: 0,
        color: theme.palette.secondary.A400,
    }),
    button: style({
        textTransform: 'none' as any,
        width: '100%',
        background: 'linear-gradient(45deg, #1f877d 30%, #26A69A 90%)',
        $nest: {
            '&:hover': {
                background: 'linear-gradient(45deg, #1c7c73 30%, #239b90 90%)',
            }
        }
    }),
    input: style({
        $nest: {
            '&:focus': {
                borderColor: theme.palette.primary.A400
            }
        }
    }),
    typography: style({
        color: theme.palette.secondary.A400,
        transition: 'color 0.25s linear',
        $nest: {
            '&:hover': {
                color: theme.palette.primary.A400
            }
        }
    }),
};

export class UserLogin extends Component<IUserLoginProps, IUserLoginState> {

    hasSubmitted = false;

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailHasError: false,
            password: '',
            passwordHasError: false,
            rememberMe: false,
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.validate(name));
    }

    handleRememberMe() {
        const {rememberMe} = this.state;
        this.setState({rememberMe: !rememberMe});
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validate()) {

            this.props.onSubmit(this.state);
            this.hasSubmitted = true;
        }
    }

    validate(field?: string) {

        const isPasswordValid = !!this.state.password;
        const isEmailValid = !!this.state.email;

        if (!field || field === 'password') this.setState({passwordHasError: !isPasswordValid});
        if (!field || field === 'email') this.setState({emailHasError: !isEmailValid});

        return isPasswordValid && isEmailValid;
    }

    render() {

        const {isLoading} = this.props;
        const {emailHasError, passwordHasError} = this.state;

        return (
            <div>
                <div className={loginClasses.frMainSignIn}>
                    <Card className="fr-card">
                        <div className="fr-logo">
                            <img src="http://www.gptrc.org/admin/images/login_lock.png"/>
                        </div>
                        <div className="fr-heading">
                            <h3 className="fr-heading-text">Anmelden</h3>
                        </div>

                        <form className="fr-sign-in-form" onSubmit={e => this.handleSubmit(e)}>
                            <div className={classNames('form-group', {'has-error': !!emailHasError})}>
                                <label className="form-label">Email</label>
                                <input className={classNames(loginClasses.input, "form-input")}
                                       type="text"
                                       name="email"
                                       onChange={e => this.handleInputChange(e)}
                                       placeholder="Email"/>
                                {emailHasError && (<p className="form-input-hint">{'Bitte Email angeben'}</p>)}
                            </div>
                            <div className={classNames('form-group', {'has-error': !!passwordHasError})}>
                                <label className="form-label">Passwort</label>
                                <input className={classNames(loginClasses.input, "form-input")}
                                       type="password"
                                       name="password"
                                       onChange={e => this.handleInputChange(e)}
                                       placeholder="Password"/>
                                {passwordHasError && (<p className="form-input-hint">{'Bitte Passwort angeben'}</p>)}
                            </div>
                            <div className="fr-login-utils">
                                {/*<Checkbox className="fr-remember-me" checked={rememberMe} onChange={() => this.handleRememberMe()} color="primary"/>*/}
                                <div className="fr-having-trouble"><a>Passwort vergessen?</a></div>
                            </div>
                            <div className="form-group">
                                <Button className={loginClasses.button}
                                        raised color="primary"
                                        disabled={isLoading}
                                        type="submit">
                                    Einloggen
                                </Button>
                                <Divider className="fr-divider"/>

                                <div className="fr-sign-up">...oder <Link to="/register">Registrieren</Link></div>
                            </div>
                        </form>
                    </Card>
                </div>

                <div className={loginClasses.frMainGoHome}>
                    <div className={loginClasses.home}>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to="/">
                            <IconButton
                                aria-label="Zur Homepage zurückkehren"
                                className={classNames(loginClasses.menuButton, loginClasses.typography)}
                            ><HomeIcon/>
                            </IconButton>
                            {/*<Typography className={loginClasses.typography} type="subheading" noWrap={true}>*/}
                            {/*Weiter ohne Login*/}
                            {/*</Typography>*/}
                        </Link>
                    </div>
                </div>
            </div>

        );
    }
}
