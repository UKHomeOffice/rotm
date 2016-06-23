Feature: DeleteReport
  Existing reports can be deleted before data is submitted

	Scenario: The confirm page provides the ability to delete existing reports
    When I load the RTM start page
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirm page
    Then I should see the url - http://www.example.com
    And I should see a link to delete existing reports

	Scenario: Deleting all data returns the user to the start page
    When I load the RTM start page
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    When I click on the additional report link
    Then I should see the RTM form
    And I supply the RTM form with the valid url http://www.example2.com
    And I submit the RTM form
    Then I should see 2 reports for confirm
    When I click on the first delete report link
    Then I should see 1 reports for confirm
    When I click on the first delete report link
    Then I should see the RTM form
