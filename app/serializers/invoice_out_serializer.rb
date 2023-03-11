class InvoiceOutSerializer < ActiveModel::Serializer
  attributes :id, :invoice_number, :date, :total, :discount, :tax, :grand_total, :store_name

  def store_name
    object.store.name
  end


end
