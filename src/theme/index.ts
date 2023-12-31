import { createTheme as createMuiTheme } from "@mui/material";

import { createComponents } from "src/theme/create-components";
import createPalette from "src/theme/create-palette";
import { createShadows } from "src/theme/create-shadows";
import { createTypography } from "src/theme/create-typography";

export function createTheme() {
  const palette = createPalette();
  const components = createComponents({ palette });
  const shadows = createShadows();
  const typography = createTypography();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    // @ts-expect-error Until the theme setup is properly typed
    components,
    palette,
    // @ts-expect-error Until the theme setup is properly typed
    shadows,
    shape: {
      borderRadius: 8,
    },
    // @ts-expect-error Until the theme setup is properly typed
    typography,
  });
}
