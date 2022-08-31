class Lane < ApplicationRecord
  has_many :cards, -> { order(position: :asc) }

end
