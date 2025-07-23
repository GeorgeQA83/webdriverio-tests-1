const assert = require('assert')
const { Browser } = require('selenium-webdriver')
const { isTypedArray } = require('util/types')

describe('webdriver.io page', () => {
    it('should have the right title', () => {
        Browser.url('https://webdriver.io')
        const title = browser.getTitle()
        assert.strictEqual(title, 'WebdriverIO - Next-gen...')
    })
})