import { server } from "../../server.js"

test('Can create user', async ()=> {
    return supertest(server)
    .post("/register-user")
    .expect(201)
    .send({
        username:"test", 
        email:"socrates@classica.com",
        password: "SoSeiQueNadaSei"
    })
    .then((response)=> {
        expect(response.body.message).toEqual("Created user successfully!")
    })
  })
  