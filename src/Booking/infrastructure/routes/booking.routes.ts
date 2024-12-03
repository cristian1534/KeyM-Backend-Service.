import { Router } from "express";
import { MongoRepository } from "../repository/mongo.repository";
import { BookingUseCase } from "../../application/bookingUseCase";
import { BookingController } from "../controllers/booking.ctrl";
import { validateToken } from "../../../User/infrastructure/middleware/auth.validator";

const route = Router();

const bookingRepository = new MongoRepository();
const bookingUseCase = new BookingUseCase(bookingRepository);
const bookingCtrl = new BookingController(bookingUseCase);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       required:
 *         - JWT Token
 *
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - date
 *         - startTime
 *         - endTime
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the booking (YYYY-MM-DD)
 *         startTime:
 *           type: string
 *           format: time
 *           description: Start time of the booking (HH:mm)
 *         endTime:
 *           type: string
 *           format: time
 *           description: End time of the booking (HH:mm)
 *       example:
 *         date: "2024-12-21"
 *         startTime: "21:30"
 *         endTime: "22:00"
 *
 *     BookingResponse:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *           description: Unique identifier for the booking
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the booking (YYYY-MM-DD)
 *         startTime:
 *           type: string
 *           format: time
 *           description: Start time of the booking (HH:mm)
 *         endTime:
 *           type: string
 *           format: time
 *           description: End time of the booking (HH:mm)
 *         _id:
 *           type: string
 *           description: MongoDB identifier for the booking
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the booking was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the booking was last updated
 *       example:
 *         uuid: "f382a3b4-aef7-4781-98a1-c0ff2a01a2c8"
 *         date: "2024-12-21"
 *         startTime: "21:30"
 *         endTime: "22:00"
 *         _id: "674f20e6db0665f2c221a8c2"
 *         createdAt: "2024-12-03T15:16:54.336Z"
 *         updatedAt: "2024-12-03T15:16:54.336Z"
 *
 * /booking:
 *   post:
 *     summary: Create a new booking
 *     tags: [BOOKING]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingResponse'
 *       500:
 *         description: Error while creating booking
 */
route.post("/", validateToken, bookingCtrl.createBooking);
/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Get all Bookings
 *     tags: [BOOKING]
 *     responses:
 *       200:
 *         description: Success
 *
 *       404:
 *          description: Not Found
 *       500:
 *         description: Error when fetching Bookings.
 */
route.get("/", validateToken, bookingCtrl.getBookings);
/**
 * @swagger
 * /booking/{uuid}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get the Booking selected if registered.
 *     tags: [BOOKING]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The BOOKING's uuid.
 *     responses:
 *       200:
 *         description: Success
 *
 *       500:
 *         description: Error when getting a selected Booking.
 */
route.get("/:uuid", validateToken, bookingCtrl.getBookingByUuid);
/**
 * @swagger
 * /booking/{uuid}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete the Booking selected if registered.
 *     tags: [BOOKING]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The BOOKING's uuid.
 *     responses:
 *       200:
 *         description: Success
 *
 *       500:
 *         description: Error when deleting a selected Booking.
 */
route.delete("/:uuid", validateToken, bookingCtrl.deleteBookingByUuid);
/**
 * @swagger
 * /booking/{uuid}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     summary: Update an existing booking
 *     tags: [BOOKING]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The BOOKING's uuid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the booking (YYYY-MM-DD)
 *               startTime:
 *                 type: string
 *                 format: time
 *                 description: Start time of the booking (HH:mm)
 *               endTime:
 *                 type: string
 *                 format: time
 *                 description: End time of the booking (HH:mm)
 *             example:
 *               date: "2024-12-21"
 *               startTime: "22:00"
 *               endTime: "23:00"
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingResponse'
 *       400:
 *         description: Invalid input or conflicting booking times
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Error when updating booking
 */
route.patch("/:uuid", validateToken, bookingCtrl.updateBookingByUuid);

export default route;
