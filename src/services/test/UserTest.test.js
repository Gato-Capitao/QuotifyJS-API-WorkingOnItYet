import  { UserService }  from "../User.service.js"
import { UserModel } from "../../models/User.model.js";

afterEach(async ()=> {
    await UserModel.destroy({
        where: {
            username: "teste"
        }
    });
})

const instanceUserService = new UserService()

test("Can create a new user", async ()=> {
    const response = await instanceUserService.createUser("test", "reidafilosofia@classica.com", "OSabiaNuncaDizTudoQUePensa")
    expect(response.statusValue).toBe(201)
});

test("Can't create a user using a registred email", async ()=>{
    await instanceUserService.createUser("test", "reidafilosofia@classica.com", "OSabiaNuncaDizTudoQUePensa")
    const response = await instanceUserService.createUser("test", "reidafilosofia@classica.com", "SabiaQueOSabiaSabiaAssobiar")
    expect(response.statusValue).toBe(404)
})

test("Can't create a user using blank inputs", async ()=>{
    const response = await instanceUserService.createUser("", "", "")
    expect(response.statusValue).toBe(404)
})
