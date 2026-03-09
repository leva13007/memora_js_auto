import { test, expect } from '@playwright/test';
import { buildStorybookURL } from '../../src/utils/buildStorybookURL';
import { convertRemToPx } from '../../src/utils/convertRemToPx';
import { Theme, VieportName } from '../../src/config/types';
import { Viewports } from '../../src/config/viewport';
import { COLOR } from '../../src/data/themeData';
import { FONT_SIZE_Text } from '../../src/data/viewportData';

const testId = "testID_text-bold";
const id = "ui-atoms-textbold--default";
const args = {
  content: "Default TextBold",
  "data-testid": testId
};
const componentTextClassNameReg = /(text)[^-]/;
const componentTextBoldClassNameReg = /text-bold/;

const componentFontNameReg = /Inter/;
const componentFontWeight = "700";

const TestCasesList: Record<string, [VieportName, Theme]> = {
  "TC_MC_0001": [VieportName.DESKTOP, Theme.LIGHT],
  "TC_MC_0002": [VieportName.DESKTOP, Theme.DARK],
  "TC_MC_0003": [VieportName.TABLET, Theme.LIGHT],
  "TC_MC_0004": [VieportName.TABLET, Theme.DARK],
  "TC_MC_0005": [VieportName.MOBILE, Theme.LIGHT],
  "TC_MC_0006": [VieportName.MOBILE, Theme.DARK],
}

test.describe("TextBold Component", () => {
  Object.entries(TestCasesList).forEach(([tcId, data]) => {
    const viewport = data[0];
    const theme = data[1];

    const as = ['span', 'p'] as const;

    as.forEach(asProps => {
      test(`${tcId}_UI_TextBold_${viewport}_${theme.toUpperCase()} with props 'as=${asProps}'`, async ({ page }) => {
        const URL = buildStorybookURL(id, theme, {...args, as: asProps});
        await page.goto(URL);
        page.setViewportSize(Viewports[viewport]);

        const locator = page.getByTestId(testId);

        await expect(locator).toBeVisible();

        await expect(locator).toHaveJSProperty("tagName", asProps.toUpperCase());
        await expect(locator).toHaveClass(componentTextClassNameReg); // if not undefined
        await expect(locator).toHaveClass(componentTextBoldClassNameReg); // if not undefined
        await expect(locator).toHaveCSS("font-family", componentFontNameReg); // if not undefined
        await expect(locator).toHaveCSS("font-size", convertRemToPx(FONT_SIZE_Text[viewport]));
        await expect(locator).toHaveCSS("font-weight", componentFontWeight);
        await expect(locator).toHaveCSS("color", COLOR.text[theme]);
      })
    });
  });
});