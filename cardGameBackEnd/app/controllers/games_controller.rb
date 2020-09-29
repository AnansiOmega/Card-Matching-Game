class GamesController < ApplicationController

    def new
        new_game = Game.create_game
        render json: new_game
    end

    
    
end
