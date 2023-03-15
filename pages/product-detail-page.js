const { BasePage } = require('./base-page');

/**
 * Creates a new ProductDetailPage using the Page Object Model pattern.
 * @see https://playwright.dev/docs/pom
 * @extends BasePage
 */
exports.ProductDetailPage = class ProductDetailPage extends BasePage {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {object} options
   */
  constructor(page, options = {}) {
    super(page);
    this.addToCartButton = page.locator("button.add-to-cart");
    this.checkoutButton = page.locator(".minicart .checkout-btn");
    this.engraveable = options.engraveable || false;
  }

  /**
   * Test setup method.
   */
  async goto() {

    super.goto();

    let url;

    if (this.engraveable === true) {
      url = '/women+bracelets/precious-metal-plated-sterling-silver-pavé-logo-disc-bracelet-MKC1514AN.html';
    } else {
      url = '/women+bracelets/precious-metal-plated-sterling-silver-pavé-logo-disc-bracelet-MKC1514AN.html';
    }

    await this.page.goto(url);
    await this.dataLayerReady();
  }

  /**
   * Add an item to a shopping cart and wait for a response.
   * @returns {Promise<null|Response>}
   */
  async addToCart() {
    await Promise.all([
      this.page.waitForTimeout(4000),
      this.addToCartButton.click()
    ]);
    //TODO: this logic could be changed to be more specific
    await this.page.waitForFunction(() => window.appEventData && window.appEventData.length > 0);
  }

  async beginCheckout() {
    await Promise.all([
      this.page.waitForTimeout(2000),
      this.checkoutButton.click()
    ]);

  }

}