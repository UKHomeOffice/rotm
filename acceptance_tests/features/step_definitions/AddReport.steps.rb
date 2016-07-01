

Then (/^I should see a link to add additional reports$/) do
  page.should have_selector('a#additional-report')
end

When (/^I click on the additional report link$/) do
  click_link('additional-report')
end

Then (/^I should see (.+) reports for confirm$/) do |count|
  expect(page).to have_selector('table.table-details', count: count)
end
