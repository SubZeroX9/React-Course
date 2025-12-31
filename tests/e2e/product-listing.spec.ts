import { test, expect } from '../fixtures/test-base';
import { ProductListPage } from '../page-objects/ProductListPage';

test.describe('Product Listing with Pagination and Sorting', () => {
  let productListPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    productListPage = new ProductListPage(page);
    await productListPage.goto();
  });

  test('should load product list with default pagination (8 items)', async () => {
    // Verify DataTable is visible
    await expect(productListPage.dataTable).toBeVisible();

    // Verify default number of rows (8 items)
    const productCount = await productListPage.getProductCount();
    expect(productCount).toBe(8);
  });

  test('should change page size and display correct number of items', async ({ page }) => {
    // Click the rows per page dropdown at the bottom
    const rowsDropdown = page.locator('.p-dropdown').filter({ hasText: /^8$/}).first();
    await rowsDropdown.click();
    await page.waitForTimeout(300);

    // Select 4 items per page
    await page.locator('.p-dropdown-item').filter({ hasText: '4' }).click();
    await page.waitForTimeout(1000);

    // Verify 4 items are displayed
    let productCount = await productListPage.getProductCount();
    expect(productCount).toBe(4);

    // Change to 12 items per page
    const rowsDropdown2 = page.locator('.p-dropdown').filter({ hasText: /^4$/}).first();
    await rowsDropdown2.click();
    await page.waitForTimeout(300);
    await page.locator('.p-dropdown-item').filter({ hasText: '12' }).click();
    await page.waitForTimeout(1000);

    // Verify 12 items are displayed
    productCount = await productListPage.getProductCount();
    expect(productCount).toBe(12);
  });

  test('should navigate to next and previous pages', async ({ page }) => {
    // Get first product title on page 1
    const firstProductTitlePage1 = await page
      .locator('tbody tr')
      .first()
      .locator('td')
      .nth(1)
      .textContent();

    // Click next page
    await productListPage.clickNextPage();

    // Get first product title on page 2
    const firstProductTitlePage2 = await page
      .locator('tbody tr')
      .first()
      .locator('td')
      .nth(1)
      .textContent();

    // Verify products are different on different pages
    expect(firstProductTitlePage1).not.toBe(firstProductTitlePage2);

    // Click previous page
    await productListPage.clickPrevPage();

    // Verify we're back on page 1
    const firstProductTitleBackToPage1 = await page
      .locator('tbody tr')
      .first()
      .locator('td')
      .nth(1)
      .textContent();

    expect(firstProductTitleBackToPage1).toBe(firstProductTitlePage1);
  });

  test('should sort products by price column', async ({ page }) => {
    // Click Price column header to sort ascending
    await productListPage.sortByColumn('Price');

    // Wait a bit for sort to apply
    await page.waitForTimeout(500);

    // Get first two prices
    const firstPrice = await page.locator('tbody tr').first().locator('td').nth(2).textContent();
    const secondPrice = await page.locator('tbody tr').nth(1).locator('td').nth(2).textContent();

    // Extract numeric values
    const firstPriceValue = parseFloat(firstPrice?.replace(/[^0-9.]/g, '') || '0');
    const secondPriceValue = parseFloat(secondPrice?.replace(/[^0-9.]/g, '') || '0');

    // Verify ascending order (first price should be less than or equal to second)
    expect(firstPriceValue).toBeLessThanOrEqual(secondPriceValue);

    // Click Price column again to sort descending
    await productListPage.sortByColumn('Price');
    await page.waitForTimeout(500);

    // Get first two prices after descending sort
    const firstPriceDesc = await page.locator('tbody tr').first().locator('td').nth(2).textContent();
    const secondPriceDesc = await page.locator('tbody tr').nth(1).locator('td').nth(2).textContent();

    const firstPriceDescValue = parseFloat(firstPriceDesc?.replace(/[^0-9.]/g, '') || '0');
    const secondPriceDescValue = parseFloat(secondPriceDesc?.replace(/[^0-9.]/g, '') || '0');

    // Verify descending order (first price should be greater than or equal to second)
    expect(firstPriceDescValue).toBeGreaterThanOrEqual(secondPriceDescValue);
  });
});
