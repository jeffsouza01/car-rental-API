import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTIO";
import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UsersTokens>;
  findUserByIdAndToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens>;
  deleteById(user_id: string): Promise<void>;
}

export { IUsersTokensRepository };
