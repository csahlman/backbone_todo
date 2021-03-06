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

  accepts_nested_attributes_for :board_users

  def set_board_attributes(params)
    self.name = params[:name]
    self.user_ids = params[:user_attributes].map do |hash|
      hash[:user_id]
    end
  end

  def is_board_admin?(user)
    self.board_users.find_by_user_id(user.id).board_admin?
  end


end
