class BoardsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user, only: [ :create, :destroy, :show ]

  def index
    @boards = current_user.boards.includes(:tasks)
    respond_with @boards
  end

  def create
    respond_with current_user.boards.create(params[:board])
  end

  def show
    @board = current_user.boards.find(params[:id])
    respond_with @board
  end

  def destroy
    respond_with current_user.boards.find(params[:id]).destroy
  end

  def update
    @board = current_user.boards.find(params[:id])
    @board.set_board_attributes(params[:board])
    @board.save!
    respond_with @board
  end


  private

    def authenticate_user
      respond_with status: 404 unless user_signed_in?
    end

end