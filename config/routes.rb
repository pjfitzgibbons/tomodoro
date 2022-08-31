Rails.application.routes.draw do

  resources :lanes do
    resources :cards do
      member do
        patch :move
      end
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :quotes

end
