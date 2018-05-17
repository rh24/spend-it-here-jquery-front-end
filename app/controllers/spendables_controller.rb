class SpendablesController < ApplicationController

  def bitcoin
    @businesses # = scope method for bitcoin
    # Spendable.bitcoin
    render :'businesses/index'
  end

  def index
    @spendables = Spendable.all
    render json: @spendables, status: 200
  end
end
