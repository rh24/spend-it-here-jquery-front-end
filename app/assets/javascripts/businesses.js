$(document).ready(function () {
  let cryptoData = getCryptoData();
  // attachBusinessListeners();
  // I couldn't find an elegant way to execute these functions.
  // Should I be doing this with closures?
})

// I tried to refactor getBusinesses to invoke this method when set to variable `cyryptos`, but it kept turning up undefined in the chrome console.
function getCryptoData() {
  let cryptos;
  fetch('https://api.coinmarketcap.com/v2/ticker/')
  .then(resp => resp.json())
  .then(myJson => cryptos = myJson["data"])
  .then((cryptos) => attachBusinessListeners(cryptos));
};
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
  // async function getCryptoData() {
  //   let cryptos;
  //   return fetch('https://api.coinmarketcap.com/v2/ticker/')
  //   .then(resp => resp.json())
  //   .then(myJson => cryptos = myJson["data"])
  //   // .then(() => console.log(cryptos))
  //     // debugger;
  //   // return cryptos;
  // }

  // debugger;
  $('#filter').on('submit', function (e) {
    e.preventDefault;
    // let cryptoData = getCryptoData();
    let searchItem = $('#selected-coin').val();
    getBusinesses(cryptos, searchItem)
    // it's passed in!;
  })

  $('.see-reviews').on('click', function (e) {
    e.preventDefault();
    let businessId = $(this).data('id')
    // debugger;
    renderReviews(businessId);
  })
}

function renderReviews(businessId) {
  let reviewCount = [];
  fetch(`/businesses/${businessId}/reviews.json`).then(function (resp) {
    return resp.json()
  }).then(function (myJson) {
    // debugger;
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
  // $.get(`/spendables`, function (resp) {
  //     // return resp.json();
  //     console.log(`${resp}`)
  //   })
  // let coins = $('#coins').find('option').map(c => c.value);
  alert(`${searchItem}`)
  // let validSearch = cryptos.filter(crypto => name.toLowerCase() === searchItem.toLowerCase());
  // let matches = fetch('/spendables').then((resp) => resp.json())
  // if (matches.length > 0) {
  //   matches.forEach(function (businessName) {
  //     $('.results').html(`
  //       <li><%= link_to "#{b.name}", biz_path(b) %></li>
  //       <li><a href="/businesses/",
  //       `)
  //   })
  // } else {
  //   alert("We found no matches.");
  // }
  /* Change to .append(`
    <div class="alert">
    <li>We found no matches.</li>
    </div>
  `)
  */
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
