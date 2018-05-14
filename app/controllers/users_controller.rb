class UsersController < ApplicationController

  # def show
  #   @reviews = current_user.reviews
  # end

  def show
    @reviews = current_user.reviews
    @user = User.find_by(id: params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @user }
    end
  end

  def index
    @users = User.all
    render json: @users, status: 200
  end
end
