module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  restoreMocks: true,
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
};
