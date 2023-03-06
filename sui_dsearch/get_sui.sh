curl --location --request POST 'https://faucet.devnet.sui.io/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "0x347feceb634bca3522112b0ea1eeb6bd6cc2163a"
    }
}'