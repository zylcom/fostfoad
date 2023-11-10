import { z } from "zod";

const descriptionValidation = z
  .string({
    invalid_type_error: "Description must be a string!",
    required_error: "Description is required!",
  })
  .nonempty({ message: "Description is not allowed to be empty!" })
  .refine((val) => Boolean(val.trim()), { message: "Description is invalid!" })
  .transform((val) => val.trim());

export { descriptionValidation };
