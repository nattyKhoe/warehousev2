Rails.application.routes.draw do
  #item will need to be create,  edit, add, show, should put discontinued instead??
  resources :items, except: [ :destroy]
  #manufacturers will need to be create, edit, add, show, should put discontinued instead??
  resources :manufacturers, except: [:index, :destroy]
  #invoice_in will need to be create, destroy, edit, add, show, index
  resources :invoice_ins
  get 'invoice_ins/last', to: 'invoice_ins#last'
  #invoice_out will need to be create, destroy, edit, add, show, index
  resources :invoice_outs
  get 'invoice_outs/last', to: 'invoice_outs#last'
  #stores will need to be create, destroy, edit, add, show should put discontinued instead??
  resources :stores, except: [:destroy]
  #users will need to be create, destroy, edit, add, index, should put discontinued instead??
  resources :users, except: [:show, :destroy] 
  #nested routes invoice_ins and outs
  resources :invoice_in_line_items, only: [:create, :destroy, :update]
  resources :invoice_out_line_items, only: [:create, :destroy, :update]


  delete '/logout', to: 'user_sessions#destroy'
  post '/login',  to: 'user_sessions#create'
  get '/me', to: 'users#show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
