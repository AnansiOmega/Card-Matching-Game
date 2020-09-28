class MatchSerializer < ActiveModel::Serializer
  attributes :id, :english_word, :spanish_word, :img_url

  has_many :game_matches
  has_many :games, through: :game_matches
end
