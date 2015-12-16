Feature: CaptureData
  Valid data should be captured and presented for confirmation upon submission

	Scenario: Submission of the form with a valid url results in the url being re-presented for confirmation
    When I visit the RTM form
    And I supply the RTM form with a valid url
    And I submit the RTM form
    Then I should see the confirmation page
    Then I should see the url for confirmation
    Then I should clear the session

	Scenario: Submission of the form with a valid url + location results in the location being re-presented for confirmation
    When I visit the RTM form
    And I supply the RTM form with a valid url
    And I supply the RTM form with a valid location
    And I submit the RTM form
    Then I should see the confirmation page
    Then I should see the location for confirmation
    Then I should clear the session
  
	Scenario: Submission of the form with a valid url + description results in the location being re-presented for confirmation
    When I visit the RTM form
    And I supply the RTM form with a valid url
    And I supply the RTM form with a valid description
    And I submit the RTM form
    Then I should see the confirmation page
    Then I should see the description for confirmation
    Then I should clear the session
  
