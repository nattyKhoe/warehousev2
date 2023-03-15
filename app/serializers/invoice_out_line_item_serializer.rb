class InvoiceOutLineItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :price, :total_amount, :name, :item_id

  def name
    object.item.name
  end
end
