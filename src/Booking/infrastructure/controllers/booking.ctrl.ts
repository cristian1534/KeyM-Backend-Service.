"dotenv/config";
import { Request, Response } from "express";
import { BookingUseCase } from "../../application/bookingUseCase";
import { HttpResponse } from "../error/validation.error";
import { bookingSchema } from "../helpers/validation.schema";
import jwt from "jwt-simple";

export class BookingController {
  constructor(
    private bookingUseCase: BookingUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public createBooking = async (req: Request, res: Response): Promise<any> => {
    try {
      const { error, value } = bookingSchema.validate(req.body);
      if (error) {
        return this.httpResponse.BadRequest(res, { error: error.message });
      }

      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return this.httpResponse.BadRequest(res, {
          error: "Token not provided",
        });
      }

      const decode = jwt.decode(
        token as string,
        process.env.SECRET_TOKEN as string
      )

      const userName = decode?.user.name;

      const bookingData = {
        ...value,
        user: userName,
      };

      const bookingCreated = await this.bookingUseCase.addBooking(bookingData);

      return this.httpResponse.Ok(res, bookingCreated);
    } catch (error: any) {
      return this.httpResponse.BadRequest(res, { error: error.message });
    }
  };

  public getBookings = async (req: Request, res: Response): Promise<any> => {
    try {
      const bookings = await this.bookingUseCase.getBookings();
      return this.httpResponse.Ok(res, bookings);
    } catch (error: any) {
      return this.httpResponse.BadRequest(res, { error: error.message });
    }
  };

  public getBookingByUuid = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { uuid } = req.params;
      const booking = await this.bookingUseCase.getBookingByUuid(uuid);
      if (!booking) {
        return this.httpResponse.NotFound(res, { error: "Booking not found" });
      }
      return this.httpResponse.Ok(res, booking);
    } catch (error: any) {
      return this.httpResponse.BadRequest(res, { error: error.message });
    }
  };

  public deleteBookingByUuid = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { uuid } = req.params;
      await this.bookingUseCase.deleteBookingByUuid(uuid);
      return this.httpResponse.Ok(res, { message: "Booking deleted" });
    } catch (error: any) {
      return this.httpResponse.BadRequest(res, { error: error.message });
    }
  };

  public updateBookingByUuid = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { uuid } = req.params;
      const { error, value } = bookingSchema.validate(req.body);
      if (error) {
        return this.httpResponse.BadRequest(res, { error: error.message });
      }
      const updatedBooking = await this.bookingUseCase.updateBookingByUuid(
        uuid,
        value
      );
      return this.httpResponse.Ok(res, updatedBooking);
    } catch (error: any) {
      return this.httpResponse.BadRequest(res, { error: error.message });
    }
  };
}
