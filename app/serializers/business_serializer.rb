class BusinessSerializer < ActiveModel::Serializer
  attributes :id, :name, :price_range, :discount_offered, :description
  belongs_to :location
  belongs_to :category
  has_many :cryptos
end
