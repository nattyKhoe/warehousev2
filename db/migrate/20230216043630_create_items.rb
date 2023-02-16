class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :item_code
      t.string :item_name
      t.decimal :price, precision: 10, scale: 3, default: "0.0"
      t.decimal :buying_price, precision: 10, scale: 3, default: "0.0"
      t.integer :stock
      t.string :category
      t.integer :manufacturer_id

      t.timestamps
    end
  end
end
