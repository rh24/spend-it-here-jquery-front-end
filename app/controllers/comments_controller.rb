class CommentsController < ApplicationController
  before_action :set_review

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    # if @comment.save
  end

  def show

  end

  private

  def comment_params
    params.require(:comment).permit(:content, :user_id, :review_id)
  end

  def set_review
    @review = Review.find_by(id: params[:review_id])
  end
end
