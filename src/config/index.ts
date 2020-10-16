const schema = {
  type: "object",
  required: ["NODE_ENV"],
  properties: {
    NODE_ENV: { type: "string" },
  },
};

export const getOptions = () => {
  const options: any = {
    schema: schema,
  };
  if (process.env.NODE_ENV === "development") {
    options.dotenv = {
      path: `${__dirname}/../../local.env`,
    };
  }
  if (process.env.NODE_ENV === "production") {
    options.dotenv = {
      path: `${__dirname}/../../.env`,
    };
  }
  return options;
};
