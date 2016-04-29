

Then (/^I should see a link to delete existing reports$/) do
  page.should have_selector('span.remove-url-anchor a') 
end

When (/^I click on the first delete report link$/) do
  Capybara.match = :first
  page.should have_selector('span.remove-url-anchor a') 
  find('span.remove-url-anchor a').trigger('click')
end

Then (/^I should see the confirm delete form$/) do
  page.should have_selector('form')
  page.should have_content('Confirm removal of report')
end

When(/^I submit the confirm delete form$/) do
  click_button('Delete')
end

Then (/^I should see the delete url field has been populated$/) do 
  expect(find('form')).to have_selector('.data-wrap p')
  find('form').find('.data-wrap p').text != ''  
end

Then (/^I should see the delete confirmed page$/) do
  page.should have_selector('input[value="Continue"]')   
end
