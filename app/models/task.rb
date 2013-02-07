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
#

class Task < ActiveRecord::Base
  attr_accessible :done, :name, :description

  validates_presence_of :name

  has_many :users, through: :task_users
  has_many :task_users, dependent: :destroy

  has_many :comments, dependent: :destroy
end
