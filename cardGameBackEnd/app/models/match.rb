class Match < ApplicationRecord
    has_many :game_matches
    has_many :games, through: :game_matches
end
