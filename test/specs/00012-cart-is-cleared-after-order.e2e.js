const assert = require('assert');

describe('Checkout - Cart is cleared after order is completed', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should clear cart after completing order', async () => {
        const firstProductButton = await $('button.btn_inventory');
        await firstProductButton.click();

        const cartBadge = await $('.shopping_cart_badge');
        assert.strictEqual(await cartBadge.getText(), '1', 'Cart badge should show 1 item');

        await $('.shopping_cart_link').click();
        await $('#checkout').click();

        await $('#first-name').setValue('Geo');
        await $('#last-name').setValue('Irem');
        await $('#postal-code').setValue('49000');
        await $('#continue').click();

        await $('#finish').click();
        await expect(browser).toHaveUrlContaining('/checkout-complete');

        const successMessage = await $('.complete-header');
        assert.strictEqual(
            await successMessage.getText(),
            'Thank you for your order!',
            'Order confirmation message should be shown'
        );

        await $('#back-to-products').click();
        await expect(browser).toHaveUrlContaining('/inventory');

        const cartBadgeExists = await $('.shopping_cart_badge').isExisting();
        assert.strictEqual(cartBadgeExists, false, 'Cart badge should not be visible after order');

        await $('.shopping_cart_link').click();
        const cartItems = await $$('.cart_item');
        assert.strictEqual(cartItems.length, 0, 'Cart should be empty after order completion');
    });
});
