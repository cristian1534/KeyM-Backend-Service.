import { UserEntity, AuthEntity } from "./user.entity";

export interface UserRepository {
  createUser(user: UserEntity): Promise<UserEntity | null>;
  loginUser(credentials: AuthEntity): Promise<UserEntity | null>;
}
