class InvoiceOutLineItem < ApplicationRecord
    belongs_to :item
    belongs_to :invoice_out

    validates :quantity, numericality: {greater_than: 0}
    # validate :validate_stock
    
    # def price
    #     item.price
    # end

    def total_amount
        price*quantity
    end

    # def validate_stock
    #     errors.add(:quantity, "exceed available stock") if quantity > item.remaining_stock
    # end

    def item_out
        self.item.stock -= self.quantity
    end

end
