class GameSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :points, :completed

  belongs_to :user
  has_many :game_matches
  has_many :matches, through: :game_matches

end
