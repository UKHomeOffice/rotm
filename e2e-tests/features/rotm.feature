@RotmRegression
Feature: ROTM - Report Online Material Promoting Terrorism or Extremism

  Background:
    Given Test data has been created for "ROTM" scenarios

  @RotmRegressionCI
  Scenario Outline: Report Online Material Test 1 - E2E
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    And I visit the Rotm page
    Then I see the Rotm header link service name "Report online material promoting terrorism or extremism"
    When I fill out my answers for the Rotm questionnaire
    Then I check my report for Rotm
    And I am able to submit the Rotm questionnaire
    Examples:
      | Scenario ID | Description                                                                                                                              |
      | 1           | S1 - Have (0 additional) link to the material - Have evidence - Another file-Yes - Email contact                                         |
      | 2           | S3 - Have (4 additional) links to the material-remove links and add again - Have evidence - Another file-Yes- Email & Telephone contacts |
      | 3           | S4 - Have (3 additional) links to the material - Have evidence - Another file-Yes - No contact                                           |
      | 4           | S8 - Have (1 additional) link to the material - No evidence - Another file-Yes - Email & Telephone contacts                              |
      | 5           | S9 - Don't have link - Have evidence - Another file-Yes - Email contact                                                                  |
      | 6           | S16 - Don't have link - No evidence - Yes contact - Email & Telephone contacts                                                           |


  Scenario Outline: Report Online Material Test 2 - E2E
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    And I visit the Rotm page
    Then I see the Rotm header link service name "Report online material promoting terrorism or extremism"
    When I fill out my answers for the Rotm questionnaire
    Then I check my report for Rotm
    And I am able to submit the Rotm questionnaire
    Examples:
      | Scenario ID | Description                                                                                         |
      | 7           | S2 - Have (0 additional) link to the material - Have evidence - Another file-Yes- Telephone contact |
      | 8           | S5 - Have (2 additional) links to the material - Have evidence - Another file-No - No contact       |
      | 9           | S6 - Have (1 additional) link to the material - No evidence - Another file-Yes - Email contact      |
      | 10          | S7 - Have (1 additional) link to the material - No evidence - Another file-Yes - Telephone contact  |
      | 11          | S10 - Don't have link - Have evidence - Another file-Yes - Telephone contact                        |
      | 12          | S11 - Don't have link - Have evidence - Another file-Yes - Email & Telephone contacts               |
      | 13          | S12 - Don't have link - Have evidence - Another file-Yes - No contact                               |
      | 14          | S13 - Don't have link - Have evidence - Another file-No - No contact                                |
      | 15          | S14 - Don't have link - No evidence - Yes contact - Email contact                                   |
      | 16          | S15 - Don't have link - No evidence - Yes contact - Telephone contact                               |
      | 17          | S17 - Don't have link - No evidence - No contact                                                    |


  Scenario: Report Online Material- change report details - E2E
    Given I selected the data for scenario "1" - "S1 - Have (0 additional) link to the material - Have evidence - Another file-Yes - Email contact"
    And I visit the Rotm page
    Then I see the Rotm header link service name "Report online material promoting terrorism or extremism"
    When I fill out my answers for the Rotm questionnaire
    Then I check my report for Rotm
    When I add 2 additional links to my report and continue
    Then I check the change is updated to 3 links on the 'Check your report' page and continue
    And I am able to submit the Rotm questionnaire