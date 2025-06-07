const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/test/unit/**/*.test.ts", "**/test/integration/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  coverageDirectory: "coverage",
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};

module.exports = config;
