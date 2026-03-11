import { ViewportName, Theme } from "../config/types"

export type Args = {
  children: string,
  "data-testid": string,
}

type FontWeight = "700" | "600" | "400" | "300"

export type ComponentContract = {
  id: string,
  tagName: string,
  as?: string[],
  args: Args,
  className: RegExp[],

  paddingLeft?: number,
  paddingRight?: number,
  width?: {
    [ViewportName.DESKTOP]: string,
    [ViewportName.TABLET]: string,
    [ViewportName.MOBILE]: string
  },

  fontFamily?: RegExp,
  fontWeight?: FontWeight,
  fontSize?: {
    [ViewportName.DESKTOP]: number,
    [ViewportName.TABLET]: number,
    [ViewportName.MOBILE]: number
  },
  color?: {
    [Theme.LIGHT]: string,
    [Theme.DARK]: string,
  }
} // TODO: Text component pros is not required for non-Text!