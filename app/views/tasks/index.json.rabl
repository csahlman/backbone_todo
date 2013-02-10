collection @tasks

attributes :id, :name, :done, :board_id

child :users do 
  attributes :id, :email
end

# child :comments do 
#   attributes :id, :content, :created_at
#   node(:poster_name) { |comment| comment.user.email }
# end