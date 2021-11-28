Rails.application.routes.draw do
  root to: 'main#index'
  resources :books
end
