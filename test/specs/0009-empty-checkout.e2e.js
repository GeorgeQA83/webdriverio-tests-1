const assert = require('assert');

describe('Inventory Page - Checkout with Empty Cart', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should not proceed to checkout with empty cart or show no items there', async () => {
        await $('.shopping_cart_link').click();
        await expect(browser).toHaveUrlContaining('/cart');

        const cartItems = await $$('.cart_item');
        assert.strictEqual(cartItems.length, 0, 'Очікується, що кошик порожній');

        await $('#checkout').click();
        const currentUrl = await browser.getUrl();

        if (currentUrl.includes('/checkout-step-one')) {
            await $('#first-name').setValue('Geo');
            await $('#last-name').setValue('Test');
            await $('#postal-code').setValue('00000');
            await $('#continue').click();

            const summaryItems = await $$('.cart_item');
            assert.strictEqual(summaryItems.length, 0, 'Checkout повинен бути без товарів');
        } else {
            await expect(browser).toHaveUrlContaining('/cart');

            const errorContainer = await $('.error-message-container, .cart_empty_error');
            if (await errorContainer.isExisting()) {
                const text = await errorContainer.getText();
                assert.ok(text.trim().length > 0, 'Очікується повідомлення про порожній кошик');
            }
        }
    });
});