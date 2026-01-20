import { expect } from '@playwright/test';
export class ProductDetailPage {
    constructor(page) {
        this.page = page;
        this.productTitle = page.locator('h1').first();
        this.productPrice = page.locator('text=/\\$/').first();
        this.productDescription = page.locator('p, [class*="description"], text=/./').nth(2);
        this.productImage = page.locator('img').first();
        this.backButton = page.getByRole('link', { name: /back|products/i });
        this.productCategory = page.locator('[class*="category"], text=/beauty|electronics|furniture/i').first();
    }
    async goto(productId) {
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
