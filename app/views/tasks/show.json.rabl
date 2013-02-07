object @task
attributes :id, :name, :done

child :comments do 
  attributes :id, :content, :created_at
  node(:poster_name) { |comment| comment.user.email }
end