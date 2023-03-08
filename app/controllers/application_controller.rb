class ApplicationController < ActionController::Base
    include ActionController::Cookies
    skip_before_action :verify_authenticity_token
    before_action :authorise_user

    rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response

    private
    
    def render_record_invalid_response(exception)
        render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
    end
    
    def render_record_not_found_response(exception)
        render json: {error: "#{exception.model} not found"}, status: :not_found
    end

    def authorise_user
        render json: {error: "Not Authorised"}, status: :unauthorized unless session.include? :user_id
    end
   
end
