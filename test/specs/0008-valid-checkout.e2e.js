const assert = require('assert');

describe('Inventory Page - Complete Checkout Flow', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should complete full checkout process', async () => {
        const firstProduct = await $('button.btn_inventory');

        await firstProduct.waitForDisplayed({ timeout: 5000 });
        const productContainer = await firstProduct.parentElement();
        const productPriceElement = await productContainer.$('.inventory_item_price');
        const productPriceText = await productPriceElement.getText();
        const productPrice = parseFloat(productPriceText.replace('$', ''));

        await firstProduct.click();

        const cartBadge = await $('.shopping_cart_badge');
        await cartBadge.waitForDisplayed({ timeout: 3000 });
        assert.strictEqual(await cartBadge.getText(), '1');

        await $('.shopping_cart_link').click();
        await expect(browser).toHaveUrlContaining('/cart');

        const cartItems = await $$('.cart_item');
        assert.strictEqual(cartItems.length, 1);

        await $('#checkout').click();
        await expect(browser).toHaveUrlContaining('/checkout-step-one');

        await $('#first-name').setValue('Geo');
        await $('#last-name').setValue('Irem');
        await $('#postal-code').setValue('49000');

        assert.strictEqual(await $('#first-name').getValue(), 'Geo');
        assert.strictEqual(await $('#last-name').getValue(), 'Irem');
        assert.strictEqual(await $('#postal-code').getValue(), '49000');

        await $('#continue').click();
        await expect(browser).toHaveUrlContaining('/checkout-step-two');

        const summaryPriceElement = await $('.inventory_item_price');
        const summaryPrice = parseFloat((await summaryPriceElement.getText()).replace('$', ''));
        assert.strictEqual(summaryPrice, productPrice);

        const totalElement = await $('.summary_total_label');
        const totalText = await totalElement.getText();
        const totalValue = parseFloat(totalText.replace('Total: $', ''));
        assert.strictEqual(totalValue, productPrice + 2.4);

        await $('#finish').click();
        await expect(browser).toHaveUrlContaining('/checkout-complete');

        const completeHeader = await $('.complete-header');
        assert.strictEqual(await completeHeader.getText(), 'Thank you for your order!');

        await $('#back-to-products').click();
        await expect(browser).toHaveUrlContaining('/inventory');

        const items = await $$('.inventory_item');
        assert(items.length > 0);

        const cartBadgeExists = await $('.shopping_cart_badge').isExisting();
        assert.strictEqual(cartBadgeExists, false);
    });
});
