import { Theme, ViewportName } from "../config/types";
import { ComponentContract } from "./types";

export const H2: ComponentContract = {
  id: "ui-atoms-h2--default",
  tagName: "H2",
  args: {
    content: "Default H2",
    "data-testid": "test_h2"
  },
  className: [/h2/],
  fontFamily: /Inter/,
  fontWeight: "600",
  fontSize: {
    [ViewportName.DESKTOP]: 1.5,
    [ViewportName.TABLET]: 1.25,
    [ViewportName.MOBILE]: 1.125
  },
  color: {
    [Theme.LIGHT]: "rgb(15, 23, 42)",
    [Theme.DARK]: "rgb(245, 247, 251)",
  }
}