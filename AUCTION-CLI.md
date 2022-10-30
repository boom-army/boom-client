ts-node src/cli.ts createAuction \
-k ~/SitesC/g1.json \
-v v2 \
-e mainnet-beta \
-tam 9dhiZJo3RzxUvRLMSF6JNXuaS1AVWrqeBUrn1Kjhbpn9 \
-tm boomh1LQnwDnHtKxWTFgxcbdRjPypRSjdwxkAEJkFSH \
-sb 1000000000 \
-st 1666916701 \
-ts 1000000000 \
-sc G1p59D3CScwE9r31RNFsGm3q5xZapt6EXHmtHV7Jq5AS \
-bp 172800 \
-ep 300 \
-ei 300

CandyShop constructor: init CandyShop= CandyShop {
  _candyShopAddress: PublicKey {
    _bn: <BN: dd4f8a5b2f46788dfd3c50c9526affdc6973d8cb6d47727afa9b2f62884e8f01>
  },
  _candyShopCreatorAddress: PublicKey {
    _bn: <BN: df1487178add630f30aaae03673555436e8d27bd0cff8480b15476aeb4ade003>
  },
  _treasuryMint: PublicKey {
    _bn: <BN: 8eaabf1eeffc8636b8a4b20bdce28fc06fe3049e23d31f7e5584656a1e3385a>
  },
  _programId: PublicKey {
    _bn: <BN: 93088802b0d93326f5a932fb628f820c55459032fd44073fb2c1e9344f3c8e3>
  },
  _env: 'mainnet-beta',
  _isEnterprise: false,
  _version: 1,
  _settings: {
    currencySymbol: 'SOL',
    currencyDecimals: 9,
    priceDecimals: 3,
    priceDecimalsMin: 0,
    volumeDecimals: 1,
    volumeDecimalsMin: 0,
    mainnetConnectionUrl: 'https://api.mainnet-beta.solana.com',
    connectionConfig: undefined,
    explorerLink: 'SolanaFM'
  },
  _baseUnitsPerCurrency: 1000000000
}
CandyShop: Performing create auction {
  tokenMint: '9dhiZJo3RzxUvRLMSF6JNXuaS1AVWrqeBUrn1Kjhbpn9',
  tokenAccount: '5iS7JobamFNPdLo1ELTYtnG8zbRJVT1Py7jC6kamjEc9',
  startingBid: '1000000000',
  startTime: '1666916701',
  biddingPeriod: '172800',
  buyNowPrice: null
}
status {
  confirmationStatus: 'confirmed',
  confirmations: 2,
  err: null,
  slot: 157801248,
  status: { Ok: null }
}
txid 3TSYTostCkmGpMWRbmcx3LqgU18PdGpott4GwB6XU9uEtYWAb119R6mfaWWddbFMkQ9DiEjXy13Sa7StS51g2sNg parsedStatus confirmed
REST confirmation for 3TSYTostCkmGpMWRbmcx3LqgU18PdGpott4GwB6XU9uEtYWAb119R6mfaWWddbFMkQ9DiEjXy13Sa7StS51g2sNg
status confirmed
Auction created with txId == 3TSYTostCkmGpMWRbmcx3LqgU18PdGpott4GwB6XU9uEtYWAb119R6mfaWWddbFMkQ9DiEjXy13Sa7StS51g2sNg
txHash 3TSYTostCkmGpMWRbmcx3LqgU18PdGpott4GwB6XU9uEtYWAb119R6mfaWWddbFMkQ9DiEjXy13Sa7StS51g2sNg

Options:
  -e, --env <string>                   Solana cluster env name (default: "devnet")
  -r, --rpc-url <string>               (optional) Solana mainnet RPC url
  -ie, --is-enterprise-arg             (optional) Indiicates whether shop is
                                       enterprise or not
  -k, --keypair <path>                 path to Solana wallet keypair
  -v, --version <v1 | v2>              version of the program
  -tam, --token-account-mint <string>  NFT token mint address
  -tm, --treasury-mint <string>        Candy Shop treasury mint
  -sb, --starting-bid <string>         Starting Bid, in the unit of treasury mint
  -st, --start-time <string>           Start Time, unix timestamp
  -ts, --tick-size <string>            Tick Size
  -sc, --shop-creator <string>         Candy Shop creator address
  -bp, --bidding-period <string>       Bidding Period in seconds
  -bnp, --buy-now-price <string>       Buy now price, in the unit of treasury mint,
                                       nullable
  -ep, --extension-period <string>     Extension period, in seconds, optional
  -ei, --extension-increment <string>  Extension increment, in seconds, optional
  -h, --help                           display help for command