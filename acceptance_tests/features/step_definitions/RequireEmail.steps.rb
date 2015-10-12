When(/^I submit the RTM form without a website url$/) do
  visit config['rtm_dev_host']
  fill_in('url', :with => '')
  click_button('Next step')
end

Then(/^I should see error messages$/) do
  page.should have_selector('div.validation-summary')
  expect(find('div.validation-summary')).to have_selector('ul li a')
  find('div.validation-summary').should have_xpath("//a[@href='#url-group']") 
end
