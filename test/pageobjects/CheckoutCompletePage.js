import Page from './Page.js';

class CheckoutCompletePage extends Page {
    get successMessage() { return $('.complete-header'); }
    get backToProductsButton() { return $('#back-to-products'); }

    async verifyOrderSuccess() {
        await expect(this.successMessage).toHaveText('Thank you for your order!');
    }

    async backToInventory() {
        await this.backToProductsButton.click();
        await expect(browser).toHaveUrlContaining('/inventory');
    }
}

export default new CheckoutCompletePage();
