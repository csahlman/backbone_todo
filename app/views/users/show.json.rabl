object @user
attributes :id, :email, :remember_token

child :boards do 
  attributes :id, :name, :created_at, :updated_at
end