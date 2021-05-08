import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUsersUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("should be able authenticate a user", async () => {
    const user: ICreateUserDTO = {
      name: "User Test",
      email: "user@test.com",
      password: "testPassword",
      driver_license: "998884059",
    };

    await createUsersUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate with nonexists user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "nonExist@email.com",
        password: "blablabla",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("sould not be able to authenticate with a incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "User Test",
        email: "user_new@test.com",
        password: "testPassword",
        driver_license: "998884059",
      };

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "IncorectPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
