import { test, expect } from "@playwright/test";

test.describe("Transport Overview", () => {
  test("page loads with summary cards and charts", async ({ page }) => {
    await page.goto("/dashboard/admin/transport");

    await expect(page.locator("text=Transport Overview")).toBeVisible();
    await expect(page.locator("text=Students on Route")).toBeVisible();
    await expect(page.locator("text=Routes On Time")).toBeVisible();
  });

  test("quick navigation cards render", async ({ page }) => {
    await page.goto("/dashboard/admin/transport");

    await expect(page.getByRole("link", { name: /Transport Management/ })).toBeVisible();
    await expect(page.locator("text=Live Tracking")).toBeVisible();
  });
});
