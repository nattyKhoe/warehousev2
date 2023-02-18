class AddUserIdToInvoiceOuts < ActiveRecord::Migration[6.1]
  def change
    add_column :invoice_outs, :user_id, :integer
  end
end
