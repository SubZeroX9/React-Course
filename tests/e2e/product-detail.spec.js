import { test, expect } from '../fixtures/test-base';
import { ProductListPage } from '../page-objects/ProductListPage';
import { ProductDetailPage } from '../page-objects/ProductDetailPage';
test.describe('Product Detail Navigation', () => {
    let productListPage;
    let productDetailPage;
    test.beforeEach(async ({ page }) => {
        productListPage = new ProductListPage(page);
        productDetailPage = new ProductDetailPage(page);
    });
    test('should navigate to product detail page from product list', async ({ page }) => {
        // Go to product list
        await productListPage.goto();
        // Click "View Details" button on first product
        await productListPage.viewProductDetails(0);
        // Verify we're on product detail page
        await expect(page).toHaveURL(/\/products\/\d+/);
        // Verify product detail page loaded
        await expect(productDetailPage.productTitle).toBeVisible();
    });
    test('should display correct product details', async ({ page }) => {
        // Navigate directly to a product detail page (product ID 1)
        await page.goto('/products/1');
        await page.waitForLoadState('networkidle');
        // Verify title is visible
        const title = page.locator('h1').first();
        await expect(title).toBeVisible();
        // Verify title is not empty
        const titleText = await title.textContent();
        expect(titleText).toBeTruthy();
        expect(titleText?.length).toBeGreaterThan(0);
        // Verify price is visible (contains $)
        const price = page.locator('text=/\\$/').first();
        await expect(price).toBeVisible();
        // Verify image is visible
        const image = page.locator('img').first();
        await expect(image).toBeVisible();
    });
    test('should navigate back to product list from detail page', async ({ page }) => {
        // Go to product detail
        await productDetailPage.goto(1);
        // Click back button
        await productDetailPage.clickBack();
        // Verify we're back on products page
        await expect(page).toHaveURL(/\/products\/?$/);
        // Verify product list is visible
        await expect(productListPage.dataTable).toBeVisible();
    });
    test('should handle direct URL access to product detail', async ({ page }) => {
        // Navigate directly to product 5
        await page.goto('/products/5');
        // Verify product detail page loads
        await expect(productDetailPage.productTitle).toBeVisible({ timeout: 10000 });
        // Verify we're on the correct product page
        expect(page.url()).toContain('/products/5');
    });
    test('should handle invalid product ID gracefully', async ({ page }) => {
        // Navigate to an invalid product ID (assuming 99999 doesn't exist)
        await page.goto('/products/99999');
        // Wait for page to load
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        // The page might show an error, or just not show product details
        // Let's verify that either:
        // 1. There's an error message, OR
        // 2. The page doesn't have a product title (meaning it failed to load)
        const hasError = await page.locator('text=/error|not found|404/i').isVisible().catch(() => false);
        const hasTitle = await page.locator('h1').first().isVisible().catch(() => false);
        // Either error is shown OR no product title is shown
        expect(hasError || !hasTitle).toBeTruthy();
    });
});
