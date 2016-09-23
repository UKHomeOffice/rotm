'use strict';

const proxyquire = require('proxyquire');

describe('Reports Controller', () => {
  const req = {
    params: {}
  };
  const res = {};
  let callback;
  let Controller;
  let controller;
  class ControllerStub {}

  beforeEach(() => {
    ControllerStub.prototype.getValues = sinon.stub();

    Controller = proxyquire('../../../../../apps/rotm/controllers/reports', {
      hof: {
        controllers: {
          base: ControllerStub
        }
      }
    });
    controller = new Controller();
    callback = sinon.stub();
    req.sessionModel = {
      get: sinon.stub().returns([{id: 1}, {id: 2}, {id: 3}]),
      set: sinon.stub(),
      unset: sinon.stub()
    };
  });

  describe('get', () => {
    beforeEach(() => {
      sinon.stub(Controller.prototype, 'delete');
      ControllerStub.prototype.get = sinon.stub();
    });

    afterEach(() => {
      Controller.prototype.delete.restore();
    });

    it('calls delete if action is delete', () => {
      req.params.action = 'delete';
      controller.get(req, res, callback);
      Controller.prototype.delete.should.have.been.calledOnce
        .and.calledWithExactly(req, res, callback);
    });

    it('calls delete if action is delete', () => {
      req.params.action = 'delete';
      controller.get(req, res, callback);
      Controller.prototype.delete.should.have.been.calledOnce
        .and.calledWithExactly(req, res, callback);
    });

    it('calls super.get if action is new', () => {
      req.params.action = 'new';
      controller.get(req, res, callback);
      ControllerStub.prototype.get.should.have.been.calledOnce
        .and.calledWithExactly(req, res, callback);
    });

    it('calls super.get if action is undefined', () => {
      delete req.params.action;
      controller.get(req, res, callback);
      ControllerStub.prototype.get.should.have.been.calledOnce
        .and.calledWithExactly(req, res, callback);
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      res.redirect = sinon.stub();
      ControllerStub.prototype.getNextStep = sinon.stub().returns('next-step');
    });

    it('calls res.redirect with the value of getNextStep', () => {
      controller.delete(req, res, callback);
      res.redirect.should.have.been.calledOnce.and.calledWithExactly('next-step');
    });

    it('removes the report with id from req.params.id and sets to sessionModel', () => {
      req.params.action = 'delete';
      req.params.id = 2;
      controller.delete(req, res, callback);
      req.sessionModel.set.should.have.been.calledWithExactly({
        reports: [{id: 1}, {id: 3}]
      });
    });
  });

  describe('getValues', () => {
    it('calls super if action is not edit', () => {
      req.params.id = 1;
      req.params.action = 'delete';
      controller.getValues(req, res, callback);
      ControllerStub.prototype.getValues.should.have.been.calledOnce;
    });

    it('calls super if id is undefined', () => {
      req.params.action = 'edit';
      delete req.params.id;
      controller.getValues(req, res, callback);
      ControllerStub.prototype.getValues.should.have.been.calledOnce;
    });

    it('calls callback with null, and the report if passed edit and id', () => {
      req.params.action = 'edit';
      req.params.id = 2;
      controller.getValues(req, res, callback);
      callback.should.have.been.calledOnce.and.calledWithExactly(null, {id: 2});
    });
  });

  describe('locals', () => {
    beforeEach(() => {
      ControllerStub.prototype.locals = sinon.stub().returns({});
    });

    it('adds additional-report: true to locals if more than one report', () => {
      controller.locals(req, res, callback)
        .should.have.property('additional-report')
        .and.be.true;
    });

    it('adds additional-report: false to locals if no reports', () => {
      req.sessionModel.get.returns([]);
      controller.locals(req, res, callback)
        .should.have.property('additional-report')
        .and.be.false;
    });

    it('adds editing: true to locals if editing', () => {
      req.params.action = 'edit';
      controller.locals(req, res, callback)
        .should.have.property('editing')
        .and.be.true;
    });

    it('adds editing: false to locals if not editing', () => {
      req.params.action = 'add';
      controller.locals(req, res, callback)
        .should.have.property('editing')
        .and.be.false;
    });
  });

  describe('saveValues', () => {
    beforeEach(() => {
      req.form = {
        values: {
          'field-1': 'value-1',
          'field-2': 'value-2',
          'field-3': 'value-3'
        }
      };
    });

    describe('adding a new item', () => {
      beforeEach(() => {
        delete req.params.action;
        delete req.params.id;
      });

      it('unsets errorValues', () => {
        controller.saveValues(req, res, callback);
        req.sessionModel.unset.should.have.been.calledOnce.and.calledWithExactly('errorValues');
      });

      it('adds a new report to sessionModel', () => {
        controller.saveValues(req, res, callback);
        req.sessionModel.set.should.have.been.calledOnce;
        req.sessionModel.set.args[0][0].reports.length.should.be.equal(4);
      });

      it('sets a uuid on the added report', () => {
        controller.saveValues(req, res, callback);
        const reports = req.sessionModel.set.args[0][0].reports;
        reports[reports.length - 1].should.have.property('id').and.be.a('string');
      });
    });

    describe('editing an existing item', () => {
      beforeEach(() => {
        req.params.action = 'edit';
        req.params.id = 2;
      });

      it('updates the report with the form values', () => {
        controller.saveValues(req, res, callback);
        const reports = req.sessionModel.set.args[0][0].reports;
        const report = reports.find(rp => rp.id === 2);
        report.should.have.property('field-1').and.be.equal('value-1');
        report.should.have.property('field-2').and.be.equal('value-2');
        report.should.have.property('field-3').and.be.equal('value-3');
      });
    });
  });
});
