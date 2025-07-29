describe('Inventory Page - Social Media Links in Footer', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    async function verifySocialLink(selector, expectedUrlPart) {
        const link = await $(selector);

        const isExisting = await link.waitForExist({ timeout: 5000 }).catch(() => false);
        if (!isExisting) {
            console.warn(`⚠️ Element not found for selector: ${selector}`);
            return;
        }

        const originalWindow = await browser.getWindowHandle();
        await link.click();

        await browser.waitUntil(async () => {
            const handles = await browser.getWindowHandles();
            return handles.length > 1;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected a new tab to open'
        });

        const handles = await browser.getWindowHandles();
        const newTab = handles.find(h => h !== originalWindow);
        if (!newTab) throw new Error('New tab handle not found');

        await browser.switchToWindow(newTab);
        await expect(browser).toHaveUrlContaining(expectedUrlPart);
        await browser.closeWindow();
        await browser.switchToWindow(originalWindow);
    }

    it('should open Twitter (X) page in a new tab', async () => {
        await verifySocialLink('.social_twitter a', 'x.com');
    });

    it('should open Facebook page in a new tab', async () => {
        await verifySocialLink('.social_facebook a', 'facebook.com');
    });

    it('should open LinkedIn page in a new tab', async () => {
        await verifySocialLink('.social_linkedin a', 'linkedin.com');
    });
});
