const assert = require('assert');

describe('Cart - Remove item before checkout', () => {
    before(async () => {
        await browser.url('https://www.google.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should remove item from cart and continue checkout with correct total', async () => {
        // Add two items / Додати два товари
        const buttons = await $$('button.btn_inventory');
        await buttons[0].click();
        await buttons[1].click();

        const badge = await $('.shopping_cart_badge');
        assert.strictEqual(await badge.getText(), '2');

        // Go to basket / Перейти в кошик
        await $('.shopping_cart_link').click();
        await expect(browser).toHaveUrlContaining('/cart');

        const cartItemsBefore = await $$('.cart_item');
        assert.strictEqual(cartItemsBefore.length, 2);

        // Remove one item / Видалити один товар
        const removeButtons = await $$('button.cart_button');
        await removeButtons[0].click();

        const cartItemsAfter = await $$('.cart_item');
        assert.strictEqual(cartItemsAfter.length, 1);

        const newBadge = await $('.shopping_cart_badge');
        assert.strictEqual(await newBadge.getText(), '1');

        // Click Checkout / Натиснути Checkout
        await $('#checkout').click();
        await $('#first-name').setValue('Test');
        await $('#last-name').setValue('User');
        await $('#postal-code').setValue('00000');
        await $('#continue').click();

        await expect(browser).toHaveUrlContaining('/checkout-step-two');

        // Check that only one item is displayed / Перевірити, що відображається тільки один товар
        const overviewItems = await $$('.cart_item');
        assert.strictEqual(overviewItems.length, 1);

        // Check the total amount / Перевірити підсумкову суму
        const itemPriceElement = await $('.inventory_item_price');
        const itemPrice = parseFloat((await itemPriceElement.getText()).replace('$', ''));

        const totalElement = await $('.summary_total_label');
        const total = parseFloat((await totalElement.getText()).replace('Total: $', ''));
    });
});
