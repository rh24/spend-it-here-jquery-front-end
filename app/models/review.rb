class Review < ApplicationRecord
  belongs_to :user
  belongs_to :business
  belongs_to :crypto

  delegate :location, to: :business

  validates :title, presence: true
  validates :comment, presence: true
  validates :rating, inclusion: { in: %w[5 4 3 2 1].map(&:to_i) }

  def businesses_attributes=(business_attributes)
    if !self.business_id
      self.business = Business.find_or_create_by(name: business_attributes[:name], location_id: business_attributes[:location_id])
      business.location_attributes = business_attributes[:location_attributes]
      business.category = Category.find_by(id: business_attributes[:category_id])
      business.price_range = business_attributes[:price_range]
      business.description = business_attributes[:description]
      business.discount_offered = business_attributes[:discount_offered]
      business.crypto_attributes=(business_attributes[:cryto_ids])
    else
      business = Business.find_by(id: business_id)
    end
    save
  end
end
