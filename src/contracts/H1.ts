import { Theme, ViewportName } from "../config/types";
import { ComponentContract } from "./types";

export const H1: ComponentContract = {
  id: "ui-atoms-h1--default",
  tagName: "H1",
  args: {
    content: "Default H1",
    "data-testid": "test_h1"
  },
  className: [/h1/],
  fontFamily: /Inter/,
  fontWeight: "700",
  fontSize: {
    [ViewportName.DESKTOP]: 2,
    [ViewportName.TABLET]: 1.75,
    [ViewportName.MOBILE]: 1.5
  },
  color: {
    [Theme.LIGHT]: "rgb(15, 23, 42)",
    [Theme.DARK]: "rgb(245, 247, 251)",
  }
}