import { LinearGauge } from '../../linear-gauge';
import { Axis, Pointer } from './axis';
/**
 * To calculate the overall axis bounds for gauge.
 *
 * @private
 */
export declare class AxisLayoutPanel {
    private gauge;
    private axisRenderer;
    constructor(gauge: LinearGauge);
    /**
     * To calculate the axis bounds
     */
    calculateAxesBounds(): void;
    /**
     * Calculate axis line bounds
     *
     * @param axis
     * @param axisIndex
     */
    calculateLineBounds(axis: Axis, axisIndex: number): void;
    /**
     * Calculate axis tick bounds
     *
     * @param axis
     */
    calculateTickBounds(axis: Axis): void;
    /**
     * To Calculate axis label bounds
     *
     * @param axis
     */
    calculateLabelBounds(axis: Axis): void;
    /**
     * Calculate pointer bounds
     *
     * @param {Axis} axis - Specifies the axis.
     * @returns {void}
     */
    calculatePointerBounds(axis: Axis): void;
    /**
     * Calculate marker pointer bounds
     *
     * @param axis
     * @param pointer
     */
    calculateMarkerBounds(axis: Axis, pointer: Pointer): void;
    /**
     * Calculate bar pointer bounds
     *
     * @param axisIndex
     * @param axis
     * @param pointerIndex
     * @param pointer
     */
    calculateBarBounds(axis: Axis, pointer: Pointer): void;
    /**
     * Calculate ranges bounds
     *
     * @param axis
     * @param axisIndex
     */
    calculateRangesBounds(axis: Axis): void;
    private checkPreviousAxes;
    /**
     *
     * @param {Axis} axis - Specifies the axis to which labels are to be rendered.
     * @returns {void}
     */
    calculateVisibleLabels(axis: Axis): void;
    /**
     * Calculate maximum label width for the axis.
     *
     * @param {Axis} axis - Specifies the axis to which the labels are to be rendered.
     * @return {void}
     * @private
     */
    private getMaxLabelWidth;
    private checkThermometer;
    /**
     * @private
     */
    destroy(): void;
}
