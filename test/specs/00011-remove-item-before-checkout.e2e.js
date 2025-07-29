const assert = require('assert');

describe('Cart - Remove item before checkout', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should remove item from cart and continue checkout with correct total', async () => {
        const buttons = await $$('button.btn_inventory');
        await buttons[0].click();
        await buttons[1].click();

        const badge = await $('.shopping_cart_badge');
        assert.strictEqual(await badge.getText(), '2');

        await $('.shopping_cart_link').click();
        await expect(browser).toHaveUrlContaining('/cart');

        const cartItemsBefore = await $$('.cart_item');
        assert.strictEqual(cartItemsBefore.length, 2);

        const removeButtons = await $$('button.cart_button');
        await removeButtons[0].click();

        const cartItemsAfter = await $$('.cart_item');
        assert.strictEqual(cartItemsAfter.length, 1);

        const newBadge = await $('.shopping_cart_badge');
        assert.strictEqual(await newBadge.getText(), '1');

        await $('#checkout').click();
        await $('#first-name').setValue('Test');
        await $('#last-name').setValue('User');
        await $('#postal-code').setValue('00000');
        await $('#continue').click();

        await expect(browser).toHaveUrlContaining('/checkout-step-two');

        const overviewItems = await $$('.cart_item');
        assert.strictEqual(overviewItems.length, 1);

        const itemPriceElement = await $('.inventory_item_price');
        const itemPrice = parseFloat((await itemPriceElement.getText()).replace('$', ''));

        const totalElement = await $('.summary_total_label');
        const total = parseFloat((await totalElement.getText()).replace('Total: $', ''));

        assert.ok(total >= itemPrice, 'Total should be equal to or greater than item price');
    });
});
