class CreateGameMatches < ActiveRecord::Migration[6.0]
  def change
    create_table :game_matches do |t|
      t.integer :game_id
      t.integer :match_id

      t.timestamps
    end
  end
end
