class AddAddressToStores < ActiveRecord::Migration[6.1]
  def change
    add_column :stores, :address, :string
    add_column :stores, :city, :string
  end
end
