import { expect, Page } from '@playwright/test';
import { ComponentContract } from '../contracts/types';
import { Theme, ViewportName } from '../config/types';
import { convertRemToPx } from '../utils/convertRemToPx';
import { Viewports } from '../config/viewport';

export const assertComponentContract = async ({
  page,
  contract,
  theme,
  viewport,
  tagName,
}: {
  page: Page,
  contract: ComponentContract,
  theme?: Theme,
  viewport: ViewportName,
  tagName: string,
}) => {

  // const locator = page.getByTestId(contract.args['data-testid']);
  const locator = contract.args['data-testid'] ? 
    page.locator(`[data-testid="${contract.args['data-testid']}"]`)
    : page.getByText(contract.args.children);
  
  await expect(locator).toBeVisible();

  await expect(locator).toHaveJSProperty("tagName", tagName.toUpperCase());
  for(const className of contract.className){
    await expect(locator).toHaveClass(className); // if not undefined
  }

  if (contract.horizontalCentered) {
    const marginLeft = await locator.evaluate(el => getComputedStyle(el).marginLeft);
    const marginRight = await locator.evaluate(el => getComputedStyle(el).marginRight);
    expect(marginLeft === marginRight).toBeTruthy();
  }
  if (contract.paddingLeft) await expect(locator).toHaveCSS("padding-left", convertRemToPx(contract.paddingLeft));
  if (contract.paddingRight) await expect(locator).toHaveCSS("padding-right", convertRemToPx(contract.paddingRight));
  if (contract.width) {
    const expectedWidth = contract.width[viewport];
    if (expectedWidth.includes("%")) {
      const viewportWidth = Viewports[viewport].width + "px";
      const computedWidth = await locator.evaluate(el => getComputedStyle(el).width);
      expect(computedWidth).toBe(viewportWidth);
    } else {
      await expect(locator).toHaveCSS("width", contract.width[viewport]);
    }
  }
  if (contract.maxWidth?.[viewport]) await expect(locator).toHaveCSS("max-width", contract.maxWidth[viewport]);

  if (contract.fontFamily) await expect(locator).toHaveCSS("font-family", contract.fontFamily); // if not undefined
  if (contract.fontSize) await expect(locator).toHaveCSS("font-size", convertRemToPx(contract.fontSize[viewport]));
  if (contract.fontWeight) await expect(locator).toHaveCSS("font-weight", contract.fontWeight);
  if (contract.color && theme) await expect(locator).toHaveCSS("color", contract.color[theme]);
}