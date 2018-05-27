# Spend It Here

Spend It Here is a web app that aims to promote visibility for businesses that encourage adoption of cryptocurrency by accepting crypto as payment. Users are able to create reviews for these businesses and rate them based on user satisfaction.

This will be a community managed database. Users are free to upload new businesses and indicate which cryptocurrencies are respectively accepted. The top 100 cryptocurrencies were scraped from CoinMarketCap in April 2018, and these may be updated via scraper in the future.

Users will be able to filter businesses based on whether or not discounts/specials are being offered for those paying in crypto. This feature appears as a link in the navigation bar.

Users may view their profiles to see a list of reviews they have left for listed businesses. Additionally, commenting functionality has been added via AJAX and jQuery on the front end. In the future, users will be able to dynamically filter businesses by cryptocurrencies accepted after typing into a search bar in the business index.

Contributions are welcome! Fork and clone the repo, run `rake db:seed` and `rake db:migrate`. Run on a local server via `rails s`.

## Installation

```$ bundle install```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/rh24/spend-it-here-rails-app. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
