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

  formatReview(reviewCount) {
    if (reviewClicker < reviewCount) {
      $('.append-reviews').append(`
        ${this.displayRating(this.rating)}<br>
        <br><div class="container">
        <h3><a href='/businesses/${this.business.id}/reviews/${this.id}'>${this.title}</a></h3>
        <p>${this.displayContent(this, 30)}</p>
        <p>${this.displayRecommendation(this)}</p><br>
        <p>posted by: ${this.user.email}</p>
        </div>
        `)
      reviewClicker++;
    }

    $('.js-more').on('click', function (e) {
      e.preventDefault;
      let reviewId = e.target.id
      let businessId = e.target.getAttribute("data-business-id")
      $.get(`/businesses/${businessId}/reviews/${reviewId}.json`)
    })
  }

  displayRecommendation(review) {
    // debugger;
    if (review.wouldRecommend) {
      return `${review.user.email} recommends this business.`
    }

    return `${review.user.email} doesn't recommend this business.`
  }

  displayRating(rating) {
    let html = '';
    for (let i = 0; i < rating; i++) {
      html += `<span class="reviews"></span>`
    }
    return html;
  }

  displayContent(review, maxLength) {
    // optional `separator` argument = ' ' if you desire to show full length words only + '...'
    // last return statement would be `return content.substr(0, content.lastIndexOf(separator, maxLength))``;
    if (review.content.length <= maxLength) {
      return review.content;
    }

    return review.content.substr(0, maxLength) + `...<a href="#" class="js-more" data-business-id="${review.business.id}" id="${review.id}">See More</a>`
  }
}
