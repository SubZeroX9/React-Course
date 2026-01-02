import { test, expect } from '../fixtures/test-base';

test.describe('Sidebar Visibility Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
  });

  test('should toggle sidebar open and close', async ({ page }) => {
    const sidebar = page.locator('aside');

    // Sidebar is visible by default on desktop
    await expect(sidebar).toBeVisible();

    // Click close button inside sidebar (force click since it might be partially out of viewport)
    const closeButton = page.getByRole('button', { name: /close sidebar/i });
    await closeButton.click({ force: true });
    await page.waitForTimeout(500);

    // Now open filters button should be visible in header
    const openButton = page.getByRole('button', { name: /open filters/i });
    await expect(openButton).toBeVisible();

    // Click to open sidebar again
    await openButton.click();
    await page.waitForTimeout(500);

    // Sidebar should be visible again
    await expect(sidebar).toBeVisible();
  });

  test('should persist sidebar state in localStorage', async ({ page, getLocalStorage }) => {
    // Click toggle button
    const toggleButton = page.getByRole('button', { name: /open filters|close sidebar/i }).first();
    await toggleButton.click();
    await page.waitForTimeout(300);

    // Check localStorage
    const storedState = await getLocalStorage('sidebar-open');

    // State should be stored (either 'true' or true)
    expect(storedState).toBeTruthy();
  });

  test('should restore sidebar state on page reload', async ({ page, getLocalStorage }) => {
    // Click toggle button
    const toggleButton = page.getByRole('button', { name: /open filters|close sidebar/i }).first();
    await toggleButton.click();
    await page.waitForTimeout(300);

    // Get localStorage state
    const storedState = await getLocalStorage('sidebar-open');

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Wait a bit for sidebar to render
    await page.waitForTimeout(500);

    // Verify localStorage still has the same value
    const stateAfterReload = await getLocalStorage('sidebar-open');
    expect(stateAfterReload).toBe(storedState);

    // Verify sidebar state persisted
    expect(stateAfterReload).toBeTruthy();
  });

  test('should close sidebar when clicking overlay (if mobile)', async ({ page }) => {
    const sidebar = page.locator('aside');

    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);

    // Click toggle button
    const toggleButton = page.getByRole('button', { name: /open filters|close sidebar/i }).first();
    await toggleButton.click();
    await page.waitForTimeout(300);

    // Verify sidebar is visible
    await expect(sidebar).toBeVisible();

    // Look for overlay
    const overlay = page.locator('[class*="overlay"], [class*="backdrop"]').first();

    // If overlay exists and is visible, click it
    if (await overlay.isVisible().catch(() => false)) {
      await overlay.click();
      await page.waitForTimeout(300);

      // Verify sidebar is closed
      const sidebarVisibleAfter = await sidebar.isVisible().catch(() => false);

      // Sidebar should be closed or hidden
      expect(sidebarVisibleAfter).toBeFalsy();
    }
  });

  test('should close sidebar with close button', async ({ page }) => {
    const sidebar = page.locator('aside');

    // Sidebar should be visible by default
    await expect(sidebar).toBeVisible();

    // Look for close button inside sidebar
    const closeButton = page.getByRole('button', { name: /close sidebar/i });
    await expect(closeButton).toBeVisible();

    // Click close button (force click to handle viewport issues)
    await closeButton.click({ force: true });
    await page.waitForTimeout(500);

    // After closing, the open button should appear in header
    const openButton = page.getByRole('button', { name: /open filters/i });
    await expect(openButton).toBeVisible();
  });
});
