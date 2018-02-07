# fastreach ui
This project is a campaign exchange portal based upon an application skeleton for a modern web app
which is realised using [typescript](http://www.typescriptlang.org/) with [react v16](https://github.com/facebook/react/releases).

The project follows facebooks ["thinking in react"](https://reactjs.org/docs/thinking-in-react.html)
guidelines and is preconfigured to install the react framework and a bunch of development and testing
tools for instant web development gratification.

For styling, a react component implementation of google's [Material Design](https://material.io/) is used
to build the user interface as clean and understanding as possible.
Currently the beta version of [material-ui](https://material-ui-next.com/) is used

## Installation

### Requirements
[node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/) 
(npm comes with node.js) and [yarn](https://yarnpkg.com/en/docs/install) 
are required

### Dependencies
````shell
yarn install / npm install
````

## Build tool
[fuse-box](http://fuse-box.org/) is used for all build processes 
(automatically installed with `yarn install`). 
fuse-box can be configured in `fuse.ts`

## Development server
Run development server with

````shell
npm run start
````
For production environment:

````shell
npm run prod
````

Optionally the Port on which the server listens can be provided,
by setting PORT=<port> before. If not provided,
the application uses the configured fallback port, which can be adapted in the package (Default Port 4444)

Example:

````shell
PORT=1337 npm run start
````

## Testing
Run tests with

````shell
npm test
````

Test configurations can be found in `/test` directory. Unit tests are realized with [Enzyme](http://airbnb.io/enzyme/),
End-To-End tests are written with [Cypress](https://www.cypress.io/)

### Code coverage
Run test with code coverage with

````shell
npm run cover
````

Code coverage requirements can be defined in `package.json` under `nyc`.

### Linting
For linting code,  tslint is used and can be configured in `tslint.json`.

## Deployment & build
Build final bundle with
````shell
npm run build
````
