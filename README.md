# CryptoBot

Get crypto currency spot price from [Coinbase](https://www.coinbase.com).

## Run in Docker

From project directory.

```bash
$ docker-sync start

$ # Install vendors
$ docker-compose run node yarn 

$ # Set bot token
$ export CRYPTOBOT_TOKEN=<token>

$ # Run CryptoBot
$ docker-compose -p cryptobot up
```
