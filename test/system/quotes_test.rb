require "application_system_test_case"

class QuotesTest < ApplicationSystemTestCase
  setup do
    @quote = quotes(:first)
  end

  test "Creating a new quote" do
    # When we visit the Quotes#index page
    # we expect to see a title witth teh text "Quotes"
    visit quotes_path
    assert_selector "h1", text: "Quotes"

    # When we click on the link wiht the text "New Quote"
    # we expect to land on a pae with the title "New quote"
    click_on "New quote"
    assert_selector "h1", text: "Quotes"

    # When we fill in the name input with "Capybara quote"
    # and we click on "Create Quote"
    fill_in "Name", with: "Capybara quote"
    click_on "Create quote"

    # We expect to be back on teh page with the title "Quotes"
    # and to see our "Capybara quote" added to the list
    assert_selector "h1", text: "Quotes"
    assert_text "Capybara quote"

  end

  test "Showing a quote" do
    visit quotes_path
    click_link @quote.name

    assert_selector "h1", text: @quote.name
  end

  test "Updating a quote" do
    visit quotes_path
    assert_selector "h1", text: "Quotes"

    click_on "Edit", match: :first
    assert_selector "h1", text: "Quotes"
    assert_button "Update quote"

    fill_in "Name", with: "Updated quote"
    click_on "Update quote"

    assert_selector "h1", text: "Quotes"
    assert_text "Updated quote"
  end

  test "Destroying a quote" do
    visit quotes_path
    assert_text @quote.name

    within %(form[action="/quotes/#{@quote.id}") do
      click_on "Delete"
    end
    assert_text "Quotes" # wait a cycle
    assert_no_text @quote.name, wait: (0.5).seconds
  end


end
