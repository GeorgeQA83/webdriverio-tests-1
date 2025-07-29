describe('Inventory Page - Logout flow', () => {
    it('should log out the user via burger menu and redirect to login page', async () => {
        await browser.url('https://www.saucedemo.com');

        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        await expect(browser).toHaveUrlContaining('/inventory');

        // Step 1: Click burger menu
        const menuButton = await $('#react-burger-menu-btn');
        await menuButton.waitForClickable();
        await menuButton.click();

        // Wait for sidebar menu to be fully open
        const menuPanel = await $('.bm-menu-wrap'); // outer menu wrapper
        await menuPanel.waitForDisplayed({ timeout: 3000 });

        // Step 2: Wait for logout link and click it
        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.waitForClickable({ timeout: 3000 });
        await logoutButton.click();

        // Step 3: Wait until redirected to login page
        await browser.waitUntil(
            async () => (await browser.getUrl()) === 'https://www.saucedemo.com/',
            {
                timeout: 5000,
                timeoutMsg: 'Expected to be redirected to login page after logout',
            }
        );

        // Step 4: Validate that login fields are reset
        const usernameInput = await $('#user-name');
        const passwordInput = await $('#password');
        await expect(usernameInput).toHaveValue('');
        await expect(passwordInput).toHaveValue('');
    });
});
