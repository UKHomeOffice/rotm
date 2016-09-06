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
	Scenario: The cookies link leads you to the cookies page 
    When I load the RTM start page
    And I visit the cookie page

  @terms
	Scenario: The terms and conditions link leads you to the terms and conditions page
    When I load the RTM start page
    And I visit the terms page

  @ogl
  Scenario: The Open Government License link leads you to the ogl page
    When I load the RTM start page
    And I visit the ogl page

  @copyright
  Scenario: The Crown Copyright link leads you to the Crown Copyright page
    When I load the RTM start page
    And I visit the CrownCopyright page

