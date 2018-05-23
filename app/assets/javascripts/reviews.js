class Review {
  constructor(id, title, rating, content, wouldRecommend, user, business, crypto) {
    this.id = id;
    this.title = title;
    this.rating = rating;
    this.content = content;
    this.wouldRecommend = wouldRecommend;
    this.user = user;
    this.business = business;
    this.crypto = crypto;
  }

  formatReview() {
    $('.append-reviews').append(`
      <div class="container">
      <h3>${this.title}<h3>
      <p>${this.content}</p>
      <p>${this.rating}</p>< /br>
      <p>${this.displayRecommendation}</p>
      </div>
      `)
  }

  displayRecommendation() {
    if (this.wouldRecommend) {
      return `${this.user.email} recommends this business.`
    }

    return `${this.user.email} doesn't recommend this business.`
  }
}
