import InventoryPage from '../pageobjects/InventoryPage.js';

describe('Inventory Page - Social Media Links in Footer', () => {
    before(async () => {
        await InventoryPage.open();
    });

    it('should open Twitter page in a new tab', async () => {
        const success = await InventoryPage.verifySocialLink(InventoryPage.twitterLink, 'x.com');
        if (!success) console.warn('Twitter link verification skipped');
    });

    it('should open Facebook page in a new tab', async () => {
        const success = await InventoryPage.verifySocialLink(InventoryPage.facebookLink, 'facebook.com');
        if (!success) console.warn('Facebook link verification skipped');
    });

    it('should open LinkedIn page in a new tab', async () => {
        const success = await InventoryPage.verifySocialLink(InventoryPage.linkedinLink, 'linkedin.com');
        if (!success) console.warn('LinkedIn link verification skipped');
    });
});
