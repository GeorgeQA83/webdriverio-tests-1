class InventoryPage {
    get usernameInput() { return $('#user-name'); }
    get passwordInput() { return $('#password'); }
    get loginButton() { return $('#login-button'); }

    get productButtons() { return $$('button.btn_inventory'); }
    get removeButtons() { return $$('button.cart_button'); }
    get cartBadge() { return $('.shopping_cart_badge'); }
    get cartLink() { return $('.shopping_cart_link'); }
    get burgerMenu() { return $('#react-burger-menu-btn'); }
    get logoutLink() { return $('#logout_sidebar_link'); }
    get sortDropdown() { return $('.product_sort_container'); }
    get productNameElements() { return $$('div.inventory_item_name'); }
    get productPriceElements() { return $$('div.inventory_item_price'); }

    get twitterLink() { return $('a[href*="twitter.com"]'); }
    get facebookLink() { return $('a[href*="facebook.com"]'); }
    get linkedinLink() { return $('a[href*="linkedin.com"]'); }

    async open() {
        await browser.url('https://www.saucedemo.com/');
        await this.usernameInput.waitForDisplayed({ timeout: 5000 });
    }

    async login(username = 'standard_user', password = 'secret_sauce') {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory'),
            {
                timeout: 5000,
                timeoutMsg: 'Inventory page did not load after login'
            }
        );
    }

    async selectSort(optionText) {
        await this.sortDropdown.waitForExist({ timeout: 5000 });
        await this.sortDropdown.waitForDisplayed({ timeout: 5000 });
        await this.sortDropdown.selectByVisibleText(optionText);
    }

    async verifySocialLink(linkElement, expectedUrlPart) {
        if (!await linkElement.isExisting()) return false;
        const href = await linkElement.getAttribute('href');
        if (!href.includes(expectedUrlPart)) return false;
        await browser.newWindow(href);
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(expectedUrlPart),
            {
                timeout: 7000,
                timeoutMsg: `Expected URL to contain ${expectedUrlPart}`
            }
        );
        await browser.closeWindow();
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[0]);
        return true;
    }

    async addProduct(index = 0) {
        const buttons = await this.productButtons;
        if (buttons.length > index) {
            await buttons[index].click();
        } else {
            throw new Error(`No product button found at index ${index}`);
        }
    }

    async addProducts(count = 1) {
        const buttons = await this.productButtons;
        for (let i = 0; i < count && i < buttons.length; i++) {
            await buttons[i].click();
        }
    }

    async removeProduct(index = 0) {
        const buttons = await this.removeButtons;
        if (buttons.length > index) {
            await buttons[index].click();
        } else {
            throw new Error(`No remove button found at index ${index}`);
        }
    }

    async getCartCount() {
        if (await this.cartBadge.isExisting()) {
            const count = await this.cartBadge.getText();
            return parseInt(count, 10);
        }
        return 0;
    }

    async goToCart() {
        await this.cartLink.waitForClickable({ timeout: 5000 });
        await this.cartLink.click();
    }

    async logout() {
        await this.burgerMenu.waitForClickable({ timeout: 5000 });
        await this.burgerMenu.click();
        await this.logoutLink.waitForClickable({ timeout: 5000 });
        await this.logoutLink.click();
    }

    async getProductNames() {
        const names = [];
        for (const el of await this.productNameElements) {
            names.push(await el.getText());
        }
        return names;
    }

    async getProductPrices() {
        const prices = [];
        for (const el of await this.productPriceElements) {
            const text = await el.getText();
            prices.push(parseFloat(text.replace('$', '')));
        }
        return prices;
    }
    async addProductByIndex(index = 0) {
    const buttons = await this.productButtons;
    if (buttons.length > index) {
        await buttons[index].click();
    } else {
        throw new Error(`No product button found at index ${index}`);
    }
}

    async navigateAwayAndBack() {
        await browser.url('https://www.saucedemo.com/about.html');
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/about'),
            { timeout: 5000, timeoutMsg: 'About page did not load' }
        );
        await browser.url('https://www.saucedemo.com/inventory.html');
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory'),
            { timeout: 5000, timeoutMsg: 'Inventory page did not load after navigating back' }
        );
    }
}

export default new InventoryPage();
