class CommentsController < ApplicationController
  before_action :set_review, :set_business

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    redirect to business_reviews_comment_path(@business, @business.reviews, @comment) if @comment.save
  end

  def show
    # respond_to do |format|
    #   format.html { render :show }
    #   format.json { render json: @comment }
    # end
    render json: @comment, status: 200
  end

  def index
    @comments = @review.comments
    # respond_to do |format|
    #   format.html { render :index }
    #   format.json { render json: @comments }
    # end
    render json: @comments, status: 200
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :user_id, :review_id)
  end

  def set_review
    @review = Review.find_by(id: params[:review_id])
  end

  def set_business
    @business = Business.find_by(id: @review.business_id)
  end
end
