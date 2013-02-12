# == Schema Information
#
# Table name: boards
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Board < ActiveRecord::Base
  attr_accessible :name

  has_many :board_users, dependent: :destroy
  has_many :users, through: :board_users

  has_many :tasks, dependent: :destroy

  def set_board_attributes(params)
    self.name = params[:name]
  end
end
