describe('Login Page', () => {
    it('should log in with valid credentials', async () => {
        await browser.url('https://www.saucedemo.com/');
        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standard_user');
        const usernameValue = await usernameInput.getValue();
        expect(usernameValue).toBe('standard_user');
        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');
        const passwordType = await passwordInput.getAttribute('type');
        expect(passwordType).toBe('password');
        const loginButton = await $('#login-button');
        await loginButton.click();
        await expect(browser).toHaveUrlContaining('/inventory');
        const inventoryItems = await $$('.inventory_item');
        expect(inventoryItems.length).toBeGreaterThan(0);
        const cartIcon = await $('.shopping_cart_link');
        expect(await cartIcon.isDisplayed()).toBe(true);
    });
});
