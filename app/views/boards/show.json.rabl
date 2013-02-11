object @board
attributes :id, :name, :updated_at, :created_at

child :tasks do 
  attributes :id, :done, :name, :created_at, :updated_at, :board_id
  node(:board) { |task| task.board_id }
end