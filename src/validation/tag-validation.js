import { z } from "zod";

const getTagsValidation = z
  .string({
    required_error: "Product category is required!",
  })
  .nonempty({ message: "Product category is not allowed to be empty!" });

export { getTagsValidation };
