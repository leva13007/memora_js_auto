import { test } from '@playwright/test';
import { buildStorybookURL } from '../../src/utils/buildStorybookURL';
import { Theme, ViewportName } from '../../src/config/types';
import { Viewports } from '../../src/config/viewport';
import { assertComponentContract } from '../../src/assertions/assertComponentContract';
import { Container } from '../../src/contracts/Container';


test.describe("Container", () => {

  const TestCasesList: Record<string, ViewportName> = {
    "TC_MC_0037": ViewportName.DESKTOP,
    "TC_MC_0038": ViewportName.TABLET,
    "TC_MC_0039": ViewportName.MOBILE,
  }

  test.describe("Container Component", () => {
    Object.entries(TestCasesList).forEach(([tcId, viewport]) => {
      test(`${tcId}_UI_Container_${viewport}}`, async ({ page }) => {
        const URL = buildStorybookURL(Container.id, undefined, Container.args);
        console.log(URL)
        await page.goto(URL);
        page.setViewportSize(Viewports[viewport]);

        await assertComponentContract({
          page,
          contract: Container,
          viewport,
          tagName: Container.tagName
        });
      })
    });
  });


  const FluidTestCasesList: Record<string, ViewportName[]> = {
    "TC_MC_040": [ViewportName.DESKTOP, ViewportName.TABLET, ViewportName.MOBILE],
  }

  test.describe("Container Component Fluid", () => {
    Object.entries(FluidTestCasesList).forEach(([tcId, viewports]) => {

      viewports.forEach(viewport => {
        test(`${tcId}_UI_Container-Fluid_${viewport}}`, async ({ page }) => {
          const URL = buildStorybookURL(Container.id, undefined, Container.args);
          console.log(URL)
          await page.goto(URL);
          page.setViewportSize(Viewports[viewport]);

          await assertComponentContract({
            page,
            contract: Container,
            viewport,
            tagName: Container.tagName
          });
        })
      });

    });
  });
})