class ReviewSerializer < ActiveModel::Serializer
  attributes :title, :rating, :content, :would_recommend, :user_id, :business_id, :crypto_id
  has_many :comments
end
