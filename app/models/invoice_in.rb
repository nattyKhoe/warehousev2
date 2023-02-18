class InvoiceIn < ApplicationRecord
    has_many :invoice_in_line_items, dependent: :destroy
    belongs_to :manufacturer
    belongs_to :user

    validates_date :due_date, on_or_after: :today, on_or_before: lambda {today.weeks_since(4)}
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
