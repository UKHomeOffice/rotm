Feature: DeleteReport
  Existing reports can be deleted before data is submitted 

	Scenario: The confirmation page provides the ability to delete existing reports
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirmation page
    Then I should see the url - http://www.example.com
    And I should see a link to delete existing reports
    Then I should clear the session

	Scenario: The delete report confirmation form is populated with the report data
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirmation page
    And I should see a link to delete existing reports
    When I click on the first delete report link 
    Then I should see the confirm delete form
    Then I should see the delete url field has been populated
    Then I should clear the session

	Scenario: Deleting all data returns the user to the start page
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    When I click on the additional report link
    Then I should see the RTM form
    And I supply the RTM form with the valid url http://www.example2.com
    And I submit the RTM form
    Then I should see 2 reports for confirmation
    When I click on the first delete report link 
    And I submit the confirm delete form
    When I click on Continue
    Then I should see 1 reports for confirmation
    When I click on the first delete report link 
    And I submit the confirm delete form
    When I click on Continue
    Then I should see the RTM form
  
