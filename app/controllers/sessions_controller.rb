class SessionsController < ApplicationController
  respond_to :json

  def create
    @user = User.find_by_email(params[:user][:email])
    if @user && @user.authenticate(params[:user][:password])
      sign_in(@user)
      respond_with(@user)
    else
      render nothing: true
    end
  end

  def new
    
  end

  def destroy
    sign_out
    respond_with { "Signed Out" }
  end
end