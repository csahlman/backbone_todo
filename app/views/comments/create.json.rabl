object @comment
attributes :id, :content, :created_at

node(:poster_name) { |comment| comment.user.email }
