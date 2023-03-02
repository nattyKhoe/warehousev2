class StoresController < ApplicationController
    before_action :set_store, only: [:show, :update]

    def index
        render json: Store.all, status: :ok
    end

    def show
        render json: @store, status: :ok
    end

    def create
        store = Store.create!(store_params)
        render json: stor, status: :created
    end

    def update
        @store.update!(store_params)
        render json: @store, status: :accepted
    end

    private
    def set_store
        @store = Store.find(params[:id])
    end

    def store_params
        params.permit(:tax_number, :store_code, :address, :city, :name, :discount, :plafond, :total_credit)
    end
end
