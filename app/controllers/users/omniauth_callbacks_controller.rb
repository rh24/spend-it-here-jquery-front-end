class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def google_oauth2
      # You need to implement the method below in your model (e.g. app/models/user.rb)
      @user = User.from_omniauth(request.env['omniauth.auth'])
      binding.pry
      if @user.persisted?
        flash[:notice] = I18n.t 'devise.omniauth_callbacks.success', kind: 'Google'
        sign_in_and_redirect @user, event: :authentication
      else
        session['devise.google_data'] = request.env['omniauth.auth'].except(:extra) # Removing extra as it can
        redirect_to new_user_registration_url, alert: @user.errors.full_messages.join("\n")
      end
  end

  def github
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.save
      flash[:notice] = "Success"
      sign_in_and_redirect @user
    else
      raise @user.save!
      redirect_to new_user_registration_url, alert: @user.errors.full_messages.join("\n")
    end
  end

  def index
    @users = User.all
    render json: @users, status: 200
  end
end
