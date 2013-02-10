object @board
attributes :id, :name, :updated_at, :created_at

child :tasks do 
  attributes :id, :done, :name, :created_at
end