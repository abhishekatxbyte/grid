/**
 * Gauge Themes doc
 */
import { IThemeStyle } from './interface';
import { LinearGaugeTheme } from '../utils/enum';
/**
 *
 * @param {LinearGaugeTheme} theme - Specifies the gauge instance.
 * @returns {IThemeStyle} - Return the theme style argument.
 * @private
 */
export declare function getThemeStyle(theme: LinearGaugeTheme): IThemeStyle;
