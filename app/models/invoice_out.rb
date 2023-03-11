class InvoiceOut < ApplicationRecord
    belongs_to :store
    # belongs_to :user
    has_many :invoice_out_line_items, dependent: :destroy
    has_many :items, through: :invoice_out_line_items
    # validates :payment_method, inclusion: {in: %w(cash credit)}
    # validates_date :due_date, on_or_after: :today, on_or_before: lambda {today.weeks_since(4)}
    validates :invoice_number, presence: true
    validates :invoice_number, uniqueness: true
    validates :discount, numericality:{
        greater_than_or_equal_to: 0,
        less_than_or_equal_to: 100
    }
    
    #check the credit plafond if option credit is taken
    # validate :validate_plafond
    # validate :validate_payment

    # def total_amount
    #     invoice_out_line_items.sum(&:total_amount)
    # end

    # def tax
    #     total*11/100.to_f
    # end

    # def grand_total
    #     total+tax-discount*total/100.to_f
    # end

    # def selling
    #     self.invoice_out_line_items.each do |line_item|
    #         line_item.item_out
    #     end

    #     if payment_method == "credit"
    #         store.total_credit += self.grand_total
    #     end
    # end

    private

    # def validate_plafond
    #     if payment_method == "credit"
    #         errors.add(:payment_method, "payment must be cash") if (store.total_credit + grand_total) > store.store_plafond
    #     end
    # end

    # def validate_payment
    #     if payment_method == "cash"
    #         errors.add(:paid_status, "it must be paid before generating the transaction") if paid_status == false
    #     end
    # end
    

end
