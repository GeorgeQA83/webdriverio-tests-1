import Page from './Page.js';

class CheckoutPage extends Page {
    get firstName() { return $('#first-name'); }
    get lastName() { return $('#last-name'); }
    get postalCode() { return $('#postal-code'); }
    get continueButton() { return $('#continue'); }
    get finishButton() { return $('#finish'); }

    async fillCustomerInfo(first, last, postal) {
        await this.firstName.setValue(first);
        await this.lastName.setValue(last);
        await this.postalCode.setValue(postal);
        await this.continueButton.click();
        await expect(browser).toHaveUrlContaining('/checkout-step-two');
    }

    async finishOrder() {
        await this.finishButton.click();
        await expect(browser).toHaveUrlContaining('/checkout-complete');
    }
}

export default new CheckoutPage();
