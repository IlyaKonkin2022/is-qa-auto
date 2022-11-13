require('../common');

describe('Get userIds by gender', () => {
  let anyIds, maleIds, femaleIds;
  let clients = genders.list;

  clients.forEach((gender) => {
    it(`Get userIds by gender ${gender.name}`, async () => {
      const response = await request.get(`${app.methods.api.testUsersByGender}?gender=${gender.name}`);
      expect(response).statusCode(200);
      expect(response.body).toMatchSchema(app.schema.testUsersByGender);
      gender.ids = response.body.idList;
    });
  });

  it('Check that male ids dont contain female ids', async () => {
    maleIds = clients.filter(gender => gender.name === 'male').flatMap((male) => male.ids);
    femaleIds = clients.filter(gender => gender.name === 'female').flatMap((female) => female.ids);
    const contains = app.main.contains(maleIds, femaleIds);
    expect(contains).toBeFalsy();
  });

  it('Check that "any" ids contain all male & female ids', async () => {
    anyIds = clients.filter(gender => gender.name === 'any').flatMap((any) => any.ids);
    const genderIds = [...maleIds, ...femaleIds];
    const containsAll = app.main.containsAll(genderIds, anyIds);
    expect(containsAll).toBeTruthy();
  });

});
