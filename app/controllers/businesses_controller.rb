class BusinessesController < ApplicationController
  before_action :require_login, except: [:show, :index]
  before_action :set_business, only: [:edit, :update, :show, :destroy]
  has_scope :offer_discounts, :type => :boolean

  def new
    @business = Business.new
  end

  def create
    @business = Business.new(business_params)
    # raise business_params.inspect
    if @business.save
      redirect_to biz_path(@business)
    else
      render :new   # render allows errors to appear. redirect does not. 
    end
  end

  def edit
  end

  def update
    # binding.pry
    if @business.update(business_params)
      @business.update(crypto_ids: business_params[:crypto_attributes][:ids])
      # Why isn't this already taken care of in line 26?

      flash[:alert] = "Business was successfully updated."
      redirect_to biz_path(@business)
    else
      flash[:alert] = "Fix me!"
      redirect_to edit_biz_path(@business)
    end
  end

  def index
    @businesses = Business.order_by_name.where(nil) # creates an anonymous scope. What does that mean?
    # raise params.inspect
    @businesses = Business.offer_discounts(params[:offer_discounts]) if params[:offer_discounts].present?
  end

  def show
  end

  def destroy
    @business.destroy
    flash[:alert] = "Business was successfully destroyed."
    redirect_to biz_index_path
  end

  private

  def set_business
    @business = Business.find_by(id: params[:id])
  end

  def business_params
    params.require(:business).permit(
      :name,
      :price_range,
      :description,
      :category_id,
      :location_id,
      :discount_offered,
      location_attributes: {},
      crypto_attributes: {}
    )
  end
end
