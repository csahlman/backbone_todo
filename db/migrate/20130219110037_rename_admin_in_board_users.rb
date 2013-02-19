class RenameAdminInBoardUsers < ActiveRecord::Migration
  def change
    rename_column :board_users, :admin, :board_admin
    rename_column :task_users, :board_admin, :task_admin
  end
end
