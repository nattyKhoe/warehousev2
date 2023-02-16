class CreateInvoiceOuts < ActiveRecord::Migration[6.1]
  def change
    create_table :invoice_outs do |t|
      t.string :invoice_number
      t.date :date
      t.decimal :total, precision: 10, scale: 3, default: "0.0"
      t.decimal :discount, precision: 2, scale: 3, default: "0.0"
      t.decimal :tax, precision: 10, scale: 3, default: "0.0"
      t.decimal :grand_total, precision: 10, scale: 3, default: "0.0"
      t.boolean :paid_status
      t.integer :store_id
      t.string :payment_method

      t.timestamps
    end
  end
end
