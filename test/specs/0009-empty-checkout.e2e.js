import assert from 'assert';
import LoginPage from '../pageobjects/LoginPage.js';
import CartPage from '../pageobjects/CartPage.js';

describe('Inventory Page - Checkout with Empty Cart', () => {
    before(async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should NOT allow proceeding to checkout with empty cart', async () => {
        await CartPage.openCart();

        const isEmpty = await CartPage.isCartEmpty();
        assert.strictEqual(
            isEmpty,
            true
        );

        await CartPage.clickCheckout();

        const isRedirected = await CartPage.isRedirectedToCheckout();
        assert.strictEqual(
            isRedirected,
            false,
            'BUG: Checkout allowed with empty cart!')
    });
})