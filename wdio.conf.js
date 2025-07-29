const { join } = require('path');

exports.config = {
    runner: 'local',

    specs: [
        './test/specs/**/*.js'
    ],

    exclude: [],

    maxInstances: 1,

    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                '--disable-infobars',
                '--disable-popup-blocking',
                '--disable-notifications',
                '--disable-save-password-bubble',
                '--disable-autofill-keyboard-accessory-view',
                '--disable-password-generation',
                '--no-default-browser-check',
                '--disable-extensions',
                '--incognito',
                '--start-maximized',
            ],
            prefs: {
                'credentials_enable_service': false,
                'profile.password_manager_enabled': false,
            }
        }
    }],

    logLevel: 'info',

    bail: 0,

    baseUrl: 'https://www.saucedemo.com/',

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    services: ['chromedriver'],

    framework: 'mocha',

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    before: async function () {
        // Очистка cookies або логіки перед тестом (не обов’язково)
    }
};
