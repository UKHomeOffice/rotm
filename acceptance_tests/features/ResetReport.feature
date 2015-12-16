Feature: ResetReport
  Existing report data can be deleted via a reset page before submission 

  @reset
	Scenario: The reset page provides the ability to remove all report data
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirmation page
    When I click on the additional report link
    And I supply the RTM form with the valid url http://www.example2.com
    And I submit the RTM form
    Then I should see 2 reports for confirmation
    Then I should clear the session
    Then I should see the RTM form  

  @reset
	Scenario: Attempts to access the confirmation page after data has been reset leads to the start again message
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirmation page
    When I click on the additional report link
    And I supply the RTM form with the valid url http://www.example2.com
    And I submit the RTM form
    Then I should see 2 reports for confirmation
    Then I should clear the session
    Then I should see the RTM form  
    When I visit the confirmation page
    Then I should see the start again page  
  
