# generator-scaffold-harmony 

[![NPM version][npm-image]][npm-url]

Yeoman generator of Harmony DApp Scaffold.

Please note that this generator only works under POSIX compatible environments.

## Prepare Your Dev Environment

- Install Node.js(>=15) & npm(>=7): https://nodejs.org/en/download/
- Install Docker Engine & CLI Client: https://docs.docker.com/engine/
- Install Harmony One Wallet Chrome extension: https://chrome.google.com/webstore/detail/harmony-one-wallet/fnnegphlobjdpkhecapkijjdkgcjhkib

## Installation

First, install [Yeoman](http://yeoman.io) and generator-scaffold-harmony using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-scaffold-harmony
```

Then generate your new project:

```bash
mkdir my-harmony-dapp && cd my-harmony-dapp
yo scaffold-harmony
```

## Demo Videos

### Intro

https://youtu.be/RThMOFCN-0M

### Auto-reload

https://youtu.be/2iEv3VrNLjA

## Checklist

- [x] UI/UX React boilerplate code for DApp
  - [x] Simple UI with Home Page
  - Connection to as many popular wallets as possible
    - [x] OneWallet
    - [x] Mathwallet
  - [x] Simple interaction with demo contract
  - [x] Tests for UI/UX application
- Smart contract:
  - [x] Something simple but more than Hello World so that it can interact with UX/UI
  - [x] Tests
- Development environment (CLI):
  - [x] CLI command to create sandbox env for both contract (Ganache) and UX/UI (React) so that it can run on localhost.
  - [x] CLI command to deploy contract to testnet/mainnet.
  - [x] CLI command to run tests for both contract and UX/UI.
- README:
  - [x] Installation guide (any dependencies etc.)
  - [x] Basic usage on how to run and interact with template.
  - [x] Document CLI.
  - [x] Provide extra resources and "kickstart" documentation links for developers.
  - [x] Document how to deploy React application (simplified). https://create-react-app.dev/docs/deployment/
- Nice-to-have
  - [x] Would be nice to use tool like cookiecutter to make template customizable with Author, App Name, Software Versions, Tags, Logos and other things that might be non-static.
  - [ ] Include CI workflow (probably easiest to use git workflow) to run test on push.

[npm-image]: https://badge.fury.io/js/generator-scaffold-harmony.svg
[npm-url]: https://npmjs.org/package/generator-scaffold-harmony
