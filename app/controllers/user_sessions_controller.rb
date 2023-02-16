class UserSessionsController < ApplicationController
    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
          session[:user_id] = user.id
          session[:account_type] = user.account_type
          render json: { message: "Logged in successfully" }
        else
          render json: { message: "Invalid email or password" }, status: 401
        end
    end
    
    def destroy
      session.delete :user_id
      session.delete :account_type
      render json: { message: "Logged out successfully" }
    end
end
