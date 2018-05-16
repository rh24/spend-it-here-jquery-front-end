class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :rating, :content, :would_recommend
  # :business_id, :user_id, :crypto_id
  has_many :comments
  belongs_to :business
  belongs_to :user
  belongs_to :crypto
end
