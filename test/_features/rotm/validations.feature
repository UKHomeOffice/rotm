@feature @validations
Feature: A user should see error messages for the following scenarios

    Scenario: I enter an invalid URL links for the evidence url page
        Given I start the 'base' application journey
        Then I should be on the 'evidence-url' page showing 'Do you have a link to the material?'
        Then I check 'evidence-url-yes'
        Then I should see 'Link' on the page
        Then I fill 'url' text area with 'abc123'
        Then I select 'Continue'
        Then I should see the 'Please enter a valid URL link' error
        Then I fill 'url' text area with 'https:/google.com44'
        Then I select 'Continue'
        Then I should see the 'Please enter a valid URL link' error
        Then I fill 'url' text area with 'https://missing-www'
        Then I select 'Continue'
        Then I should see the 'Please enter a valid URL link' error
        Then I fill 'url' text area with 'www.gov.'
        Then I select 'Continue'
        Then I should see the 'Please enter a valid URL link' error
        Then I fill 'url' text area with 'www.gov.uk'
        Then I click the 'add another link' button
        Then I fill 'another-url-1' text area with 'www.example.'
        Then I select 'Continue'
        Then I should see the 'Please enter a valid URL link' error
        Then I click the 'add another link' button
        Then I fill 'url' text area with 'www.gov.uk'
        Then I fill 'another-url-1' text area with 'www.example.com'
        Then I select 'Continue'
        Then I should be on the 'evidence-upload' page showing 'Do you have any evidence?'
