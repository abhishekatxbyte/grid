/**
 * Specifies Circular-Gauge Tooltip Helper methods
 */
import { GaugeLocation, Size } from './helper-common';
import { CircularGauge } from '../circular-gauge';
/**
 * Function to get the mouse position
 *
 * @param {number} pageX - Specifies the pageX value.
 * @param {number} pageY - Specifies the pageY value.
 * @param {Element} element - Specifies the element.
 * @returns {GaugeLocation} - Returns the location.
 *
 * @private
 */
export declare function getMousePosition(pageX: number, pageY: number, element: Element): GaugeLocation;
/**
 * function to get the size of the element.
 *
 * @param {string} template - Specifies the template element.
 * @param {CircularGauge} gauge - Specifies the gauge instance.
 * @param {HTMLElement} parent - specifies the element.
 * @returns {Size} - Return the size of the element
 *
 * @private
 */
export declare function getElementSize(template: string | Function, gauge: CircularGauge, parent: HTMLElement): Size;
