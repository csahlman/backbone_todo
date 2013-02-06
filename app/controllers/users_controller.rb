class UsersController < ApplicationController
  respond_to :json

  def create
    @user = User.new(params[:user])
    if @user.save
      sign_in(@user)
      respond_with @user
    else
      respond_with { message: "Not working" }
    end
  end

  def show
    
  end

end