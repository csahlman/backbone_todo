class UsersController < ApplicationController
  respond_to :json

  def create
    @user = User.new(params[:user])
    if @user.save
      sign_in(@user)
      respond_with @user
    else
      render nothing: true
    end
  end

  def show
    respond_with User.find(params[:id])
  end

end