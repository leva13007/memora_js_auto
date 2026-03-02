const ONE_REM_IN_PX = 16;
export const convertRemToPx = (rem: number): string => {
  return Math.trunc(ONE_REM_IN_PX * rem) + "px";
}