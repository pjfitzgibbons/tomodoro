class CardsController < ApplicationController
  before_action :set_card, only: %i[ show edit update destroy move ]
  before_action :set_lane

  # GET /cards or /cards.json
  def index
    @cards = Card.all
  end

  # GET /cards/1 or /cards/1.json
  def show
  end

  # GET /cards/new
  def new
    @card = Card.new(lane: @lane)
  end

  # GET /cards/1/edit
  def edit
  end

  # POST /cards or /cards.json
  def create
    @card = Card.new(lane: @lane, **card_params)

    respond_to do |format|
      if @card.save
        format.html { redirect_to lane_card_url(@lane, @card), notice: "Card was successfully created." }
        format.json { render :show, status: :created, location: [@lane, @card] }
        format.turbo_stream { render :created, location: [@lane, @card] }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH /cards/1/move
  def move
    logger.debug "Card Move card-lane: #{@card.lane.id} lane: #{@lane.id}"

    if @lane.id != @card.lane.id
      # preserve current state of card for turbo-frame removal
      @prevCard = Card.new(@card.attributes)

      @lane.cards << @card

      # @card.save!
      if params[:position]
        @card.set_list_position(params[:position].to_i)
      end
      @lane.cards.reload
    else
      @card.set_list_position(params[:position].to_i)
    end

  end

  # PATCH/PUT /cards/1 or /cards/1.json
  def update
    respond_to do |format|
      if @card.update(card_params)
        format.html { redirect_to lane_card_url(@lane, @card), notice: "Card was successfully updated." }
        format.json { render :show, status: :ok, location: @card }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cards/1 or /cards/1.json
  def destroy
    @card.destroy

    respond_to do |format|
      format.html { redirect_to cards_url, notice: "Card was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card
      @card = Card.find(params[:id])
    end

  def set_lane
    @lane = Lane.find(params[:lane_id])
  end

    # Only allow a list of trusted parameters through.
    def card_params
      params.require(:card).permit(:title, :body, :tags, :category, :lane_id)
    end
end
