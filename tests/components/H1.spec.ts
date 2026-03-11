import { test } from '@playwright/test';
import { buildStorybookURL } from '../../src/utils/buildStorybookURL';
import { Theme, ViewportName } from '../../src/config/types';
import { Viewports } from '../../src/config/viewport';
import { assertComponentContract } from '../../src/assertions/assertComponentContract';
import { H1 } from '../../src/contracts/H1';

const TestCasesList: Record<string, [ViewportName, Theme]> = {
  "TC_MC_0025": [ViewportName.DESKTOP, Theme.LIGHT],
  "TC_MC_0026": [ViewportName.DESKTOP, Theme.DARK],
  "TC_MC_0027": [ViewportName.TABLET, Theme.LIGHT],
  "TC_MC_0028": [ViewportName.TABLET, Theme.DARK],
  "TC_MC_0029": [ViewportName.MOBILE, Theme.LIGHT],
  "TC_MC_0030": [ViewportName.MOBILE, Theme.DARK],
}

test.describe("H1 Component", () => {
  Object.entries(TestCasesList).forEach(([tcId, data]) => {
    const viewport = data[0];
    const theme = data[1];
    test(`${tcId}_UI_H1_${viewport}_${theme.toUpperCase()}`, async ({ page }) => {
      const URL = buildStorybookURL(H1.id, theme, H1.args);
      await page.goto(URL);
      page.setViewportSize(Viewports[viewport]);

      await assertComponentContract({
        page,
        contract: H1,
        theme,
        viewport,
        tagName: H1.tagName
      });
    })
  });
});