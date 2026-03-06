import { Theme } from "../config/types";

const STORYBOOK_BASE = "iframe.html?viewMode=story";

export const buildStorybookURL = (id: string, theme: Theme, args?: Record<string, string>): string => {
  if (!id) throw new Error("The id parameter is required to build the Storybook URL.");
  if (!theme) throw new Error("The theme parameter is required to build the Storybook URL.");

  const argsPart: string = args ? `&args=${Object.entries(args).map(([k, v]) => `${k}:${v}`).join(";")}` : "";

  return `${STORYBOOK_BASE}&id=${id}&globals=theme:${theme}${argsPart}`;
}



// todo write tests for utils!!!!
// TC name convention? TC_MC_0030_UI_H1_MOBILE_DARK