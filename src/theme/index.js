import { createTheme } from '@material-ui/core/styles';

const palette = {
  type: 'dark',
  primary: {
    main: '#0F1015',
    dark: '#000000',
    light: 'rgba(255, 255, 255, 0.1)',
    lighter: '#191919',
    moreLighter: 'rgba(255, 255, 255, 0.12)',
    contrastText: '#FFF',
    textPlaceholder: '#8e8e8e',
  },
  secondary: {
    main: '#2390DF'
  },
  accent: {
    main: '#343238',
    light: 'rgba(255, 255, 255, 0.2)',
  },
  text: {
    caption: 'rgba(255, 255, 255, 0.8)',
  }
}

const typography = {
  fontFamily: 'Inter',
  h2: {
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '29px'
  },
  body1: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
  },
  body2: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '17px',
  },
  caption: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '17px',
  },
  title1: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '15px',
  },
  button: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
  },
  smallButton: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '17px',
  },
};

const theme = createTheme({
  palette,
  typography,
  props: {
    MuiButton: {
      variant: "contained",
      color: "secondary"
    },
    MuiTextField: {
      fullWidth: true,
      InputProps: {
        disableUnderline: true, style: {
          padding: '10px 12px',
          borderRadius: '6px',
          backgroundColor: palette.primary.lighter,
          ...typography.caption,
        },

      }
    },
    MuiSelect: {
      disableUnderline: true,
    },
    MuiCheckbox: {
      disableRipple: true
    }

  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': 'Inter',

      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        padding: '14.5px 24.5px',
        borderRadius: '8px'
      },
    },
    MuiTextField: {

    },
    MuiInput: {
      input: {
        padding: '0px',
        ['&::placeholder']: {
          color: palette.primary.textPlaceholder
        }
      }
    },
    MuiFormControlLabel: {
      root: {
        marginRight: '0px',
        marginLeft: '0px'
      },
      label: {
        ...typography.caption,
        color: palette.text.caption,
      }
    },
    MuiCheckbox: {
      input: {
      }
    },
    MuiSelect: {
      select: {
        padding: '10px 12px',
        disableUnderline: true,
        padding: '10px 12px',
        borderRadius: '6px',
        backgroundColor: palette.primary.lighter,
        ...typography.caption,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: palette.primary.lighter
      }
    }
  }
});




export { theme };