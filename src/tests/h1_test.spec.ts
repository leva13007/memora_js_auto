import { test, expect } from '@playwright/test';
import { buildStorybookURL, Theme } from '../utils/buildStorybookURL';
import { convertRemToPx } from '../utils/convertRemToPx';

export enum VieportName {
  DESKTOP = 'DESKTOP',
  TABLET = 'TABLET',
  MOBILE = 'MOBILE',
}

type Vieport = Record<VieportName, { width: number; height: number }>;
const Viewports: Vieport = {
  DESKTOP: { width: 1280, height: 800 },
  TABLET: { width: 768, height: 1024 },
  MOBILE: { width: 375, height: 812 },
}

// Viewport side dependency
const FONT_SIZE_H1 = {
  DESKTOP: 2,
  TABLET: 1.75,
  MOBILE: 1.5
}

// Theme dependency
const COLOR = {
  [Theme.LIGHT]: "rgb(15, 23, 42)",
  [Theme.DARK]: "rgb(245, 247, 251)",
}

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
    test(`${tcId}_UI_H1_${viewport}_${theme}Theme_Test`, async ({ page }) => {
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
      await expect(locator).toHaveCSS("color", COLOR[theme]);
    })
  });
});