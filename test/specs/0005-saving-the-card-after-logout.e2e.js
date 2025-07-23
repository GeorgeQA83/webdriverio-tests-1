const assert = require('assert');

describe('Inventory Page - Cart and Logout flow', () => {
    it('should add item to cart, logout, login again and verify cart content', async () => {
        // Precondition: the user navigates to the login page / користувач переходить на сторінку логіна
        await browser.url('https://www.google.com');

        // Perform a login / Виконати логін
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        // Make sure the user on the inventory page / Переконатися, що користувач на inventory page
        await expect(browser).toHaveUrlContaining('/inventory');

        // Step 1: Click on the "Add to cart" button next to the product / Крок 1: Клік по кнопці "Add to cart" поруч із продуктом
        const addToCartButton = await $('button.btn_inventory'); // Первый продукт
        await addToCartButton.click();

        // Expected result: the number "1" is displayed in the upper right corner / Очікуваний результат: у правому верхньому кутку відображається число "1"
        const cartBadge = await $('.shopping_cart_badge');
        await expect(cartBadge).toBeDisplayed();
        const cartCount = await cartBadge.getText();
        assert.strictEqual(cartCount, '1');

        // Step 2: Click on the ‘burger’ button in the upper left corner / Крок 2: Клік по кнопці «бургер» у лівому верхньому кутку
        const burgerMenu = await $('#react-burger-menu-btn');
        await burgerMenu.click();

        // Expected result: the menu opens and contains 4 items / Очікуваний результат: меню відкривається і містить 4 елементи
        await browser.pause(500); // slight delay for animation / невелика затримка для анімації
        const menuItems = await $$('.bm-item.menu-item');
        assert.strictEqual(menuItems.length, 4);

        // Step 3: Click on "Logout" / Крок 3: Клік по "Logout"
        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.click();

        // Expected result: redirect to login page, fields are empty / Очікуваний результат: редирект на логін сторінку, поля порожні
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
        const usernameField = await $('#user-name');
        const passwordField = await $('#password');
        assert.strictEqual(await usernameField.getValue(), '');
        assert.strictEqual(await passwordField.getValue(), '');

        // Step 4: Re-login with the same data / Крок 4: Повторний логін із тими самими даними
        await usernameField.setValue('standard_user');
        await passwordField.setValue('secret_sauce');
        await $('#login-button').click();

        // Expected result: the user gets back to the inventory page, the shopping cart displays the previously added product / Очікуваний результат: користувач знову потрапляє на сторінку інвентарю, кошик відображає раніше доданий товар
        await expect(browser).toHaveUrlContaining('/inventory');
        const inventoryItems = await $$('.inventory_item');
        assert(inventoryItems.length > 0);

        const cartIconBadge = await $('.shopping_cart_badge');
        await expect(cartIconBadge).toBeDisplayed();
        assert.strictEqual(await cartIconBadge.getText(), '1');

        // Step 5: Click on the basket icon in the top right corner / Крок 5: Клік по іконці кошика в правому верхньому куті
        const cartButton = await $('.shopping_cart_link');
        await cartButton.click();

        // Expected result: the user is on the cart page, the previously added product is displayed / Очікуваний результат: користувач на сторінці кошика, відображається раніше доданий товар
        await expect(browser).toHaveUrlContaining('/cart');
        const cartItems = await $$('.cart_item');
        assert.strictEqual(cartItems.length, 1);
    });
});
