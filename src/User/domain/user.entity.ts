export interface AuthEntity {
  email: string;
  password: string;
}

export interface UserEntity extends AuthEntity {
  uuid: string;
  name: string;
}
