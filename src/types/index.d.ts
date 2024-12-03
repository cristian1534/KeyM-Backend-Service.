import { UserEntity } from "../User/domain/user.entity.ts";  

declare global {
  namespace Express {
    interface Request {
      user: UserEntity;  
    }
  }
}
