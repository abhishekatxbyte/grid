import { CircularGauge } from '../../index';
/**
 * Represent the print for gauge
 *
 * @hidden
 */
export declare class Print {
    /**
     * Constructor for gauge
     *
     * @param {CircularGauge} control - Specifies the instance of the gauge.
     */
    constructor(control: CircularGauge);
    /**
     * To print the gauge
     *
     * @param {CircularGauge} gauge - Specifies the instance of Circular Gauge.
     * @param {string[] | string | Element} elements - Specifies the element.
     * @returns {void}
     * @private
     */
    print(gauge: CircularGauge, elements?: string[] | string | Element): void;
    /**
     * To get the html string of the gauge
     *
     * @param {CircularGauge} gauge - Specifies the instance of Circular Gauge.
     * @param { string[] | string | Element} elements - Specifies the element.
     * @returns {Element} - Returns the div element.
     * @private
     */
    getHTMLContent(gauge: CircularGauge, elements?: string[] | string | Element): Element;
    protected getModuleName(): string;
    /**
     * To destroy the Print.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
