// @ts-check
const { test, expect } = require('../fixtures');

const { getData } = require('../helpers');

/**
 * Defines our test.
 * We're using a custom fixture here instead of the before/beforeEach lifecycle hooks.
 * With fixtures, we don't have to use `test.describe()`.
 * @see https://playwright.dev/docs/test-fixtures
 */
test('Normal PDP page', async ({ productDetailPage }) => {
  
  await test.step('check the data layer', async () => {

    /**
     * Wait for the data layer to be available, then check its properties
     */

    const dataLayer = await productDetailPage.getDataLayer();
    
    const dataLayerPropertiesToTest = getData('../data/product-detail-page.csv');

    if (Array.isArray(dataLayerPropertiesToTest)) {
      dataLayerPropertiesToTest.forEach((property) => {
        if (property.value !== "") {
          /**
           * Soft assertions won't stop the whole test when the first assertion fails.
           * This is useful when we want to loop over dozens of values —
           * the test report will show all values tested, not just the ones up until the first value failed.
           */
          expect.soft(dataLayer, `The value of ${property.path} should be ${property.value}.`).toHaveProperty(property.path, property.value);
        } else {
          expect.soft(dataLayer, `There should be a value for ${property.path}.`).toHaveProperty(property.path);
        }
      });
    } else {
      console.log('not an array');
    }
    
  });

});