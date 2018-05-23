 // Make JS objects out of CMC API Data
 // https://coinmarketcap.com/api/

$(document).ready(function () {
  getCryptoData()
});

function attachCryptoListeners() {
}

function getCryptoData() {
  fetch('https://api.coinmarketcap.com/v2/listings/').then(function (resp) {
    return resp.json()
  }).then(function (myJson) {
    let coins = myJson["data"]
  })
}

// let coinId = 0;
// Should I use CMC's ID or rely on creating my own?

function Crypto(name, symbol, id) {
  this.name = name;
  this.symbol = symbol;
  this.id = id;

  // coinId++;
}

/*
Sample Response:
{
    "data": [
        {
            "id": 1,
            "name": "Bitcoin",
            "symbol": "BTC",
            "website_slug": "bitcoin"
        },
        {
            "id": 2,
            "name": "Litecoin",
            "symbol": "LTC",
            "website_slug": "litecoin"
        },
        ...
    },
    "metadata": {
        "timestamp": 1525137187,
        "num_cryptocurrencies": 1602,
        "error": null
    }
]
*/

// Alternatively, I can create and hit my own API endpoint displaying coin data, but I would not be actively managing this data. Perhaps, it's better to rely on a site like CoinMarketCap.
