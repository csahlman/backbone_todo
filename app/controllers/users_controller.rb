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
    @user = User.includes(:boards).find_by_remember_token(params[:id])
    respond_with @user
  end

end