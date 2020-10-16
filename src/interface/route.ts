import { FastifyServer } from "./server";

export type Route = (server: FastifyServer) => void;
