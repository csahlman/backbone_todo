object @task
attributes :id, :name, :done, :updated_at, :created_at, :due_date

# child :users do
#   attributes :email
#   node(:task_admin) { |user| @task.is_task_admin?(user) }
# end

