require("../../spec/common")

class UserHelper {

  async getUserIdsByGender(gender) {
    const response = await request.get(`${app.methods.api.testUsersByGender}?gender=${gender}`);
    expect(response).statusCode(200);
    return response.body.idList;
  }

}

module.exports = UserHelper;