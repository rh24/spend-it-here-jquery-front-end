class Crypto < ApplicationRecord
  has_many :spendables
  has_many :businesses, through: :spendables

  # Right now, the Crypto model seeded data is ordered by the rank in which the data was first scraped.
  # In the future, I want to be able to add dropdown menus that display the Cryptos in order by name.
  # Or have a typing text_field that provides suggestions for matches.
  # I don't want false data and coins that don't exist to be created, so I felt it was safer to user data from a scraper.

  def self.order_by_name
    order(name: "asc")
  end
end
