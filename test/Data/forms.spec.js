import expect from 'must';
import nock from 'nock';

import {Eloqua, getOptions} from '../helpers/common';
import {assetsFormsResponse} from '../helpers/mocksSuccess';
import {assertSuccessful} from '../helpers/callbacks';

nock.disableNetConnect();

/** @test {Forms} */
describe('Form Tests', () => {
  let eloqua;
  let forms;

  beforeEach(function(done) {
    forms = assetsFormsResponse();
    return setTimeout(done, 200);
  });

  afterEach(function(done) {
    eloqua = {};
    forms.done();
    nock.cleanAll();
    return done();
  });

  /** @test {FormData} */
  describe('Form Data Tests', () => {
    /** @test {FormData#get} */
    it('Form Data Get', done => {
      eloqua = new Eloqua(getOptions());

      eloqua.data.forms.data.get(1, null, assertSuccessful(done, function(err, result, xhr) {
        expect(xhr.config.url).to.eql('https://secure.p01.eloqua.com/API/REST/2.0/data/form/1');
        done();
      }));
    });

    /** @test {FormData#get} */
    it('Form Data Get with Querystring', done => {
      eloqua = new Eloqua(getOptions());

      eloqua.data.forms.data.get(1, {count: 1}, assertSuccessful(done, function(err, result, xhr) {
        expect(xhr.config.url).to.eql('https://secure.p01.eloqua.com/API/REST/2.0/data/form/1');
        expect(xhr.config.params).to.eql({count: 1});
        done();
      }));
    });

    /** @test {FormData#create} */
    it('Form Data Create', done => {
      let data = {
        currentStatus: 'Test',
      };
      eloqua = new Eloqua(getOptions());

      eloqua.data.forms.data.create(1, data, assertSuccessful(done, function(err, result, xhr) {
        expect(xhr.config.url).to.eql('https://secure.p01.eloqua.com/API/REST/2.0/data/form/1');
        expect(xhr.config.method).to.eql('post');
        done();
      }));
    });

    /** @test {FormData#delete} */
    it('Form Data Delete', done => {
      eloqua = new Eloqua(getOptions());

      eloqua.data.forms.data.delete(1, 1, assertSuccessful(done, function(err, result, xhr) {
        expect(xhr.config.url).to.eql('https://secure.p01.eloqua.com/API/REST/2.0/data/form/1/datarow/1');
        expect(xhr.config.method).to.eql('delete');
        done();
      }));
    });
  });
});
