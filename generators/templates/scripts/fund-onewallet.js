#!/usr/bin/env node
require('dotenv').config();
const {execSync} = require('child_process')

console.log(`Funding onewallet ${process.env.ONEWALLET_ADDRESS}`);
execSync(`npm run localnet:hmy -- transfer --amount 10 --from one1ax072u4nllu5z2f965dasqluwassy5kvjc36zr --from-shard 0 --to ${process.env.ONEWALLET_ADDRESS} --to-shard 0`, {stdio: 'inherit'});
