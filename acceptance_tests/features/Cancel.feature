Feature: Cancel
  The cancel button links to the correct page

    @cancel
    Scenario: The cancel button on the Edit Report page takes you back to the confirmation page
    When I load the RTM start page
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirm page
    When I click on the first edit report link
    Then I click the cancel button
    Then I should see the confirm page

    @cancel
    Scenario: The cancel button on the Add Another Report page takes you back to the confirmation page
    When I load the RTM start page
    And I supply the RTM form with the valid url http://www.example.com
    And I submit the RTM form
    Then I should see the confirm page
    When I click on the additional report link
    Then I click the cancel button
    Then I should see the confirm page
