export enum VieportName {
  DESKTOP = 'DESKTOP',
  TABLET = 'TABLET',
  MOBILE = 'MOBILE',
}

export type Vieport = Record<VieportName, { width: number; height: number }>;

export enum Theme {
  DARK = "dark",
  LIGHT = "light"
}