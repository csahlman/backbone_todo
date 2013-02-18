class BoardsController < ApplicationController
  respond_to :json, :html
  before_filter :authenticate_user

  def index
    @boards = boards_visible_to_current_user
    @users = user_id_and_email_attributes
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
    @board.set_board_attributes(params)
    @board.save!
    respond_with @board
  end


  private

    def authenticate_user
      respond_with status: 404 unless user_signed_in?
    end

    def boards_visible_to_current_user
      current_user.boards
    end

    def user_id_and_email_attributes
      User.all.map { |user| { id: user.id, email: user.email } }
    end

end