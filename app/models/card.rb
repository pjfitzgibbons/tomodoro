class Card < ApplicationRecord
  belongs_to :lane, inverse_of: :cards
  acts_as_list scope: :lane, top_of_list: 0
end
