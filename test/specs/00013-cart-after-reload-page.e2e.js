import assert from 'assert';
import InventoryPage from '../pageobjects/InventoryPage.js';
import LoginPage from '../pageobjects/LoginPage.js';

describe('Cart persistence after page reload', () => {
    before(async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should keep products in the cart after page reload', async () => {
        await InventoryPage.addProductByIndex(0);
        await InventoryPage.addProductByIndex(1);

        const countAfterAdd = await InventoryPage.getCartCount();
        assert.strictEqual(countAfterAdd, 2, 'Cart should show 2 items');

        await browser.refresh();

        const countAfterReload = await InventoryPage.getCartCount();
        assert.strictEqual(countAfterReload, 2, 'Cart should still show 2 items after reload');
    });
});
