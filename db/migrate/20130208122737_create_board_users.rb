class CreateBoardUsers < ActiveRecord::Migration
  def change
    create_table :board_users do |t|
      t.integer :user_id
      t.integer :board_id
      t.boolean :admin

      t.timestamps
    end
  end
end
