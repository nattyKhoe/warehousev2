class Manufacturer < ApplicationRecord
    has_many :items
    has_many :invoice_ins

    validates :tax_number, uniqueness: true
    validates :manufacturer_code, uniqueness: true
    validates :name, uniqueness: true
end
