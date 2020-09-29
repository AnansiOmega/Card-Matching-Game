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
        game_matches = GameMatch.all.slice(-8,8).map(&:match).uniq
        if game_matches.length != 8
            GameMatch.all.slice(-8,8).each do |match|
                match.destroy
            end
            new_game.destroy
            self.create_game
        end
        return GameMatch.all.slice(-8,8)
    end

end
