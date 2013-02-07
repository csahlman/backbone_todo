class CreateTaskUsers < ActiveRecord::Migration
  def change
    create_table :task_users do |t|
      t.integer :user_id
      t.integer :task_id
      t.boolean :board_admin

      t.timestamps
    end
  end
  remove_column :tasks, :user_id
end
