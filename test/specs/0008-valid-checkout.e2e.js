const assert = require('assert');

describe('Inventory Page - Complete Checkout Flow', () => {
    before(async () => {
        // Precondition: user logs in and gets to the inventory page / користувач логіниться і потрапляє на inventory page
        await browser.url('https://www.google.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should complete full checkout process', async () => {
        // Step 1: Add item to basket / Крок 1: Додати товар у кошик
        const firstProduct = await $('button.btn_inventory');
        const productContainer = await firstProduct.parentElement();
        const productPriceElement = await productContainer.$('.inventory_item_price');
        const productPriceText = await productPriceElement.getText();
        const productPrice = parseFloat(productPriceText.replace('$', ''));

        await firstProduct.click();

        // Expected result: the number 1 appears on the basket icon / Очікуваний результат: на іконці кошика з'являється число 1
        const cartBadge = await $('.shopping_cart_badge');
        await expect(cartBadge).toBeDisplayed();
        assert.strictEqual(await cartBadge.getText(), '1');

        // Step 2: Go to basket
        await $('.shopping_cart_link').click();
        await expect(browser).toHaveUrlContaining('/cart');

        // Expected result: there is a selected product on the cart page / Очікуваний результат: на сторінці кошика є обраний товар
        const cartItems = await $$('.cart_item');
        assert.strictEqual(cartItems.length, 1);

        // Step 3: Click "Checkout" / Крок 3: Натиснути «Checkout»
        await $('#checkout').click();
        await expect(browser).toHaveUrlContaining('/checkout-step-one');

        // Steps 4-6: Filling in the form / Кроки 4-6: Заповнення форми
        await $('#first-name').setValue('Geo');
        await $('#last-name').setValue('Irem');
        await $('#postal-code').setValue('49000');

        // Check: the data has been entered / Перевірка: дані введені
        assert.strictEqual(await $('#first-name').getValue(), 'Geo');
        assert.strictEqual(await $('#last-name').getValue(), 'Irem');
        assert.strictEqual(await $('#postal-code').getValue(), '49000');

        // Step 7: Click ‘Continue’ / Крок 7: Натиснути «Continue»
        await $('#continue').click();
        await expect(browser).toHaveUrlContaining('/checkout-step-two');

        // Check: product in place, price match / Перевірка: продукт на місці, ціна збігається
        const summaryPriceElement = await $('.inventory_item_price');
        const summaryPrice = parseFloat((await summaryPriceElement.getText()).replace('$', ''));
        assert.strictEqual(summaryPrice, productPrice);

        // Total amount / Загальна сума
        const totalElement = await $('.summary_total_label');
        const totalText = await totalElement.getText(); // Например: "Total: $32.39"
        const totalValue = parseFloat(totalText.replace('Total: $', ''));
        assert.strictEqual(totalValue, productPrice + 2.4); // У saucedemo фиксированный tax = $2.40

        // Step 8: Click ‘Finish’ / Крок 8: Натиснути «Finish»
        await $('#finish').click();
        await expect(browser).toHaveUrlContaining('/checkout-complete');

        // Message verification: ‘Thank you for your order!’ / Перевірка повідомлення: «Дякуємо за ваше замовлення!»
        const completeHeader = await $('.complete-header');
        assert.strictEqual(await completeHeader.getText(), 'Thank you for your order!');

        // Step 9: Click ‘Back Home’ / Крок 9: Натиснути «Back Home»
        await $('#back-to-products').click();
        await expect(browser).toHaveUrlContaining('/inventory');

        // Check: products are displayed, basket is empty / Перевірка: товари відображаються, кошик порожній
        const items = await $$('.inventory_item');
        assert(items.length > 0);

        const cartIcon = await $('.shopping_cart_badge');
        const isCartBadgeExisting = await cartIcon.isExisting();
        assert.strictEqual(isCartBadgeExisting, false);
    });
});
