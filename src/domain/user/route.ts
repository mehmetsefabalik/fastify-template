import { FastifyServer } from "../../interface/server";

interface Query {
  name: string;
}

export default function routes(server: FastifyServer) {
  server.get<{ Querystring: Query }>(
    "/users",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
          required: ["name"],
        },
      },
    },
    async (request, reply) => {
      try {
        const users = await server.userManager.findByName(request.query.name);
        if (Array.isArray(users) && users.length) {
          return reply.code(200).send({ success: true });
        } else {
          return reply.code(404).send();
        }
      } catch (e) {
        server.log.error("GET_USER_ERROR: ", e);
        return reply.code(500).send({});
      }
    }
  );
}
