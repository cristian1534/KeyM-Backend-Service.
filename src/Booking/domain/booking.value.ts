import { BookingEntity } from "./booking.entity";

export class BookingValue {
  uuid: string;
  user: string;
  date: string;
  startTime: string;
  endTime: string;

  constructor(booking: BookingEntity) {
    this.uuid = booking.uuid;
    this.user = booking.user;
    this.date = booking.date;
    this.startTime = booking.startTime;
    this.endTime = booking.endTime;
  }
}
