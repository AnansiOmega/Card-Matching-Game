class Game < ApplicationRecord
    belongs_to :user
    has_many :game_matches
    has_many :matches, through: :game_matches


    def self.create_game
        new_game = Game.create(user_id: User.last.id)

        8.times do 
            GameMatch.create(
                game_id: Game.last.id,
                match_id: Match.all.sample.id
            )
        end
        return new_game && GameMatch.all.slice(-8,8)
    end

end
