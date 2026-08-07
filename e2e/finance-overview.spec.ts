import { test, expect } from "@playwright/test";

test.describe("Finance Overview", () => {
  test("page loads with summary cards and charts", async ({ page }) => {
    await page.goto("/dashboard/admin/finance/overview");

    await expect(page.locator("text=Finance Overview")).toBeVisible();
    await expect(page.locator("text=Total Fee Expected")).toBeVisible();
    await expect(page.locator("text=Total Fee Collected")).toBeVisible();
    await expect(page.locator("text=Total Outstanding")).toBeVisible();
  });

  test("recent transactions table renders", async ({ page }) => {
    await page.goto("/dashboard/admin/finance/overview");

    await expect(page.locator("text=Recent Transactions")).toBeVisible();
  });

  test("filters are present", async ({ page }) => {
    await page.goto("/dashboard/admin/finance/overview");

    await expect(page.locator("text=Academic Year")).toBeVisible();
    await expect(page.locator("text=Class / Grade")).toBeVisible();
    await expect(page.locator("text=Fee Type")).toBeVisible();
  });
});
