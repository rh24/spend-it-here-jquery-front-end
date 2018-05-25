$(document).ready(function () {
  let cryptoData = getCryptoData();
  // attachBusinessListeners();
  // I couldn't find an elegant way to execute these functions.
  // Should I be doing this with closures?
})

function getCryptoData() {
  let cryptos;
  fetch('https://api.coinmarketcap.com/v2/ticker/')
  .then(resp => resp.json())
  .then(myJson => cryptos = myJson["data"])
  .then((cryptos) => attachBusinessListeners(cryptos));
}
  /*
  In the above function, cryptos is a nested object:

  {
    "1": {
      "id": 1,
      "name": "Bitcoin",
      "symbol": "BTC",
      "website_slug": "bitcoin",
      "rank": 1,
      "circulating_supply": 17052475.0,
      "total_supply": 17052475.0,
      "max_supply": 21000000.0,
      "quotes": {
        "USD": {
          "price": 7568.0,
          "volume_24h": 6192760000.0,
          "market_cap": 129053130800.0,
          "percent_change_1h": -0.45,
          "percent_change_24h": -0.48,
          "percent_change_7d": -7.61
        }
      },
      "last_updated": 1527193773
    },
    "2": {
      "id": 2,
      "name": "Litecoin",
      "symbol": "LTC",
      "website_slug": "litecoin",
      "rank": 6,
      "circulating_supply": 56680048.0,
      "total_supply": 56680048.0,
      "max_supply": 84000000.0,
      "quotes": {
        "USD": {
          "price": 123.102,
          "volume_24h": 356512000.0,
          "market_cap": 6977427281.0,
          "percent_change_1h": -0.55,
          "percent_change_24h": 1.9,
          "percent_change_7d": -8.88
        }
      },
      "last_updated": 1527193741
    }
    ...
  }
  */

// let cryptoData = (function () {
//   let cryptos;
//   fetch('https://api.coinmarketcap.com/v2/ticker/')
//   .then(resp => resp.json())
//   .then(myJson => cryptos = myJson["data"])
//   // .then(() => console.log(cryptos))
// });

// debugger;
function Business(id, name, priceRange, description, discountOffered, location, category, cryptos) {

}

function attachBusinessListeners(cryptos) {
  $('#filter').on('submit', function (e) {
    e.preventDefault;
    let searchItem = $('#selected-coin').val().toLowerCase();
    getBusinesses(cryptos, searchItem)
    // it's passed in!;
  })

/* I want to figure out how to execute the search after the user stops
  (function () {
    let timer = null;
    let searchItem = $('#selected-coin').val();

    $('#selected-coin').on('keyup', function (e) {
      timer = setTimeout(getBusinesses(cryptos, searchItem), 1000);
    });

    $('#selected-coin').on('keydown', function(e) {
      clearTimeout(timer);
    })
  })
*/

  $('.see-reviews').on('click', function (e) {
    e.preventDefault();
    let businessId = $(this).data('id')
    renderReviews(businessId);
  })
}

function renderReviews(businessId) {
  let reviewCount = [];
  fetch(`/businesses/${businessId}/reviews.json`).then(function (resp) {
    return resp.json()
  }).then(function (myJson) {
    let reviews = myJson;
    if (reviews.length !== 0) {
      reviews.forEach(function (r) {
        let review = new Review(r.id, r.title, r.rating, r.content, r.wouldRecommend, r.user, r.business, r.crypto);
        reviewCount.push(review)
        review.formatReview(reviewCount.length);
      })
    } else if (clicker === 0){
      $('.append-reviews').append(`
        <h3 id="no-reviews">This business does not have any reviews.</h3>
        `);
      clicker++;
    }
  })
}

function getBusinesses(cryptos, searchItem) {
  //Alternativley, reduce cryptos to name and symbol.
  //https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6/38750895
  // const attributes = ['name', 'symbol']

  let validSearch = function () {
    const symbolsNames = [];
    for (let keyInt in cryptos) {
      symbolsNames.push(cryptos[keyInt].name.toLowerCase(), cryptos[keyInt].symbol.toLowerCase())
    }
    return symbolsNames.includes(searchItem)
  }();

  let scanForMatches = function () {
    // alert('hi')
    let matches = [];
    $.get('/spendables', {}, function (data) {
      data.filter(spendable => spendable.crypto.name.toLowerCase() === searchItem || spendable.crypto.symbol.toLowerCase() === searchItem);
    }) // this works in my console just fine.
    return matches;
    // let matches =
    //   fetch(`/spendables`)
    //     .then(resp => resp.json())
    //     .then(myJson => myMatches = myJson)
    //     .then(() => console.log(myMatches))

    // $.get('/spendables', {}, function (data) {
    //   debugger;
    //   console.log(data);
    // })

    // IF match is found, scan '/spendables' for business.cryptos
    // then return businesses with matching result
  }();

  if (!validSearch) {
    // alert('We found no matches.')
    $('.results').prepend(`
      <div class="alert alert-danger">We found no matches.</div>
      `)
      // how do I make this stay on page?;
  } else {
    console.log(scanForMatches);
    debugger;
  }
}

// Below function uses Crypto.order_by_name datalist
function getCoins() {
  let fullList = $('#coins').find('option')
  let values = [];

  for (let i = 0; i < fullList.length; i++) {
    let crypto = new Crypto(fullList[i].value, fullList[i].data("id"), fullList[i].data("symbol"))
    values.push(crypto); // Make Crypto objects instead
  }
// debugger;
  return values;
}
//
// newBusiness.protoptype.seeMore = () => {
//
// }
