# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: transport-overview.spec.ts >> Transport Overview >> page loads with summary cards and charts
- Location: e2e\transport-overview.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Transport Overview')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Transport Overview')

```

```yaml
- heading "404" [level=1]
- heading "This page could not be found." [level=2]
- alert
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Transport Overview", () => {
  4  |   test("page loads with summary cards and charts", async ({ page }) => {
  5  |     await page.goto("/dashboard/admin/transport");
  6  | 
> 7  |     await expect(page.locator("text=Transport Overview")).toBeVisible();
     |                                                           ^ Error: expect(locator).toBeVisible() failed
  8  |     await expect(page.locator("text=Students on Route")).toBeVisible();
  9  |     await expect(page.locator("text=Routes On Time")).toBeVisible();
  10 |   });
  11 | 
  12 |   test("quick navigation cards render", async ({ page }) => {
  13 |     await page.goto("/dashboard/admin/transport");
  14 | 
  15 |     await expect(page.locator("text=Transport Management")).toBeVisible();
  16 |     await expect(page.locator("text=Live Tracking")).toBeVisible();
  17 |   });
  18 | });
  19 | 
```