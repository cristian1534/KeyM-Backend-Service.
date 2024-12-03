import { AuthEntity, UserEntity } from "../../User/domain/user.entity";
import { UserRepository } from "../../User/domain/user.repository";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  public async addUser(user: UserEntity) {
    const savedUser = await this.userRepository.createUser(user);
    return savedUser;
  }

  public async loginUser(credentials: AuthEntity) {
    const user = await this.userRepository.loginUser(credentials);
    return user;
  }
}
