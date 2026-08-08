import { test, expect } from "@playwright/test";

test.describe("Finance Overview", () => {
  test("page loads without unauthenticated fixture data", async ({ page }) => {
    await page.goto("/dashboard/admin/finance/overview");

    await expect(page.getByRole("heading", { name: "Finance Overview" })).toBeVisible();
    await expect(page.getByText("Please log in to view finance data.", { exact: true })).toBeVisible();
    await expect(page.locator("text=Total Fee Expected")).toHaveCount(0);
  });

  test("recent transactions table renders", async ({ page }) => {
    await page.goto("/dashboard/admin/finance/overview");

    await expect(page.locator("text=Recent Transactions")).toBeVisible();
  });

  test("filters are present", async ({ page }) => {
    await page.goto("/dashboard/admin/finance/overview");

    await expect(page.getByText("Academic Year", { exact: true })).toBeVisible();
    await expect(page.getByText("Class / Grade", { exact: true })).toBeVisible();
    await expect(page.getByText("Fee Type", { exact: true })).toBeVisible();
  });
});
