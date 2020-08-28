import { FastifyServer } from "../interface";

export const healthCheck = (server: FastifyServer) => {
  server.get(
    "/health",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
            },
          },
        },
      },
    },
    (request: any, reply: any) => {
      reply.code(200).send({ message: "running" });
    }
  );

  server.get(
    "/ready",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
            },
          },
        },
      },
    },
    (request: any, reply: any) => {
      if (server.upAndRunning) {
        return reply.code(200).send({ message: "up and running" });
      }
      reply.code(400).send({ message: "not yet" });
    }
  );
};
