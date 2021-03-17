import { FastifyServer } from "../interface/server";

export const staticRoutes = (server: FastifyServer) => {
  server.get("/static", {}, async (request, reply) => {
    return reply.sendFile("index.html");
  });
};
