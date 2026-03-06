import { test, expect } from '@playwright/test';
import { buildStorybookURL } from '../utils/buildStorybookURL';
import { convertRemToPx } from '../utils/convertRemToPx';
import { Theme, VieportName } from '../config/types';
import { Viewports } from '../config/viewport';
import { COLOR } from '../data/themeData';
import { FONT_SIZE_H2 } from '../data/viewportData';

const tagName = "h2";
const testId = "test_h2";
const id = "ui-atoms-h2--default";
const args = {
  content: "Default H2",
  "data-testid": testId
};
const componentClassNameReg = /h2/;

const componentFontNameReg = /Inter/;
const componentFontWeight = "600";

const TestCasesList: Record<string, [VieportName, Theme]> = {
  "TC_MC_0031": [VieportName.DESKTOP, Theme.LIGHT],
  "TC_MC_0032": [VieportName.DESKTOP, Theme.DARK],
  "TC_MC_0033": [VieportName.TABLET, Theme.LIGHT],
  "TC_MC_0034": [VieportName.TABLET, Theme.DARK],
  "TC_MC_0035": [VieportName.MOBILE, Theme.LIGHT],
  "TC_MC_0036": [VieportName.MOBILE, Theme.DARK],
}

test.describe("H2 Component", () => {
  Object.entries(TestCasesList).forEach(([tcId, data]) => {
    const viewport = data[0];
    const theme = data[1];
    test(`${tcId}_UI_H2_${viewport}_${theme.toUpperCase()}`, async ({ page }) => {
      const URL = buildStorybookURL(id, theme, args);
      await page.goto(URL);
      page.setViewportSize(Viewports[viewport]);

      const locator = page.getByTestId(testId);

      await expect(locator).toBeVisible();

      await expect(locator).toHaveJSProperty("tagName", tagName.toUpperCase());
      await expect(locator).toHaveClass(componentClassNameReg); // if not undefined
      await expect(locator).toHaveCSS("font-family", componentFontNameReg); // if not undefined
      await expect(locator).toHaveCSS("font-size", convertRemToPx(FONT_SIZE_H2[viewport]));
      await expect(locator).toHaveCSS("font-weight", componentFontWeight);
      await expect(locator).toHaveCSS("color", COLOR.text[theme]);
    })
  });
});