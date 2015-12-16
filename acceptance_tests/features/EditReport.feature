Feature: EditReport
  Exoisting reports can be edited before data is submitted 

	Scenario: The confirmation page provides the ability to edit existing reports
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirmation page
    Then I should see the url - http://www.example.com
    And I should see a link to edit existing reports
    Then I should clear the session

	Scenario: The edit data form is populated with existing report data
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirmation page
    When I click on the first edit report link 
    Then I should see the RTM form
    Then I should see the url field has been populated
    Then I should clear the session

	Scenario: The confirmation page confirms the data has been edited
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirmation page
    When I click on the first edit report link 
    Then I should see the RTM form
    When I supply the RTM form with the valid url http://www.edited-example.com
    And I submit the edited RTM form
    Then I should see the edit confirmed page
    When I click on Continue
    Then I should see the confirmation page
    Then I should see the url - http://www.edited-example.com
    Then I should clear the session
  
