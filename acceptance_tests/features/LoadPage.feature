Feature: LoadPage
  The RTM page should correctly load a page with a form and serve static assets

	Scenario: Go to Step One and assert content
    When I load the RTM start page                                               
    Then I should see the RTM form

  @assets
	Scenario: Go to Step One and static files are loaded correctly
    When I load the bundle JS asset                                               
    Then I should get a 200 status

  @cookie
	Scenario: The back link on the cookie page leads you to the RTM form when there are no reports 
    When I load the RTM start page
    And I visit the cookie page
