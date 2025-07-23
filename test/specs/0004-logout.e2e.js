describe('Inventory Page - Logout flow', () => {
    it('should log out the user via burger menu and redirect to login page', async () => {
        // Precondition: the user is logged in and is on the inventory page / користувач залогінений і перебуває на сторінці інвентарю
        await browser.url('https://www.google.com');

        // Perform a login / Виконати логін
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        // Make sure the user on the inventory page / Переконатися, що користувач на inventory page
        await expect(browser).toHaveUrlContaining('/inventory');

        // Step 1: Click on "burger" / Крок 1: Клік по «бургеру» меню
        const menuButton = await $('#react-burger-menu-btn');
        await menuButton.click();

        // Check that the menu has opened and contains 4 items / Перевірити, що меню відкрилося і містить 4 пункти
        const menuItems = await $$('.bm-item.menu-item');
        await browser.pause(500); // a slight delay for the menu to appear / легка затримка, щоб меню встигло з'явитися
        expect(menuItems.length).toBe(4);

        // Step 2: Click on Logout / Крок 2: Клік по Logout
        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.click();

        // Expected Result: / Очікуваний результат:
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');

        const usernameInput = await $('#user-name');
        const passwordInput = await $('#password');

        await expect(usernameInput).toHaveValue('');
        await expect(passwordInput).toHaveValue('');
    });
});
