import Page from './Page.js';

class CartPage extends Page {
    get checkoutButton() { return $('#checkout'); }
    get cartItems() { return $$('.cart_item'); }
    get continueShoppingButton() { return $('#continue-shopping'); }
    get removeButtons() { return $$('button.cart_button'); } // кнопки удаления товаров
    get cartBadge() { return $('.shopping_cart_badge'); } // бейдж корзины

    async openCart() {
        await browser.url('https://www.saucedemo.com/cart.html');
        await this.checkoutButton.waitForDisplayed({ timeout: 5000 });
    }

    async isCartEmpty() {
        const count = await this.cartItems.length;
        return count === 0;
    }

    async clickCheckout() {
        if (await this.checkoutButton.isClickable()) {
            await this.checkoutButton.click();
        }
    }

    async isRedirectedToCheckout() {
        return (await browser.getUrl()).includes('/checkout-step-one');
    }

    async proceedToCheckout() {
        await this.clickCheckout();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/checkout-step-one'),
            {
                timeout: 5000,
                timeoutMsg: 'Checkout step one page did not load'
            }
        );
    }

    async getItemCount() {
        return (await this.cartItems).length;
    }

    async continueShopping() {
        await this.continueShoppingButton.waitForClickable({ timeout: 5000 });
        await this.continueShoppingButton.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory'),
            {
                timeout: 5000,
                timeoutMsg: 'Inventory page did not load after continuing shopping'
            }
        );
    }

    async removeItem(index = 0) {
        const buttons = await this.removeButtons;
        if (buttons.length > index) {
            await buttons[index].click();
            await browser.pause(500); // опционально, чтобы дождаться обновления страницы
        } else {
            throw new Error(`No remove button found at index ${index}`);
        }
    }

    async getCartCountText() {
        if (await this.cartBadge.isExisting()) {
            return await this.cartBadge.getText();
        }
        return '0';
    }
}

export default new CartPage();
