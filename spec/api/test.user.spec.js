require('../common');

describe('Get user info by id', () => {
  let anyIds, maleIds, femaleIds;
  let clients = genders.list;

  clients.forEach((gender) => {
    beforeAll(async () => {
      const response = await request.get(`${app.methods.api.testUsersByGender}?gender=${gender.name}`);
      expect(response).statusCode(200);
      gender.ids = response.body.idList;
    });
  });

  it(`Check male clients by id`, async () => {
    maleIds = clients.filter(gender => gender.name === 'male').flatMap((male) => male.ids);
    for (let id of maleIds) {
      const response = await request.get(`${app.methods.api.testUser}${id}`);
      expect(response).statusCode(200);
      expect(response.body).toMatchSchema(app.schema.testUser);
      expect(response.body.isSuccess).toBeTruthy();
      expect(response.body.user.gender).toEqual('male');
      expect(response.body.user.id).toEqual(id);
      expect(parseInt(response.body.user.age)).toBeLessThan(80);
      expect(Date.parse(response.body.user.registrationDate)).toBeGreaterThan(Date.parse('2010-01-01'));
    }
  });

  it(`Check female clients by id`, async () => {
    femaleIds = clients.filter(gender => gender.name === 'female').flatMap((female) => female.ids);
    for (let id of femaleIds) {
      const response = await request.get(`${app.methods.api.testUser}${id}`);
      expect(response).statusCode(200);
      expect(response.body).toMatchSchema(app.schema.testUser);
      expect(response.body.isSuccess).toBeTruthy();
      expect(response.body.user.gender).toEqual('female');
      expect(response.body.user.id).toEqual(id);
      expect(parseInt(response.body.user.age)).toBeLessThan(80);
      expect(Date.parse(response.body.user.registrationDate)).toBeGreaterThan(Date.parse('2010-01-01'));
    }
  });

  it(`Check clients with no gender`, async () => {
    anyIds = clients.filter(gender => gender.name === 'any').flatMap((gender) => gender.ids);
    const otherIds = anyIds.filter(item => !maleIds.includes(item)).filter(item => !femaleIds.includes(item));
    for (let id of otherIds) {
      const response = await request.get(`${app.methods.api.testUser}${id}`);
      expect(response).statusCode(200);
      expect(response.body).toMatchSchema(app.schema.testUser);
    }
  });

  it(`Get user with incorrect number`, async () => {
    const response = await request.get(`${app.methods.api.testUser}1337`);
    expect(response).statusCode(400);
    expect(response.body).toMatchSchema(app.schema.testUser);
  });

  it(`Get user with incorrect string value`, async () => {
    const response = await request.get(`${app.methods.api.testUser}iddqd`);
    expect(response).statusCode(400);
    expect(response.body).toMatchSchema(app.schema.testUser);
  });

});
