import assert from 'assert';
import LoginPage from '../pageobjects/LoginPage.js';
import InventoryPage from '../pageobjects/InventoryPage.js';
import CartPage from '../pageobjects/CartPage.js';

describe('Inventory Page - Cart persists after navigation', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should add two items and keep them after navigating away and back', async () => {
        await InventoryPage.addProducts(2);

        const countBefore = await InventoryPage.getCartCount();
        assert.strictEqual(countBefore, 2, 'Cart count before navigation should be 2');

        await InventoryPage.navigateAwayAndBack();

        const countAfter = await InventoryPage.getCartCount();
        assert.strictEqual(countAfter, 2, 'Cart count after navigation should still be 2');

        await CartPage.openCart();

        const cartCount = await CartPage.getItemCount();
        assert.strictEqual(cartCount, 2, 'Cart page should display 2 items');
    });
});
