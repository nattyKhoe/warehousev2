class InvoiceOutStoreSerializer < ActiveModel::Serializer
  attributes :invoice_number, :date, :total, :discount, :tax, :grand_total
 
  belongs_to :store
  has_many :invoice_out_line_items

end
