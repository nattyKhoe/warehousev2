# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# user = User.create!(
#     first_name: "Admin",
#     last_name: "Khoe",
#     account_type: "admin",
#     username: "AdminK",
#     date_of_birth: "29/12/1993",
#     password: "123456",
#     password_confirmation: "123456"
# )
# user1 = User.create!(
#     first_name: "Privilege",
#     last_name: "P",
#     account_type: "privilege",
#     username: "PrivilegeP",
#     date_of_birth: "29/12/2003",
#     password: "123456",
#     password_confirmation: "123456"
# )

# user2 = User.create!(
#     first_name: "User",
#     last_name: "U",
#     account_type: "user",
#     date_of_birth: "29/12/1998",
#     username: "UserU",
#     password: "123456",
#     password_confirmation: "123456"
# )
require 'faker'

# 10.times do 
#     Item.create!(
#         item_code: Faker::Alphanumeric.alpha(number: 10),
#         name: Faker::Commerce.product_name,
#         buying_price: Faker::Commerce.price(range: 0.99..10.0),
#         price:Faker::Commerce.price(range: 10.00..19.99),
#         stock: 5000,
#         category: Faker::Commerce.department(max: 1),
#         manufacturer_id: rand(1..7)
#     ) 
# end

# 5.times do 
#     Manufacturer.create!(
#         tax_number: Faker::Company.australian_business_number,
#         manufacturer_code: Faker::IDNumber.croatian_id(international: true),
#         address: Faker::Address.street_address,
#         city: Faker::Address.city,
#         name: Faker::Company.name
#     )
#     Store.create!(
#         tax_number: Faker::Company.australian_business_number,
#         store_code: Faker::IDNumber.chilean_id,
#         address: Faker::Address.street_address,
#         city: Faker::Address.city,
#         name: Faker::Company.name,
#         discount: rand(0..8),
#         plafond: Faker::Number.number(digits: 8)
#     )
# end

