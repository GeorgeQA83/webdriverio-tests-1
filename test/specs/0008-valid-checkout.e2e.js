import InventoryPage from '../pageobjects/InventoryPage.js';

describe('Inventory Page - Complete Checkout Flow', () => {
    before(async () => {
        await InventoryPage.open();
        await InventoryPage.login();
    });

    it('should complete full checkout process', async () => {
        await InventoryPage.addProduct(0);
        await InventoryPage.addProduct(1);

        const count = await InventoryPage.getCartCount();
        expect(count).toBe(2);

        await InventoryPage.goToCart();
        await expect(browser).toHaveUrlContaining('/cart');

        const checkoutBtn = $('#checkout');
        await checkoutBtn.waitForClickable({ timeout: 3000 });
        await checkoutBtn.click();

        await $('#first-name').setValue('John');
        await $('#last-name').setValue('Doe');
        await $('#postal-code').setValue('12345');
        await $('#continue').click();

        await expect(browser).toHaveUrlContaining('/checkout-step-two');

        await $('#finish').click();

        const successMessage = $('.complete-header');
        await expect(successMessage).toBeDisplayed();
        await expect(successMessage).toHaveText('Thank you for your order!');
    });
});
