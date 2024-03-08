/* eslint-disable node/no-deprecated-api, consistent-return */
'use strict';

const url = require('url');
const Model = require('hof').model;
const jimp = require('jimp');
const uuid = require('uuid').v4;
const fs = require('fs');
const noPreview = 'data:image/png;base64,' + fs.readFileSync('assets/images/no-preview.png', { encoding: 'base64' });
const FormData = require('form-data');
const config = require('../../../config');

module.exports = class UploadModel extends Model {
  constructor(...args) {
    super(...args);
    this.set('id', uuid());
  }

  save() {
    return new Promise((resolve, reject) => {
      const attributes = {
        url: config.upload.hostname
      };
      const reqConf = url.parse(this.url(attributes));
      const formData = new FormData();
      formData.append('document', this.get('data'), {
        filename: this.get('name'),
        contentType: this.get('mimetype')
      });
      reqConf.data = formData;
      reqConf.method = 'POST';
      reqConf.headers = {
        ...formData.getHeaders()
      };
      return this.request(reqConf, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    })
      .then(result => {
        return this.set({ url: result.url });
      })
      .then(() => {
        return this.thumbnail();
      })
      .then(() => {
        return this.unset('data');
      });
  }

  thumbnail() {
    return jimp.read(this.get('data'))
      .then(image => {
        image.resize(300, jimp.AUTO);
        return new Promise((resolve, reject) => {
          image.getBase64(this.get('mimetype'), (e, data) => {
            return e ? reject(e) : resolve(data);
          });
        });
      })
      .then(data => {
        this.set('thumbnail', data);
      })
      .catch(() => {
        this.set('thumbnail', noPreview);
      });
  }

  auth() {
    if (!config.keycloak.token) {
      // eslint-disable-next-line no-console
      console.error('keycloak token url is not defined');
      return Promise.resolve({
        bearer: 'abc123'
      });
    }
    const tokenReq = {
      url: config.keycloak.token,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        username: config.keycloak.username,
        password: config.keycloak.password,
        grant_type: 'password',
        client_id: config.keycloak.clientId,
        client_secret: config.keycloak.secret
      },
      method: 'POST'
    };
    return this._request(tokenReq).then(response => {
      return { bearer: response.data.access_token };
    })
      .catch(err => {
        console.log(`Error: ${err.response.data.error} - ${err.response.data.error_description}`);
        throw err;
      });
  }
};
