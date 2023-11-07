import { z } from "zod";

const productSlug = z
  .string({
    required_error: "Product slug is required!",
    invalid_type_error: "Product slug must be a string!",
  })
  .nonempty({ message: "Product slug is not allowed to be empty!" });

const upsertCartItemValidation = z
  .object({
    productSlug,
    quantity: z.coerce
      .number({
        invalid_type_error: "Quantity must be number!",
        required_error: "Quantity is required!",
      })
      .min(1)
      .positive(),
  })
  .strict();

export { upsertCartItemValidation, productSlug };
