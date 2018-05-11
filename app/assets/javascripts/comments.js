let commentId = 0;

function Comment(content) {
  this.content = content
  this.commentId = commentId++;

  commentId++;
}

function createComment() {
  let review = e.target
  $.fetch(`/reviews/${}`)
}
