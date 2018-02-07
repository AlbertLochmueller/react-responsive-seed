import * as React from 'react';
import * as classNames from 'classnames';
import {Component} from "react";
import {IUser} from "../../interfaces/IUser";
import {UserScopeEditContainer} from "../../containers/UserScopeEditContainer";
import {UserCompanyEditContainer} from "../../containers/UserCompanyEditContainer";

export interface IUserEditState {
  user: IUser;
}

export interface IUserEditProps {
  user: IUser;
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  headerText?: string;
  buttonText?: string;

  onOpenRegURL?(user: IUser);
  onSave(user: IUser);
}

export class UserEdit extends Component<IUserEditProps, IUserEditState> {

  constructor(props) {
    super(props);

    const scopes = this.props.user.scopes || [];

    this.state = {
      user: {...this.props.user, scopes: [...scopes]}
    };
  }

  handleSelectedScope(scopes: string[]) {
    const {user} = this.state;

    this.setState({user: {...user, scopes}});
  }

  handleSubmit(e) {
    e.preventDefault();

    const {onSave} = this.props;

    onSave(this.state.user as IUser);
  }

  handleOpenURL() {
    const {onOpenRegURL} = this.props;

    if (onOpenRegURL) {

      onOpenRegURL(this.state.user as IUser);
    }
  }

  render() {
    const {user} = this.state;
    const {
      id,
      email,
      registrationDate,
      registrationCode,
      registrationCodeExpiresAt,
      languageCode,
      scopes
    } = user;
    const {
      headerText,
      buttonText,
      isLoading,
      errorMessage,
      successMessage,
    } = this.props;

    return (
      <div>
        <h3>{headerText || 'User'}</h3>
        <form onSubmit={e => this.handleSubmit(e)}>
          {id &&
          (<div className="form-group">
            <label className="form-label">Id</label>
            <input className="form-input"
                   type="text"
                   placeholder="Id"
                   disabled
                   defaultValue={id as any}/>
          </div>)}
          {email &&
          (<div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input"
                   type="text"
                   placeholder="Email"
                   disabled
                   defaultValue={email}/>
          </div>)}
          {registrationDate &&
          (<div className="form-group">
            <label className="form-label">RegistratonDate</label>
            <input className="form-input"
                   type="text"
                   placeholder="RegistratonDate"
                   disabled
                   defaultValue={registrationDate}/>
          </div>)}
          {registrationCode &&
          (<div className="form-group">
            <label className="form-label">RegistratonCode</label>
            <div className="input-group">
              <input className="form-input"
                     type="text"
                     placeholder="RegistratonCode"
                     disabled
                     defaultValue={registrationCode}/>
              <button type="button"
                      className="btn btn-primary input-group-btn"
                      onClick={() => this.handleOpenURL()}>Open Registration URL
              </button>
            </div>
          </div>)}
          {registrationCodeExpiresAt &&
          (<div className="form-group">
            <label className="form-label">RegistratonCodeExpiresAt</label>
            <input className="form-input"
                   type="text"
                   placeholder="RegistratonCodeExpiresAt"
                   disabled
                   defaultValue={registrationCodeExpiresAt}/>
          </div>)}
          {languageCode &&
          (<div className="form-group">
            <label className="form-label">LanguageCode</label>
            <input className="form-input"
                   type="text"
                   placeholder="LanguageCode"
                   disabled
                   defaultValue={languageCode}/>
          </div>)}

          <UserScopeEditContainer onScopeSelected={_scopes => this.handleSelectedScope(_scopes)}
                                  selectedScopes={scopes}/>
          <div className={classNames('form-group', {
            'has-error': !!errorMessage,
            'has-success': !!successMessage,
          })}>
            <button className={classNames('btn', 'btn-primary', {loading: isLoading})}
                    type="submit"
                    disabled={isLoading}>{buttonText || 'Save'}
            </button>
            {errorMessage && (<p className="form-input-hint">{errorMessage}</p>)}
            {successMessage && (<p className="form-input-hint">{successMessage}</p>)}
          </div>
        </form>

        {user.id && (
          <div>
            <div className="divider"></div>
            <UserCompanyEditContainer user={user}/>
          </div>
        )}
      </div>
    );
  }
}
