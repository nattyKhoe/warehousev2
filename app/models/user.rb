class User < ApplicationRecord
    has_many :invoice_ins
    has_many :invoice_outs
    
    before_validation :set_account_default
    has_secure_password
    
    validates :first_name, uniqueness: {scope: :last_name}
    validates :username, uniqueness: true
    validates :username, presence: true
    validates :password_digest, presence:true
    validates :account_type, inclusion: {in: %w(admin privilege user)}
    validates_date :date_of_birth, before: lambda {18.years.ago},
        before_message: "must be at least 18 years old"

    private
    def set_account_default
        account_type = "user" if account_type.blank?
    end
end
