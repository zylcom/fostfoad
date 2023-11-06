import { z } from "zod";

const review = z
  .object({
    productSlug: z
      .string({ required_error: "Product slug is required!" })
      .nonempty({ message: "Product slug is not allowed to be empty!" }),
    description: z.string().transform((val) => val.trim()),
    rating: z
      .number({
        required_error: "Rating is required!",
        invalid_type_error: "Rating must be number!",
      })
      .min(1, "Rating must not less than 1!")
      .max(5, "Rating must not greater than 5!"),
  })
  .required()
  .strict();

const createReviewValidation = review;

const updateReviewValidation = review;

export { createReviewValidation, updateReviewValidation };
