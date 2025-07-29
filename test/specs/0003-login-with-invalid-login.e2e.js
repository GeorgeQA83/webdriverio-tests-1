describe('Login Page - Invalid Username', () => {
    it('should show error when logging in with invalid username and valid password', async () => {
        await browser.url('https://www.saucedemo.com/');

        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standarD_user');
        expect(await usernameInput.getValue()).toBe('standarD_user');

        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');
        expect(await passwordInput.getAttribute('type')).toBe('password');

        const loginButton = await $('#login-button');
        await loginButton.click();

        const usernameError = await $('.input_error.form_input.error[data-test="username"]');
        const passwordError = await $('.input_error.form_input.error[data-test="password"]');

        expect(await usernameError.isExisting()).toBe(true);
        expect(await passwordError.isExisting()).toBe(true);

        const errorMessage = await $('h3[data-test="error"]');
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage).toHaveTextContaining(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });
});
