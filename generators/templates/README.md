# Scaffold Harmony

## Prerequisites

- POSIX compatible system (Linux/OSX/WSL)
- Docker Community Version >= 20
- Node.js >= 15
- npm >= 7

## Account Setup

- Localnet deployer
  - address: `one1ax072u4nllu5z2f965dasqluwassy5kvjc36zr`
  - private key: `0x59f46b7addacb231e75932d384c5c75d5e9a84920609b5d27a57922244efbf90`

## Environment Variables

You can change the following environment variables within `.env` file: 

- `LOCALNET_PRIVATE_KEY`: localnet deployer private key
- `TESTNET_PRIVATE_KEY`: testnet deployer private key
- `MAINNET_PRIVATE_KEY`: mainnet deployer private key
- `ONEWALLET_ADDRESS`: address of your Harmony One Wallet Chrome extension

## Development Workflow (localnet)

1. start harmony localnet container by either of the following options:
   - CLI: `npm run localnet:start`
   - GUI: https://github.com/harmony-one/harmony-one-ganache-support/releases
2. deploy contracts to localnet & watch contract changes for re-deployment
   - `npm start`
3. start react frontend
   - `npm frontend:localnet`

Please note if you started the localnet through GUI then you will have to manually fund your OneWallet by running `scripts/fund-onewallet.js` for transaction fees.

## Localnet Commands

### Start Harmony Localnet

```shell
npm run localnet:start
```

### Stop Harmony Localnet

```shell
npm run localnet:stop
```

### Harmony Localnet hmy CLI Tool

```shell
npm run localnet:hmy -- balances one1ax072u4nllu5z2f965dasqluwassy5kvjc36zr
```

## Contract Deployment Commands

### Localnet Deployment & Watch Changes for Re-deployment

```shell
npm start
```

### Testnet Deployment

```shell
npm run deploy:testnet
```

or to force re-deploy 

```shell
npm run reset:testnet
```

### Mainnet Deployment

```shell
npm run deploy:mainnet
```

or to force re-deploy

```shell
npm run reset:mainnet
```

## Frontend Commands

### Start Localnet Frontend

```shell
npm run frontend:localnet
```

### Start Testnet Frontend

```shell
npm run frontend:testnet
```

### Start Mainnet Frontend

```shell
npm run frontend:mainnet
```

## Resources

- HarmonyONE Developer Portal: https://docs.harmony.one/home/
- Localnet Ganache GUI: https://github.com/harmony-one/harmony-one-ganache-support
- Frontend Deployment Guide: https://create-react-app.dev/docs/deployment/
