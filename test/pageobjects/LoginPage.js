class LoginPage {
    get inputUsername() { return $('#user-name'); }
    get inputPassword() { return $('#password'); }
    get btnLogin() { return $('#login-button'); }
    get errorMessage() { return $('h3[data-test="error"]'); }

    async open() {
        await browser.url('https://www.saucedemo.com');
    }

    async login(username, password) {
        await this.open();
        await this.inputUsername.waitForExist({ timeout: 5000 });
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    async isErrorDisplayed() {
        return await this.errorMessage.isDisplayed();
    }

    async getErrorMessage() {
        if (await this.errorMessage.isExisting()) {
            return await this.errorMessage.getText();
        }
        return '';
    }
}

export default new LoginPage();
