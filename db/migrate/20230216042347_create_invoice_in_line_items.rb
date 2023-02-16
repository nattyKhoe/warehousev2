class CreateInvoiceInLineItems < ActiveRecord::Migration[6.1]
  def change
    create_table :invoice_in_line_items do |t|
      t.integer :quantity
      t.decimal :price, precision: 10, scale: 2, default: "0.0"
      t.decimal :total_amount, precision: 10, scale: 2, default: "0.0"
      t.integer :invoice_in_id
      t.integer :item_id

      t.timestamps
    end
  end
end
