describe('Cart persistence after page reload', () => {

    before(async () => {
        await browser.url('https://google.com');

        // Step: Enter username / Крок: Введення логіну
        await $('#user-name').setValue('standard_user');

        // Step: Enter password / Крок: Введення паролю
        await $('#password').setValue('secret_sauce');

        // Step: Click the login button / Крок: Натискання на кнопку логіну
        await $('#login-button').click();

        // Verify that the user is on the inventory page / Перевірка, що користувач на сторінці товарів
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should keep products in the cart after page reload', async () => {

        // Check that the cart is empty (if badge exists) / Перевірка, що кошик порожній (якщо значок існує)
        const cartBadge = await $('.shopping_cart_badge');
        if (await cartBadge.isExisting()) {
            await expect(await cartBadge.getText()).toBe('0');
        }

        // Step: Add two items to the cart / Крок: Додаємо два товари в кошик
        const addButtons = await $$('button.btn_inventory');
        await addButtons[0].click();
        await addButtons[1].click();

        // Verify: Cart should show 2 items / Перевірка: У кошику має бути 2 товари
        const badge = await $('.shopping_cart_badge');
        await expect(await badge.getText()).toBe('2');

        // Step: Refresh the page / Крок: Перезавантаження сторінки
        await browser.refresh();

        // Verify: Items are still in the cart / Перевірка: Товари залишились у кошику
        const badgeAfterReload = await $('.shopping_cart_badge');
        await expect(await badgeAfterReload.getText()).toBe('2');
    });
});
