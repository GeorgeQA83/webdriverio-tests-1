const assert = require('assert');

describe('Inventory Page - Cart and Logout flow', () => {
    it('should add item to cart, logout, login again and verify cart content', async () => {
        await browser.url('https://www.saucedemo.com');

        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        await expect(browser).toHaveUrlContaining('/inventory');

        const addToCartButton = await $('button.btn_inventory');
        await addToCartButton.click();

        const cartBadge = await $('.shopping_cart_badge');
        await expect(cartBadge).toBeDisplayed();
        const cartCount = await cartBadge.getText();
        assert.strictEqual(cartCount, '1');

        const burgerMenu = await $('#react-burger-menu-btn');
        await burgerMenu.click();

        await browser.waitUntil(async () => {
            const menu = await $('.bm-menu-wrap');
            return await menu.isDisplayed();
        }, {
            timeout: 2000,
            timeoutMsg: 'Burger menu did not appear'
        });

        const menuItems = await $$('.bm-item.menu-item');
        assert.strictEqual(menuItems.length, 4);

        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.waitForDisplayed();
        await logoutButton.waitForClickable();
        await logoutButton.click();

        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
        const usernameField = await $('#user-name');
        const passwordField = await $('#password');
        assert.strictEqual(await usernameField.getValue(), '');
        assert.strictEqual(await passwordField.getValue(), '');

        await usernameField.setValue('standard_user');
        await passwordField.setValue('secret_sauce');
        await $('#login-button').click();

        await expect(browser).toHaveUrlContaining('/inventory');
        const inventoryItems = await $$('.inventory_item');
        assert(inventoryItems.length > 0);

        const cartIconBadge = await $('.shopping_cart_badge');
        await expect(cartIconBadge).toBeDisplayed();
        assert.strictEqual(await cartIconBadge.getText(), '1');

        const cartButton = await $('.shopping_cart_link');
        await cartButton.click();

        await expect(browser).toHaveUrlContaining('/cart');
        const cartItems = await $$('.cart_item');
        assert.strictEqual(cartItems.length, 1);
    });
});
