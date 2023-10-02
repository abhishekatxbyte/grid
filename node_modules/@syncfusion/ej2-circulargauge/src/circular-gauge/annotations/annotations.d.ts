import { CircularGauge } from '../circular-gauge';
import { Axis } from '../axes/axis';
/**
 * Annotation Module handles the Annotation of the axis.
 *
 * @hidden
 */
export declare class Annotations {
    /**
     * Constructor for Annotation module.
     *
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @private.
     */
    constructor(gauge: CircularGauge);
    /**
     * Method to render the annotation for circular gauge.
     *
     * @private
     */
    renderAnnotation(axis: Axis, index: number, gauge: CircularGauge): void;
    /**
     * Method to create annotation template for circular gauge.
     *
     * @private
     */
    createTemplate(element: HTMLElement, annotationIndex: number, axisIndex: number, gauge: CircularGauge): void;
    /**
     * Method to update the annotation location for circular gauge.
     *
     * @param {HTMLElement} element - Specifies the element.
     * @param {Axis} axis - Specifies the axis.
     * @param {Annotation} annotation - Specifies the annotation.
     * @returns {void}
     */
    private updateLocation;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
    /**
     * Function to measure the element rect.
     *
     * @param {HTMLElement} element - Specifies the html element.
     * @returns {ClientRect} - Returns the client rect.
     * @private
     */
    private measureElementRect;
}
