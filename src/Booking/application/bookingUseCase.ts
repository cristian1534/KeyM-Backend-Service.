import { BookingEntity } from "../domain/booking.entity";
import { BookingRepository } from "../domain/booking.repository";
import { BookingValue } from "../domain/booking.value";
import Booking from "../infrastructure/model/booking.model";
import { v4 as uuidGenerator } from "uuid";

export class BookingUseCase {
  constructor(private readonly bookingRepository: BookingRepository) {}

  public async addBooking(booking: BookingEntity): Promise<any> {
    const uuid = uuidGenerator();
    const { date, startTime, endTime } = booking;

    if (startTime >= endTime)
      throw new Error("Start time must be earlier than end time");
    const alreadyBooking = await Booking.findOne({
      date,
      $or: [
        { startTime: { $gte: startTime, $lt: endTime } },
        { endTime: { $gt: startTime, $lt: endTime } },
        { startTime: { $gte: startTime }, endTime: { $lte: endTime } },
      ],
    });
    

    if (alreadyBooking) {
      throw new Error("This time is busy for another Booking");
    }

    const newBooking = new BookingValue({
      ...booking,
      uuid,
    });
    const savedBooking = await this.bookingRepository.addBooking(newBooking);
    return savedBooking;
  }

  public async getBookings(): Promise<BookingEntity[]> {
    const bookings = await this.bookingRepository.getBookings();
    return bookings;
  }

  public async getBookingByUuid(uuid: string): Promise<any> {
    const booking = await this.bookingRepository.getBookingByUuid(uuid);
    return booking;
  }

  public async deleteBookingByUuid(uuid: string): Promise<any> {
    await Booking.deleteOne({ uuid });
  }

  public async updateBookingByUuid(
    uuid: string,
    data: Partial<BookingEntity>
  ): Promise<any> {
    const updatedBooking = await Booking.findOneAndUpdate(
      { uuid },
      { $set: data },
      { new: true }
    );
    return updatedBooking;
  }
}
