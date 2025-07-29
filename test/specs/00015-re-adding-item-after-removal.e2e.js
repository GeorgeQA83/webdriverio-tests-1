const assert = require('assert');

describe('Cart - Re-adding item after removal', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should allow re-adding the same item after removing it from the cart', async () => {
        const firstAddButton = await $('button.btn_inventory');
        await firstAddButton.click();

        let badge = await $('.shopping_cart_badge');
        assert.strictEqual(await badge.getText(), '1');

        await $('.shopping_cart_link').click();
        await expect(browser).toHaveUrlContaining('/cart');

        const removeButton = await $('button.cart_button');
        await removeButton.click();

        const cartItemsAfter = await $$('.cart_item');
        assert.strictEqual(cartItemsAfter.length, 0);

        await browser.url('https://www.saucedemo.com/inventory.html');

        const addButtonAgain = await $('button.btn_inventory');
        await addButtonAgain.click();

        badge = await $('.shopping_cart_badge');
        assert.strictEqual(await badge.getText(), '1');
    });
});
