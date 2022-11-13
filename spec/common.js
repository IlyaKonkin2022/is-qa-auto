global.supertest = require('supertest');
global.applicationManager = require('../applogic/applicationManager');
global.gendersParams = require('../applogic/data/testParams/genders');

const { matchers } = require('jest-json-schema');

global.request = supertest(process.env.URL);
global.app = new applicationManager();
global.genders = new gendersParams();
global.expect.extend(matchers);

expect.extend({
  statusCode(response, expected) {
    const { status } = response;
    const pass = expected === status;
    if (pass) {
      return {
        message: () => `Expected status ${expected} to be ${status}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `Expected status ${expected}, but get ${status}. Response: ${JSON.stringify(response.body)}
          \n Request: ${JSON.stringify(response.request)}`,
        pass: false,
      };
    }
  },
});