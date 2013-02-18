class UsersController < ApplicationController
  respond_to :json
  before_filter :authenticate_user, only: [ :index ]

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
    @user = User.find_by_remember_token(params[:id])
    sign_in(@user)
    respond_with @user
  end

  def index
    if(params[:board_id])
      respond_with current_user.boards.find(params[:board_id]).users
    else
      respond_with status: 404
    end
  end

  private

    def authenticate_user
      respond_with status: 404 unless user_signed_in?
    end

end