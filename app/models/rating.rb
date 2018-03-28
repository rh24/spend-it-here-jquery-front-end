class Rating < ApplicationRecord
  has_many :reviews
  has_many :businesses, through: :reviews
end
