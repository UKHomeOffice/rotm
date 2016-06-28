Feature: CaptureData
  Valid data should be captured and presented for confirm upon submission

	Scenario: Submission of the form with a valid url results in the url being re-presented for confirm
    When I load the RTM start page
    And I supply the RTM form with a valid url
    And I submit the RTM form
    Then I should see the confirm page
    Then I should see the url for confirm

	Scenario: Submission of the form with a valid url + location results in the location being re-presented for confirm
    When I load the RTM start page
    And I supply the RTM form with a valid url
    And I supply the RTM form with a valid location
    And I submit the RTM form
    Then I should see the confirm page
    Then I should see the location for confirm

	Scenario: Submission of the form with a valid url + description results in the location being re-presented for confirm
    When I load the RTM start page
    And I supply the RTM form with a valid url
    And I supply the RTM form with a valid description
    And I submit the RTM form
    Then I should see the confirm page
    Then I should see the description for confirm

  @capture @complete
	Scenario: Submission of the form with a valid url + contact-details results a submission successful message
    When I load the RTM start page
    And I supply the RTM form with a valid url
    And I submit the RTM form
    And I select the option to remain anonymous
    And I submit the RTM confirm form
    Then I should see a submission successful message
