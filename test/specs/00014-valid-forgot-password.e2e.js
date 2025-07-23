describe('Forgot Password functionality', () => {

    before(async () => {
        // Step: Navigate to the login page / Крок: Перехід на сторінку логіну
        await browser.url('https://test.com/login');

        // Step: Click on "Forgot Password?" link / Крок: Натискання на лінк "Забули пароль?"
        const forgotLink = await $('=Forgot Password?');
        await forgotLink.click();

        // Verify: User is on the Forgot Password page / Перевірка: Користувач на сторінці відновлення паролю
        await expect(browser).toHaveUrlContaining('/forgot-password');
    });

    it('should send reset password link with valid email', async () => {
        // Step: Enter valid email address / Крок: Введення валідної email адреси
        const emailInput = await $('#email');
        await emailInput.setValue('testemail@gm.com');

        // Step: Submit the form / Крок: Надсилання форми
        const submitButton = await $('button[type="submit"]');
        await submitButton.click();

        // Verify: Success message is displayed / Перевірка: Відображається повідомлення про успішне надсилання
        const successMessage = await $('.alert-success');
        await expect(successMessage).toBeDisplayed();
        await expect(successMessage).toHaveTextContaining('reset link has been sent');
    });
});
