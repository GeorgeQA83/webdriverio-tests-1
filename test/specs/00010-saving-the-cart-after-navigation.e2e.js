const assert = require('assert');

describe('Inventory Page - Cart persists after navigation', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should add two items and keep them after navigating away and back', async () => {
        const buttons = await $$('button.btn_inventory');
        await buttons[0].click();
        await buttons[1].click();

        const badge = await $('.shopping_cart_badge');
        assert.strictEqual(await badge.getText(), '2');

        await $('#react-burger-menu-btn').click();
        await browser.pause(300);
        await $('#about_sidebar_link').click();

        await browser.back();

        const badgeAgain = await $('.shopping_cart_badge');
        assert.strictEqual(await badgeAgain.getText(), '2');

        await $('.shopping_cart_link').click();
        await expect(browser).toHaveUrlContaining('/cart');

        const cartItems = await $$('.cart_item');
        assert.strictEqual(cartItems.length, 2);
    });
});
