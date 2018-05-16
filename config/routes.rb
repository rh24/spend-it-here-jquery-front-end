Rails.application.routes.draw do
  root 'welcome#home'
  resources :categories
  resources :businesses, as: "biz" do
    resources :reviews do
      resources :comments, only: [:show, :index, :new, :update, :delete, :edit]
    end
  end
  resources :comments
  resources :reviews
  # resources :reviews do
  #   resources :comments
  # end

  post '/businesses/:biz_id/reviews/:review_id/comments' => 'comments#create'

  # resources :cryptos
  # I probably don't need the above resource if I'm hitting CMC's API

  devise_for :users, controllers: {  omniauth_callbacks: 'users/omniauth_callbacks' }
  get '/users/:id' => 'users#show', as: 'user'
  get '/users' => 'users#index'

  get '/businesses/:offer_discounts' => 'businesses#index', as: 'biz_specials'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # get '/businesses/:bitcoin' => 'spendables#bitcoin' as:
end
