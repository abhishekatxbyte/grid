import { LinearGauge } from '../../linear-gauge';
/**
 * Represent the Annotation rendering for gauge
 *
 * @hidden
 */
export declare class Annotations {
    constructor();
    /**
     * To render annotation elements.
     *
     * @param {LinearGauge} gauge - Specifies the instance of Linear Gauge.
     *
     * @private
     */
    renderAnnotationElements(gauge: LinearGauge): void;
    /**
     * To create annotation elements
     *
     * @param {HTMLElement} element - Specifies the content of the annotation to be updated in it.
     * @param {number} annotationIndex - Specifies the index number of the annotation in which the content is to be changed.
     * @param {LinearGauge} gauge - Specifies the instance of Linear Gauge.
     *
     * @private
     */
    createAnnotationTemplate(element: HTMLElement, annotationIndex: number, gauge: LinearGauge): void;
    protected getModuleName(): string;
    /**
     * To destroy the annotation.
     *
     * @return {void}
     * @private
     */
    destroy(): void;
}
