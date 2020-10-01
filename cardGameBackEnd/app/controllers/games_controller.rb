class GamesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def new
        new_game = Game.create_game
        render json: new_game
    end

    def update
        game = Game.find(params[:id])
        game.update(game_params)
        render json: game
    end
    

    private

    def game_params
        params.require(:game).permit(:id,:user_id,:points,:completed)
    end
    
end
