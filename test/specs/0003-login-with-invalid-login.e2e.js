describe('Login Page - Invalid Username', () => {
    it('should show error when logging in with invalid username and valid password', async () => {
        // Precondition: пользователь находится на странице логина
        await browser.url('https://www.google.com');

        // Шаг 1: Ввод невалидного логина
        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standarD_user'); // или любое другое несуществующее имя
        expect(await usernameInput.getValue()).toBe('standarD_user');

        // Шаг 2: Ввод валидного пароля
        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');
        expect(await passwordInput.getAttribute('type')).toBe('password');

        // Шаг 3: Клик по кнопке "Login"
        const loginButton = await $('#login-button');
        await loginButton.click();

        // Ожидаемый результат:
        // 1. Появляются иконки "X" на полях
        const usernameError = await $('.input_error.form_input.error[data-test="username"]');
        const passwordError = await $('.input_error.form_input.error[data-test="password"]');

        expect(await usernameError.isExisting()).toBe(true);
        expect(await passwordError.isExisting()).toBe(true);

        // 2. Отображается сообщение об ошибке
        const errorMessage = await $('h3[data-test="error"]');
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage).toHaveTextContaining(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });
});
