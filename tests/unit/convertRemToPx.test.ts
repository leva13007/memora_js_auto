import { describe, expect, test } from "vitest";
import { convertRemToPx, ONE_REM_IN_PX } from "../../src/utils/convertRemToPx";

describe("convertRemToPx", () => {
  test("converts an integer rem value to px", () => {
    expect(convertRemToPx(2)).toBe("32px");
  });

  test("converts zero rem to 0px", () => {
    expect(convertRemToPx(0)).toBe("0px");
  });

  // TODO: need to think about it!
  test("converts negative rem values", () => {
    expect(convertRemToPx(-1)).toBe("-16px");
  });

  test("truncates fractional px values", () => {
    expect(convertRemToPx(1.51)).toBe("24px");
  });

  test("uses ONE_REM_IN_PX as conversion base", () => {
    expect(convertRemToPx(1)).toBe(`${ONE_REM_IN_PX}px`);
  });
});
