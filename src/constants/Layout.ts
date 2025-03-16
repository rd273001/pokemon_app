import { Dimensions, Platform, PixelRatio } from 'react-native';

// Get device dimensions
export const { width, height } = Dimensions.get('window');

// Base dimensions
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Calculate scaling ratios
const widthScale = width / BASE_WIDTH;
const heightScale = height / BASE_HEIGHT;

/**
 * Scale a size based on device width compared to base design width
 * @param {number} size - Size in pixels based on BASE_WIDTH design
 * @return {number} - Scaled size
 */
export const scale = (size: number) => {
  return Math.round(size * widthScale);
};

/**
 * Scale a size based on device height compared to base design height
 * @param {number} size - Size in pixels based on BASE_HEIGHT design
 * @return {number} - Scaled size
 */
export const verticalScale = (size: number) => {
  return Math.round(size * heightScale);
};

/**
 * Moderate scale provides a more subtle scaling - useful for fine adjustments
 * It scales more aggressively at smaller sizes and less at larger sizes
 * @param {number} size - Size in pixels based on BASE_WIDTH design
 * @param {number} factor - Factor to modify the scaling effect (default 0.5)
 * @return {number} - Scaled size
 */
export const moderateScale = (size: number, factor = 0.5) => {
  return Math.round(size + (scale(size) - size) * factor);
};

/**
 * Normalize font size across different device screen densities
 * @param {number} size - Font size
 * @return {number} - Normalized font size
 */
export const scaleFont = ( size: number ) => {
  const newSize = size * widthScale;

  if ( Platform.OS === 'ios' ) {
    return Math.round( PixelRatio.roundToNearestPixel( newSize ) );
  } else {
    return Math.round( PixelRatio.roundToNearestPixel( newSize ) ) - 2;
  }
};