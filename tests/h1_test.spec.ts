import { test, expect } from '@playwright/test';

const tagName = "h1";
const testId = "test_h1";
const H1_URL = "?&viewMode=story&id=ui-atoms-h1--defaul";

const getTheme = (theme: "dark" | "light") => `&globals=theme:${theme}`;
const getContent = (content: string = "Default H1") => `children:${content}`;

const getArgs = (content?: string, dataTestId: string = "test_h1") => `&args=${getContent(content)};data-testid:${dataTestId}`;

test('TC_MC_0025_UI_H1_Desktop_LightTheme_Test', async ({ page }) => {
  await page.goto(H1_URL + getTheme("light") + getArgs(undefined, testId));
  await expect(page).toHaveTitle(/ui-atoms-h1--defaul/);

  const locator = page.getByTestId('test_h1');

  await expect(locator).toBeVisible();

  await expect(locator).toHaveJSProperty("tagName", tagName.toUpperCase());
  await expect(locator).toHaveClass(/h1/); // need to check if it contain
  await expect(locator).toHaveCSS("font-family", /Inter/); // need to check if it contain
  await expect(locator).toHaveCSS("font-size", "32px");
  await expect(locator).toHaveCSS("font-weight", "700");
  await expect(locator).toHaveCSS("color", "rgb(15, 23, 42)");
});