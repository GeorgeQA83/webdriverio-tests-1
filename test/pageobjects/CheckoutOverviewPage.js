import Page from './Page.js';

class CheckoutOverviewPage extends Page {
    get items() { return $$('.cart_item'); }
    get itemPrice() { return $('.inventory_item_price'); }
    get totalLabel() { return $('.summary_total_label'); }

    async getItemCount() {
        const items = await this.items;
        return items.length;
    }

    async getItemPrice() {
        const priceText = await this.itemPrice.getText();
        return parseFloat(priceText.replace('$', ''));
    }

    async getTotal() {
        const totalText = await this.totalLabel.getText();
        return parseFloat(totalText.replace('Total: $', ''));
    }
}

export default new CheckoutOverviewPage();
