module CardsHelper
  def card_dom_id(card)
    "lane_#{card.lane.id}_card_#{card.id}"
  end
end
