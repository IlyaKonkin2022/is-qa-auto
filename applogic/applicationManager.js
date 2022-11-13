const UserHelper = require("./helpers/userHelper");
const MethodsList = require("./helpers/methods");
const SchemaManager = require("./schemaManager");
const MainHelper = require("./helpers/mainHelper");

class ApplicationManager {
  constructor() {
    this.methods = new MethodsList();
    this.user = new UserHelper();
    this.schema = new SchemaManager();
    this.main = new MainHelper();
  }
}

module.exports = ApplicationManager;