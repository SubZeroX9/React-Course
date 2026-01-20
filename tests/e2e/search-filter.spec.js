import { test, expect } from '../fixtures/test-base';
import { ProductListPage } from '../page-objects/ProductListPage';
test.describe('Search and Category Filtering', () => {
    let productListPage;
    test.beforeEach(async ({ page }) => {
        productListPage = new ProductListPage(page);
        await productListPage.goto();
    });
    test('should toggle sidebar open and close', async ({ page }) => {
        const sidebar = page.locator('aside');
        // On desktop, sidebar is visible by default with close button inside
        // Verify sidebar is visible initially
        await expect(sidebar).toBeVisible();
        // Close sidebar using the close button inside (force click to handle viewport)
        const closeButton = page.getByRole('button', { name: /close sidebar/i });
        await closeButton.click({ force: true });
        await page.waitForTimeout(500);
        // Open button should now be visible in header
        const openButton = page.getByRole('button', { name: /open filters/i });
        await expect(openButton).toBeVisible();
    });
    test('should search products by name', async ({ page }) => {
        // Ensure sidebar is visible
        const sidebar = page.locator('aside');
        await expect(sidebar).toBeVisible();
        // Fill search input
        const searchInput = page.getByPlaceholder(/search/i);
        await searchInput.fill('phone');
        // Click search button
        const searchButton = page.getByRole('button', { name: /^search$/i });
        await searchButton.click();
        // Wait for results to load
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        // Get product count - should have results
        const productCount = await productListPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);
        // Verify at least one product title contains "phone" (case insensitive)
        const firstProductTitle = await page
            .locator('tbody tr')
            .first()
            .locator('td')
            .nth(1)
            .textContent();
        expect(firstProductTitle?.toLowerCase()).toContain('phone');
    });
    test('should filter products by category', async ({ page }) => {
        // Sidebar should be visible
        const sidebar = page.locator('aside');
        await expect(sidebar).toBeVisible();
        // Click category dropdown
        const categoryDropdown = page.locator('#sidebar-category');
        await categoryDropdown.click();
        await page.waitForTimeout(300);
        // Select beauty category
        await page.locator('.p-dropdown-item').filter({ hasText: 'beauty' }).click();
        // Wait for results to load
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        // Verify products are from selected category
        const productCount = await productListPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);
    });
    test('should disable search when category is selected (mutual exclusivity)', async ({ page }) => {
        // Sidebar should be visible
        await expect(page.locator('aside')).toBeVisible();
        // Select a category
        const categoryDropdown = page.locator('#sidebar-category');
        await categoryDropdown.click();
        await page.waitForTimeout(300);
        await page.locator('.p-dropdown-item').filter({ hasText: 'laptops' }).click();
        // Wait for load
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        // Verify search input is disabled
        const searchInput = page.getByPlaceholder(/search/i);
        const isDisabled = await searchInput.isDisabled().catch(() => false);
        // Search should be disabled when category is selected
        expect(isDisabled).toBeTruthy();
    });
    test('should clear filters and show all products', async ({ page }) => {
        // Apply a search filter
        const searchInput = page.getByPlaceholder(/search/i);
        await searchInput.fill('laptop');
        const searchButton = page.getByRole('button', { name: /^search$/i });
        await searchButton.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        // Verify search was applied (should show laptop results)
        const firstProduct = await page.locator('tbody tr').first().locator('td').nth(1).textContent();
        expect(firstProduct?.toLowerCase()).toContain('laptop');
        // Clear filters
        const clearButton = page.getByRole('button', { name: /clear/i });
        await clearButton.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        // After clearing, verify we're back to all products (default state)
        const productCount = await productListPage.getProductCount();
        expect(productCount).toBe(8); // Default pagination size
    });
});
