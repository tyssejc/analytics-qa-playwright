/**
 * These are our test fixtures.
 * Fixtures let us abstract some of the messiness out of the test file
 * and negates the need for test.describe().
 * 
 * We can also use fixtures to patch in the Launch library we want to use.
 * @see https://playwright.dev/docs/test-fixtures
 */

const base = require('@playwright/test');

// we'll pull in the Page Object Model for the PDP
const { ProductDetailPage } = require('../pages/product-detail-page');

exports.test = base.test.extend({
  productDetailPage: async ({ page, context }, use) => {
    // First, we instantiate the fixture using the ProductDetailPage constructor
    // defined in our ProductDetailPage POM class
    const productDetailPage = new ProductDetailPage(page);

    // Here we can block any requests that aren't necessary for testing the data layer or analytics beacons.
    // await context.route(/\.css|loopassets|boomerang|favicon|aksb|ssgocc|(tiktok|twitter|bing|taggstar|bazaarvoice|audioeye|bttrack)\.com/, route => route.abort());

    // Now call the goto() function
    await productDetailPage.goto();

    // Use the fixture value in the test.
    await use(productDetailPage);
  },
  beginCheckout: async ({ page, context }, use) => {
    const productDetailPage = new ProductDetailPage(page);

    await productDetailPage.goto();
    await productDetailPage.addToCart();
    await productDetailPage.beginCheckout();

    await page.waitForNavigation();

    await use(productDetailPage);

    //TODO: another way to write this might start with prepopulating storageState and navigating directly to the checkout page
    // @see https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state
  }
});

exports.expect = base.expect;