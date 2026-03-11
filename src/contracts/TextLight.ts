import { Theme, ViewportName } from "../config/types";
import { ComponentContract } from "./types";

export const TextLight: ComponentContract = {
  id: "ui-atoms-textlight--default",
  tagName: "span",
  as: ['span', 'p'],
  args: {
    children: "Default TextLight",
    "data-testid": "testID_text-light"
  },
  className: [/(text)[^-]/, /text-light/],
  fontFamily: /Inter/,
  fontWeight: "300",
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