import { BookingEntity } from "./booking.entity";

export interface BookingRepository {
  addBooking(booking: BookingEntity): Promise<BookingEntity | null>;
  getBookings(): Promise<BookingEntity[]>;
  getBookingByUuid(uuid: string): Promise<BookingEntity | null>;
  deleteBookingByUuid(uuid: string): Promise<any>;
  updateBookingByUuid(
    uuid: string,
    data: Partial<BookingEntity>
  ): Promise<BookingEntity | null>;
}
