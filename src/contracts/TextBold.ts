import { Theme, ViewportName } from "../config/types";
import { ComponentContract } from "./types";

export const TextBold: ComponentContract = {
  id: "ui-atoms-textbold--default",
  tagName: "span",
  as: ['span', 'p'],
  args: {
    content: "Default TextBold",
    "data-testid": "testID_text-bold"
  },
  className: [/(text)[^-]/, /text-bold/],
  fontFamily: /Inter/,
  fontWeight: "700",
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