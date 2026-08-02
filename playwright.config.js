const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:8080',
  },
  webServer: {
    command: 'npx http-server . -p 8080 -c-1 --silent',
    url: 'http://localhost:8080/index.html',
    reuseExistingServer: true,
    timeout: 30000,
  },
});
