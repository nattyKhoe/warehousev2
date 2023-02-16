# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create!(
    first_name: "Admin",
    last_name: "Khoe",
    account_type: "admin",
    username: "AdminK",
    password: "123456",
    password_confirmation: "123546"
)
user1 = User.create!(
    first_name: "Privilege",
    last_name: "P",
    account_type: "privilege",
    username: "PrivilegeP",
    password: "123456",
    password_confirmation: "123546"
)

user2 = User.create!(
    first_name: "User",
    last_name: "U",
    account_type: "user",
    username: "UserU"
    password: "123456",
    password_confirmation: "123546"
)

5.times do 
    Manufacturer.create!(
        tax_number: Faker::Company.australian_business_number,
        manufacturer_code: Faker::IDNumber.croatian_id(international: true),
        address: Faker::Address.street_address,
        city: Faker::Address.city,
        name: Faker::Company.name
    )
    Store.create!(
        tax_number: Faker::Company.australian_business_number,
        store_code: Faker::IDNumber.chilean_id,
        address: Faker::Address.street_address,
        city: Faker::Address.city,
        name: Faker::Company.name,
        discount: rand(0..8),
        plafond: Faker::Number.number(5)
    )
end

5.times do 
    Manufacturer.create!(
        ABN: Faker::Company.australian_business_number,
        manufacturer_code: Faker::IDNumber.croatian_id(international: true),
        address: Faker::Address.street_address,
        city: Faker::Address.city,
        manufacturer_name: Faker::Company.name
    )
    Store.create!(
        ABN: Faker::Company.australian_business_number,
        store_code: Faker::IDNumber.chilean_id,
        address: Faker::Address.street_address,
        city: Faker::Address.city,
        store_name: Faker::Company.name,
        store_discount: rand(0..8),
        store_plafond: Faker::Number.number(5)
    )
end


