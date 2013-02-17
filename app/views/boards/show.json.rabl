object @board
attributes :id, :name, :updated_at, :created_at

child :tasks do 
  attributes :id, :name, :done, :created_at, :updated_at, :description, :board_id
end

child :users do
  attributes :id, :email
end
