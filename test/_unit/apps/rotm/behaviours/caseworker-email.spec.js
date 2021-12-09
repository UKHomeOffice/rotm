'use strict';

const { expect } = require('chai');
const Behaviour = require('../../../../../apps/rotm/behaviours/caseworker-email');

describe.skip('apps/rotm \'caseworker-email\' behaviour should ', () => {
    it('exports a function', () => {
        expect(Behaviour).to.be.a('function');
    });

    class Base {
        constructor() {}
      }

    let behaviourSpy;
    let settings = {
        from: 'h@h.com',
        replyTo: 'd@d.com',
        region: 'fakestring',
        transport: 'stub',
        caseworker: 'caseWorker@caseWorkder.com',
        transportOptions: {
          accessKeyId: 'fakeemail',
          secretAccessKey: 'randompass',
          port: '',
          host: '',
          ignoreTLS: '',
          secure: false
        }
    };

    let req;
    let res;
    let next = 'foo';
    let instance;
    let instanceSpy

    beforeEach(() => {
        req = reqres.req();
        res = reqres.res();
    })

    describe('Checks \'caseworker-email\' ', () => {
        beforeEach(() => {
            instance = Behaviour(settings);
            instanceSpy = sinon.spy(instance);
            instance();
        });

        it('is being called', () => {
            expect(instanceSpy).to.be.called;
        });
    });
});

