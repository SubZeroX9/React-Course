import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly productImage: Locator;
  readonly backButton: Locator;
  readonly productCategory: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('h1').first();
    this.productPrice = page.locator('text=/\\$/').first();
    this.productDescription = page.locator('p, [class*="description"], text=/./').nth(2);
    this.productImage = page.locator('img').first();
    this.backButton = page.getByRole('link', { name: /back|products/i });
    this.productCategory = page.locator('[class*="category"], text=/beauty|electronics|furniture/i').first();
  }

  async goto(productId: number) {
    await this.page.goto(`/products/${productId}`);
    await this.waitForLoad();
  }

  async waitForLoad() {
    // Wait for product title to be visible
    await expect(this.productTitle).toBeVisible({ timeout: 10000 });
  }

  async getProductTitle() {
    return await this.productTitle.textContent();
  }

  async getProductPrice() {
    return await this.productPrice.textContent();
  }

  async getProductDescription() {
    return await this.productDescription.textContent();
  }

  async clickBack() {
    await this.backButton.click();
  }

  async isImageVisible() {
    return await this.productImage.isVisible();
  }
}
