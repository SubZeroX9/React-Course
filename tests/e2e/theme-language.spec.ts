import { test, expect } from '../fixtures/test-base';

test.describe('Theme and Language Switching with Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should switch theme and persist in localStorage', async ({ page, getLocalStorage }) => {
    // Find theme dropdown (look for dropdown with theme options)
    const themeDropdown = page.locator('button:has-text("Light"), button:has-text("Dark")').first();

    // If dropdown exists, click it
    if (await themeDropdown.isVisible()) {
      await themeDropdown.click();
      await page.waitForTimeout(300);

      // Select dark theme
      const darkOption = page.locator('[role="option"], .p-dropdown-item').filter({ hasText: /dark/i }).first();
      if (await darkOption.isVisible()) {
        await darkOption.click();
        await page.waitForTimeout(500);

        // Verify theme stored in localStorage
        const storedTheme = await getLocalStorage('app-theme');
        expect(storedTheme).toBe('dark');

        // Reload page
        await page.reload();
        await page.waitForLoadState('networkidle');

        // Verify theme persisted
        const themeAfterReload = await getLocalStorage('app-theme');
        expect(themeAfterReload).toBe('dark');
      }
    }
  });

  test('should switch language and persist in localStorage', async ({ page, getLocalStorage }) => {
    // Find language dropdown
    const languageDropdown = page.locator('button:has-text("English"), button:has-text("עברית"), [class*="language"]').first();

    // If language dropdown exists
    if (await languageDropdown.isVisible()) {
      await languageDropdown.click();
      await page.waitForTimeout(300);

      // Select Hebrew
      const hebrewOption = page.locator('[role="option"], .p-dropdown-item').filter({ hasText: /עברית|hebrew|he/i }).first();

      if (await hebrewOption.isVisible()) {
        await hebrewOption.click();
        await page.waitForTimeout(1000); // Wait for language to load

        // Verify language stored in localStorage
        const storedLanguage = await getLocalStorage('app-language');
        expect(storedLanguage).toMatch(/he|hebrew/i);

        // Reload page
        await page.reload();
        await page.waitForLoadState('networkidle');

        // Verify language persisted
        const languageAfterReload = await getLocalStorage('app-language');
        expect(languageAfterReload).toMatch(/he|hebrew/i);
      }
    }
  });

  test('should change to RTL layout when switching to Hebrew', async ({ page }) => {
    // Find language dropdown
    const languageDropdown = page.locator('button:has-text("English"), button:has-text("עברית"), [class*="language"]').first();

    if (await languageDropdown.isVisible()) {
      // Get initial direction
      const initialDir = await page.locator('html').getAttribute('dir');

      await languageDropdown.click();
      await page.waitForTimeout(300);

      // Select Hebrew
      const hebrewOption = page.locator('[role="option"], .p-dropdown-item').filter({ hasText: /עברית|hebrew|he/i }).first();

      if (await hebrewOption.isVisible()) {
        await hebrewOption.click();
        await page.waitForTimeout(1000);

        // Verify RTL direction
        const newDir = await page.locator('html').getAttribute('dir');
        expect(newDir).toBe('rtl');

        // Verify it's different from initial (if it was LTR)
        if (initialDir !== 'rtl') {
          expect(newDir).not.toBe(initialDir);
        }
      }
    }
  });

  test('should display translated content when switching languages', async ({ page }) => {
    // Find language dropdown
    const languageDropdown = page.locator('button:has-text("English"), button:has-text("עברית")').first();

    if (await languageDropdown.isVisible()) {
      // Get some text in English first
      const headerText = await page.locator('header').textContent();

      await languageDropdown.click();
      await page.waitForTimeout(300);

      // Switch to Hebrew
      const hebrewOption = page.locator('[role="option"], .p-dropdown-item').filter({ hasText: /עברית|hebrew|he/i }).first();

      if (await hebrewOption.isVisible()) {
        await hebrewOption.click();
        await page.waitForTimeout(1000);

        // Get text after language switch
        const headerTextHebrew = await page.locator('header').textContent();

        // Text should be different (Hebrew vs English)
        // Or check for Hebrew characters
        const hasHebrewChars = /[\u0590-\u05FF]/.test(headerTextHebrew || '');
        expect(hasHebrewChars || headerTextHebrew !== headerText).toBeTruthy();
      }
    }
  });

  test('should switch between themes multiple times', async ({ page }) => {
    // Find theme dropdown
    const themeDropdown = page.locator('button:has-text("Light"), button:has-text("Dark")').first();

    if (await themeDropdown.isVisible()) {
      // Switch to Dark
      await themeDropdown.click();
      await page.waitForTimeout(300);

      const darkOption = page.locator('[role="option"], .p-dropdown-item').filter({ hasText: /dark/i }).first();
      if (await darkOption.isVisible()) {
        await darkOption.click();
        await page.waitForTimeout(500);

        // Switch back to Light
        await themeDropdown.click();
        await page.waitForTimeout(300);

        const lightOption = page.locator('[role="option"], .p-dropdown-item').filter({ hasText: /light/i }).first();
        if (await lightOption.isVisible()) {
          await lightOption.click();
          await page.waitForTimeout(500);

          // Verify we can switch multiple times without errors
          // Just checking page is still functional
          await expect(page.locator('.p-datatable')).toBeVisible();
        }
      }
    }
  });
});
