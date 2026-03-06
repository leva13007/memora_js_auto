import { Vieport, VieportName } from "./types";


export const Viewports: Vieport = {
  [VieportName.DESKTOP]: { width: 1280, height: 800 },
  [VieportName.TABLET]: { width: 768, height: 1024 },
  [VieportName.MOBILE]: { width: 375, height: 812 },
}