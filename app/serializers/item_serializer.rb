class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :stock
end
