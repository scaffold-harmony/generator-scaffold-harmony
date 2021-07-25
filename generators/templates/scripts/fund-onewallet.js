#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const {execSync} = require('child_process')

yargs(hideBin(process.argv))
  .command('fund [address]', 'fund ONE wallet from faucet account', (yargs) => {
    return yargs
      .positional('address', {
        describe: 'ONE address fund',
      })
  }, (argv) => {
    const amount = argv.amount || 10;
    const address = argv.address;
    console.log(`Funding onewallet ${argv.address}`);
    execSync(`npm run localnet:hmy -- transfer --amount ${amount} --from one1v92y4v2x4q27vzydf8zq62zu9g0jl6z0lx2c8q --from-shard 0 --to ${address} --to-shard 0`, {stdio: 'inherit'});
  })
  .option('amount', {
    alias: 'n',
    type: 'number',
    description: 'Fund with specific amount of ONE',
  })
  .argv;

