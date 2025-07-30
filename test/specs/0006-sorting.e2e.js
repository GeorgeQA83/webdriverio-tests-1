import LoginPage from '../pageobjects/LoginPage.js';
import InventoryPage from '../pageobjects/InventoryPage.js';

describe('Inventory Page - Sorting Verification', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory'),
            {
                timeout: 7000,
                timeoutMsg: 'Inventory page did not load after login'
            }
        );
    });

    it('should sort products by Name (A to Z)', async () => {
        await InventoryPage.selectSort('Name (A to Z)');
        const productNames = await InventoryPage.getProductNames();
        const sortedNames = [...productNames].sort();
        expect(productNames).toEqual(sortedNames);
    });

    it('should sort products by Name (Z to A)', async () => {
        await InventoryPage.selectSort('Name (Z to A)');
        const productNames = await InventoryPage.getProductNames();
        const sortedNames = [...productNames].sort().reverse();
        expect(productNames).toEqual(sortedNames);
    });

    it('should sort products by Price (low to high)', async () => {
        await InventoryPage.selectSort('Price (low to high)');
        const productPrices = await InventoryPage.getProductPrices();
        const sortedPrices = [...productPrices].sort((a, b) => a - b);
        expect(productPrices).toEqual(sortedPrices);
    });

    it('should sort products by Price (high to low)', async () => {
        await InventoryPage.selectSort('Price (high to low)');
        const productPrices = await InventoryPage.getProductPrices();
        const sortedPrices = [...productPrices].sort((a, b) => b - a);
        expect(productPrices).toEqual(sortedPrices);
    });
});
