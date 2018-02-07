import * as React from 'react';
import {Component} from "react";
import {connect} from "react-redux";
import {IUserAuthState} from "../reducers/user-auth";
import {RouteComponentProps} from "react-router";

interface IAuthenticatedRouteProps extends RouteComponentProps<any> {
  userAuth: IUserAuthState;
}

export function checkAuthentication(TargetComponent: any) {
  return connect<any, any, any>(state => ({userAuth: state.userAuth}))(
    class AuthenticatedRoute extends Component<IAuthenticatedRouteProps, any> {

      componentWillMount() {
        const {history, userAuth} = this.props;
        if (!userAuth.user) {

          history.replace(`/login`, {targetPath: history.location.pathname});
        }
      }

      render() {
        return (
          <TargetComponent {...this.props} />
        );
      }

    });
}
