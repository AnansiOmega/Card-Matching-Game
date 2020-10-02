class Game < ApplicationRecord
    belongs_to :user
    has_many :game_matches
    has_many :matches, through: :game_matches


    def self.create_game
        new_game = Game.create(user_id: User.last.id)

        9.times do 
            GameMatch.create(
                game_id: Game.last.id,
                match_id: Match.all.sample.id
            )
        end
        game_matches = GameMatch.all.slice(-9,9).map(&:match).uniq
        if game_matches.length != 9
            GameMatch.all.slice(-9,9).each do |match|
                match.destroy
            end
            new_game.destroy
            self.create_game
        end
        return GameMatch.all.slice(-9,9)
    end

    def self.high_score
        user = Game.all.find_by(points: Game.all.map(&:points).compact).user.username
        game = Game.all.map(&:points).compact.max
        return {user: user, game: game}
    end

end
