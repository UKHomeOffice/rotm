'use strict';

const Behaviour = require('../../../../../apps/rotm/behaviours/remove-image');

describe('apps/rotm \'remove-image\' behaviour should ', () => {
    it('exports a function', () => {
      expect(Behaviour).to.be.a('function');
    });

    class Base {
      constructor() {}
      configure() {}
    }

    let req;
    let res;
    let instance;
    const next = 'foo';

    const images = [
        {
            name: 'test1.png',
            mimetype: 'image/png',
            id: 'a1',
            url: 'http://s3.com/foo/0.4283270873546463',
            thumbnail: 'data:image/png;base64,tester1'
        },
        {
            name: 'test2.png',
            mimetype: 'image/png',
            id: 'b2',
            url: 'http://s3.com/foo/0.4283270873546463',
            thumbnail: 'data:image/png;base64,tester2'
        }
    ]

    beforeEach(() => {
        req = reqres.req();
        res = reqres.res();
    })
    describe('The configure method ', () => {
        beforeEach(() => {
            sinon.stub(Base.prototype, 'configure').returns(req, res, next);
            instance = new (Behaviour(Base))();    
          });
        
        it('calls super.configure if no images are to be removed', () => {
            instance.configure(req, res, next);
            expect(Base.prototype.configure).to.have.been.called;
        });
        it('redirects if an image is removed', () => {
            req.sessionModel.set('images', images);
            req.query.delete = images[0].id;
            expect(Base.prototype.configure).to.not.have.been.called;
            //TODO Test for redirect??
        })
        afterEach(() => {
            Base.prototype.configure.restore();
        });
    });
});