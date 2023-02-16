class CreateInvoiceOutLineItems < ActiveRecord::Migration[6.1]
  def change
    create_table :invoice_out_line_items do |t|
      t.integer :quantity
      t.decimal :price, precision: 10, scale: 3, default: "0.0"
      t.decimal :total_amount, precision: 10, scale: 3, default: "0.0"
      t.integer :invoice_out_id
      t.integer :item_id

      t.timestamps
    end
  end
end
