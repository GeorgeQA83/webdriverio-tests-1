import LoginPage from '../pageobjects/LoginPage.js';
import InventoryPage from '../pageobjects/InventoryPage.js';

describe('Login Page', () => {
    it('should log in with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        await expect(browser).toHaveUrlContaining('/inventory');

        const items = await InventoryPage.productButtons;
        expect(items.length).toBeGreaterThan(0);

        const cartVisible = await InventoryPage.cartLink.isDisplayed();
        expect(cartVisible).toBe(true);
    });
});
