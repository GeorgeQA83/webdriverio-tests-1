import LoginPage from '../pageobjects/LoginPage.js';
import InventoryPage from '../pageobjects/InventoryPage.js';

describe('Inventory Page - Logout flow', () => {
    it('should log out the user via burger menu and redirect to login page', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        await expect(browser).toHaveUrlContaining('/inventory');
        await InventoryPage.logout();
        await browser.waitUntil(
            async () => (await browser.getUrl()) === 'https://www.saucedemo.com/',
            {
                timeout: 5000,
                timeoutMsg: 'Expected to be redirected to login page after logout',
            }
        );

        await expect(LoginPage.inputUsername).toHaveValue('');
        await expect(LoginPage.inputPassword).toHaveValue('');
    });
});
