Rails.application.routes.draw do

  resources :lanes do
    resources :cards
    post 'cards/new', to: 'cards#new'
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :quotes

end
