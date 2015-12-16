

When (/^I visit the confirmation page$/) do
  visit config['rtm_dev_host'] + '/confirmation'
end

Then (/^I should see the start again page$/) do
  page.should have_selector('div.start-again')   
  page.should have_content('Start again')   
end



