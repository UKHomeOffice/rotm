'use strict';

module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    req.log('info', `Submission ID: ${req.sessionModel.get('submissionID')}, 
                     Contact Details Given: ${req.sessionModel.get('can-we-contact')}`);

    if (req.sessionModel.get('can-we-contact') === 'no') {
      delete req.form.options.sections.contact;
    }
    super.configure(req, res, next);
  }

  locals(req, res) {
    res.locals.images = req.sessionModel.get('images');
    res.locals.urls = req.sessionModel.get('urls');
    return super.locals(req, res);
  }
};
