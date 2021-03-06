let id = 1;
let clicker = 0;
let errorClicker = 0;

function Comment(content, user, review) {
  this.content = content;
  this.id = id;
  this.user = user;
  this.review = review;

  id++;
}

Comment.prototype.loadAllComments = function (clicker) {
  let businessId = $('#comment-section').data("business-id");
  let reviewId = $('#comment-section').data("review-id");
  let user; // Need to grab username
  let html;
  let data = $.ajax({
    method: "GET",
    url: `/businesses/${businessId}/reviews/${reviewId}/comments.json`,
    dataType: "json"
  }).done(function (resp) {
    const respChunks = [];
    let subchunk;
    let size = 3;

    if (resp.length) {
      for (let i = 0; i < resp.length; i += size) {
        subchunk = resp.slice(i, i + size);
        respChunks.push(subchunk);
      }
      for (let el of respChunks[clicker]) {
        // debugger;
        $.get(`/users/${el["user_id"]}.json`, function (data) {
          user = data["email"];
          html = `
          <div id="comment-${el.id}">
          <li>${el.content}</li>
          <p>posted by: ${user}</p>
          </div><br>
          `
          $('#comment-section').append(html);
        });
      };
      clicker++;
    } else if (clicker === 0){
      $('#comment-section').append(`
        <h3 id="no-comments">This review does not have any comments.</h3>
        `);
      clicker++;
    }
  }); // End of .done
}// End of Comment.prototype.loadAllComments

$(document).ready(function () {
  attachCommentListeners();
})

// If you do not add e.preventDefault(), your js will not work!!

function attachCommentListeners() {
  let $commentArea = document.getElementById('create-comment')
  let businessId = $('#comment-section').data("business-id");
  let reviewId = $('#comment-section').data("review-id");
  // let content = $('.content').val();
  let currentUserId = $('.user').data("id");

  $('#load-comments').on('click', function (e) {
    e.preventDefault();
    Comment.prototype.loadAllComments(clicker);
    clicker++;
  });

  $('#comment-btn').on('click', function (e) {
    e.preventDefault();
    let $commentArea = document.getElementById('create-comment')
    let businessId = $('#comment-section').data("business-id");
    let reviewId = $('#comment-section').data("review-id");
    let currentUserId = $('.user').data("id");

    if (!$commentArea) {
      $('#comment-section').append(`<form action="/businesses/${businessId}/reviews/${reviewId}/comments" id="comment-form" method="POST">
      <textarea id="create-comment" name="comment[content]" placeholder="Your comment here..."></textarea>
      <input type="hidden" name="comment[user_id]" value="${currentUserId}">
      <input type="hidden" name="comment[review_id]" value="${reviewId}">
      <input type="submit" value="Submit"></input></form>`)
      $('#comment-btn').hide();
    }

    $('form').on('submit', function (e) {
      e.preventDefault();
      let values = $(this).serialize();
      let token = $('meta[name="csrf-token"]').attr('content');

      $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': token
          }
      });

      $.ajax({
        url: this.action,
        method: "POST",
        dataType: "json",
        data: values,
        success: function (resp) { //resp = {id: 71, content: "asdf", user_id: 1, review_id: 11, review: {…}}
          if (resp) {
            let newComment = new Comment (resp["content"], resp["user"], resp["review"]);
            return newComment;
          }
        },
        error: function () {
          alert('error');
        }
      }).done(function (data) {
        if (!data && errorClicker === 0) {
          $('#comment-section').append(`
            <div id="comment-alert" class="alert alert-danger"><p>Must not be blank</p></div>
            `)
          errorClicker++
        }

        $('#comment-section').append(`<div id="comment-${data["id"]}">
        <div class="content">
        <li>${data["content"]}</li>
        <p>posted by: ${data["user"]["email"]}</p>
        </div>
        </div>
        `)

        $('textarea').val('')
        $(`#comment-alert`).remove()
        // dry up below listener into separate function? It's in two places in this file.
        $('#load-comments').on('click', function (e) {
          e.preventDefault;
          $(`#comment-${data["id"]}`).remove()
          // debugger;
          Comment.prototype.loadAllComments(clicker)
          clicker++
        })
      });
    })// form doesn't exist until ajax loads it onto page
  }); //End of previous AJAX comment form
} //End of attachCommentListeners()
