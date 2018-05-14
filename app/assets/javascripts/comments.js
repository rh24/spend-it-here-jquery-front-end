let id = 0;

function Comment(content, userId, reviewId) {
  this.content = content;
  this.commentId = commentId++;
  this.userId = userId;
  this.reviewId = reviewId;

  commentId++;
}

// function createComment() {
//   // let review = $('#review-')
//   $('#comment-btn').on('click', function () {
//     // $('#comment-section').append("Hello")
//     alert("you clicked add comment!!!")
//
//     // (`<input type="text" placeholder="Your comment here..."></input>`)
//   })
//   // $.fetch(`/reviews/${}`)
// }

$(document).ready(function () {
  attachCommentListeners();
})

// If you do not add e.preventDefault(), your js will not work!!

function attachCommentListeners() {
  $('#load-comments').on('click', function (e) {
    e.preventDefault();
    alert("you clicked me!");
  });

  $('#comment-btn').on('click', function (e) {
    e.preventDefault();
    let $commentArea = document.getElementById('create-comment')
    if (!$commentArea) {
      $('#comment-section').append(`<form><textarea id="create-comment" name="content" placeholder="Your comment here..."></textarea><input type="submit" value="Submit"></input></form>`)
    }

    // if (!$commentArea) {
    //   $('#comment-section').append(`
    //     <form class="" action="/businesses/${businessId}/reviews/${reviewId}/comments" method="post">
    //       <textarea id="create-comment" placeholder="Your comment here..."></textarea>
    //       <input type="submit" value="Submit">
    //     </form>`)
    // }

    // } else if ($commentArea.innerHTML !== "") {
    //   // debugger;
    //   // post comment to API
    //   // display comment on page
    //   alert("You're trying to submit a comment!")
    // }
  });

  $('form').on('submit', function (e) {
    // alert("Hello")
    e.preventDefault();
    createComment();
  });
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
