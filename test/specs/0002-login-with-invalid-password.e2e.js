describe('Login Page - Invalid Password', () => {
    it('should show error when logging in with valid username and invalid password', async () => {
        // Precondition: User on the login page / Користувач на сторінці входу
        await browser.url('https://www.google.com');

        // Step 1: Enter a valid username / Крок 1: Ввести валідний логін
        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standard_user');
        expect(await usernameInput.getValue()).toBe('standard_user');

        // Step 2: Enter a invalid password / Крок 2: Ввести невалідний пароль
        const passwordInput = await $('#password');
        await passwordInput.setValue('wrong_password');
        expect(await passwordInput.getAttribute('type')).toBe('password');

        // Step 3: Click the "Login" button / Крок 3: Натиснути кнопку "Login"
        const loginButton = await $('#login-button');
        await loginButton.click();

        // Expected result: / Очікуваний результат:
        // 1. "X" icons appear on login and password fields / 1. З'являються іконки "X" на полях логіна і пароля
        const usernameErrorIcon = await $('.input_error.form_input.error[data-test="username"]');
        const passwordErrorIcon = await $('.input_error.form_input.error[data-test="password"]');
        expect(await usernameErrorIcon.isExisting()).toBe(true);
        expect(await passwordErrorIcon.isExisting()).toBe(true);

        // 2. An error message is displayed / 2. Відображається повідомлення про помилку
        const errorMessage = await $('h3[data-test="error"]');
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage).toHaveTextContaining(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });
});
