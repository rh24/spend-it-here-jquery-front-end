Rails.application.routes.draw do
  root 'welcome#home'
  resources :categories
  resources :businesses, as: "biz" do
    resources :reviews
  end
  resources :reviews
  devise_for :users

  get '/businesses/:offer_discounts' => 'businesses#index', as: 'biz_specials'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/businesses/:bitcoin' => 'spendables#bitcoin' as: 
end
