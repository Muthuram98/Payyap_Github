import path from "path";

//
// =============================
// REPORT TIMESTAMP GENERATION
// =============================
if (!process.env.REPORT_TIMESTAMP) {
  const timestamp = new Date();
  const shortDate = `${timestamp.getFullYear()}-${(timestamp.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${timestamp.getDate().toString().padStart(2, "0")}`;
  const shortTime = `${timestamp
    .getHours()
    .toString()
    .padStart(2, "0")}-${timestamp.getMinutes().toString().padStart(2, "0")}`;
  process.env.REPORT_TIMESTAMP = `${shortDate}_${shortTime}`;
}

const allureResultsDir = path.join(
  "reports",
  "allure-results",
  `Test_Report-${process.env.REPORT_TIMESTAMP}`
);

//
// =============================
// WDIO CONFIG FOR BROWSERSTACK
// =============================
export const config = {
  //
  // ===== BrowserStack Credentials =====
  user: process.env.BROWSERSTACK_USER || "muthuramtrackdfe_thax4v",
  key: process.env.BROWSERSTACK_KEY || "vsVz3wcHAC843Y6jXDNs",

  //
  // ===== BrowserStack Hub =====
  protocol: "https",
  hostname: "hub-cloud.browserstack.com",
  port: 443,
  path: "/wd/hub",

  //
  // Runner
  runner: "local",

  //
  // Test specs
  specs: ["./test/specs/**/*.js"],

  maxInstances: 1,

  //
  // ===== BrowserStack Capability Setup =====
  capabilities: [
    {
      platformName: "Android",
      // "appium:platformVersion": "14",
      "appium:deviceName": "Google Pixel 8",
      "appium:automationName": "UiAutomator2",

      //
      // ===== App Uploaded to BrowserStack =====
      "appium:app": "bs://738c137ac610303de4c60181c71963eb378caae6",

      //
      // Timeouts
      "appium:noReset": false,
      "appium:uiautomator2ServerInstallTimeout": 120000,
      "appium:adbExecTimeout": 30000,

      //
      // BrowserStack specific options
      "bstack:options": {
        projectName: "webdriverio_demo",
        buildName: `WDIO Build - ${process.env.REPORT_TIMESTAMP}`,
        sessionName: "WDIO Appium Android Test",
        deviceOrientation: "portrait",
        networkLogs: true,
        idleTimeout: 120,
        appiumLogs: true,
        video: true,
      },
    },
  ],

  //
  // Logging
  logLevel: "info",

  //
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 0,

  //
  // ===== BrowserStack Services =====
  services: ["browserstack"],

  //
  // Test framework
  framework: "mocha",

  mochaOpts: {
    ui: "bdd",
    timeout: 1800000, // 30 minutes
  },

  //
  // ===== Allure Reporting =====
  reporters: [
    [
      "allure",
      {
        outputDir: allureResultsDir,
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
      },
    ],
  ],

  //
  // ===== Hooks =====
  afterTest: async function (test, context, { error, passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
};
