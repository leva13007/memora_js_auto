import { test, expect } from '@playwright/test';
import { buildStorybookURL } from '../../src/utils/buildStorybookURL';
import { convertRemToPx } from '../../src/utils/convertRemToPx';
import { Theme, VieportName } from '../../src/config/types';
import { Viewports } from '../../src/config/viewport';
import { COLOR } from '../../src/data/themeData';
import { FONT_SIZE_H1 } from '../../src/data/viewportData';

const tagName = "h1";
const testId = "test_h1";
const id = "ui-atoms-h1--default";
const args = {
  content: "Default H1",
  "data-testid": testId
};
const componentClassNameReg = /h1/;

const componentFontNameReg = /Inter/;
const componentFontWeight = "700";

const TestCasesList: Record<string, [VieportName, Theme]> = {
  "TC_MC_0025": [VieportName.DESKTOP, Theme.LIGHT],
  "TC_MC_0026": [VieportName.DESKTOP, Theme.DARK],
  "TC_MC_0027": [VieportName.TABLET, Theme.LIGHT],
  "TC_MC_0028": [VieportName.TABLET, Theme.DARK],
  "TC_MC_0029": [VieportName.MOBILE, Theme.LIGHT],
  "TC_MC_0030": [VieportName.MOBILE, Theme.DARK],
}

test.describe("H1 Component", () => {
  Object.entries(TestCasesList).forEach(([tcId, data]) => {
    const viewport = data[0];
    const theme = data[1];
    test(`${tcId}_UI_H1_${viewport}_${theme.toUpperCase()}`, async ({ page }) => {
      const URL = buildStorybookURL(id, theme, args);
      await page.goto(URL);
      page.setViewportSize(Viewports[viewport]);

      const locator = page.getByTestId(testId);

      await expect(locator).toBeVisible();

      await expect(locator).toHaveJSProperty("tagName", tagName.toUpperCase());
      await expect(locator).toHaveClass(componentClassNameReg); // if not undefined
      await expect(locator).toHaveCSS("font-family", componentFontNameReg); // if not undefined
      await expect(locator).toHaveCSS("font-size", convertRemToPx(FONT_SIZE_H1[viewport]));
      await expect(locator).toHaveCSS("font-weight", componentFontWeight);
      await expect(locator).toHaveCSS("color", COLOR.text[theme]);
    })
  });
});