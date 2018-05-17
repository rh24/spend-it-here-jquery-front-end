class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :review_id
  belongs_to :review
  belongs_to :user
end
