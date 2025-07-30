import LoginPage from '../pageobjects/LoginPage.js';
import InventoryPage from '../pageobjects/InventoryPage.js';
import CartPage from '../pageobjects/CartPage.js';
import assert from 'assert';

describe('Inventory Page - Cart and Logout flow', () => {
    it('should add item to cart, logout, login again and verify cart content', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrlContaining('/inventory');

        await InventoryPage.addProduct(0);

        await expect(InventoryPage.cartBadge).toBeDisplayed();
        const cartCount = await InventoryPage.cartBadge.getText();
        assert.strictEqual(cartCount, '1');

        await InventoryPage.logout();

        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
        const usernameField = await $('#user-name');
        const passwordField = await $('#password');
        assert.strictEqual(await usernameField.getValue(), '');
        assert.strictEqual(await passwordField.getValue(), '');

        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrlContaining('/inventory');

        await expect(InventoryPage.cartBadge).toBeDisplayed();
        assert.strictEqual(await InventoryPage.cartBadge.getText(), '1');

        await InventoryPage.goToCart();
        await expect(browser).toHaveUrlContaining('/cart');

        const cartItemCount = await CartPage.getItemCount();
        assert.strictEqual(cartItemCount, 1);
    });
});
