class BoardsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user, only: [ :create, :destroy, :show ]

  def index
    if user_signed_in?
      respond_with current_user.boards
    else
      respond_with Board.all
    end
  end

  def create
    respond_with current_user.boards.create(params[:board])
  end

  def show
    @board = current_user.boards.find(params[:id])
    respond_with @board
  end

  def destroy
    
  end


  private

    def authenticate_user
      respond_with status: 404 unless user_signed_in?
    end

end