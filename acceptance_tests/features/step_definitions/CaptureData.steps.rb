When(/^I submit the RTM form with valid data$/) do
  visit config['rtm_dev_host']
  fill_in('website_url', :with => 'http://www.blahdeblah.com')
  click_button('Submit')
end

Then(/^I should see all data for confirmation$/) do
  page.should have_no_selector('div.validation-summary')
  page.should have_content('http://www.blahdeblah.com') 
end
