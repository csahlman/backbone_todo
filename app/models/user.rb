# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)      default(""), not null
#  password_digest :string(255)      default(""), not null
#  remember_token  :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  attr_accessible :email, :password, :password_confirmation

  has_secure_password

  before_create :create_remember_token

  has_many :tasks, through: :task_users
  has_many :task_users, dependent: :destroy

  has_many :board_users, dependent: :destroy
  has_many :boards, through: :board_users

  has_many :comments

  def is_board_admin?(board_id)
    board_users.find_by_user_id(user_id).admin?
  end

  private
    
    def create_remember_token
      self.remember_token = SecureRandom.urlsafe_base64
    end

end
