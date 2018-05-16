let id = 0;

function Comment(content, userId, reviewId) {
  this.content = content;
  this.id = id++;
  this.userId = userId;
  this.reviewId = reviewId;

  id++;
}

Comment.prototype.loadAllComments = function () {
  let businessId = $('#comment-section').data("business-id");
  let reviewId = $('#comment-section').data("review-id");
  let user; // Need to grab username
  let html;
  let data = $.ajax({
    method: "GET",
    url: `/businesses/${businessId}/reviews/${reviewId}/comments.json`,
    dataType: "json"
  }).done(function (resp) {
    resp.forEach(function (el) {
      $.get(`/users/${el["user_id"]}.json`, function (resp) {
        user = resp["email"];
        html = `
        <div id="comment-${el.id}">
        <li>${el.content}</li>
        <p>posted by: ${user}</p>
        </div><br>
        `
        $('#comment-section').append(html);
      });
    });
  });
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
  let userId = $('.user').data("id");

  $('#load-comments').on('click', function (e) {
    e.preventDefault();
    Comment.prototype.loadAllComments();
  });

  $('#comment-btn').on('click', function (e) {
    e.preventDefault();
    let $commentArea = document.getElementById('create-comment')
    let businessId = $('#comment-section').data("business-id");
    let reviewId = $('#comment-section').data("review-id");
    // let content = $('.content').val();
    let userId = $('.user').data("id");
    if (!$commentArea) {
      $('#comment-section').append(`<form id="comment-form">
      <textarea id="create-comment" name="content" placeholder="Your comment here..."></textarea>
      <input type="hidden" name="businessId" value="${businessId}">
      <input type="hidden" name="reviewId" value="${reviewId}">
      <input type="hidden" name="userId" value="${userId}">
      <input type="submit" value="Submit"></input></form>`)
      $('#comment-btn').hide();
    }
    // } else if ($commentArea.innerHTML !== "") {
    //   // debugger;
    //   // post comment to API
    //   // display comment on page
    //   alert("You're trying to submit a comment!")
    // }
  });

  $('#comment-form').on('submit', function (e) {
    e.preventDefault();
    // createComment();
    let values = $(this).serialize();
    let posting = $.ajax({
      url: `/businesses/${businessId}/reviews/${reviewId}/comments`,
      // url: `/comments`,
      method: "POST",
      dataType: "json",
      data: values
    })
    console.log(values);
  });
}

// function submitComment(element) {
//   let $commentArea = document.getElementById('create-comment')
//   let businessId = $('#comment-section').data("business-id");
//   let reviewId = $('#comment-section').data("review-id");
//   // let content = $('.content').val();
//   let userId = $('.user').data("id");
//   $('#comment-form').submit(function (e) {
//     e.preventDefault();
//     // createComment();
//     let values = $(element).serialize();
//     let posting = $.ajax({
//       url: `/businesses/${businessId}/reviews/${reviewId}/comments`,
//       // url: `/comments`,
//       method: "POST",
//       dataType: "json",
//       data: values
//     })
//     // let posting = $.post(`/businesses/${businessId}/reviews/${reviewId}/comments`, values);
//     posting.done(function (data) {
//       // debugger;
//       let newComment = new Comment (data);
//       debugger;
//       let commentHTML = newComment.formatComment();
//
//       $('#comment-section').append(commentHTML);
//     })
//
//     // $.ajax({
//     //   method: 'post',
//     //   url: `businesses/${businessId}/reviews/${reviewId}/comments`,
//     //   // data: { content: content, user_id: userId, review_id: reviewId }
//     // }).done(function (data) {
//     //   $('#comment-section').append(`
//     //     <br><div id="comment-${comment.id}">
//     //     Test
//     //     </div><br>
//     //   `)
//     // });
//   });
// }

Comment.prototype.formatComment = () => {
  console.log(this)
}

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
