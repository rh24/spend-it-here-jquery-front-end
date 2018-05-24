 // Make JS objects out of CMC API Data
 // https://coinmarketcap.com/api/

$(document).ready(function () {
  // attachCryptoListeners();
  getCryptoData();
});

function attachCryptoListeners() {
  /*
  $('#filter').on('input', function (e) {
  e.preventDefault();
  getCryptoData();
  }
  */

  getCryptoData();
}

// https://api.coinmarketcap.com/v2/ticker/ for a more extensive list of data attributes
function getCryptoData() {
  fetch('https://api.coinmarketcap.com/v2/listings/').then(function (resp) {
    return resp.json();
  }).then(function (myJson) {
    let cryptos = myJson["data"];
    console.log(cryptos)
    // return cryptos;
    // makeCryptoObjects(cryptos);
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

function makeCryptoObjects(cryptos) {
  debugger;
  // .filter
  let crypto = new Crypto()
}

/*
In the future instead of deleting db items, maybe I can try to make a PATCH request via AJAX...

function addSymbolsToDatabase() {
  $.ajax({
    method: 'PATCH'
  })
}
*/
