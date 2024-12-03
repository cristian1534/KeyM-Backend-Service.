import { Request, Response } from "express";
import { UserUseCase } from "../../../User/application/userUseCase";
import { HttpResponse } from "../../../Booking/infrastructure/error/validation.error";
import { userSchema, loginSchema } from "../helpers/validation.schema";
import User from "../model/user.model";
import bcrypt from "bcrypt";
import { createToken } from "../helpers/token.creator";

export class UserController {
  constructor(
    private userUseCase: UserUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public createUser = async (
    { body }: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { error, value } = userSchema.validate(body);
      if (error) {
        return this.httpResponse.BadRequest(res, { error: error.message });
      }
      const alreadyRegistered = await User.find({ email: value.email });
      if (alreadyRegistered.length > 0) {
        return this.httpResponse.BadRequest(res, {
          error: "Email already registered",
        });
      }
      const { password, ...others } = value;
      const hashedPassword = await bcrypt.hash(password, 10);

      const userWithHashedPassword = {
        password: hashedPassword,
        ...others,
      };

      const user = await this.userUseCase.addUser(userWithHashedPassword);
      if (!user)
        return this.httpResponse.BadRequest(res, "User was not register.");

      return this.httpResponse.Ok(res, { name: user.name, email: user.email });
    } catch (error: any) {
      return this.httpResponse.BadRequest(res, { error: error.message });
    }
  };

  public loginUser = async ({ body }: Request, res: Response): Promise<any> => {
    try {
      const { error, value } = loginSchema.validate(body);
      if (error) {
        return this.httpResponse.BadRequest(res, { error: error.message });
      }
      const user = await this.userUseCase.loginUser(value);
      if (!user) {
        return this.httpResponse.BadRequest(res, {
          error: "Invalid credentials",
        });
      }
      const token = createToken(user);
      return this.httpResponse.Ok(res, {
        name: user.name,
        email: user.email,
        token,
      });
    } catch (error: any) {
      return this.httpResponse.BadRequest(res, { error: error.message });
    }
  };
}
