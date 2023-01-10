Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :tasks
    end

    namespace :v2 do
      resources :tasks
    end
  end
end
