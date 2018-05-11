class CommentsController < ApplicationController
  before_action :set_review
  
  def new

  end

  def create

  end

  def show

  end

  private

  def set_review
    @review = Review.find_by(id: params[:review_id])
  end
end
