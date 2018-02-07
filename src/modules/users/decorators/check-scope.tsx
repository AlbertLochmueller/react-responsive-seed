import * as React from 'react';
import {Component, connect} from "react-redux";
import {hasScopes} from "../services/scope-service";

// tslint:disable
interface ScopeCheckedComponent<TOwnProps> {
  <T extends Component<TOwnProps>>(component: T): T;
}

/**
 * Wraps specified component, connects it with state to check if logged-in user
 * does have specified scope prefix to be authorized, to read and write target component
 */
export function checkScopePrefix<TOwnProps>(scopePrefix: string): ScopeCheckedComponent<TOwnProps> {
  return (TargetComponent: any) => {
    return connect<any, any, any>(state => ({userAuth: state.userAuth}))(
      (props) => {

        const {user} = props.userAuth;
        const targetProps = {...props};

        if (user && user.scopes) {

          let canRead = false;
          let canWrite = false;

          user.scopes.forEach(scope => {

            // Split scope prefix and type (e.g. "user:write" to ['user', 'write'])
            const [prefix, type] = scope.split(':');

            if (prefix === scopePrefix) {
              if (type === 'read') canRead = true;
              if (type === 'write') canWrite = true;
            }
          });

          if (canRead) {

            if (canWrite) targetProps.editable = true;

            return (<TargetComponent {...targetProps} />);
          }
        }

        return (<div>{/* Scope-restricted component */}</div>);
      });
  };
}

/**
 * Wraps specified component, connects it with state to check if logged-in user
 * does have specified scope see component
 */
export function checkScope<TOwnProps>(...scopes: string[]): ScopeCheckedComponent<TOwnProps>;
export function checkScope<TOwnProps>(...scopesLists: string[][]): ScopeCheckedComponent<TOwnProps>;
export function checkScope<TOwnProps>(...scopes: Array<string | string[]>): ScopeCheckedComponent<TOwnProps> {
  return (TargetComponent: any) => {
    return connect<any, any, any>(state => ({userAuth: state.userAuth}))(
      (props) => {
        const {user} = props.userAuth;
        const targetProps = {...props};

        if (user && hasScopes(user.scopes, ...scopes as any)) {

          return (<TargetComponent {...targetProps} />);
        }

        return (<div>{/* Scope-restricted component */}</div>);
      });
  };
}
