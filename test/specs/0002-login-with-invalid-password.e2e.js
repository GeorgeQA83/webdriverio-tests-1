describe('Login Page - Invalid Password', () => {
    it('should display an error when a valid username and an invalid password are entered', async () => {
        await browser.url('https://www.saucedemo.com/');

        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standard_user');
        expect(await usernameInput.getValue()).toBe('standard_user');

        const passwordInput = await $('#password');
        await passwordInput.setValue('wrong_password');
        expect(await passwordInput.getAttribute('type')).toBe('password');

        const loginButton = await $('#login-button');
        await loginButton.click();

        const usernameErrorIcon = await $('.input_error.form_input.error[data-test="username"]');
        const passwordErrorIcon = await $('.input_error.form_input.error[data-test="password"]');
        expect(await usernameErrorIcon.isExisting()).toBe(true);
        expect(await passwordErrorIcon.isExisting()).toBe(true);

        const errorMessage = await $('h3[data-test="error"]');
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage).toHaveTextContaining(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });
});
