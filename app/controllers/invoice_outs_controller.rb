class InvoiceOutsController < ApplicationController
    before_action :set_invoice_out, only: [:show, :update, :destroy]

    def index
        render json: InvoiceOut.all, status: :ok
    end

    def show
        render json: @invoice_out, status: :ok
    end

    def create
        invoice_out = InvoiceOut.create!(invoice_out_params)
        invoice_out.selling
        render json: invoice_out, status: :created
    end

    def update
        @invoice_out.update!(invoice_out_params)
        render json: @invoice_out, status: :accepted
    end

    def destroy
        @invoice_out.destroy
        head :no_content
    end

    def last
        invoice = InvoiceOut.last
        new_invoice_id = invoice.present? ?invoice.id+1 :1
        render json: new_invoice_id, status: :ok
    end

    private
    def invoice_out_params
        params.permit(:invoice_number, :date, :store_id, :tax, :total,
        :grand_total, :paid_status, :discount, :user_id)
    end

    def set_invoice_out
        @invoice_out = InvoiceOut.find(params[:id])
    end
end
