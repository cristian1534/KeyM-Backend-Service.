import { UserEntity } from "./user.entity";

export class UserValue implements UserEntity {
  uuid: string;
  name: string;
  email: string;
  password: string;
  constructor(user: UserEntity) {
    this.uuid = user.uuid;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  }
}
