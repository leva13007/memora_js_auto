import { test } from '@playwright/test';
import { buildStorybookURL } from '../../src/utils/buildStorybookURL';
import { Theme, ViewportName } from '../../src/config/types';
import { Viewports } from '../../src/config/viewport';
import { assertComponentContract } from '../../src/assertions/assertComponentContract';
import { TextLink } from '../../src/contracts/TextLink';

const TestCasesList: Record<string, [ViewportName, Theme]> = {
  "TC_MC_0019": [ViewportName.DESKTOP, Theme.LIGHT],
  "TC_MC_0020": [ViewportName.DESKTOP, Theme.DARK],
  "TC_MC_0021": [ViewportName.TABLET, Theme.LIGHT],
  "TC_MC_0022": [ViewportName.TABLET, Theme.DARK],
  "TC_MC_0023": [ViewportName.MOBILE, Theme.LIGHT],
  "TC_MC_0024": [ViewportName.MOBILE, Theme.DARK],
}

test.describe("TextLink Component", () => {
  Object.entries(TestCasesList).forEach(([tcId, data]) => {
    const viewport = data[0];
    const theme = data[1];

    test(`${tcId}_UI_TextLink_${viewport}_${theme.toUpperCase()}`, async ({ page }) => {
        const URL = buildStorybookURL(TextLink.id, theme, TextLink.args);
        await page.goto(URL);
        page.setViewportSize(Viewports[viewport]);

        await assertComponentContract({
          page,
          contract: TextLink,
          theme,
          viewport,
          tagName: TextLink.tagName
        });
      })
  });
});