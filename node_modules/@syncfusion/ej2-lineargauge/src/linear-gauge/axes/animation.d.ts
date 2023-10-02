import { LinearGauge } from '../../linear-gauge';
import { Axis, Pointer } from './axis';
/**
 * To handle the animation for gauge
 *
 * @private
 */
export declare class Animations {
    gauge: LinearGauge;
    constructor(gauge: LinearGauge);
    /**
     * To do the marker pointer animation.
     *
     * @param element - Specifies the element of the marker pointer to which animation must be propagated.
     * @param axis - Specifies the axis in which the marker pointer is available to which animation must be propagated.
     * @param pointer - Specifies the pointer to which the animation must be propagated.
     */
    performMarkerAnimation(element: Element, axis: Axis, pointer: Pointer): void;
    /**
     * Perform the bar pointer animation
     *
     * @param element
     * @param axis
     * @param pointer
     */
    performBarAnimation(element: Element, axis: Axis, pointer: Pointer): void;
}
