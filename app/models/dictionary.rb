class Dictionary < ApplicationRecord
    validates :word, presence: true
end
