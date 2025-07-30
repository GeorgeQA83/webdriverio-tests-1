import LoginPage from '../pageobjects/LoginPage.js';

describe('Login Page - Invalid Username', () => {
    it('should show error when logging in with invalid username and valid password', async () => {
        await LoginPage.open();
        await LoginPage.login('standarD_user', 'secret_sauce');

        await LoginPage.errorMessage.waitForDisplayed({ timeout: 5000 });
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveTextContaining(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });
});
