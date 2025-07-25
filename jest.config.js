module.exports = {
  modulePathIgnorePatterns: ["<rootDir>/spec/regression"],

  // Test environment
  testEnvironment: "node",

  // Test patterns
  testMatch: [
    "**/__tests__/**/*.(js|jsx|ts|tsx)",
    "**/*.(test|spec).(js|jsx|ts|tsx)",
  ],
};
