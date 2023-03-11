class InvoiceOutLineItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :price, :total_amount, :item_name

  def item_name
    object.item.name
  end
end
