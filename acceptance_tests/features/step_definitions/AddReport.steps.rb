

Then (/^I should see a link to add additional reports$/) do
  page.should have_selector('a#additional-report') 
end

When (/^I click on the additional report link$/) do
  click_link('additional-report')
end

Then (/^I should see (.+) reports for confirmation$/) do |count|
  reports = Array.new
  reports = all('fieldset.data-preview')
  reports.size.should == count.to_i
end

Then (/^I should clear the session$/) do 
  visit config['rtm_dev_host'] + "/reset"
  page.status_code.should == 200
  click_button('Reset')
  page.status_code.should == 302
end
