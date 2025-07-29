module.exports = class Page {
    /**
     * Відкрити будь-яку сторінку за шляхом
     * @param {string} path - шлях після базового URL
     */
    open(path) {
        return browser.url(`https://www.saucedemo.com/${path}`);
    }

    /**
     * Очікування видимості елемента
     */
    async waitAndClick(element) {
        await element.waitForDisplayed();
        await element.click();
    }

    /**
     * Перевірка, що URL містить певний шлях
     */
    async isUrlContains(part) {
        const url = await browser.getUrl();
        return url.includes(part);
    }
};
