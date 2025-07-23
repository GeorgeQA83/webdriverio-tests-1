const assert = require('assert');

describe('Checkout - Cart is cleared after order is completed', () => {
    before(async () => {
        await browser.url('https://google.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should clear cart after completing order', async () => {
        // Step 1: Add a product / Крок 1: Додати товар
        const firstProductButton = await $('button.btn_inventory');
        await firstProductButton.click();

        const cartBadge = await $('.shopping_cart_badge');
        assert.strictEqual(await cartBadge.getText(), '1');

        // Step 2: Go to basket → Checkout / Крок 2: Перейти в кошик → Checkout
        await $('.shopping_cart_link').click();
        await $('#checkout').click();

        // Fill in the form / Заповнити форму 
        await $('#first-name').setValue('Geo');
        await $('#last-name').setValue('Irem');
        await $('#postal-code').setValue('49000');
        await $('#continue').click();

        // Confirm the order / Підтвердити замовлення
        await $('#finish').click();
        await expect(browser).toHaveUrlContaining('/checkout-complete');

        const successMessage = await $('.complete-header');
        assert.strictEqual(await successMessage.getText(), 'Thank you for your order!');

        // Step 3: Navigate to the main page / Крок 3: Перейти на головну сторінку
        await $('#back-to-products').click();
        await expect(browser).toHaveUrlContaining('/inventory');

        // Check that the basket is empty / Перевірити, що кошик порожній
        const cartBadgeExists = await $('.shopping_cart_badge').isExisting();
        assert.strictEqual(cartBadgeExists, false, 'Cart badge should not be visible after checkout');

        // Step 4: Go to the basket and make sure the items are out of stock / Крок 4: Перейти в кошик і переконатися, що товарів немає
        await $('.shopping_cart_link').click();
        const cartItems = await $$('.cart_item');
        assert.strictEqual(cartItems.length, 0, 'Cart should be empty after order completion');
    });
});
