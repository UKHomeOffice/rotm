

Then (/^I should see a link to edit existing reports$/) do
  page.should have_selector('a.edit-btn') 
end

When (/^I click on the first edit report link$/) do
  Capybara.match = :first
  click_link('Change')
end

When(/^I submit the edited RTM form$/) do
  click_button('Edit')
end

Then (/^I should see the url field has been populated$/) do 
  find('input#url').text != ''
end

Then (/^I should see the edit confirmed page$/) do
  page.should have_selector('input[value="Continue"]')   
end

When (/^I click on Continue$/) do
  click_button('Continue')
end
