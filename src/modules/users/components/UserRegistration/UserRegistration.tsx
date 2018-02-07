import * as React from 'react';
import {Component} from 'react';
import * as classNames from 'classnames';
import {IUserCredentials} from '../../interfaces/IUserCredentials';
import Card from 'material-ui/Card';
import './UserRegistration.scss';
import Button from 'material-ui/Button';
import Tabs, {Tab} from 'material-ui/Tabs';
import {Role} from '../../enums/Role';
import {style} from 'typestyle';
import {theme} from '../../../../components/App/ui-theme';

interface IUserRegistrationState extends IUserCredentials {
    emailHasError: boolean;
    passwordHasError: boolean;
    passwordRepeat: string;
    passwordRepeatHasError: boolean;
    categoryIndex: number;
}

export interface IUserRegistrationProps {
    isLoading: boolean;
    startIndex: number;
    onSubmit(data: {credentials: IUserCredentials, role: Role});
}



const registrationClasses = {
    button: style({
        textTransform: 'none' as any,
        marginTop: 25,
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
};



export class UserRegistration extends Component<IUserRegistrationProps, IUserRegistrationState> {

    hasSubmitted = false;

    constructor(props) {
        super(props);

        this.state = {
            emailHasError: false,
            passwordRepeat: '',
            passwordRepeatHasError: false,
            passwordHasError: false,
            email: '',
            password: '',
            categoryIndex: this.props.startIndex,
        };
    }

    handleCategorySwitch(event, value) {
        this.setState({
            categoryIndex: value
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.validate(name));
    }

    handleSubmit(e) {
        e.preventDefault();
        const {categoryIndex} = this.state;
        const role = (categoryIndex==0 ? Role.advertiser : Role.provider);

        if (this.validate()) {
            this.props.onSubmit({credentials: {email: this.state.email, password: this.state.password}, role});
            this.hasSubmitted = true;
        }
    }

    validate(field?: string) {

        const isPasswordRepeatValid = this.state.password === this.state.passwordRepeat;
        const isPasswordValid = !!this.state.password;
        const isEmailValid = !!this.state.email;

        if (!field || field === 'passwordRepeat') {
            this.setState({passwordRepeatHasError: !isPasswordRepeatValid});
        }
        if (!field || field === 'password') {
            this.setState({passwordHasError: !isPasswordValid});
        }
        if (!field || field === 'email') {
            this.setState({emailHasError: !isEmailValid});
        }

        return isPasswordValid && isEmailValid && isPasswordRepeatValid;
    }

    render() {

        const {isLoading} = this.props;
        const {emailHasError, passwordHasError, passwordRepeatHasError, categoryIndex} = this.state;

        return (
            <div className="fr-main-sign-up">
                <Card className="fr-card">
                    <div className="fr-logo">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Circle-icons-profle.svg/2000px-Circle-icons-profle.svg.png"/>
                    </div>
                    <div className="fr-heading">
                        <h3 className="fr-heading-text">Account Anlegen</h3>
                    </div>

                    <Tabs className="fr-tabs"
                          value={categoryIndex}
                          onChange={(event, value) => this.handleCategorySwitch(event, value)}
                          indicatorColor="primary"
                          textColor="primary"
                          centered
                    >
                        <Tab className="fr-tab" label="Werbender"/>
                        <Tab className="fr-tab" label="Anbieter"/>
                    </Tabs>

                    <form className="fr-sign-up-form" onSubmit={e => this.handleSubmit(e)}>
                        <div className={classNames('form-group', {'has-error': !!emailHasError})}>
                            <label className="form-label">Email</label>
                            <input className={classNames(registrationClasses.input, "form-input")}
                                   type="text"
                                   name="email"
                                   onChange={e => this.handleInputChange(e)}
                                   placeholder="Email"/>
                            {emailHasError && (<p className="form-input-hint">{'Bitte Email angeben'}</p>)}
                        </div>
                        <div className={classNames('form-group', {'has-error': !!passwordHasError})}>
                            <label className="form-label">Passwort</label>
                            <input className={classNames(registrationClasses.input, "form-input")}
                                   type="password"
                                   name="password"
                                   onChange={e => this.handleInputChange(e)}
                                   placeholder="Passwort"/>
                            {passwordHasError && (<p className="form-input-hint">{'Bitte Passwort angeben'}</p>)}
                        </div>
                        <div className={classNames('form-group', {'has-error': !!passwordRepeatHasError})}>
                            <label className="form-label">Passwort Wiederholen</label>
                            <input className={classNames(registrationClasses.input, "form-input")}
                                   type="password"
                                   name="passwordRepeat"
                                   onChange={e => this.handleInputChange(e)}
                                   placeholder="Passwort Wiederholen"/>
                            {passwordRepeatHasError && (
                                <p className="form-input-hint">{'Passwörter stimmen nicht überein'}</p>)}
                        </div>
                        <div className="form-group">
                            <Button className={registrationClasses.button} raised color="primary"
                                    disabled={isLoading}
                                    type="submit">Registrieren
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        );
    }
}
