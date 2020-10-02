Rails.application.routes.draw do
  get '/games/highscore', to: 'games#highscore'
  resources :matches
  resources :game_matches
  resources :games
  resources :users

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
