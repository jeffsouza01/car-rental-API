import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User or Password Incorrect");
    }

    const passMatch = await compare(password, user.password);

    if (!passMatch) {
      throw new AppError("User or Password Incorrect");
    }

    const token = sign({}, "4bd352da73484bf3b53dad3852d3e204", {
      subject: user.id,
      expiresIn: "1d",
    });

    const userReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return userReturn;
  }
}

export { AuthenticateUserUseCase };
