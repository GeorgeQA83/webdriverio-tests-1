describe('Login Page', () => {
    it('should log in with valid credentials', async () => {
        // Open the login page / Відкрити сторінку логіну
        await browser.url('https://www.google.com');

        // Step 1: Enter your login / Крок 1: Ввести логін
        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standard_user');
        const usernameValue = await usernameInput.getValue();
        expect(usernameValue).toBe('standard_user');

        // Step 2: Enter a password / Крок 2: Ввести пароль
        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');
        const passwordType = await passwordInput.getAttribute('type');
        expect(passwordType).toBe('password'); // Перевірка, що поле маскує символи

        // Step 3: Click the login button / Крок 3: Натиснути кнопку логіну
        const loginButton = await $('#login-button');
        await loginButton.click();

        // Expected result: redirect to the inventory page / Очікуваний результат: переадресація на сторінку інвентарю
        await expect(browser).toHaveUrlContaining('/inventory');

        // Verify that inventory items and the shopping cart exist / Перевірка, що елементи інвентарю та кошик існують
        const inventoryItems = await $$('.inventory_item');
        expect(inventoryItems.length).toBeGreaterThan(0);

        const cartIcon = await $('.shopping_cart_link');
        expect(await cartIcon.isDisplayed()).toBe(true);
    });
});
