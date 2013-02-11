# == Schema Information
#
# Table name: tasks
#
#  id          :integer          not null, primary key
#  name        :string(255)
#  done        :boolean
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :text
#  board_id    :integer
#

class Task < ActiveRecord::Base
  attr_accessible :done, :name, :description

  validates_presence_of :name

  has_many :users, through: :task_users
  has_many :task_users, dependent: :destroy

  has_many :comments, dependent: :destroy

  belongs_to :board

  def set_task_attributes(params)
    self.done = params[:done]
    self.name = params[:name]
    self.board_id = params[:board_id]
  end
end
