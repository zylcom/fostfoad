const validate = (schema, request) => {
  const result = schema.safeParse(request);

  if (result.error) {
    let error = new Error("Validation error!");
    error.issues = result.error.format();

    throw error;
  } else {
    return result.data;
  }
};

export default validate;
