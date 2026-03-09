export enum ViewportName {
  DESKTOP = 'DESKTOP',
  TABLET = 'TABLET',
  MOBILE = 'MOBILE',
}

export type Vieport = Record<ViewportName, { width: number; height: number }>;

export enum Theme {
  DARK = "dark",
  LIGHT = "light"
}