require 'rails_helper'

RSpec.describe Dictionary, type: :model do
  context 'validation tests' do
    it 'ensures word presence' do
      dictionary = Dictionary.new().save
      expect(dictionary).to eq(false)
    end    
  end
end
