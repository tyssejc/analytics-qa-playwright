/**
 * Class representing a base page object model.
 * @see https://playwright.dev/docs/pom
 */
exports.BasePage = class BasePage {

  /**
   * Extend Playwright's out-of-the-box `page` fixture.
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Extends the page class's goto method.
   * @returns {Promise<null|Response>}
   */
  async goto() {

    /**
     * Any code here gets inherited by other classes when `super.goto()` is called inside of their `goto()` method.
     * For example, you can intercept requests and manipulate headers.
     */

  }

  /**
   * Wait for the data layer object to be available.
   * @returns {promise}
   */
  async dataLayerReady() {
    /**
     * This is a method used by your page fixtures to tell your tests when to begin.
     * You can use any definition of what "data layer ready" means in terms of how you're testing.
     */
    await this.page.waitForFunction(() => window.appEventData && Array.isArray(window.appEventData));
  }

  /**
   * Get a reference to the data layer object.
   * @returns {promise}
   */
  async getDataLayer() {
    /**
     * This is simply a method to retrieve the computed state of your data layer.
     */
    return await this.page.evaluate(() => window.appEventData);
  }

}