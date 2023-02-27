class UsersController < ApplicationController
    before_action :set_user, only: [:update]
    wrap_parameters false
    def index
        render json: User.all, status: :ok
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {error: "Not Authorized, Please Login"}
        end
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def update
        @user.update!(user_params)
        render json: @user, status: :accepted
    end

    private
    def set_user
        @user = User.find(params[:id])
    end

    def user_params
        params.permit(:first_name, :username, :last_name, :account_type, :date_of_birth)
    end
end
