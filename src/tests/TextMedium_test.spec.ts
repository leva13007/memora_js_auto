import { test, expect } from '@playwright/test';
import { buildStorybookURL } from '../utils/buildStorybookURL';
import { convertRemToPx } from '../utils/convertRemToPx';
import { Theme, VieportName } from '../config/types';
import { Viewports } from '../config/viewport';
import { COLOR } from '../data/themeData';
import { FONT_SIZE_Text } from '../data/viewportData';

const testId = "testID_text-medium";
const id = "ui-atoms-textmedium--default";
const args = {
  content: "Default TextMedium",
  "data-testid": testId
};
const componentTextClassNameReg = /(text)[^-]/;
const componentTextMediumClassNameReg = /text-medium/;

const componentFontNameReg = /Inter/;
const componentFontWeight = "400";

const TestCasesList: Record<string, [VieportName, Theme]> = {
  "TC_MC_0007": [VieportName.DESKTOP, Theme.LIGHT],
  "TC_MC_0008": [VieportName.DESKTOP, Theme.DARK],
  "TC_MC_0009": [VieportName.TABLET, Theme.LIGHT],
  "TC_MC_0010": [VieportName.TABLET, Theme.DARK],
  "TC_MC_0011": [VieportName.MOBILE, Theme.LIGHT],
  "TC_MC_0012": [VieportName.MOBILE, Theme.DARK],
}

test.describe("TextMedium Component", () => {
  Object.entries(TestCasesList).forEach(([tcId, data]) => {
    const viewport = data[0];
    const theme = data[1];

    const as = ['span', 'p'] as const;

    as.forEach(asProps => {
      test(`${tcId}_UI_TextMedium_${viewport}_${theme.toUpperCase()} with props 'as=${asProps}'`, async ({ page }) => {
        const URL = buildStorybookURL(id, theme, {...args, as: asProps});
        await page.goto(URL);
        page.setViewportSize(Viewports[viewport]);

        const locator = page.getByTestId(testId);

        await expect(locator).toBeVisible();

        await expect(locator).toHaveJSProperty("tagName", asProps.toUpperCase());
        await expect(locator).toHaveClass(componentTextClassNameReg); // if not undefined
        await expect(locator).toHaveClass(componentTextMediumClassNameReg); // if not undefined
        await expect(locator).toHaveCSS("font-family", componentFontNameReg); // if not undefined
        await expect(locator).toHaveCSS("font-size", convertRemToPx(FONT_SIZE_Text[viewport]));
        await expect(locator).toHaveCSS("font-weight", componentFontWeight);
        await expect(locator).toHaveCSS("color", COLOR.text[theme]);
      })
    });
  });
});