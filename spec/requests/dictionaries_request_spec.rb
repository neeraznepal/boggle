require 'rails_helper'

RSpec.describe DictionariesController, type: :controller do  
    context 'GET #validate' do
        before(:each) do
            Dictionary.new({ word: 'let' }).save
        end
        it 'returns a success response for valid word in dictionary' do
            get :validate, params: { word: 'let' }
            expect(JSON.parse(response.body)['success']).to eq(true)
        end
        it 'returns failed response for invalid word in dictionary' do
            get :validate, params: { word: 'leti' }
            expect(JSON.parse(response.body)['success']).to eq(false)
        end
    end
  end
