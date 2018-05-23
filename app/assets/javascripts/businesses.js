$(document).ready(function () {
  attachBusinessListeners();
})

function attachBusinessListeners() {
  $('#filter').on('submit', function (e) {
    e.preventDefault;
    let searchItem = $('#selected-coin').val();
    getBusinesses(searchItem);
  })
}

function getBusinesses(searchItem) {
  // $.get(`/spendables`, function (resp) {
  //     // return resp.json();
  //     console.log(`${resp}`)
  //   })
  // let coins = $('#coins').find('option').map(c => c.value);
  let coins = getCoins();
  let matches = coins.filter(name => name.toLowerCase() === searchItem.toLowerCase());

  if (matches.length > 0) {
    matches.forEach(function (businessName) {
      $('.results').html(`
        <li><%= link_to "#{b.name}", biz_path(b) %></li>
        <li><a href="/businesses/",
        `)
    })
  } else {
    alert("We found no matches.");
  }
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
    let crypto = new Coin(fullList[i].value, fullList[i].data("id"), fullList[i].data("symbol"))
    values.push(crypto); // Make Crypto objects instead
  }
debugger;
  return values;
}
