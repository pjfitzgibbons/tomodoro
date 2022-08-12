json.extract! card, :id, :title, :body, :tags, :category, :lane_id, :created_at, :updated_at
json.url card_url(card, format: :json)
