// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  fullyParallel: true,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 2,

  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',

    headless: true,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    actionTimeout: 0,
    navigationTimeout: 30 * 1000,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    },
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        viewport: null,
      },
    },
  ],
});