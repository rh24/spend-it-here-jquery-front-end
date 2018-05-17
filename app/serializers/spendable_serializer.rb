class SpendableSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :crypto
  belongs_to :business
  belongs_to :location
end
