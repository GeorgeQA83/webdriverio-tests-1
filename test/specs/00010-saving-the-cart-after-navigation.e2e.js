const assert = require('assert');

describe('Inventory Page - Cart persists after navigation', () => {
    before(async () => {
        await browser.url('https://www.google.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should add two items and keep them after navigating away and back', async () => {
        // Add two different products / Додати два різні товари
        const buttons = await $$('button.btn_inventory');
        await buttons[0].click();
        await buttons[1].click();

        const badge = await $('.shopping_cart_badge');
        assert.strictEqual(await badge.getText(), '2');

        // Open menu "About" / Відкрити меню "About"
        await $('#react-burger-menu-btn').click();
        await browser.pause(300);
        const aboutLink = await $('#about_sidebar_link');
        await aboutLink.click();

        // Go back / Повернутися назад
        await browser.back();

        // Check that the basket is still there / Перевірити, що кошик залишився
        const badgeAgain = await $('.shopping_cart_badge');
        assert.strictEqual(await badgeAgain.getText(), '2');

        // Go to basket and check availability of 2 items / Перейти в кошик і перевірити наявність 2 товарів
        await $('.shopping_cart_link').click();
        await expect(browser).toHaveUrlContaining('/cart');

        const cartItems = await $$('.cart_item');
        assert.strictEqual(cartItems.length, 2);
    });
});