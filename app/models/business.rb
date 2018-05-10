class Business < ApplicationRecord
  belongs_to :location
  belongs_to :category
  has_many :spendables
  has_many :cryptos, through: :spendables
  has_many :items
  has_many :reviews
  has_many :users, through: :reviews

  validates :name, presence: true
  validates :description, presence: true

  def location_attributes=(location_attributes)
    # location_attributes = {"city"=>"Austin", "state"=>"Texas", "country"=>"USA"}
    self.location = Location.find_or_create_by(location_attributes) if !location_attributes.values.include?("") && !self.location_id
    save
  end

  def crypto_attributes=(crypto_ids)
    crypto_ids.values.first.reject { |value| value.to_s.empty? }.each do |id|
      spendable = Spendable.find_or_create_by(location_id: self.location.id, crypto: Crypto.find_by(id: id), business_id: self.id)
      self.spendables << spendable if !self.spendables.include?(spendable)
            # binding.pry
    end
    self.save
    # If I save here will validation errors show up?
    # Before this custom attribute writer hits, the model validations will be triggered first.
  end

  scope :offer_discounts, -> (offer_discounts) { where(discount_offered: true) }

    # def self.offer_discounts
    #   where(discount_offered: true)
    # end

  def review_count
    reviews.count
  end

  def self.order_by_name
    order(name: "asc")
  end

  def previous_page
    self.class.where("name < ?", self.name).order(name: "desc").first
  end

  def next_page
    self.class.where("name > ?", self.name).order(name: "asc").first
  end
end
