import * as React from 'react';
import * as classNames from 'classnames';
import {Component} from "react";
import {IUserCredentials} from "../../interfaces/IUserCredentials";

interface IUserRegistrationState extends IUserCredentials {
  emailHasError: boolean;
  passwordHasError: boolean;
  passwordRepeat: string;
  passwordRepeatHasError: boolean;
}

export interface IUserRegistrationProps {
  errorMessage: string;
  isLoading: boolean;
  onSubmit(data: IUserCredentials);
}

export class UserRegistration extends Component<IUserRegistrationProps, IUserRegistrationState> {

  hasSubmitted = false;

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailHasError: false,
      password: '',
      passwordHasError: false,
      passwordRepeat: '',
      passwordRepeatHasError: false,
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

  handleSubmit(e) {
    e.preventDefault();

    if (this.validate()) {

      this.props.onSubmit(this.state);
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

    const {errorMessage, isLoading} = this.props;
    const {emailHasError, passwordHasError, passwordRepeatHasError} = this.state;

    // Show error when form is submitted and loading is done
    const registrationErrorMessage = this.hasSubmitted && !isLoading ? errorMessage : '';

    return (
      <div>
        <h3>Registration</h3>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className={classNames('form-group', {'has-error': !!emailHasError})}>
            <label className="form-label">Email</label>
            <input className="form-input"
                   type="text"
                   name="email"
                   onChange={e => this.handleInputChange(e)}
                   placeholder="Email"/>
            {emailHasError && (<p className="form-input-hint">{'Email is missing'}</p>)}
          </div>
          <div className={classNames('form-group', {'has-error': !!passwordHasError})}>
            <label className="form-label">Password</label>
            <input className="form-input"
                   type="password"
                   name="password"
                   onChange={e => this.handleInputChange(e)}
                   placeholder="Password"/>
            {passwordHasError && (<p className="form-input-hint">{'Password is missing'}</p>)}
          </div>
          <div className={classNames('form-group', {'has-error': !!passwordRepeatHasError})}>
            <label className="form-label">Repeat Password</label>
            <input className="form-input"
                   type="password"
                   name="passwordRepeat"
                   onChange={e => this.handleInputChange(e)}
                   placeholder="Repeat Password"/>
            {passwordRepeatHasError && (<p className="form-input-hint">{'Repeated password does not match'}</p>)}
          </div>
          <div className={classNames('form-group', {'has-error': !!registrationErrorMessage})}>
            <button className={classNames('btn', 'btn-primary', {loading: isLoading})}
                    disabled={isLoading}
                    type="submit">Register
            </button>
            {registrationErrorMessage && (<p className="form-input-hint">{registrationErrorMessage}</p>)}
          </div>
        </form>
      </div>
    );
  }
}
