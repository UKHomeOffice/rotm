@RotmRegression
Feature: ROTM - Report Online Material Promoting Terrorism or Extremism


  @RotmRegressionCI
  Scenario Outline: Report Online Material Test - E2E
    Given I visit the Rotm page
    Then I see the Rotm header link service name "Report online material promoting terrorism or extremism"
    When I fill out the answers to Rotm form pertaining to "<Description>"
    Then I am navigated to "Check your report" page
    When I choose to submit the Rotm questionnaire
    Then I am navigated to "Report sent" page
    Examples:
      | Description                                                                                                                              |
      | S1 - Have (0 additional) link to the material - Have evidence - Another file-Yes - Email contact                                         |
      | S2 - Have (0 additional) link to the material - Have evidence - Another file-Yes- Telephone contact                                      |
      | S3 - Have (4 additional) links to the material-remove links and add again - Have evidence - Another file-Yes- Email & Telephone contacts |
      | S4 - Have (3 additional) links to the material - Have evidence - Another file-Yes - No contact                                           |
      | S5 - Have (2 additional) links to the material - Have evidence - Another file-No - No contact                                            |
      | S6 - Have (1 additional) link to the material - No evidence - Another file-Yes - Email contact                                           |
      | S7 - Have (1 additional) link to the material - No evidence - Another file-Yes - Telephone contact                                       |
      | S8 - Have (1 additional) link to the material - No evidence - Another file-Yes - Email & Telephone contacts                              |
      | S9 - Don't have link - Have evidence - Another file-Yes - Email contact                                                                  |
      | S10 - Don't have link - Have evidence - Another file-Yes - Telephone contact                                                             |
      | S11 - Don't have link - Have evidence - Another file-Yes - Email & Telephone contacts                                                    |
      | S12 - Don't have link - Have evidence - Another file-Yes - No contact                                                                    |
      | S13 - Don't have link - Have evidence - Another file-No - No contact                                                                     |
      | S14 - Don't have link - No evidence - Yes contact - Email contact                                                                        |
      | S15 - Don't have link - No evidence - Yes contact - Telephone contact                                                                    |
      | S16 - Don't have link - No evidence - Yes contact - Email & Telephone contacts                                                           |
      | S17 - Don't have link - No evidence - No contact                                                                                         |



  Scenario: Report Online Material- change report details - E2E
    Given I visit the Rotm page
    Then I see the Rotm header link service name "Report online material promoting terrorism or extremism"
    When I fill out the answers to Rotm form pertaining to "S1 - Have (0 additional) link to the material - Have evidence - Another file-Yes - Email contact"
    Then I am navigated to "Check your report" page
    When I add 2 additional links to my report and continue
    Then I check the change is updated to 3 links on the 'Check your report' page and continue
    When I choose to submit the Rotm questionnaire
    Then I am navigated to "Report sent" page
