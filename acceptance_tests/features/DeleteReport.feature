Feature: DeleteReport
  Existing reports can be deleted before data is submitted 

	Scenario: The confirmation page provides the ability to delete existing reports
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirmation page
    Then I should see the url - http://www.example.com
    And I should see a link to delete existing reports

	Scenario: The delete report confirmation form is populated with the report data
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirmation page
    And I should see a link to delete existing reports
    When I click on the first delete report link 
    Then I should see the confirm delete form
    Then I should see the delete url field has been populated

	Scenario: The confirmation page confirms the data has been deleted
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirmation page
    And I should see a link to delete existing reports
    When I click on the first delete report link 
    Then I should see the confirm delete form
    Then I should see the delete url field has been populated
    And I submit the confirm delete form
    Then I should see the delete confirmed page
    When I click on Continue
    Then I should see the confirmation page
  
