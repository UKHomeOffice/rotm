When(/^I load the RTM start page$/) do
  visit config['rtm_dev_host']
  page.status_code.should == 200
end

Then(/^I should see the RTM form$/) do
  page.should have_selector('form')
  expect(find('form')).to have_selector('fieldset')
  expect(find('form').find('fieldset')).to have_selector('legend.visuallyhidden')
end
