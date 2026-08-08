import { test, expect } from "@playwright/test";

test.describe("Hostel Management", () => {
  test("page loads with summary cards and tables", async ({ page }) => {
    await page.goto("/dashboard/admin/hostel/management");

    await expect(page.getByRole("heading", { name: "Hostel Management" })).toBeVisible();
    await expect(page.locator("span").filter({ hasText: "Total Rooms" })).toBeVisible();
    await expect(page.locator("span").filter({ hasText: "Vacant Beds" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Occupied Beds" })).toBeVisible();
  });

  test("quick actions render", async ({ page }) => {
    await page.goto("/dashboard/admin/hostel/management");

    await expect(page.locator("text=Add Student")).toBeVisible();
    await expect(page.locator("text=Add Visitor")).toBeVisible();
    await expect(page.locator("text=Maintenance Request")).toBeVisible();
  });

  test("filters are present", async ({ page }) => {
    await page.goto("/dashboard/admin/hostel/management");

    await expect(page.locator("text=Hostel Block")).toBeVisible();
    await expect(page.locator("text=Room Type")).toBeVisible();
  });
});
