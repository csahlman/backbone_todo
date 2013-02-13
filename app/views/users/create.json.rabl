object @user
attributes :id, :email, :remember_token, :created_at

child :boards do 
  attributes :id, :name, :created_at, :updated_at
end