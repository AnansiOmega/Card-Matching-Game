class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        user = User.all
        render json: user
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

    def create
    
        user =User.create(user_params)
        render json: user
    end





    private

    def user_params
        params.require(:user).permit(:username)
    end
end
