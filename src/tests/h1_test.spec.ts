import { test, expect } from '@playwright/test';
import { buildStorybookURL } from '../utils/buildStorybookURL';

const tagName = "h1";
const testId = "test_h1";
const id = "ui-atoms-h1--default";
const args = {
  content: "Default H1",
  "data-testid": testId
}

test('TC_MC_0025_UI_H1_Desktop_LightTheme_Test', async ({ page }) => {

  const URL = buildStorybookURL(id, "light", args);
  await page.goto(URL);

  const locator = page.getByTestId('test_h1');

  await expect(locator).toBeVisible();

  await expect(locator).toHaveJSProperty("tagName", tagName.toUpperCase());
  await expect(locator).toHaveClass(/h1/); // need to check if it contain
  await expect(locator).toHaveCSS("font-family", /Inter/); // need to check if it contain
  await expect(locator).toHaveCSS("font-size", "32px");
  await expect(locator).toHaveCSS("font-weight", "700");
  await expect(locator).toHaveCSS("color", "rgb(15, 23, 42)");
});

test('TC_MC_0026_UI_H1_Desktop_DarkTheme_Test', async ({ page }) => {
  const URL = buildStorybookURL(id, "dark", args);
  await page.goto(URL);

  const locator = page.getByTestId('test_h1');

  await expect(locator).toBeVisible();

  await expect(locator).toHaveJSProperty("tagName", tagName.toUpperCase());
  await expect(locator).toHaveClass(/h1/); // need to check if it contain
  await expect(locator).toHaveCSS("font-family", /Inter/); // need to check if it contain
  await expect(locator).toHaveCSS("font-size", "32px");
  await expect(locator).toHaveCSS("font-weight", "700");
  await expect(locator).toHaveCSS("color", "rgb(245, 247, 251)");
});