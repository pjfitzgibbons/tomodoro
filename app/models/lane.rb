class Lane < ApplicationRecord
  acts_as_list

  default_scope { order(position: :asc) }

  has_many :cards, -> { order(position: :asc) }

end
