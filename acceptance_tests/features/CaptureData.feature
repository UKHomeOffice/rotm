Feature: CaptureData
  Vaid data should be captured and presented for confirmation upon submission

	Scenario: Submission of the form with valid data results in data being re-presented for confirmation
    When I submit the RTM form with valid data
    Then I should see all data for confirmation
