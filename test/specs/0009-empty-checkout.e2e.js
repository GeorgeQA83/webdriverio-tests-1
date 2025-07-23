const assert = require('assert');

describe('Inventory Page - Checkout with Empty Cart', () => {
    before(async () => {
        // Precondition: user logs in and gets to the inventory page / користувач логіниться і потрапляє на inventory page
        await browser.url('https://www.google.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should show empty cart page with no products', async () => {
        // Step 1: Click on the basket icon in the top right corner / Крок 1: Клік по іконці кошика в правому верхньому куті
        await $('.shopping_cart_link').click();
        await expect(browser).toHaveUrlContaining('/cart');

        // Expected result: shopping cart is empty, products does not display / Очікуваний результат: кошик порожній, товари не відображаються
        const cartItems = await $$('.cart_item');
        assert.strictEqual(cartItems.length, 0, 'Cart should be empty');
    });

    it('should prevent checkout and show error if cart is empty', async () => {
        // Step 2: Trying to click ‘Checkout’ on an empty basket
        const checkoutButton = await $('#checkout');
        await checkoutButton.click();

        // Check behaviour: if the site allows the transition - check error messages, if it doesn't - stay on /cart / Перевірка поведінки: якщо сайт допускає перехід - перевіримо повідомлення про помилку, якщо не переходить - залишаємося на /cart
        const currentUrl = await browser.getUrl();

        if (currentUrl.includes('/checkout-step-one')) {
            // Behaviour with a transition is allowed so need to display the error / Допущено поведінку з переходом - отже, потрібно показати помилку
            const errorElement = await $('.error-message-container');
            const isErrorDisplayed = await errorElement.isDisplayed();
            assert.strictEqual(isErrorDisplayed, true, 'Error message should be displayed');
            const errorText = await errorElement.getText();
            assert.match(errorText.toLowerCase(), /cart is empty|no items/i);
        } else {
            // Correct behaviour: stay on /cart / Правильна поведінка: залишитися на /cart
            await expect(browser).toHaveUrlContaining('/cart');
            // Assume that an error message is displayed / Припускаємо, що виводиться повідомлення про помилку
            const errorContainer = await $('.cart_empty_error, .error-message-container');
            const isErrorDisplayed = await errorContainer.isDisplayed();
            assert.strictEqual(isErrorDisplayed, true, 'Error message should be displayed when cart is empty');
            const errorText = await errorContainer.getText();
            assert.match(errorText.toLowerCase(), /cart is empty|no items/i);
        }
    });
});

