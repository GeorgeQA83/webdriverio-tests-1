describe('Inventory Page - Social Media Links in Footer', () => {
    before(async () => {
        // Precondition: user logs in and gets to the inventory page / користувач логіниться і потрапляє на inventory page
        await browser.url('https://www.google.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should open Twitter page in a new tab', async () => {
        // Step 1: Click on the Twitter icon / Крок 1: Клік по іконці Twitter
        const twitterLink = await $('.social_twitter a');
        const originalWindow = await browser.getWindowHandle();

        await twitterLink.click();

        // Wait for a new window to appear / Чекаємо, поки з'явиться нове вікно
        await browser.waitUntil(async () => {
            const handles = await browser.getWindowHandles();
            return handles.length > 1;
        }, { timeout: 5000 });

        const windowHandles = await browser.getWindowHandles();
        const newTab = windowHandles.find(handle => handle !== originalWindow);

        // Switch to a new tab and check the URL / Перемикаємося на нову вкладку і перевіряємо URL
        await browser.switchToWindow(newTab);
        await expect(browser).toHaveUrlContaining('twitter.com');

        // Close the tab and come back / Закриваємо вкладку і повертаємося
        await browser.closeWindow();
        await browser.switchToWindow(originalWindow);
    });

    it('should open Facebook page in a new tab', async () => {
        const facebookLink = await $('.social_facebook a');
        const originalWindow = await browser.getWindowHandle();

        await facebookLink.click();

        await browser.waitUntil(async () => {
            const handles = await browser.getWindowHandles();
            return handles.length > 1;
        }, { timeout: 5000 });

        const handles = await browser.getWindowHandles();
        const newTab = handles.find(handle => handle !== originalWindow);

        await browser.switchToWindow(newTab);
        await expect(browser).toHaveUrlContaining('facebook.com');

        await browser.closeWindow();
        await browser.switchToWindow(originalWindow);
    });

    it('should open LinkedIn page in a new tab', async () => {
        const linkedinLink = await $('.social_linkedin a');
        const originalWindow = await browser.getWindowHandle();

        await linkedinLink.click();

        await browser.waitUntil(async () => {
            const handles = await browser.getWindowHandles();
            return handles.length > 1;
        }, { timeout: 5000 });

        const handles = await browser.getWindowHandles();
        const newTab = handles.find(handle => handle !== originalWindow);

        await browser.switchToWindow(newTab);
        await expect(browser).toHaveUrlContaining('linkedin.com');

        await browser.closeWindow();
        await browser.switchToWindow(originalWindow);
    });
});
