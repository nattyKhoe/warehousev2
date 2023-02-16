class AddTotalCreditToStores < ActiveRecord::Migration[6.1]
  def change
    add_column :stores, :total_credit, :decimal, precision: 15, scale:3, default: "0.0"
  end
end
