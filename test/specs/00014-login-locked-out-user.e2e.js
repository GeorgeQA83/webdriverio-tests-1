const assert = require('assert');

describe('Login - Locked out user', () => {
    it('should show error when locked out user tries to login', async () => {
        await browser.url('https://www.saucedemo.com');
        await $('#user-name').setValue('locked_out_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        const errorContainer = await $('.error-message-container');
        const isDisplayed = await errorContainer.isDisplayed();
        assert.strictEqual(isDisplayed, true);

        const errorText = await errorContainer.getText();
        assert.match(errorText.toLowerCase(), /locked out/i);
    });
});