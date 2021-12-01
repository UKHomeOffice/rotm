'use strict';

// TODO Why are test files not loading from setup.js
const Behaviour = require('../../../../../apps/rotm/behaviours/caseworker-email');
const Emailer = require('hof').components.emailer;
const expect = require('chai').expect;
const chai = require('chai').use(require('sinon-chai'));
const sinon = require('sinon');
const config = require('../../../../../config');

describe('apps/rotm \'caseworker-email\' behaviour should ', () => {
    it('exports a function', () => {
        expect(Behaviour).to.be.a('function');
    });

    let behaviourSpy;
    let emailerSpy;
    let settings = config.email;


    describe('Emailer', () => {
        beforeEach(() => {
            behaviourSpy = sinon.spy(Behaviour);
            emailerSpy = sinon.spy(Emailer);
            behaviourSpy(settings);
        });

        it('Checks \'caseworker-email\' is being called', () => {
            expect(behaviourSpy).to.have.been.called;
        });

        //TODO Emailer middleware not being called?
        it('Checks \'Emailer component\' is being called', () => {
            expect(emailerSpy).to.have.been.called;
        });

        //TODO 'TypeError: Cannot read property \'transport\' of undefined' is being triggered. Suspect something to do with importing Emailer model?        
        it('does not throw an error', () => {
            expect(behaviourSpy).to.not.throw();
        })
    });
});

