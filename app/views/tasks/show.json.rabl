object @task
attributes :id, :description, :name, :done, :board_id, :updated_at, :created_at, :due_date

child :comments do 
  attributes :id, :content, :created_at, :task_id
  node(:poster_name) { |comment| comment.user.email }
end

child :users do
  attributes :email
  node(:task_admin) { |user| @task.is_task_admin?(user) }
end