class Item < ApplicationRecord
    has_many :invoice_in_line_items
    has_many :invoice_out_line_items

    validates :item_name, presence: true
    validates :item_code, uniqueness: true
    validates :price, numericality: { greater_than: 0 }
    validates :stock, numericality: { greater_than_or_equal_to: 0 }

end
