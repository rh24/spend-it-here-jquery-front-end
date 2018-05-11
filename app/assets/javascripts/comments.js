let commentId = 0;

function Comment(content) {
  this.content = content
  this.commentId = commentId++;

  commentId++;
}

function createComment() {
  // let review = $('#review-')
  $('#comment-btn').on('click', function () {
    $('#comment-section').append(`<input type="text" placeholder="Your comment here..."></input>`)
  })
  // $.fetch(`/reviews/${}`)
}
