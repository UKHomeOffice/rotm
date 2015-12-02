

Then (/^I should see a link to add additional reports$/) do
  page.should have_selector('a#additional-report') 
end

When (/^I click on the additional report link$/) do
  click_link('additional-report')
end

Then (/^I should see multiple reports for confirmation$/) do 
  reports = Array.new
  reports = all('fieldset.data-preview')
  reports.size.should >= 1
end
