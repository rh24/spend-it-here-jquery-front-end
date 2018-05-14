class UsersController < ApplicationController

  def show
    @reviews = current_user.reviews
  end

  def index
    @users = User.all
    render json: @users, status: 200
  end
end
