import assert from 'assert';
import InventoryPage from '../pageobjects/InventoryPage.js';

describe('Cart - Re-adding item after removal', () => {
    before(async () => {
        await InventoryPage.open();
        await InventoryPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should allow re-adding the same item after removing it from the cart', async () => {
        await InventoryPage.addProductByIndex(0);

        let badgeCount = await InventoryPage.getCartCount();
        assert.strictEqual(badgeCount, 1);

        await InventoryPage.goToCart();
        await expect(browser).toHaveUrlContaining('/cart');

        await InventoryPage.removeProduct(0);

        const cartItemsAfter = await $$('.cart_item');
        assert.strictEqual(cartItemsAfter.length, 0);

        await browser.url('https://www.saucedemo.com/inventory.html');
        await expect(browser).toHaveUrlContaining('/inventory');

        await InventoryPage.addProductByIndex(0);

        badgeCount = await InventoryPage.getCartCount();
        assert.strictEqual(badgeCount, 1);
    });
});
