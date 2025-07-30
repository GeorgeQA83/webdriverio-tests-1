import assert from 'assert';
import InventoryPage from '../pageobjects/InventoryPage.js';
import CartPage from '../pageobjects/CartPage.js';
import CheckoutPage from '../pageobjects/CheckoutPage.js';
import CheckoutCompletePage from '../pageobjects/CheckoutCompletePage.js';
import LoginPage from '../pageobjects/LoginPage.js';

describe('Checkout - Cart is cleared after order is completed', () => {
    before(async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should clear cart after completing order', async () => {
        await InventoryPage.addProduct();

        assert.strictEqual(await InventoryPage.getCartCount(), 1);

        await InventoryPage.goToCart();

        await CartPage.proceedToCheckout();

        await CheckoutPage.fillCustomerInfo('Geo', 'Irem', '49000');

        await CheckoutPage.finishOrder();

        await CheckoutCompletePage.verifyOrderSuccess();

        await CheckoutCompletePage.backToInventory();

        const cartCount = await InventoryPage.getCartCount();
        assert.strictEqual(cartCount, 0, 'Cart badge should not be visible after order');

        await InventoryPage.goToCart();

        const cartItemsCount = await CartPage.getItemCount();
        assert.strictEqual(cartItemsCount, 0, 'Cart should be empty after order completion');
    });
});
