$('#myReviews').on('click', function (e) {
  e.preventDefault();
  $.get(`/reviews.json`, function (data) {
    data.forEach(function (el) {
      $('#posts-index').append(`
        <div id="post-${el["id"]}">
        <h4><a href="/posts/${el["id"]}">${el["title"]}</a></h4>
        <p>${el["content"]}</p>
        </div>
      `)
    })
  })
})
