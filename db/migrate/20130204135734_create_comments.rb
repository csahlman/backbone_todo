class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :user_id
      t.integer :task_id

      t.timestamps
    end
    add_column :tasks, :description, :text
  end
end
