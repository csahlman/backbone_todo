class CommentsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user

  def create
    @comment = Comment.create(params[:comment])
    @comment.user = current_user
    @comment.task = current_user.tasks.find(params[:task_id])
    @comment.save!
    respond_with @comment
  end

  def destroy
    respond_with Comment.find(params[:id]).destroy
  end

  private

    def authenticate_user
      respond_with status: 404 unless user_signed_in?
    end

end
