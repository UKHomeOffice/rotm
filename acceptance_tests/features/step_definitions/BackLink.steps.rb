Then (/^I should not see the back link$/) do
  page.should have_no_selector('a.back-link')   
end


Then (/^I should see the back link$/) do
  page.should have_selector('a.back-link')   
  page.should have_content('Back')   
end

And (/^I should click on back link$/) do
  within('span#step') do
    click_link('Back')
  end
end

