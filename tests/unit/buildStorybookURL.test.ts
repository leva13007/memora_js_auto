import { describe, expect, test } from "vitest";
import { buildStorybookURL } from "../../src/utils/buildStorybookURL";
import { Theme } from "../../src/config/types";

describe("buildStorybookURL", () => {
  test("builds URL with required parameters only", () => {
    const result = buildStorybookURL("ui-atoms-h1--default", Theme.LIGHT);

    expect(result).toBe(
      "iframe.html?viewMode=story&id=ui-atoms-h1--default&globals=theme:light",
    );
  });

  test("builds URL with args", () => {
    const result = buildStorybookURL("ui-atoms-h1--default", Theme.DARK, {
      content: "Default H1",
      "data-testid": "test_h1",
    });

    expect(result).toBe(
      "iframe.html?viewMode=story&id=ui-atoms-h1--default&globals=theme:dark&args=content:Default H1;data-testid:test_h1",
    );
  });

  test("throws when id is missing", () => {
    expect(() => buildStorybookURL("", Theme.LIGHT)).toThrow(
      "The id parameter is required to build the Storybook URL.",
    );
  });

  test("throws when theme is missing", () => {
    expect(() =>
      buildStorybookURL(
        "ui-atoms-h1--default",
        undefined as unknown as Theme,
      ),
    ).toThrow("The theme parameter is required to build the Storybook URL.");
  });
});
