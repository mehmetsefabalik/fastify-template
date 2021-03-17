const schema = {
  type: "object",
  required: ["DB_URL"],
  properties: {
    DB_URL: { type: "string" },
  },
};

export const getOptions = () => {
  const options: any = {
    schema: schema,
  };

  options.dotenv = {
    path: `${__dirname}/../../${process.env.NODE_ENV}.env`,
  };

  return options;
};
