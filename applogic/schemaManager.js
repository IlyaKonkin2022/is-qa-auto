const testUserSchema = require('../applogic/data/json/testUser.json');
const testUsersByGenderSchema = require('../applogic/data/json/testUsersByGender.json');

class SchemaManager {
  constructor() {
    this.testUser = testUserSchema;
    this.testUsersByGender = testUsersByGenderSchema;
  }
}

module.exports = SchemaManager;