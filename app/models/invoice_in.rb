class InvoiceIn < ApplicationRecord
    has_many :invoice_in_line_items, dependent: :destroy
    belongs_to :manufacturer

    validates :due_date, numericality:{
        greater_than_or_equal_to Date.today
        less_than_or_equal_to Date.today + 30
    }
    validates :invoice_number, uniqueness: true
    validates :discount, numericality:{
        greater_than_or_equal_to: 0,
        less_than_or_equal_to: 100
    }

    def total
        invoice_in_line_items.sum(&:total_amount)
    end

    def tax
        total*11/100.to_f
    end

    def grand_total
        total+tax-discount*total/100.to_f
    end

    def buying
        self.invoice_in_line_items.each do |line_item|
            line_item.item_in
        end
    end

end
