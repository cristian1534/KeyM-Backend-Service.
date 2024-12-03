import jwt from "jwt-simple";
import moment from "moment";
import { UserEntity } from "../../domain/user.entity";
import "dotenv/config";

interface Payload {
  sub: string;
  iat: number;
  exp: number;
}

export const createToken = (user: UserEntity) => {
  const secretToken: string = process.env.SECRET_TOKEN as string;
  const payload: Payload = {
    sub: user.uuid,
    iat: moment().unix(),
    exp: moment().add(1, "day").unix(),
  };
  return jwt.encode(payload, secretToken);
};
