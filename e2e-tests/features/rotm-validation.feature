@RotmRegression

Feature: ROTM - Report Online Material Promoting Terrorism or Extremism

  Background:
    Given Test data has been created for "ROTM" scenarios


  Scenario: ROTM - Field page validation error message
    Given I selected the data for scenario "1" - "S1 - Have (0 additional) link to the material - Have evidence - Another file-Yes - Email contact"
    And I visit the Rotm page
    When I select continue
    Then I see "There is a problem" error header message displayed for ROTM
    And I see "Select whether you have a link to the material or not" error message displayed for ROTM
    When I select "Yes, I have a link to the material" link to material and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ROTM
    And I see "Select whether you have some evidence you can share" error message displayed for ROTM
    When I select "Yes, I have evidence" for evidence and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ROTM
    And I see "Select whether you have any more evidence you can share" error message displayed for ROTM
    When I select "No" for more evidence and click continue
    And I select continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ROTM
    And I see "Select whether or not you’re willing to share your contact details" error message displayed for ROTM
    When I select "Yes, I’ll give my contact details" to give contact details and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for ROTM
    And I see error message displayed for ROTM
          """
          Enter your full name
          Select how you would like to be contacted
          """
    When I enter my contact details for ROTM and click continue
    Then I am on the 'Check your report' page