# Scaffold Harmony

## Prerequisites

- POSIX compatible system (Linux/OSX/WSL)
- Docker Community Version >= 20
- Node.js >= 12
- npm >= 7

## Environment Variables

You can change the following environment variables within `.env` file: 

- `LOCALNET_PRIVATE_KEY`: localnet deployer private key
- `TESTNET_PRIVATE_KEY`: testnet deployer private key
- `MAINNET_PRIVATE_KEY`: mainnet deployer private key

## Development Workflow (localnet)

1. Start harmony localnet container by either of the following options:
   - CLI: `npm run localnet:start`
   - GUI: https://github.com/harmony-one/harmony-one-ganache-support/releases
2. Fund your harmony one wallet with localnet faucet
   - `npm run localnet:faucet [your harmony wallet address]`
3. Deploy contracts to localnet & watch contract changes for re-deployment
   - `npm start`
4. Start react frontend
   - `npm run frontend:localnet`

## Localnet Commands

### Start Harmony Localnet

```shell
npm run localnet:start
```

### Stop Harmony Localnet

```shell
npm run localnet:stop
```

### Fund Your Harmony Wallet with Localnet Faucet

```shell
npm run localnet:faucet [your harmony wallet address]
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

### Build Testnet Frontend

```shell
npm run frontend:build:testnet
```

### Build Mainnet Frontend

```shell
npm run frontend:build:mainnet
```

## Appendix 

### Developer Resources

- HarmonyONE Developer Portal: https://docs.harmony.one/home/
- Localnet Ganache GUI: https://github.com/harmony-one/harmony-one-ganache-support
- Frontend Deployment Guide: https://create-react-app.dev/docs/deployment/

### Localnet Preset Accounts

**Notice: Do not use these accounts in production. This is for localnet testing only.**

| Address                                    | Private Key                                                      | Balance |
---------------------------------------------|------------------------------------------------------------------| ------- |
| one1v92y4v2x4q27vzydf8zq62zu9g0jl6z0lx2c8q | 144109d9b1182b51233955c112f64a545bb70143539f161e936bb01f8b1e081d | 100000  |
| one1ax072u4nllu5z2f965dasqluwassy5kvjc36zr | 59f46b7addacb231e75932d384c5c75d5e9a84920609b5d27a57922244efbf90 | 100     |
| one1ynkr6c3jc724htljta4hm9wvuxpgxyulf3mg2j | d8ee0370d50f5d32c50704f4a0d01f027ab048d9cdb2f137b7ae852d8590d63f | 100     |
| one18xl6vf4qpcf9lxn3e0j5694xcrv93jwl93j74u | ff356a09310ab648ace558574ca84777f21612f6652867776095a95919a47314 | 100     |
| one1rsup4xsrh9k6v6pjr2jmutpj8hnrcg22dxvgpt | ed6e49719b1d7c82f364bf843d3d17bb5fd7af8a773cdc18c710c2642566cefa | 100     |
| one1705zuq02my9xgrwce8a020yve9fgj83m56wxpq | 330032b37bdcd8d8f3d9aae0c8403dcbb24915362493e998f7e0b631f20d3f91 | 100     |
| one1u9fytdmjn24a8atfpltassunfq9jducedmxam2 | 4e856590fc9233cfc215e5bffe4efdb9611d8e2db78d38be24e02b469fddb5a5 | 100     |
| one1f6373nd4ymxgrszhz2mluakghgnhm7g8ltq2w8 | 4d00a5621249165d7fb76bac56cd01786b64a301fffba0137c5fa997c3069163 | 100     |
| one1nuy5t8qmz0ksklal9fa53urz3jc2yzwdp6xaks | 5b2984da0bb75e22208dc3baf8f5a1eb86099418c6b3516d132c70199ce67c65 | 100     |
| one1tlj2520ulz7as4ynyj7rhftlwd8wjfhpnxh8l6 | 86cc025e63f934f80e4377a022df3623abbdb5a5803089fe80ffb86dad76b864 | 100     |
| one12rzgrlwrquf97kc8ttx9udcsj4mw0d9an4c7a9 | 5709f12bc34677a96ed3f01898329eedb0d78a499159ad5a541cdce8c77a3de3 | 100     |

Source: https://github.com/harmony-one/harmony-one-ganache-support/blob/6f29063eacfaf7906f9a43c298fe2646323488ea/docker/Dockerfile#L5-L16
