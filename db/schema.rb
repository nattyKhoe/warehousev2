# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_02_16_053327) do

  create_table "invoice_in_line_items", force: :cascade do |t|
    t.integer "quantity"
    t.decimal "price", precision: 10, scale: 2, default: "0.0"
    t.decimal "total_amount", precision: 10, scale: 2, default: "0.0"
    t.integer "invoice_in_id"
    t.integer "item_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "invoice_ins", force: :cascade do |t|
    t.string "invoice_number"
    t.date "date"
    t.date "due_date"
    t.decimal "total", precision: 10, scale: 3, default: "0.0"
    t.decimal "discount", precision: 2, scale: 3, default: "0.0"
    t.decimal "tax", precision: 10, scale: 3, default: "0.0"
    t.decimal "grand_total", precision: 10, scale: 3, default: "0.0"
    t.integer "manufacturer_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "paid_status"
  end

  create_table "invoice_out_line_items", force: :cascade do |t|
    t.integer "quantity"
    t.decimal "price", precision: 10, scale: 3, default: "0.0"
    t.decimal "total_amount", precision: 10, scale: 3, default: "0.0"
    t.integer "invoice_out_id"
    t.integer "item_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "invoice_outs", force: :cascade do |t|
    t.string "invoice_number"
    t.date "date"
    t.decimal "total", precision: 10, scale: 3, default: "0.0"
    t.decimal "discount", precision: 2, scale: 3, default: "0.0"
    t.decimal "tax", precision: 10, scale: 3, default: "0.0"
    t.decimal "grand_total", precision: 10, scale: 3, default: "0.0"
    t.boolean "paid_status"
    t.integer "store_id"
    t.string "payment_method"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "items", force: :cascade do |t|
    t.string "item_code"
    t.string "item_name"
    t.decimal "price", precision: 10, scale: 3, default: "0.0"
    t.decimal "buying_price", precision: 10, scale: 3, default: "0.0"
    t.integer "stock"
    t.string "category"
    t.integer "manufacturer_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "manufacturers", force: :cascade do |t|
    t.string "tax_number"
    t.string "manufacturer_code"
    t.string "name"
    t.string "address"
    t.string "city"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "stores", force: :cascade do |t|
    t.string "tax_number"
    t.string "store_code"
    t.string "name"
    t.decimal "discount", precision: 2, scale: 3, default: "0.0"
    t.decimal "plafond", precision: 15, scale: 3, default: "0.0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "total_credit", precision: 15, scale: 3, default: "0.0"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "account_type"
    t.date "date_of_birth"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
