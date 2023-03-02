class InvoiceOutLineItemsController < ApplicationController
    before_action :set_invoice_out, only: [:create, :update, :destroy]
    before_action :set_invoice_out_line_items, only: [:update, :destroy]

    def create
        line_item = @invoice.invoice_out_line_items.build(line_item_params)
        render json: line_item, status: :created
    end

    def update
        @line_item.update!(line_item_params)
        render json: @line_item, status: :accepted
    end

    def destroy
        @line_item.destroy
        head :no_content
    end

    private

    def set_invoice_in_line_items
        @line_item = InvoiceOutLineItem.find(params[:id])
    end

    def set_invoice_out
        @invoice_out = InvoiceOut.find(params[:id])
    end

    def line_item_params
        params.permit(:quantity, :item_id)
    end
end
