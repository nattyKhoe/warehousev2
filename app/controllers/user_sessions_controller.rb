class UserSessionsController < ApplicationController
  skip_before_action :authorise_user
    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
          session[:user_id] = user.id
          render json: { message: "Logged in successfully" }, status: :ok
        else
          render json: { message: "Invalid username or password" }, status: 401
        end
    end
    
    def destroy
      session.delete :user_id
      session.delete :account_type
      render json: { message: "Logged out successfully" }
    end
end
