'use strict';

Feature('Check your report');

Scenario('Optional fields show as "Not given" on summary page', (
  I
) => {
  I.amOnPage('/');
  I.completeToStep('/check-your-report', {
    source: 'Facebook',
    'more-info': ''
  });
  I.see('Not given', 'td[data-field="more-info"]');
});

Scenario('I can edit "more info" field and return to summary page', (
  I
) => {
  I.amOnPage('/');
  I.completeToStep('/check-your-report', {
    source: 'Facebook',
    'more-info': ''
  });
  I.click('#more-info-change');
  I.seeInCurrentUrl('/more-info');
  // work around bug in phantom tht won't fill <textarea>s if they have focus
  I.click('body');
  I.fillField('more-info', 'Some information');
  I.click('input[type="submit"]');
  I.seeInCurrentUrl('/check-your-report');
  I.see('Some information', 'td[data-field="more-info"]');
});

Scenario('I can edit "source" field and return to summary page', (
  I
) => {
  I.amOnPage('/');
  I.completeToStep('/check-your-report', {
    source: 'Facebook',
    'more-info': ''
  });
  I.click('#source-change');
  I.seeInCurrentUrl('/source');
  I.fillField('source', 'A different source');
  I.click('input[type="submit"]');

  I.seeInCurrentUrl('/check-your-report');
  I.see('A different source', 'td[data-field="source"]');
});
