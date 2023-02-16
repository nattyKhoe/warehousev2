class Store < ApplicationRecord
    has_many :invoice_outs

    validates :tax_number, uniqueness: true
    validates :store_code, uniqueness: true
    validates :discount, numericality: {
        greater_than_or_equal_to: 0,
        less_than_or_equal_to: 8
    }

    validates :plafond, numericality: {
        greater_than_or_equal_to:0,
        less_than_or_equal_to:100000000
    }

end
