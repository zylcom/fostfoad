import { z } from "zod";

const getProductValidation = z
  .string({
    required_error: "Slug is required",
    invalid_type_error: "Slug must be string!",
  })
  .nonempty({ message: "Slug is not allowed to be empty!" });

const infiniteValidation = z.object({
  category: z.string().default(""),
  name: z.string().default(""),
  tag: z.string().default(""),
  size: z.coerce
    .number({ invalid_type_error: "Size must be number!" })
    .min(1)
    .max(100)
    .positive()
    .default(10),
  cursor: z.coerce
    .number({ invalid_type_error: "Cursor must be number!" })
    .positive()
    .optional(),
});

const getBestRatedValidation = z
  .string({ required_error: "Category is required!" })
  .max(100)
  .default("");

const likeValidation = z
  .string({ required_error: "Product slug is required!" })
  .max(100);

export {
  getProductValidation,
  infiniteValidation,
  getBestRatedValidation,
  likeValidation,
};
