Feature: RequireUrl
  The RTM form should not permit submission without a URL specified

	Scenario: Attempts to submit the RTM form without specifying an email are met with error messages
    When I submit the RTM form without a website url 
    Then I should see error messages
