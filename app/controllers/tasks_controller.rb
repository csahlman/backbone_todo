class TasksController < ApplicationController
  respond_to :json
  before_filter :authenticate_user

  def show
    respond_with current_user.tasks.find(params[:id])
  end

  def index
    respond_with current_user.tasks
  end

  def create
    respond_with current_user.tasks.create(params[:task])
  end

  def update
    @task = current_user.tasks.find(params[:id])
    respond_with @task.update_attributes(params[:task])
  end

  def destroy
    @task = current_user.tasks.find(params[:id])
    respond_with @task.destroy
  end

  private

    def authenticate_user
      respond_with status: 404 unless user_signed_in?
    end
  
end
