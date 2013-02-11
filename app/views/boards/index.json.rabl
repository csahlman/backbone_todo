collection @boards

attributes :id, :name, :done, :board_id

child :tasks do 
  attributes :id, :name, :done, :created_at, :updated_at, :description, :board_id
end

# child :comments do 
#   attributes :id, :content, :created_at
#   node(:poster_name) { |comment| comment.user.email }
# end