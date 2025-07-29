const assert = require('assert');

describe('Cart persistence after page reload', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should keep products in the cart after page reload', async () => {
        const cartBadge = await $('.shopping_cart_badge');
        if (await cartBadge.isExisting()) {
            assert.strictEqual(await cartBadge.getText(), '0', 'Cart should initially be empty');
        }

        const addButtons = await $$('button.btn_inventory');
        await addButtons[0].click();
        await addButtons[1].click();

        const badge = await $('.shopping_cart_badge');
        assert.strictEqual(await badge.getText(), '2', 'Cart should show 2 items');

        await browser.refresh();

        const badgeAfterReload = await $('.shopping_cart_badge');
        assert.strictEqual(await badgeAfterReload.getText(), '2', 'Cart should still show 2 items after reload');
    });
});
