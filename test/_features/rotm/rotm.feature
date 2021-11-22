@feature @rotm
Feature: A user should access the correct service and be able to log an issue

    Scenario: I don't have a link to the material and don't have any evidence and don't want to be contacted
        Given I start the 'base' application journey
        Then I should be on the 'evidence-url' page showing 'Do you have a link to the material?'
        Then I check 'evidence-url-no'
        Then I select 'Continue'
        Then I should be on the 'evidence-upload' page showing 'Do you have any evidence?'
        Then I check 'evidence-upload-no'
        Then I select 'Continue'
        Then I should be on the 'evidence-written' page showing 'Is there anything else you can tell us?'
        Then I fill 'evidence-written' text area with 'Test material and test description and test details.'
        Then I select 'Continue'
        Then I should be on the 'can-we-contact' page showing 'Are you willing to be contacted, if necessary?'
        Then I check 'can-we-contact-no'
        Then I select 'Continue'
        Then I should be on the 'check-your-report' page showing 'Check your report'
        Then I click the 'send report' button

    Scenario: I don't have a link to the material and don't have any evidence but do want to be contacted
        Given I start the 'base' application journey
        Then I should be on the 'evidence-url' page showing 'Do you have a link to the material?'
        Then I check 'evidence-url-no'
        Then I select 'Continue'
        Then I should be on the 'evidence-upload' page showing 'Do you have any evidence?'
        Then I check 'evidence-upload-no'
        Then I select 'Continue'
        Then I should be on the 'evidence-written' page showing 'Is there anything else you can tell us?'
        Then I fill 'evidence-written' text area with 'Test material and test description and test details.'
        Then I select 'Continue'
        Then I should be on the 'can-we-contact' page showing 'Are you willing to be contacted, if necessary?'
        Then I check 'can-we-contact-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are your contact details?'
        Then I fill 'contact-details-name' with 'Ronald Testman'
        Then I check 'contact-details-method-email'
        Then I fill 'contact-email' with 'test@test.test'
        Then I select 'Continue'
        Then I should be on the 'check-your-report' page showing 'Check your report'
        Then I click the 'send report' button
        
    Scenario: I don't have a link to the material but do have evidence but don't want to be contacted
        Given I start the 'base' application journey
        Then I should be on the 'evidence-url' page showing 'Do you have a link to the material?'
        Then I check 'evidence-url-no'
        Then I select 'Continue'
        Then I should be on the 'evidence-upload' page showing 'Do you have any evidence?'
        Then I check 'evidence-upload-yes'        
        Then I should see 'Choose file to upload' on the page
        Then I upload the 'testPath/test.png' file
        Then I select 'Continue'
        Then I should be on the 'evidence-upload-confirm' page showing 'Do you want to upload another file?'
        Then I should see 'Files added' on the page
        Then I check 'evidence-upload-more-no'
        Then I select 'Continue'
        Then I should be on the 'evidence-written' page showing 'Is there anything else you can tell us?'
        Then I select 'Continue'
        Then I should be on the 'can-we-contact' page showing 'Are you willing to be contacted, if necessary?'
        Then I check 'can-we-contact-no'
        Then I select 'Continue'
        Then I should be on the 'check-your-report' page showing 'Check your report'
        Then I click the 'send report' button

     Scenario: I don't have a link to the material but do have evidence and want to be contacted by email
        Given I start the 'base' application journey
        Then I should be on the 'evidence-url' page showing 'Do you have a link to the material?'
        Then I check 'evidence-url-no'
        Then I select 'Continue'
        Then I should be on the 'evidence-upload' page showing 'Do you have any evidence?'
        Then I check 'evidence-upload-yes'        
        Then I should see 'Choose file to upload' on the page
        Then I upload the 'testPath/test.png' file
        Then I select 'Continue'
        Then I should be on the 'evidence-upload-confirm' page showing 'Do you want to upload another file?'
        Then I should see 'Files added' on the page
        Then I check 'evidence-upload-more-no'
        Then I select 'Continue'
        Then I should be on the 'evidence-written' page showing 'Is there anything else you can tell us?'
        Then I select 'Continue'
        Then I should be on the 'can-we-contact' page showing 'Are you willing to be contacted, if necessary?'
        Then I check 'can-we-contact-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are your contact details?'
        Then I fill 'contact-details-name' with 'Ronald Testman'
        Then I check 'contact-details-method-email'
        Then I fill 'contact-email' with 'test@test.test'
        Then I select 'Continue'
        Then I should be on the 'check-your-report' page showing 'Check your report'
        Then I click the 'send report' button

    Scenario: I don't have a link to the material but do have evidence and want to be contacted by telephone
        Given I start the 'base' application journey
        Then I should be on the 'evidence-url' page showing 'Do you have a link to the material?'
        Then I check 'evidence-url-no'
        Then I select 'Continue'
        Then I should be on the 'evidence-upload' page showing 'Do you have any evidence?'
        Then I check 'evidence-upload-yes'        
        Then I should see 'Choose file to upload' on the page
        Then I upload the 'testPath/test.png' file
        Then I select 'Continue'
        Then I should be on the 'evidence-upload-confirm' page showing 'Do you want to upload another file?'
        Then I should see 'Files added' on the page
        Then I check 'evidence-upload-more-no'
        Then I select 'Continue'
        Then I should be on the 'evidence-written' page showing 'Is there anything else you can tell us?'
        Then I select 'Continue'
        Then I should be on the 'can-we-contact' page showing 'Are you willing to be contacted, if necessary?'
        Then I check 'can-we-contact-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are your contact details?'
        Then I fill 'contact-details-name' with 'Ronald Testman'
        Then I check 'contact-details-method-phone'
        # SHOULD THE LINE BELOW MIRROR THE SAME NUMBER AS IN BRP?
        # CURRENTLY THE VALIDATOR INHIBITS INPUTING 071234567890
        Then I fill 'contact-phone' with '07123456789'
        Then I select 'Continue'
        Then I should be on the 'check-your-report' page showing 'Check your report'
        Then I click the 'send report' button
        
    Scenario: I have a link to the material but don't have any evidence and there's no more information and I don't want to be contacted
        Given I start the 'base' application journey
        Then I should be on the 'evidence-url' page showing 'Do you have a link to the material?'
        Then I check 'evidence-url-yes'
        Then I fill 'url' text area with 'www.test.com'
        Then I select 'Continue'
        Then I should be on the 'evidence-upload' page showing 'Do you have any evidence?'
        Then I check 'evidence-upload-no'   
        Then I select 'Continue'
        Then I should be on the 'evidence-written' page showing 'Is there anything else you can tell us?'
        Then I fill 'evidence-written' text area with ''
        Then I select 'Continue'
        Then I should be on the 'can-we-contact' page showing 'Are you willing to be contacted, if necessary?'
        Then I check 'can-we-contact-no'
        Then I select 'Continue'
        Then I should be on the 'check-your-report' page showing 'Check your report'
        Then I click the 'send report' button

    Scenario: I have a link to the material but don't have any evidence and there's no more information and I want to be contacted by email
        Given I start the 'base' application journey
        Then I should be on the 'evidence-url' page showing 'Do you have a link to the material?'
        Then I check 'evidence-url-yes'
        Then I fill 'url' text area with 'www.test.com'
        Then I select 'Continue'
        Then I should be on the 'evidence-upload' page showing 'Do you have any evidence?'
        Then I check 'evidence-upload-no'   
        Then I select 'Continue'
        Then I should be on the 'evidence-written' page showing 'Is there anything else you can tell us?'
        Then I fill 'evidence-written' text area with ''
        Then I select 'Continue'
        Then I should be on the 'can-we-contact' page showing 'Are you willing to be contacted, if necessary?'
        Then I check 'can-we-contact-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are your contact details?'
        Then I fill 'contact-details-name' with 'Ronald Testman'
        Then I check 'contact-details-method-email'
        Then I should see 'Email address' on the page
        Then I fill 'contact-email' with 'test@test.test'
        Then I select 'Continue'
        Then I should be on the 'check-your-report' page showing 'Check your report'
        Then I click the 'send report' button

    Scenario: I have a link to the material but don't have any evidence and there isn't any more information and I want to be contacted by phone
        Given I start the 'base' application journey
        Then I should be on the 'evidence-url' page showing 'Do you have a link to the material?'
        Then I check 'evidence-url-yes'
        Then I fill 'url' text area with 'www.test.com'
        Then I select 'Continue'
        Then I should be on the 'evidence-upload' page showing 'Do you have any evidence?'
        Then I check 'evidence-upload-no'   
        Then I select 'Continue'
        Then I should be on the 'evidence-written' page showing 'Is there anything else you can tell us?'
        Then I fill 'evidence-written' text area with ''
        Then I select 'Continue'
        Then I should be on the 'can-we-contact' page showing 'Are you willing to be contacted, if necessary?'
        Then I check 'can-we-contact-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are your contact details?'
        Then I fill 'contact-details-name' with 'Ronald Testman'
        Then I check 'contact-details-method-phone'
        Then I should see 'Telephone number' on the page
        # SHOULD THE LINE BELOW MIRROR THE SAME NUMBER AS IN BRP?
        # CURRENTLY THE VALIDATOR INHIBITS INPUTING 071234567890
        Then I fill 'contact-phone' with '07123456789'
        Then I select 'Continue'
        Then I should be on the 'check-your-report' page showing 'Check your report'
        Then I click the 'send report' button

    Scenario: I have a link to the material and evidence but don't have any more information and don't want to be contacted
        Given I start the 'base' application journey
        Then I should be on the 'evidence-url' page showing 'Do you have a link to the material?'
        Then I check 'evidence-url-yes'
        Then I should see 'Link' on the page
        Then I fill 'url' text area with 'www.test.com'
        Then I select 'Continue'
        Then I should be on the 'evidence-upload' page showing 'Do you have any evidence?'
        Then I check 'evidence-upload-yes'        
        Then I should see 'Choose file to upload' on the page
        Then I upload the 'testPath/test.png' file
        Then I select 'Continue'
        Then I should be on the 'evidence-upload-confirm' page showing 'Do you want to upload another file?'
        Then I should see 'Files added' on the page
        Then I check 'evidence-upload-more-no'
        Then I select 'Continue'
        Then I should be on the 'evidence-written' page showing 'Is there anything else you can tell us?'
        Then I select 'Continue'
        Then I should be on the 'can-we-contact' page showing 'Are you willing to be contacted, if necessary?'
        Then I check 'can-we-contact-no'
        Then I select 'Continue'
        Then I should be on the 'check-your-report' page showing 'Check your report'
        Then I click the 'send report' button

    Scenario: I have a link to the material and evidence and want to be contacted by email
        Given I start the 'base' application journey
        Then I should be on the 'evidence-url' page showing 'Do you have a link to the material?'
        Then I check 'evidence-url-yes'
        Then I should see 'Link' on the page
        Then I fill 'url' text area with 'www.test.com'
        Then I select 'Continue'
        Then I should be on the 'evidence-upload' page showing 'Do you have any evidence?'
        Then I check 'evidence-upload-yes'        
        Then I should see 'Choose file to upload' on the page
        Then I upload the 'testPath/test.png' file
        Then I select 'Continue'
        Then I should be on the 'evidence-upload-confirm' page showing 'Do you want to upload another file?'
        Then I should see 'Files added' on the page
        Then I check 'evidence-upload-more-no'
        Then I select 'Continue'
        Then I should be on the 'evidence-written' page showing 'Is there anything else you can tell us?'
        Then I select 'Continue'
        Then I should be on the 'can-we-contact' page showing 'Are you willing to be contacted, if necessary?'
        Then I check 'can-we-contact-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are your contact details?'
        Then I fill 'contact-details-name' with 'Ronald Testman'
        Then I check 'contact-details-method-email'
        Then I fill 'contact-email' with 'test@test.test'
        Then I select 'Continue'
        Then I should be on the 'check-your-report' page showing 'Check your report'
        Then I click the 'send report' button

    Scenario: I have a link to the material and evidence and want to be contacted by phone
        Given I start the 'base' application journey
        Then I should be on the 'evidence-url' page showing 'Do you have a link to the material?'
        Then I check 'evidence-url-yes'
        Then I should see 'Link' on the page
        Then I fill 'url' text area with 'www.test.com'
        Then I select 'Continue'
        Then I should be on the 'evidence-upload' page showing 'Do you have any evidence?'
        Then I check 'evidence-upload-yes'        
        Then I should see 'Choose file to upload' on the page
        Then I upload the 'testPath/test.png' file
        Then I select 'Continue'
        Then I should be on the 'evidence-upload-confirm' page showing 'Do you want to upload another file?'
        Then I should see 'Files added' on the page
        Then I check 'evidence-upload-more-no'
        Then I select 'Continue'
        Then I should be on the 'evidence-written' page showing 'Is there anything else you can tell us?'
        Then I select 'Continue'
        Then I should be on the 'can-we-contact' page showing 'Are you willing to be contacted, if necessary?'
        Then I check 'can-we-contact-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are your contact details?'
        Then I fill 'contact-details-name' with 'Ronald Testman'
        Then I check 'contact-details-method-phone'
        Then I should see 'Telephone number' on the page
        # SHOULD THE LINE BELOW MIRROR THE SAME NUMBER AS IN BRP?
        # CURRENTLY THE VALIDATOR INHIBITS INPUTING 071234567890
        Then I fill 'contact-phone' with '07123456789'
        Then I select 'Continue'
        Then I should be on the 'check-your-report' page showing 'Check your report'
        Then I click the 'send report' button
        