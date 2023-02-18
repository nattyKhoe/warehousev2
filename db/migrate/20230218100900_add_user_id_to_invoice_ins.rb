class AddUserIdToInvoiceIns < ActiveRecord::Migration[6.1]
  def change
    add_column :invoice_ins, :user_id, :integer
  end
end
