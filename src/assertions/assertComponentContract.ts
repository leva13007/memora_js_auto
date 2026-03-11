import { expect, Page } from '@playwright/test';
import { ComponentContract } from '../contracts/types';
import { Theme, ViewportName } from '../config/types';
import { convertRemToPx } from '../utils/convertRemToPx';

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

  if (contract.paddingLeft) await expect(locator).toHaveCSS("padding-left", convertRemToPx(contract.paddingLeft));
  if (contract.paddingRight) await expect(locator).toHaveCSS("padding-right", convertRemToPx(contract.paddingRight));
  if (contract.width) await expect(locator).toHaveCSS("width", contract.width[viewport]);

  if (contract.fontFamily) await expect(locator).toHaveCSS("font-family", contract.fontFamily); // if not undefined
  if (contract.fontSize) await expect(locator).toHaveCSS("font-size", convertRemToPx(contract.fontSize[viewport]));
  if (contract.fontWeight) await expect(locator).toHaveCSS("font-weight", contract.fontWeight);
  if (contract.color && theme) await expect(locator).toHaveCSS("color", contract.color[theme]);
}