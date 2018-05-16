class CommentSerializer < ActiveModel::Serializer
  attributes :content, :user_id, :review_id
  belongs_to :review
end
