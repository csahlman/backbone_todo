class TasksController < ApplicationController
  respond_to :json
  before_filter :authenticate_user

  def show
    @task = current_user.tasks.includes(comments: :user).find(params[:id])
    respond_with @task
  end

  def index
    @tasks = current_user.tasks.includes(:users)
    # @tasks = Task.all
    respond_with @tasks
    # respond_with current_user.tasks
  end

  def create
    @task = current_user.tasks.build
    @task.set_task_attributes(params)
    @task.save!
    @task.users = [current_user]
    respond_with @task
  end

  def update
    @task = current_user.tasks.find(params[:id])
    @task.set_task_attributes(params)
    @task.save!
    respond_with @task
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
