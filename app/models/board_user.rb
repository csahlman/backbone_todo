# == Schema Information
#
# Table name: board_users
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  board_id   :integer
#  admin      :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BoardUser < ActiveRecord::Base
  # attr_accessible :admin, :board_id, :user_id

  belongs_to :user
  belongs_to :board
end
