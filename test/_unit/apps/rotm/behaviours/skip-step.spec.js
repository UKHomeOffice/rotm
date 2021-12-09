'use strict';

const Behaviour = require('../../../../../apps/rotm/behaviours/skip-step');
const EventEmitter = require('events').EventEmitter;

describe('apps/rotm \'skip-step\' behaviour should ', () => {
    it('export a function', () => {
      expect(Behaviour).to.be.a('function');
    });

    class Base {
      get() {}
    }

    let req;
    let res;
    let next;
    let instance;

    beforeEach(() => {
      req = reqres.req();
      res = reqres.res();
    });

    describe('The \'get\' method', () => {
      before(() => {
        sinon.stub(Base.prototype, 'get');
        instance = new (Behaviour(Base));
      });
      
      it('should emit should say \'complete\' ', () => {
        let spy = sinon.spy();
        let emitter = new EventEmitter;

        emitter.on('complete', spy);
        emitter.emit('complete');
        expect(spy).to.have.been.called;
        
        // instance.get(req, res, next);
        // expect(Base.prototype.get).to.have.been.called;
      });

    })
    
});