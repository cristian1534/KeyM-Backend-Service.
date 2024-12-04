import Joi from "joi";

export const bookingSchema = Joi.object({
  date: Joi.string().required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
  user: Joi.string()
});
