import { test, expect } from '@playwright/test';
import { buildStorybookURL } from '../../src/utils/buildStorybookURL';
import { Theme, ViewportName } from '../../src/config/types';
import { Viewports } from '../../src/config/viewport';
import { assertComponentContract } from '../../src/assertions/assertComponentContract';
import { TextMedium } from '../../src/contracts/TextMedium';

const TestCasesList: Record<string, [ViewportName, Theme]> = {
  "TC_MC_0007": [ViewportName.DESKTOP, Theme.LIGHT],
  "TC_MC_0008": [ViewportName.DESKTOP, Theme.DARK],
  "TC_MC_0009": [ViewportName.TABLET, Theme.LIGHT],
  "TC_MC_0010": [ViewportName.TABLET, Theme.DARK],
  "TC_MC_0011": [ViewportName.MOBILE, Theme.LIGHT],
  "TC_MC_0012": [ViewportName.MOBILE, Theme.DARK],
}

test.describe("TextMedium Component", () => {
  Object.entries(TestCasesList).forEach(([tcId, data]) => {
    const viewport = data[0];
    const theme = data[1];

    const as = TextMedium.as || ['span']; // TODO: tidy up here!

    as.forEach(asProps => {
      test(`${tcId}_UI_TextMedium_${viewport}_${theme.toUpperCase()} with props 'as=${asProps}'`, async ({ page }) => {
        const URL = buildStorybookURL(TextMedium.id, theme, {...TextMedium.args, as: asProps});
        await page.goto(URL);
        page.setViewportSize(Viewports[viewport]);

        await assertComponentContract(page, TextMedium, theme, viewport, asProps);
      })
    });
  });
});