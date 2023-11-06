import { z } from "zod";

const upsertCartItemValidation = z
  .object({
    productSlug: z
      .string({ required_error: "Product slug is required!" })
      .nonempty({ message: "Product slug is not allowed to be empty!" }),
    quantity: z.coerce
      .number({
        invalid_type_error: "Quantity must be number!",
        required_error: "Quantity is required!",
      })
      .min(1)
      .positive(),
  })
  .strict();

const deleteItemValidation = z.coerce
  .number({
    invalid_type_error: "Item id must be number!",
    required_error: "Item id is required!",
  })
  .positive();

export { upsertCartItemValidation, deleteItemValidation };
