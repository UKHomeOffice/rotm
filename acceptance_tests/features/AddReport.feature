Feature: AddReport
  Additional reports can be added before data is submitted 

	Scenario: The confirmation page provides the ability to add additional reports
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirmation page
    Then I should see the url - http://www.example.com
    And I should see a link to add additional reports
    Then I should clear the session
  
	Scenario: The additional reports link leds back to the RTM report form
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirmation page
    Then I should see the url - http://www.example.com
    And I should see a link to add additional reports
    When I click on the additional report link
    Then I should see the RTM form
    Then I should clear the session
  
	Scenario: The confirmation lists multiple reports when more than one report is submitted
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example1.com
    And I submit the RTM form
    Then I should see the url - http://www.example1.com
    And I should see a link to add additional reports
    When I click on the additional report link
    Then I should see the RTM form
    And I supply the RTM form with the valid url http://www.example2.com
    And I submit the RTM form
    Then I should see the confirmation page
    Then I should see the url - http://www.example1.com
    Then I should see the url - http://www.example2.com
    Then I should see 2 reports for confirmation
    Then I should clear the session
  
