import LoginPage from '../pageobjects/LoginPage.js';

describe('Login Page - Invalid Password', () => {
    it('should display an error when a valid username and an invalid password are entered', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'wrong_password');

        await LoginPage.errorMessage.waitForDisplayed({ timeout: 5000 });

        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveTextContaining(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });
});
