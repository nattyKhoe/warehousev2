class InvoiceInLineItem < ApplicationRecord
    belongs_to :invoice_in
    belongs_to :item

    validates :quantity, numericality: {greater_than: 0}

    def price
        item.buying_price
    end

    def total_amount
        price*quantity
    end

    def item_in
        self.item.stock += self.quantity
    end
end
