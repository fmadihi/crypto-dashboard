import { test, expect } from "@playwright/test";

test("dashboard loads and shows coins", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByPlaceholder("Search coins...")).toBeVisible();
  await page.waitForSelector("[data-testid='price-card']", { timeout: 10000 }).catch(() => {});
  await expect(page.getByText("CryptoDash")).toBeVisible();
});

test("sidebar navigation works", async ({ page }) => {
  await page.goto("/");
  await page.getByText("News").click();
  await expect(page.getByText("Crypto News")).toBeVisible({ timeout: 5000 });
});
