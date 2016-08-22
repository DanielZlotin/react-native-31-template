require('jasmine-expect');
const appRootPath = require('app-root-path');
const proxyquireLib = require('proxyquire');

module.exports = {

  asyncSpec: (fn) => {
    return async(done) => {
      try {
        await fn();
        done();
      } catch (err) {
        done.fail(err);
      }
    };
  },

  proxyquire: (path, imports) => {
    return proxyquireLib.noCallThru().noPreserveCache()(appRootPath.resolve(path), imports);
  }

};
