require 'rails_helper'

RSpec.describe Score, type: :model do
  context 'validation tests' do
    it 'ensures point presence' do
      score = Score.new(user: 'Player 1').save
      expect(score).to eq(false)
    end
    
    it 'ensures user presence' do
      score = Score.new(point: 10).save
      expect(score).to eq(false)
    end
  end
end
