import { expect, Page } from '@playwright/test';
import { ComponentContract } from '../contracts/types';
import { Theme, ViewportName } from '../config/types';
import { convertRemToPx } from '../utils/convertRemToPx';

export const assertComponentContract = async (
  page: Page,
  contract: ComponentContract,
  theme: Theme,
  viewport: ViewportName,
  tagName: string
) => {

  const locator = page.getByTestId(contract.args['data-testid']);
  
  await expect(locator).toBeVisible();

  await expect(locator).toHaveJSProperty("tagName", tagName.toUpperCase());
  for(const className of contract.className){
    await expect(locator).toHaveClass(className); // if not undefined
  }
  await expect(locator).toHaveCSS("font-family", contract.fontFamily); // if not undefined
  await expect(locator).toHaveCSS("font-size", convertRemToPx(contract.fontSize[viewport]));
  await expect(locator).toHaveCSS("font-weight", contract.fontWeight);
  await expect(locator).toHaveCSS("color", contract.color[theme]);
}