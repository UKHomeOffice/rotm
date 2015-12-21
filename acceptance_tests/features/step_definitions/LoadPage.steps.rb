When(/^I load the RTM start page$/) do
  visit config['rtm_dev_host']
  page.status_code.should == 200
end

Then(/^I should see the RTM form$/) do
  page.should have_selector('form')
  expect(find('form')).to have_selector('#url-group')
  expect(find('form').find('#url-group')).to have_selector('input#url')
end

Then(/^I visit the cookie page$/) do
  visit config['rtm_dev_host'] + '/cookies'
  page.status_code.should == 200
  page.should have_content('Cookies');
end

Then(/^I visit the terms page$/) do
  visit config['rtm_dev_host'] + '/terms-and-conditions'
  page.status_code.should == 200
  page.should have_content('Terms and conditions');
end
