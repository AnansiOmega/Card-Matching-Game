class User < ApplicationRecord
    has_many :games


    def users_points
        self.games.max_by do |game|
            game.points
        end
    end

end
