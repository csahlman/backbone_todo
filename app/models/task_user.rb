# == Schema Information
#
# Table name: task_users
#
#  id          :integer          not null, primary key
#  user_id     :integer
#  task_id     :integer
#  board_admin :boolean
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class TaskUser < ActiveRecord::Base
  # attr_accessible :board_admin, :task_id, :user_id
  belongs_to :user
  belongs_to :task
end
