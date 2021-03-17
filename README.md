# Fastify Template

Minimal API boilerplate that you can develop your project on. Just click `Use This Template` button and bootstrap your project without wasting time on configuring web framework, testing library and linting library.

Includes:
- Web Framework: Fastify
- Database: MongoDB
- Database Adaptor: Mongoose
- Static Typing: Typescript
- Testing: Jest
- Linting: Eslint
- Containerization: Docker

## Zero to Hero

`npm i && npm run build && npm run start`

## How to build

The commands below transpile ts files and produces js files in `./dist` directory.

Run `npm run build` for production build;
Run `npm run build:dev` for development build, it watches ts files and transpiles them to js whenever there is a change;

## How to run

After building your project,

Add `production.env` file to your root folder and put environment variables in it.

Run `npm run start` for production;
Run `npm run start:dev` for development, it watched js files and restarts server whenever there is a change;

## How to test

Integration tests are located in `./test/integration` directory;
Unit tests are located near source file in `test` directory;

Run `npm run test` to test your project.

## How to lint

Run `npm run lint` to lint your files;

> Husky's pre-commit and pre-push hooks are used. So when you run `git commit`, it succeeds if `npm run lint` succeeds. When you run `git push origin <branch>` it succeeds if `npm run test` succeeds.

## How to deploy

You should
- install dependencies with `npm i` command,
- build with `npm run build` command,
- delete node_modules and install only dependencies without dev dependencies with `sudo rm -rf node_modules && npm i --production` command (optional but if you do this, your docker image size will be much smaller),
- build image with `docker build -t fastify-template .`
- run your container with `docker run --publish 3002:3002 fastify-template`

`GET http://localhost:3002/health` and see that server is running