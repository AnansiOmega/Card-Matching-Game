class GameMatchSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :game
  belongs_to :match
end
