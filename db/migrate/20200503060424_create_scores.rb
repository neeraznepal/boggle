class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.string :user
      t.integer :point

      t.timestamps
    end
  end
end
