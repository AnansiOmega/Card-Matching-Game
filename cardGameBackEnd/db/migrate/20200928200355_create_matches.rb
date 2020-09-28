class CreateMatches < ActiveRecord::Migration[6.0]
  def change
    create_table :matches do |t|
      t.string :english_word
      t.string :spanish_word
      t.string :img_url

      t.timestamps
    end
  end
end
