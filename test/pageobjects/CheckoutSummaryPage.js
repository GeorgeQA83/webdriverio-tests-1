import Page from './Page.js';

class CheckoutSummaryPage extends Page {
    get itemPrice() { return $('.inventory_item_price'); }
    get totalPrice() { return $('.summary_total_label'); }

    async getItemPrice() {
        const text = await this.itemPrice.getText();
        return parseFloat(text.replace('$', ''));
    }

    async getTotalPrice() {
        const text = await this.totalPrice.getText();
        return parseFloat(text.replace('Total: $', ''));
    }
}

export default new CheckoutSummaryPage();
