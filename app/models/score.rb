class Score < ApplicationRecord
    validates :point, presence: true
    validates :user, presence: true
end
