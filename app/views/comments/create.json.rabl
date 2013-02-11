object @comment
attributes :id, :content, :created_at, :task_id

node(:poster_name) { |comment| comment.user.email }
