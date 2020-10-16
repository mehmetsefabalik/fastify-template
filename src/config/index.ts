const schema = {
  type: "object",
  required: [],
  properties: {},
};

export const getOptions = () => {
  const options: any = {
    schema: schema,
  };
  if (process.env.NODE_ENV === "development") {
    options.dotenv = {
      path: `${__dirname}/../../server.local.env`,
    };
  }
  return options;
};
