import { AuthEntity, UserEntity } from "../../../User/domain/user.entity";
import { UserRepository } from "../../../User/domain/user.repository";
import User from "../model/user.model";
import bcrypt from "bcrypt";

export class MongoRepository implements UserRepository {
  async createUser(user: UserEntity): Promise<any> {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  }
  async loginUser(credentials: AuthEntity): Promise<any> {
    const user = await User.findOne({ email: credentials.email });
    if (!user) return null;
    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) return null;
    return user;
  }
}
