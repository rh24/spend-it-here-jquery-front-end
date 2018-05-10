 // Make JS objects out of CMC API Data
 // https://coinmarketcap.com/api/

 function getCoinData() {
   $.get('https://api.coinmarketcap.com/v2/listings/', function (resp) {
     let coins = resp["data"]
     for (let coinData of coins) {
       for (let data in object) {
         coin = new Coin()
       }
     }
   })
 }

 function Coin(name, symbol, id) {
   
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
