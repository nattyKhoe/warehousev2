class InvoiceOutStoreSerializer < ActiveModel::Serializer
  attributes :invoice_number, :date, :total, :discount, :tax, :grand_total
 
  belongs_to :store
  has_many :invoice_out_line_items

  # def store
  #   object.store.name
  # end

  # def items
  #   object.invoice_out_line_items.map{|line_item| {
  #     id: line_item.id,
  #     item_id: line_item.item_id,
  #     item_name: line_item.item.name,
  #     quantity: line_item.quantity,
  #     price: line_item.price,
  #     total_amount: line_item.total_amount
  #     }}
  # end

end
