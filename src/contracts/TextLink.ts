import { Theme, ViewportName } from "../config/types";
import { ComponentContract } from "./types";

export const TextLink: ComponentContract = {
  id: "ui-atoms-textlink--default",
  tagName: "a",
  args: {
    children: "Default TextLink",
    "data-testid": "testID_text-link",
    to: "docs",
  },
  className: [/link/],
  fontFamily: /Inter/,
  fontWeight: "400",
  fontSize: {
    [ViewportName.DESKTOP]: 1,
    [ViewportName.TABLET]: 0.875,
    [ViewportName.MOBILE]: 0.75
  },
  color: {
    [Theme.LIGHT]: "rgb(26, 115, 232)",
    [Theme.DARK]: "rgb(138, 180, 248)",
  },
  hoverColor: {
    [Theme.LIGHT]: "rgb(23, 78, 166)",
    [Theme.DARK]: "rgb(23, 78, 166)",
  },
  cursor: "pointer",
  textDecoration: "none",
}