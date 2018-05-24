$(document).ready(function () {
  attachBusinessListeners();
})

// I tried to refactor getBusinesses to invoke this method when set to variable `cyryptos`, but it kept turning up undefined in the chrome console.
function getCryptoData() {
  fetch('https://api.coinmarketcap.com/v2/ticker/').then(function (resp) {
    return resp.json();
  }).then(function (myJson) {
    let cryptos = myJson["data"];
    // return cryptos;
    console.log(cryptos);
    // makeCryptoObjects(cryptos);
    // make crypto data into
  })
}

function Business(id, name, priceRange, description, locationId, categoryId, discountOffered) {

}

function attachBusinessListeners() {
  $('#filter').on('submit', function (e) {
    e.preventDefault;
    let searchItem = $('#selected-coin').val();
    getBusinesses(searchItem);
  })

  $('.see-reviews').on('click', function (e) {
    e.preventDefault();
    let businessId = $(this).data('id')
    // debugger;
    renderReviews(businessId);
  })

  getCryptoData();
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

function getBusinesses(searchItem) {
  // $.get(`/spendables`, function (resp) {
  //     // return resp.json();
  //     console.log(`${resp}`)
  //   })
  // let coins = $('#coins').find('option').map(c => c.value);

  // let cryptos = [];
  // fetch('https://api.coinmarketcap.com/v2/listings/').then(function (resp) {
  //   return resp.json();
  // }).then(function (myJson) {
  //   cryptos.push(myJson["data"]);
  //   return cryptos;
  //   // makeCryptoObjects(cryptos);
  // })
  // debugger;
  let validSearch = cryptos.filter(crypto => name.toLowerCase() === searchItem.toLowerCase());
  let matches = fetch('/spendables').then((resp) => resp.json())
  console.log(matches);

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
