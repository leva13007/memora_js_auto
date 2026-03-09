import { Theme, ViewportName } from "../config/types";
import { ComponentContract } from "./types";

export const TextMedium: ComponentContract = {
  id: "ui-atoms-textmedium--default",
  tagName: "span",
  as: ['span', 'p'],
  args: {
    content: "Default TextMedium",
    "data-testid": "testID_text-medium"
  },
  className: [/(text)[^-]/, /text-medium/],
  fontFamily: /Inter/,
  fontWeight: "400",
  fontSize: {
    [ViewportName.DESKTOP]: 1,
    [ViewportName.TABLET]: 0.875,
    [ViewportName.MOBILE]: 0.75
  },
  color: {
    [Theme.LIGHT]: "rgb(15, 23, 42)",
    [Theme.DARK]: "rgb(245, 247, 251)",
  }
}