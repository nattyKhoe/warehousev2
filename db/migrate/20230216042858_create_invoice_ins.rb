class CreateInvoiceIns < ActiveRecord::Migration[6.1]
  def change
    create_table :invoice_ins do |t|
      t.string :invoice_number
      t.date :date
      t.date :due_date
      t.decimal :total, precision: 10, scale: 3, default: "0.0"
      t.decimal :discount, precision: 2, scale: 3, default: "0.0"
      t.decimal :tax, precision: 10, scale: 3, default: "0.0"
      t.decimal :grand_total, precision: 10, scale: 3, default: "0.0"
      t.integer :manufacturer_id

      t.timestamps
    end
  end
end
