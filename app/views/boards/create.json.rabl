object @board

attributes :id, :name, :updated_at, :created_at

node(:current_user_admin) { |board| board.is_board_admin?(current_user) }