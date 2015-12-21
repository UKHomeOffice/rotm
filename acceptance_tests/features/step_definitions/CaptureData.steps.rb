When(/^I visit the RTM form$/) do
  visit config['rtm_dev_host']
end


When(/^I supply the RTM form with a valid url$/) do
  fill_in('url', :with => 'http://www.blahdeblah.com')
end

When(/^I supply the RTM form with the valid url (.+)$/) do |url|
  fill_in('url', :with => url)
end

When(/^I supply the RTM form with a valid location$/) do
  fill_in('location', :with => 'Some sample location text')
end

When(/^I supply the RTM form with a valid description$/) do
  fill_in('description', :with => 'Some sample description text')
end

When(/^I submit the RTM form$/) do
  click_button('Next step')
end

Then (/^I should see the confirmation page$/) do
  confPage = config['rtm_dev_host'] + "/confirmation"
  current_url.should == confPage
end

Then(/^I should see the url for confirmation$/) do
  page.should have_no_selector('div.validation-summary')
  page.should have_content('http://www.blahdeblah.com') 
end

Then(/^I should see the url - (.+)$/) do |url|
  page.should have_no_selector('div.validation-summary')
  page.should have_content(url) 
end

Then(/^I should see the location for confirmation$/) do
  page.should have_no_selector('div.validation-summary')
  page.should have_content('Some sample location text') 
end

Then(/^I should see the description for confirmation$/) do
  page.should have_no_selector('div.validation-summary')
  page.should have_content('Some sample description text') 
end

When(/^I select the option to remain anonymous$/) do
  anonymous_yes = page.first('input[type="radio"]')[:id]
  anonymous_yes.should == "anonymous-yes"
  choose('anonymous-yes')
end

When(/^I submit the RTM confirmation form$/) do
  click_button('Send report')
end

Then (/^I should see a submission successful message$/) do
  page.should have_selector('div.alert-complete')
end

