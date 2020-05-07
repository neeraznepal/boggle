require 'rails_helper'

RSpec.describe ScoresController, type: :controller do  
    context 'POST #save' do
        it 'returns failed response with message when user is not passed' do
            post :save, params: { score: 10 }
            expect(JSON.parse(response.body)['success']).to eq(false)
            expect(JSON.parse(response.body)['message']).to eq('User is required')
        end
        it 'returns failed response with message when score is not passed' do
            post :save, params: { user: 'Player 1' }
            expect(JSON.parse(response.body)['success']).to eq(false)
            expect(JSON.parse(response.body)['message']).to eq('Score is required')
        end
        it 'returns success response when score and user is passed' do
            post :save, params: { user: 'Player 1',score: 10 }
            expect(JSON.parse(response.body)['success']).to eq(true)
        end
    end
    context 'GET #list' do
        before(:each) do
            Score.new({ user: 'Player 1',point: 10 }).save
            Score.new({ user: 'Player 2',point: 20 }).save
            Score.new({ user: 'Player 3',point: 30 }).save
            Score.new({ user: 'Player 4',point: 40 }).save
            Score.new({ user: 'Player 5',point: 50 }).save
        end
        it 'returns a list of highest scorers with point(score) in descending order' do
            get :list
            expect(JSON.parse(response.body).count).to eq(5)
            expect(JSON.parse(response.body)[0]["point"]).to eq(50)
        end
    end
end
