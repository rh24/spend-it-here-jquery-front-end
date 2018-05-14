Rails.application.routes.draw do
  root 'welcome#home'
  resources :categories
  resources :businesses, as: "biz" do
    resources :reviews do
      resources :comments
    end
  end
  resources :reviews
  resources :reviews do
    resources :comments
  end
  # resources :cryptos
  # I probably don't need the above resource if I'm hitting CMC's API

  devise_for :users, controllers: {  omniauth_callbacks: 'users/omniauth_callbacks' }
  get '/users/:id' => 'users#show', as: 'user'

  get '/businesses/:offer_discounts' => 'businesses#index', as: 'biz_specials'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # get '/businesses/:bitcoin' => 'spendables#bitcoin' as:
end
