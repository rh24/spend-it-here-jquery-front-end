// let commentId = 0;
//
// function Comment(content) {
//   this.content = content
//   this.commentId = commentId++;
//
//   commentId++;
// }

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
  $('#comment-link').on('click', function (e) {
    e.preventDefault();
    alert("you clicked me!");
  })

  $('#comment-btn').on('click', function (e) {
    e.preventDefault();
    $('#comment-section').append("Hello")
  })
}