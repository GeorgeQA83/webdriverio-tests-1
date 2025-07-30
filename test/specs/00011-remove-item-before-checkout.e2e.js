import assert from 'assert';
import InventoryPage from '../pageobjects/InventoryPage.js';
import CartPage from '../pageobjects/CartPage.js';
import CheckoutPage from '../pageobjects/CheckoutPage.js';
import CheckoutOverviewPage from '../pageobjects/CheckoutOverviewPage.js';
import LoginPage from '../pageobjects/LoginPage.js';

describe('Cart - Remove item before checkout', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrlContaining('/inventory');
    });

    it('should remove item from cart and continue checkout with correct total', async () => {
        await InventoryPage.addProducts(2);

        const cartCountAfterAdd = await InventoryPage.getCartCount();
        assert.strictEqual(cartCountAfterAdd, 2, 'Cart count after adding 2 products should be 2');

        await InventoryPage.goToCart();

        const cartItemCount = await CartPage.getItemCount();
        assert.strictEqual(cartItemCount, 2, 'Cart page should display 2 items');

        await CartPage.removeItem(0);

        const cartItemCountAfterRemove = await CartPage.getItemCount();
        assert.strictEqual(cartItemCountAfterRemove, 1, 'Cart page should display 1 item after removal');

        const badgeCount = await InventoryPage.getCartCount();
        assert.strictEqual(badgeCount, 1, 'Cart badge should show 1 item after removal');

        await CartPage.proceedToCheckout();

        await CheckoutPage.fillCustomerInfo('Test', 'User', '00000');
        await expect(browser).toHaveUrlContaining('/checkout-step-two');

        const checkoutItemCount = await CheckoutOverviewPage.getItemCount();
        assert.strictEqual(checkoutItemCount, 1, 'Checkout overview should list 1 item');

        const itemPrice = await CheckoutOverviewPage.getItemPrice();
        const total = await CheckoutOverviewPage.getTotal();

        assert.ok(total >= itemPrice, 'Total price should be equal or greater than item price');
    });
});