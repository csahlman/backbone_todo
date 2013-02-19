object @board
attributes :id, :name, :updated_at, :created_at

child :tasks do 
  attributes :id, :name, :done, :created_at, :updated_at, :description, :board_id
end

board = root_object  # root_object loses its scope inside the child block
                     # in this case @board would work, but
                     # this is important when collection @boards inherits from this

child :users do
  attributes :email, :id
  node(:board_admin) { |user| board.is_board_admin?(user) }
end
