class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:google_oath2, :github]

  has_many :reviews
  has_many :comments

  # def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
  #   data = access_token.info
  #   user = User.where(:provider => access_token.provider, :uid => access_token.uid ).first
  #   if user
  #     return user
  #   else
  #     registered_user = User.where(:email => access_token.info.email).first
  #     if registered_user
  #       return registered_user
  #     else
  #       user = User.create(name: data["name"],
  #         provider:access_token.provider,
  #         email: data["email"],
  #         uid: access_token.uid ,
  #         password: Devise.friendly_token[0,20]
  #       )
  #     end
  #   end
  # end

  # def self.from_omniauth(access_token)
  #   data = access_token.info
  #   user = User.where(email: data['email']).first
  #
  #   # Uncomment the section below if you want users to be created if they don't exist
  #   unless user
  #       user = User.create(name: data['name'],
  #          email: data['email'],
  #          password: Devise.friendly_token[0,20]
  #       )
  #   end
  #   user
  # end
  def self.from_omniauth(auth)
    if user = User.find_by_email(auth.info.email)
      user.provider = auth.provider
      user.uid = auth.uid
      user.password = Devise.friendly_token[0,20]
      user
    else
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.provider = auth.provider
        user.uid = auth.uid
        user.email = auth.info.email
        user.password = Devise.friendly_token[0,20]
        user
      end
    end
  end
end
