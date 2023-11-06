import { z } from "zod";

const registerUserValidation = z
  .object({
    name: z
      .string({ required_error: "Name is required!" })
      .max(100)
      .nonempty({ message: "Name is not allowed to be empty!" }),
    username: z
      .string({ required_error: "Username is required!" })
      .max(100)
      .nonempty({ message: "Username is not allowed to be empty!" }),
    passwordForm: z
      .object({
        password: z
          .string({ required_error: "Password is required!" })
          .min(8, { message: "Password length must be 8 or more!" })
          .nonempty({ message: "Password is not allowed to be empty!" }),
        confirm: z.string({ required_error: "Password confirm is required!" }),
      })
      .required()
      .strict()
      .refine((data) => data.password === data.confirm, {
        message: "Passwords don't match!",
        path: ["confirm"],
      }),
    phonenumberForm: z.object({
      number: z
        .string({ required_error: "Phone number is required!" })
        .min(10, { message: "Phone number is invalid!" })
        .max(24, { message: "Phone number is invalid!" }),
      countryCode: z
        .string({ required_error: "Country code is required!" })
        .nonempty({ message: "Country code is not allowed to be empty!" })
        .default("ID"),
    }),
  })
  .required()
  .strict();

const loginUserValidation = z
  .object({
    username: z
      .string({ required_error: "Username is required!" })
      .nonempty({ message: "Username is not allowed to be empty!" }),
    password: z
      .string({ required_error: "Password is required!" })
      .nonempty({ message: "Password is not allowed to be empty!" }),
  })
  .required()
  .strict();

export { registerUserValidation, loginUserValidation };
