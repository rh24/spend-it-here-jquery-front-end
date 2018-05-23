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
  // debugger;
  if (coins.filter(name => name.toLowerCase() === searchItem.toLowerCase().length > 0)) {
    alert(searchItem);
  }
}

function getCoins() {
  let fullList = $('#coins').find('option')
  let values = [];

  for (let i = 0; i < fullList.length; i++) {
    values.push(fullList[i].value);
  }

  return values;
}
