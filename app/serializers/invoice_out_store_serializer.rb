class InvoiceOutStoreSerializer < ActiveModel::Serializer
  attributes :invoice_number, :date, :total, :discount, :tax, :grand_total, :store

  
end
