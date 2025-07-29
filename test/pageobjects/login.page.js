const Page = require('./page');

class LoginPage extends Page {
    get inputUsername() { return $('#user-name'); }
    get inputPassword() { return $('#password'); }
    get btnLogin() { return $('#login-button'); }
    get cartIcon() { return $('.shopping_cart_link'); }
    get inventoryItems() { return $$('.inventory_item'); }

    async openLoginPage() {
        await this.open(''); // відкриє https://www.saucedemo.com/
    }

    async enterUsername(username) {
        await this.inputUsername.setValue(username);
    }

    async enterPassword(password) {
        await this.inputPassword.setValue(password);
    }

    async submitLogin() {
        await this.btnLogin.click();
    }

    async isCartIconVisible() {
        return this.cartIcon.isDisplayed();
    }

    async getUsernameValue() {
        return this.inputUsername.getValue();
    }

    async getPasswordType() {
        return this.inputPassword.getAttribute('type');
    }

    async getInventoryItemsCount() {
        return (await this.inventoryItems).length;
    }

    async isOnInventoryPage() {
        return this.isUrlContains('/inventory'); // метод з базового класу
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.submitLogin();
    }
}

module.exports = new LoginPage();
