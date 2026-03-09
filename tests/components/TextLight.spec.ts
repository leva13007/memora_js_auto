import { test } from '@playwright/test';
import { buildStorybookURL } from '../../src/utils/buildStorybookURL';
import { Theme, ViewportName } from '../../src/config/types';
import { Viewports } from '../../src/config/viewport';
import { assertComponentContract } from '../../src/assertions/assertComponentContract';
import { TextLight } from '../../src/contracts/TextLight';

const TestCasesList: Record<string, [ViewportName, Theme]> = {
  "TC_MC_0013": [ViewportName.DESKTOP, Theme.LIGHT],
  "TC_MC_0014": [ViewportName.DESKTOP, Theme.DARK],
  "TC_MC_0015": [ViewportName.TABLET, Theme.LIGHT],
  "TC_MC_0016": [ViewportName.TABLET, Theme.DARK],
  "TC_MC_0017": [ViewportName.MOBILE, Theme.LIGHT],
  "TC_MC_0018": [ViewportName.MOBILE, Theme.DARK],
}

test.describe("TextLight Component", () => {
  Object.entries(TestCasesList).forEach(([tcId, data]) => {
    const viewport = data[0];
    const theme = data[1];

    const as = TextLight.as || ['span']; // TODO: tidy up here!

    as.forEach(asProps => {
      test(`${tcId}_UI_TextLight_${viewport}_${theme.toUpperCase()} with props 'as=${asProps}'`, async ({ page }) => {
        const URL = buildStorybookURL(TextLight.id, theme, {...TextLight.args, as: asProps});
        await page.goto(URL);
        page.setViewportSize(Viewports[viewport]);

        await assertComponentContract(page, TextLight, theme, viewport, asProps);
      })
    });
  });
});