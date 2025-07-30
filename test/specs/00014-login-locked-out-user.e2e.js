import assert from 'assert';
import LoginPage from '../pageobjects/LoginPage.js';

describe('Login - Locked out user', () => {
    it('should show error when locked out user tries to login', async () => {
        await LoginPage.open();
        await LoginPage.login('locked_out_user', 'secret_sauce');

        const isErrorShown = await LoginPage.isErrorDisplayed();
        assert.strictEqual(isErrorShown, true, 'Error message should be displayed');

        const errorText = await LoginPage.getErrorMessage();
        assert.match(errorText.toLowerCase(), /locked out/i, 'Error message should mention that the user is locked out');
    });
});
