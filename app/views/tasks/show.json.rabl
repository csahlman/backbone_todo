object @task
attributes :id, :name, :done, :board_id, :updated_at, :created_at

child :comments do 
  attributes :id, :content, :created_at, :task_id
  node(:poster_name) { |comment| comment.user.email }
end