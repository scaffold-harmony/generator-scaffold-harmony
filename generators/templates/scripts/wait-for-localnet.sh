#!/usr/bin/env bash
echo 'Waiting for localnet initiailization...'
grep -q 'Initialization of localnet completed' <(docker logs -f harmony-localnet-ganache)
