class UserSerializer < ActiveModel::Serializer
  attributes :id, :account_type, :first_name, :username
end
