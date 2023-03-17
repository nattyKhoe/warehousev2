class InvoiceOutLineItemsController < ApplicationController
    before_action :set_invoice_out, only: [:create, :index, :update, :destroy]
    # before_action :set_invoice_out_line_items, only: [:update, :destroy]

    def index
        render json: @invoice_out.invoice_out_line_items, status: :ok
    end

    def create
        line_item = @invoice_out.invoice_out_line_items.create(line_item_params)
        item = Item.find(line_item.item_id)
        item.update(stock: item.stock - line_item.quantity)
        render json: line_item, status: :created
    end

    def update
        line_item = @invoice_out.invoice_out_line_items.find(params[:id])
        old_qty = line_item.quantity
        line_item.update(line_item_params)
        dif_qty = line_item.quantity - old_qty
        if dif_qty != 0
            item = Item.find(line_item.item_id)
            item.update!(stock: (item.stock - dif_qty))
        end
        render json: line_item, status: :accepted
    end

    # def destroy
    #     line_item = @invoice_out.line_items.find(params[:id])
    #     line_item.destroy
    #     head :no_content
    # end

    private

    # def set_invoice_out_line_items
    #     @line_item = InvoiceOutLineItem.find(params[:id])
    # end

    def set_invoice_out
        @invoice_out = InvoiceOut.find(params[:invoice_out_id])
    end

    def line_item_params
        params.permit(:id, :invoice_out_id, :quantity, :item_id, :price)
    end
end
