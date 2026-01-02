import { test as base } from '@playwright/test';

type LocalStorageFixtures = {
  setLocalStorage: (key: string, value: string) => Promise<void>;
  getLocalStorage: (key: string) => Promise<string | null>;
  clearLocalStorage: () => Promise<void>;
};

export const test = base.extend<LocalStorageFixtures>({
  page: async ({ page }, use) => {
    // Clear localStorage context before each test
    await page.context().clearCookies();
    await use(page);
  },

  setLocalStorage: async ({ page }, use) => {
    const setLocalStorage = async (key: string, value: string) => {
      await page.evaluate(
        ({ k, v }) => localStorage.setItem(k, v),
        { k: key, v: value }
      );
    };
    await use(setLocalStorage);
  },

  getLocalStorage: async ({ page }, use) => {
    const getLocalStorage = async (key: string) => {
      return await page.evaluate((k) => localStorage.getItem(k), key);
    };
    await use(getLocalStorage);
  },

  clearLocalStorage: async ({ page }, use) => {
    const clearLocalStorage = async () => {
      // Only clear if we're on a page (not about:blank)
      const url = page.url();
      if (url && url !== 'about:blank' && !url.startsWith('about:')) {
        await page.evaluate(() => localStorage.clear());
      }
    };
    await use(clearLocalStorage);
  },
});

export { expect } from '@playwright/test';
