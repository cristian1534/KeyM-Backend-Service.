import { Request, Response, NextFunction } from "express";
import jwt from "jwt-simple";
import moment from "moment";
import { HttpResponse } from "../../../Booking/infrastructure/error/validation.error";


export function validateToken(req: Request, res: Response, next: NextFunction){
  const httpResponse = new HttpResponse();
  const SECRET_TOKEN: string = process.env.SECRET_TOKEN as string;

  if (!req.headers.authorization) {
    httpResponse.UnAuthorized(res, "UnAuthorized"); 
    return; 
  }

  let token = req.headers.authorization.split(" ")[1];

  try {
    const payload = jwt.decode(token, SECRET_TOKEN); 
    if (payload.exp <= moment().unix()) {
      httpResponse.BadRequest(res, "Permission expired"); 
      return;
    }
    payload.user;
    next(); 
  } catch (error) {
    httpResponse.BadRequest(res, "Invalid token"); 
  }
}
