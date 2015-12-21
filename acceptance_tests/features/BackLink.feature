Feature: BackLink
  The back link points to the correct page 

  @back
	Scenario: There is no back link on the ROTM form on first load
    When I visit the RTM form
    Then I should not see the back link
    Then I should clear the session
  
  @back
	Scenario: There is no back link on the ROTM form on if invalid data is provided on first attempt
    When I submit the RTM form without a website url 
    Then I should not see the back link
    Then I should clear the session
  
  @back
	Scenario: There is no back link on the ROTM form on if there are no reports previously entered
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    When I click on the first delete report link 
    And I submit the confirm delete form
    When I click on Continue
    Then I should see the RTM form
    Then I should not see the back link
    Then I should clear the session
  
  @back
	Scenario: There is a back link on the ROTM confirmation form which leads to the RTM form
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the back link
    And I should click on back link
    Then I should see the RTM form
    Then I should clear the session
  
  @back @delete
	Scenario: The back link in the 'delete report journey' leads to the confirmation page unless all reports are deleted
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the back link
    When I click on the first delete report link 
    Then I should see the back link
    And I should click on back link
    Then I should see the confirmation page
    When I click on the first delete report link 
    And I submit the confirm delete form
    Then I should see the back link
    And I should click on back link
    Then I should see the start again page
    Then I should see the back link
    And I should click on back link
    Then I should see the RTM form
    Then I should not see the back link
    Then I should clear the session
  
  @back @edit
	Scenario: The back link in the 'edit report journey' leads to the confirmation page 
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the back link
    When I click on the first edit report link 
    Then I should see the back link
    And I should click on back link
    Then I should see the confirmation page
    When I click on the first edit report link 
    When I supply the RTM form with the valid url http://www.edited-example.com
    And I submit the edited RTM form
    Then I should see the edit confirmed page
    Then I should see the back link
    And I should click on back link
    Then I should see the confirmation page
    Then I should clear the session
  
  @back @add
	Scenario: The back link in the 'add report journey' leads to the confirmation page 
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the back link
    And I should see a link to add additional reports
    When I click on the additional report link
    Then I should see the RTM form
    Then I should see the back link
    And I should click on back link
    Then I should see the confirmation page
    When I click on the additional report link
    Then I should see the RTM form
    When I supply the RTM form with the valid url http://www.edited-example.com
    And I submit the RTM form
    Then I should see the back link
    And I should click on back link
    Then I should see the RTM form
    Then I should clear the session

  @back @complete
	Scenario: There is no back link after the submission of the data 
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirmation page
    When I select the option to remain anonymous
    And I submit the RTM confirmation form
    Then I should not see the back link
    Then I should clear the session
  
  @back @cookie
	Scenario: The back link on the cookie page leads you to the RTM form when there are no reports 
    When I visit the RTM form
    And I visit the cookie page
    Then I should see the back link
    And I should click on back link
    Then I should see the RTM form
    Then I should clear the session
  
  @back @cookie
	Scenario: The back link on the cookie page leads you to the confirmation form when there are already existing reports 
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    And I visit the cookie page
    Then I should see the back link
    And I should click on back link
    Then I should see the confirmation page
    Then I should clear the session

  @back @terms
	Scenario: The back link on the T&C page leads you to the RTM form when there are no reports 
    When I visit the RTM form
    And I visit the terms page
    Then I should see the back link
    And I should click on back link
    Then I should see the RTM form
    Then I should clear the session
  
  @back @terms
	Scenario: The back link on the T&C page leads you to the confirmation form when there are already existing reports 
    When I visit the RTM form
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    And I visit the terms page
    Then I should see the back link
    And I should click on back link
    Then I should see the confirmation page
    Then I should clear the session
  
