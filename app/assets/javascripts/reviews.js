let reviewClicker = 0;

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

// ask cernan for help to display recommendation.

  formatReview() {
    if (reviewClicker === 0) {
      $('.append-reviews').append(`
        <br><div class="container">
        <h3>${this.title}</h3>
        <p>${this.content}</p>
        // add option to See more...
        <p>${this.rating}<p>
        <p>${this.displayRecommendation.bind(this)}</p>
        <p>posted by: ${this.user.email}</p>
        </div>
        `)
      reviewClicker++;
    }
  }

  displayRecommendation(review) {
    if (review.wouldRecommend) {
      return `${review.user.email} recommends this business.`
    }

    return `${review.user.email} doesn't recommend this business.`
  }
}
