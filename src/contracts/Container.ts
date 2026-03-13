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
  horizontalCentered: true,
  paddingLeft: 1,
  paddingRight: 1,
  width: {
    [ViewportName.DESKTOP]: "1200px",
    [ViewportName.TABLET]: "700px",
    [ViewportName.MOBILE]: "100%"
  },
  maxWidth: {
    [ViewportName.MOBILE]: "100%"
  }
}

export const ContainerFluid: ComponentContract = {
  id: "ui-atoms-container--default",
  tagName: "div",
  args: {
    children: "Default Container Fluid",
    "data-testid": ""
  },
  className: [/container/],
  horizontalCentered: true,
  paddingLeft: 0,
  paddingRight: 0,
  width: {
    [ViewportName.DESKTOP]: "100%",
    [ViewportName.TABLET]: "100%",
    [ViewportName.MOBILE]: "100%",
  },
  maxWidth: {
    [ViewportName.MOBILE]: "100%"
  }
}