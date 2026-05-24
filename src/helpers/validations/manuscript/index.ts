import Joi from "joi";

export const manuscriptValidation = Joi.object({
  fullName: Joi.string().trim().min(1).required().messages({
    "string.empty": "Full name is required",
    "any.required": "Full name is required",
  }),
  lastName: Joi.string().trim().allow("").optional(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email address",
      "any.required": "Email is required",
    }),
  phoneNumber: Joi.string().trim().min(1).required().messages({
    "string.empty": "Phone number is required",
    "any.required": "Phone number is required",
  }),
  serviceType: Joi.string().trim().min(1).required().messages({
    "string.empty": "Service type is required",
    "any.required": "Service type is required",
  }),
  projectTitle: Joi.string().trim().min(1).required().messages({
    "string.empty": "Project title is required",
    "any.required": "Project title is required",
  }),
  genre: Joi.string().trim().min(1).required().messages({
    "string.empty": "Genre is required",
    "any.required": "Genre is required",
  }),
  message: Joi.string().trim().allow("").optional(),
});
