import { Page, Locator, expect } from '@playwright/test';

export class ProductListPage {
  readonly page: Page;
  readonly sidebarToggle: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly categoryDropdown: Locator;
  readonly clearFiltersButton: Locator;
  readonly dataTable: Locator;
  readonly paginationNext: Locator;
  readonly paginationPrev: Locator;
  readonly rowsPerPageDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebarToggle = page.getByRole('button', { name: /open filters|close sidebar/i }).first();
    this.searchInput = page.getByPlaceholder(/search/i);
    this.searchButton = page.getByRole('button', { name: /^search$/i });
    this.categoryDropdown = page.locator('#sidebar-category');
    this.clearFiltersButton = page.getByRole('button', { name: /clear/i });
    this.dataTable = page.locator('.p-datatable');
    this.paginationNext = page.locator('.p-paginator-next');
    this.paginationPrev = page.locator('.p-paginator-prev');
    this.rowsPerPageDropdown = page.locator('.p-dropdown-trigger').first();
  }

  async goto() {
    await this.page.goto('/products');
    await this.waitForLoad();
  }

  async waitForLoad() {
    await expect(this.dataTable).toBeVisible();
    // Wait for loading overlay to disappear
    await this.page.waitForFunction(() => {
      const overlay = document.querySelector('.p-datatable-loading-overlay');
      return !overlay || window.getComputedStyle(overlay).display === 'none';
    });
  }

  async openSidebar() {
    const sidebar = this.page.locator('aside');
    const isVisible = await sidebar.isVisible().catch(() => false);

    // Sidebar is visible by default on desktop, so just verify it's there
    if (!isVisible) {
      // If not visible, try to open it
      const openButton = this.page.getByRole('button', { name: /open filters/i });
      if (await openButton.isVisible().catch(() => false)) {
        await openButton.click();
        await this.page.waitForTimeout(300);
      }
    }
  }

  async searchByName(query: string) {
    await this.openSidebar();
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.waitForLoad();
  }

  async selectCategory(category: string) {
    await this.openSidebar();
    await this.categoryDropdown.click();
    await this.page.locator('.p-dropdown-item').filter({ hasText: category }).click();
    await this.waitForLoad();
  }

  async clearFilters() {
    await this.clearFiltersButton.click();
    await this.waitForLoad();
  }

  async getProductCount() {
    const rows = await this.dataTable.locator('tbody tr').count();
    return rows;
  }

  async clickNextPage() {
    await this.paginationNext.click();
    await this.waitForLoad();
  }

  async clickPrevPage() {
    await this.paginationPrev.click();
    await this.waitForLoad();
  }

  async changeRowsPerPage(rows: number) {
    await this.rowsPerPageDropdown.click();
    await this.page.locator('.p-dropdown-item').filter({ hasText: rows.toString() }).click();
    await this.waitForLoad();
  }

  async sortByColumn(columnName: string) {
    const columnHeader = this.page.getByRole('columnheader', { name: new RegExp(columnName, 'i') });
    await columnHeader.click();
    await this.waitForLoad();
  }

  async viewProductDetails(index: number) {
    const viewButton = this.dataTable.locator('tbody tr').nth(index).getByRole('button', { name: /view/i });
    await viewButton.click();
  }

  async getActiveFilters() {
    return this.page.locator('[class*="filter-tag"], .p-tag, [class*="active-filter"]');
  }
}
