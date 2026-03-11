import { Theme, ViewportName } from "../config/types";
import { ComponentContract } from "./types";

export const Container: ComponentContract = {
  id: "ui-atoms-container--default",
  tagName: "div",
  args: {
    children: "Default Container",
    "data-testid": ""
  },
  className: [/container/],
  paddingLeft: 1, // TODO: need to test paddings!!!!
  paddingRight: 1, // TODO: need to test paddings!!!!
  width: {
    [ViewportName.DESKTOP]: "1200px",
    [ViewportName.TABLET]: "700px",
    [ViewportName.MOBILE]: ""
  },
  // fontFamily: /Inter/,
  // fontWeight: "700",
  // fontSize: {
  //   [ViewportName.DESKTOP]: 2,
  //   [ViewportName.TABLET]: 1.75,
  //   [ViewportName.MOBILE]: 1.5
  // },
  // color: {
  //   [Theme.LIGHT]: "rgb(15, 23, 42)",
  //   [Theme.DARK]: "rgb(245, 247, 251)",
  // }
}