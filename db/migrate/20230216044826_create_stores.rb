class CreateStores < ActiveRecord::Migration[6.1]
  def change
    create_table :stores do |t|
      t.string :tax_number
      t.string :store_code
      t.string :name
      t.decimal :discount, precision: 2, scale: 3, default: "0.0"
      t.decimal :plafond, precision: 15, scale: 3, default: "0.0"

      t.timestamps
    end
  end
end
