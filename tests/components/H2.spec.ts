import { test } from '@playwright/test';
import { buildStorybookURL } from '../../src/utils/buildStorybookURL';
import { Theme, ViewportName } from '../../src/config/types';
import { Viewports } from '../../src/config/viewport';
import { assertComponentContract } from '../../src/assertions/assertComponentContract';
import { H2 } from '../../src/contracts/H2';

const TestCasesList: Record<string, [ViewportName, Theme]> = {
  "TC_MC_0031": [ViewportName.DESKTOP, Theme.LIGHT],
  "TC_MC_0032": [ViewportName.DESKTOP, Theme.DARK],
  "TC_MC_0033": [ViewportName.TABLET, Theme.LIGHT],
  "TC_MC_0034": [ViewportName.TABLET, Theme.DARK],
  "TC_MC_0035": [ViewportName.MOBILE, Theme.LIGHT],
  "TC_MC_0036": [ViewportName.MOBILE, Theme.DARK],
}

test.describe("H2 Component", () => {
  Object.entries(TestCasesList).forEach(([tcId, data]) => {
    const viewport = data[0];
    const theme = data[1];
    test(`${tcId}_UI_H2_${viewport}_${theme.toUpperCase()}`, async ({ page }) => {
      const URL = buildStorybookURL(H2.id, theme, H2.args);
      await page.goto(URL);
      page.setViewportSize(Viewports[viewport]);

      await assertComponentContract(page, H2, theme, viewport, H2.tagName);
    })
  });
});