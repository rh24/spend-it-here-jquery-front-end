 // Make JS objects out of CMC API Data
 // https://coinmarketcap.com/api/
 
 function getCoinData() {
   $.get('https://api.coinmarketcap.com/v2/listings/', function () {

   })
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
