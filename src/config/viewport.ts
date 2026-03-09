import { Vieport, ViewportName } from "./types";


export const Viewports: Vieport = {
  [ViewportName.DESKTOP]: { width: 1280, height: 800 },
  [ViewportName.TABLET]: { width: 768, height: 1024 },
  [ViewportName.MOBILE]: { width: 375, height: 812 },
}