import { test } from '@playwright/test';
import { buildStorybookURL } from '../../src/utils/buildStorybookURL';
import { Theme, ViewportName } from '../../src/config/types';
import { Viewports } from '../../src/config/viewport';
import { assertComponentContract } from '../../src/assertions/assertComponentContract';
import { TextBold } from '../../src/contracts/TextBold';

const TestCasesList: Record<string, [ViewportName, Theme]> = {
  "TC_MC_0001": [ViewportName.DESKTOP, Theme.LIGHT],
  "TC_MC_0002": [ViewportName.DESKTOP, Theme.DARK],
  "TC_MC_0003": [ViewportName.TABLET, Theme.LIGHT],
  "TC_MC_0004": [ViewportName.TABLET, Theme.DARK],
  "TC_MC_0005": [ViewportName.MOBILE, Theme.LIGHT],
  "TC_MC_0006": [ViewportName.MOBILE, Theme.DARK],
}

test.describe("TextBold Component", () => {
  Object.entries(TestCasesList).forEach(([tcId, data]) => {
    const viewport = data[0];
    const theme = data[1];

    const as = TextBold.as || ['span']; // TODO: tidy up here!

    as.forEach(asProps => {
      test(`${tcId}_UI_TextBold_${viewport}_${theme.toUpperCase()} with props 'as=${asProps}'`, async ({ page }) => {
        const URL = buildStorybookURL(TextBold.id, theme, {...TextBold.args, as: asProps});
        await page.goto(URL);
        page.setViewportSize(Viewports[viewport]);

        await assertComponentContract(page, TextBold, theme, viewport, asProps);
      })
    });
  });
});