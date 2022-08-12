Rails.application.routes.draw do
  resources :cards
  resources :lanes
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :quotes

end
