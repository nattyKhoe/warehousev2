class StoreSerializer < ActiveModel::Serializer
  attributes :id, :store_code, :discount, :name
end
