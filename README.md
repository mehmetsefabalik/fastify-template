# Fastify Template

Minimal API boilerplate that you can develop your project on. Just click `Use This Template` button and bootstrap your project without wasting time on configuring web framework, testing library and linting library.

Includes:
- Web Framework: Fastify
- Static Typing: Typescript
- Testing: Jest
- Linting: Eslint

## How to run

`npm i && npm run build && npm run start`

## How to build

The commands below transpile ts files and produces js files in `./dist` directory.

Run `npm run build` for production build;
Run `npm run build:dev` for development build, it watches ts files and transpiles them to js whenever there is a change;

## How to run

After building your project,

Run `npm run start` for production;
Run `npm run start:dev` for development, it watched js files and restarts server whenever there is a change;

## How to test

Integration tests are located in `./test/integration` directory;
Unit tests are located near source file in `test` directory;

Run `npm run test` to test your project.

## How to lint

Run `npm run lint` to lint your files;

> Husky's pre-add and pre-push hooks are used. So when you run `git add <file>`, it succeeds if `npm run lint` succeeds. When you run `git push origin <branch>` it succeeds if `npm run test` succeeds.

