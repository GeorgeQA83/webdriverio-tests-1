const assert = require('assert');

describe('Inventory Page - Sorting Verification', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com');

        const usernameInput = await $('#user-name');
        const passwordInput = await $('#password');
        const loginButton = await $('#login-button');

        await usernameInput.waitForDisplayed({ timeout: 5000 });
        await usernameInput.setValue('standard_user');
        await passwordInput.setValue('secret_sauce');
        await loginButton.click();

        await expect(browser).toHaveUrlContaining('/inventory');
    });

    const sortOptions = [
        { value: 'lohi', description: 'Price (low to high)' },
        { value: 'hilo', description: 'Price (high to low)' },
        { value: 'az', description: 'Name (A to Z)' },
        { value: 'za', description: 'Name (Z to A)' },
    ];

    for (const option of sortOptions) {
        it(`should sort products by ${option.description}`, async () => {
            const sortDropdown = await $('.product_sort_container');
            await sortDropdown.waitForDisplayed({ timeout: 5000 });
            await sortDropdown.selectByAttribute('value', option.value);
            await browser.pause(1000);

            if (option.value === 'az' || option.value === 'za') {
                const productNameEls = await $$('div.inventory_item_name');

                if (!Array.isArray(productNameEls) || productNameEls.length === 0) {
                    throw new Error('No product name elements found');
                }

                const names = [];
                for (const el of productNameEls) {
                    names.push(await el.getText());
                }

                const sorted = [...names].sort((a, b) => a.localeCompare(b));
                if (option.value === 'za') sorted.reverse();

                assert.deepStrictEqual(names, sorted, `Sorting by ${option.description} failed`);
            } else {
                const productPriceEls = await $$('div.inventory_item_price');

                if (!Array.isArray(productPriceEls) || productPriceEls.length === 0) {
                    throw new Error('No product price elements found');
                }

                const prices = [];
                for (const el of productPriceEls) {
                    const text = await el.getText();
                    prices.push(parseFloat(text.replace('$', '')));
                }

                const sorted = [...prices].sort((a, b) => a - b);
                if (option.value === 'hilo') sorted.reverse();

                assert.deepStrictEqual(prices, sorted, `Sorting by ${option.description} failed`);
            }
        });
    }
});
