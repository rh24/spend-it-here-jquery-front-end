 // Make JS objects out of CMC API Data
 // https://coinmarketcap.com/api/

$(document).ready(function () {
  getCryptoData()
});

function attachCryptoListeners() {
}

function getCryptoData() {
  let cryptoJson = $.ajax({
    url: 'https://api.coinmarketcap.com/v2/listings/',
    method: 'GET',
    success: () => alert("hooray!")
  })
  // .then(function (resp) {
  //   let coins = resp["data"]
  //   debugger;
  //   for (let coinData of coins) {
  //     coin = new Crypto(coinData["name"], coinData["symbol"], coinData["id"])
  //     // $.post('/coins', {}, function (coin) {
  //     //   // post to data-list /api?
  //     // })
  //     debugger;
  //   }
  // });
  return cryptoJson;
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
