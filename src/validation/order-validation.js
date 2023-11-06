import { z } from "zod";

const orderIdValidation = z.coerce
  .number({
    invalid_type_error: "Order id must be number!",
    required_error: "Order id is required!",
  })
  .positive({ message: "Order id must be positive number!" });

export { orderIdValidation };
