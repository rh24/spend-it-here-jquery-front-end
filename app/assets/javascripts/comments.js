let id = 1;
let clicker = 0;

function Comment(content, userId, reviewId) {
  this.content = content;
  this.id = id;
  this.userId = userId;
  this.reviewId = reviewId;

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
    // debugger;

  }); // End of .done
}// End of Comment.prototype.loadAllComments

function submitComment(element) {
  // let $commentArea = document.getElementById('create-comment')
  // let businessId = $('#comment-section').data("business-id");
  // let reviewId = $('#comment-section').data("review-id");
  // // let content = $('.content').val();
  // let currentUserId = $('.user').data("id");
  let values = $(element).serialize();

  // debugger;
  $.ajax({
    url: element.action,
    method: "POST",
    dataType: "json",
    data: values,
    success: function (values) {
      let pairs = location.search.slice(1).split('&');
      let result = {};
      pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
      });
      let commentObj = JSON.stringify(result)
      let newComment = new Comment (commentObj);
      $('#comment-section').append(newComment);
      return commentObj;
    }
  })
  // debugger;
  // .fail(function (jqXHR, textStatus) {
  //         debugger;
  //   document.body.innerHTML = jqXHR.responseText;
  // });
  // .done(function (data) {
  //   console.log(data);
  //   let newComment = new Comment (data);
  //   // let commentHTML = newComment.formatComment();
  //   // console.log(newComment);
  //   // $('#comment-section').append(commentHTML);
  // })

  // let posting = $.post(`${element.action}`, values)
  // posting.success(function (resp) {
  //   console.log(resp)
  // })
}

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

  // $('#comment-btn').on('click', function (e) {
  //   e.preventDefault();
  //   let $commentArea = document.getElementById('create-comment')
  //   let businessId = $('#comment-section').data("business-id");
  //   let reviewId = $('#comment-section').data("review-id");
  //   // let content = $('.content').val();
  //   let currentUserId = $('.user').data("id");
  //   if (!$commentArea) {
  //     $('#comment-section').append(`<form action="/businesses/${businessId}/reviews/${reviewId}/comments" id="comment-form" method="POST">
  //     <textarea id="create-comment" name="content" placeholder="Your comment here..."></textarea>
  //     <input type="hidden" name="user_id" value="${currentUserId}">
  //     <input type="submit" value="Submit"></input></form>`)
  //     $('#comment-btn').hide();
  //   }

    $('form').on('submit', function (e) {
      debugger;
      e.preventDefault();
      let values = $(element).serialize();

      // debugger;
      $.ajax({
        url: element.action,
        method: "POST",
        dataType: "json",
        data: values,
        success: function (values) {
          let pairs = location.search.slice(1).split('&');
          let result = {};
          pairs.forEach(function(pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
          });
          let commentObj = JSON.stringify(result)
          let newComment = new Comment (commentObj);
          $('#comment-section').append(newComment);
          return commentObj;
        }
      })
    }); // form doesn't exist until user clicks button
  // }); End of previous AJAX comment form
} //End of attachCommentListeners()

// <input type="hidden" name="businessId" value="${businessId}">
// <input type="hidden" name="reviewId" value="${reviewId}">
// <input type="hidden" name="userId" value="${userId}">

// Comment.prototype.formatComment = () => {
//   let commentHTML = `
//     ${this}.
//   `
//
// }

function createComment() {
  let businessId = $('#comment-section').data("business-id");
  let reviewId = $('#comment-section').data("review-id");
  let content = $('.content').val();
  let userId = $('.user').data("id");
  // debugger;

  let comment = new Comment (content, userId, reviewId);

  $.ajax({
    method: 'post',
    url: `businesses/${businessId}/reviews/${reviewId}/comments`,
    data: { content: content, user_id: userId, review_id: reviewId }
  })
  $('#comment-section').append(`
    <br><div id="comment-${comment.id}">
    </div><br>
  `)
}

Comment.prototype.formatComment = function () {
  $('.content').html(`${this["content"]}`);
}
