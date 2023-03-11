class InvoiceOutStoreSerializer < ActiveModel::Serializer
  attributes :invoice_number, :date, :total, :discount, :tax, :grand_total, :store
 
  def store
    object.store.name
  end

end
