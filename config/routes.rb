Rails.application.routes.draw do
  # Forward all requests to StaticController#index but requests must be non-Ajax (!req.xhr?) and HTML Mime type (req.format.html?).
  # This does not include the root ("/") path.
  get '*page',to: 'static#index', constraints: -> (req) do
    !req.xhr? && req.format.html?
  end
  root 'static#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
