Rails.application.routes.draw do
  root to: 'main#index'
  resources :books
  get '/sign-up', to: 'registration#new'
  post '/sign-up', to: 'registration#create'

  get '/sign-in', to: 'session#new'
  post '/sign-in', to: 'session#create'

  delete '/logout', to: 'session#destroy'
end
