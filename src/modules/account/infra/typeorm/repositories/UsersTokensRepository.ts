import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/account/dtos/ICreateUserTokenDTIO";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";

import { UsersTokens } from "../entities/UsersTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>;

  constructor() {
    this.repository = getRepository(UsersTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UsersTokens> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findUserByIdAndToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens> {
    const userToken = this.repository.findOne({
      user_id,
      refresh_token,
    });

    return userToken;
  }

  async deleteById(user_id: string): Promise<void> {
    await this.repository.delete({ user_id });
  }
}

export { UsersTokensRepository };
