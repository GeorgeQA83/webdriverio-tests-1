const assert = require('assert');

describe('Inventory Page - Sorting Verification', () => {
    before(async () => {
        // Precondition: user logs in and gets to the inventory page / користувач логіниться і потрапляє на inventory page
        await browser.url('https://www.google.com');

        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

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
            // Step 1: Select the sorting option from the drop-down list / Крок 1: Вибрати опцію сортування зі списку, що випадає
            const sortDropdown = await $('.product_sort_container');
            await sortDropdown.selectByAttribute('value', option.value);

            await browser.pause(500); // Wait for the list of products to update / Почекати, поки оновиться список товарів

            // Step 2: Get the product list and check that it is sorted correctly / Крок 2: Отримати список продуктів і перевірити, що він відсортований коректно
            const productNames = await $$('div.inventory_item_name');
            const productPrices = await $$('div.inventory_item_price');

            if (option.value === 'az' || option.value === 'za') {
                const names = await Promise.all(productNames.map(el => el.getText()));
                const sorted = [...names].sort((a, b) => a.localeCompare(b));
                if (option.value === 'za') sorted.reverse();

                assert.deepStrictEqual(names, sorted, `Products are not sorted by ${option.description}`);
            } else if (option.value === 'lohi' || option.value === 'hilo') {
                const prices = await Promise.all(productPrices.map(el =>
                    parseFloat(el.getText().replace('$', ''))
                ));
                const sorted = [...prices].sort((a, b) => a - b);
                if (option.value === 'hilo') sorted.reverse();

                assert.deepStrictEqual(prices, sorted, `Products are not sorted by ${option.description}`);
            }
        });
    }
});