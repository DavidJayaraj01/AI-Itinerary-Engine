// Theme constants with black, white, and red color scheme
export const COLORS = {
  // Primary colors
  primary: '#FF3B30',      // Red
  secondary: '#000000',    // Black
  background: '#FFFFFF',   // White
  
  // Shades
  black: '#000000',
  white: '#FFFFFF',
  red: '#FF3B30',
  darkRed: '#C51D12',
  lightRed: '#FF6B63',
  
  // Grays
  gray: '#8E8E93',
  lightGray: '#F2F2F7',
  mediumGray: '#C7C7CC',
  darkGray: '#3A3A3C',
  
  // UI colors
  border: '#E5E5EA',
  placeholder: '#C7C7CC',
  text: '#000000',
  textSecondary: '#8E8E93',
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  
  // Transparent
  overlay: 'rgba(0, 0, 0, 0.5)',
  cardShadow: 'rgba(0, 0, 0, 0.1)',
};

export const SIZES = {
  // App dimensions
  base: 8,
  font: 14,
  radius: 12,
  padding: 16,
  margin: 16,
  
  // Font sizes
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  body: 16,
  small: 14,
  caption: 12,
  
  // Spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Border radius
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 24,
  radiusRound: 999,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  semiBold: 'System',
  light: 'System',
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

const theme = { COLORS, SIZES, FONTS, SHADOWS };

export default theme;
