class InvoiceInLineItemsController < ApplicationController
    before_action :set_invoice_in, only: [:create, :update, :destroy, :show]
    before_action :set_invoice_in_line_items, only: [:update, :destroy, :show]

    def create
        line_item = @invoice.invoice_in_line_items.build(line_item_params)
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
        @line_item = InvoiceInLineItem.find(params[:id])
    end

    def set_invoice_in
        @invoice_in = InvoiceIn.find(params[:id])
    end

    def line_item_params
        params.permit(:quantity, :item_id)
    end
end
