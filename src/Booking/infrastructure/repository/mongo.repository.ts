import { BookingEntity } from "../../../Booking/domain/booking.entity";
import { BookingRepository } from "../../../Booking/domain/booking.repository";
import Booking from "../model/booking.model";

export class MongoRepository implements BookingRepository {
  async addBooking(booking: BookingEntity): Promise<any> {
    const newBooking = new Booking(booking);
    await newBooking.save();
    return newBooking;
  }

  async getBookings(): Promise<any> {
    const bookings = await Booking.find().exec();
    return bookings;
  }

  async getBookingByUuid(uuid: string): Promise<any> {
    const booking = await Booking.findOne({ uuid }).exec();
    return booking;
  }

  async deleteBookingByUuid(uuid: string): Promise<any> {
    await Booking.deleteOne({ uuid: uuid });
  }

  async updateBookingByUuid(
    uuid: string,
    data: Partial<BookingEntity>
  ): Promise<any> {
    await Booking.updateOne({ uuid: uuid }, { $set: data });
    return Booking.findOne({ uuid: uuid });
  }
}
