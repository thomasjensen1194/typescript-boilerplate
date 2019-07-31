import User from '../../objection/models/users';
import request from 'supertest';
let server: any;

let username = 'abc';
let password = '123';
let email = 'a@a.com';

const createUser = async () => {
  const result = await request(server)
    .post('/graphql')
    .send({
      query: `
      mutation {
        createUser(username: "${username}", password: "${password}", email: "${email}")
      }
    `
    });

  return result;
};

describe('user', () => {
  beforeEach(async () => {
    server = require('../../server');
    const result = await createUser();

    expect(result.text).not.toMatch(/error/);
  });

  afterEach(async () => {
    await User.query().delete();
    server.close();
  });

  describe('GET', () => {
    it('should login a valid user', async () => {
      const result = await request(server)
        .post('/graphql')
        .send({
          query: `
            mutation {
              login(username: "${username}", password: "${password}")
            }
          `
        });

      expect(result.text).not.toMatch(/error/);
    });
    it('should throw an error if password is not correct', async () => {
      let password = 'notcorrect';

      const result = await request(server)
        .post('/graphql')
        .send({
          query: `
          mutation {
            login(username: "${username}", password: "${password}")
          }
        `
        });

      expect(result.text).toMatch(/Incorrect username or password/);
    });
    it('should throw an error, if password is not provided', async () => {
      let password = '';

      const result = await request(server)
        .post('/graphql')
        .send({
          query: `
          mutation {
            login(username: "${username}", password: "${password}")
          }
        `
        });

      expect(result.text).toMatch(/You must provide username\/email and password/);
    });
    it('should throw an error, if username is not provided', async () => {
      let username = '';

      const result = await request(server)
        .post('/graphql')
        .send({
          query: `
          mutation {
            login(username: "${username}", password: "${password}")
          }
        `
        });

      expect(result.text).toMatch(/You must provide username\/email and password/);
    });
    it("should throw an error, if user doesn't exist", async () => {
      let username = 'wrongusername';

      const result = await request(server)
        .post('/graphql')
        .send({
          query: `
          mutation {
            login(username: "${username}", password: "${password}")
          }
        `
        });

      console.log(result.text);
      expect(result.text).toMatch(/Incorrect username or password/);
    });
    it('should login the user, if providing email instead of username', async () => {
      const result = await request(server)
        .post('/graphql')
        .send({
          query: `
          mutation {
            login(email: "${email}", password: "${password}")
          }
        `
        });

      expect(result.text).not.toMatch(/error/);
    });
  });
});
