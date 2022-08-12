class CreateCards < ActiveRecord::Migration[7.0]
  def change
    create_table :cards do |t|
      t.string :title
      t.string :body
      t.string :tags
      t.string :category
      t.references :lane, null: false, foreign_key: true

      t.timestamps
    end
  end
end
