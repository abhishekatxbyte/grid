import { LinearGauge } from '../../index';
/**
 * Represent the print and export for gauge.
 *
 * @hidden
 */
export declare class Print {
    /**
     * Constructor for gauge
     *
     * @param {LinearGauge} control - Specifies the linear gauge instance.
     */
    constructor(control: LinearGauge);
    /**
     * To print the gauge
     *
     * @param elements
     * @private
     */
    print(gauge: LinearGauge, elements?: string[] | string | Element): void;
    /**
     * To get the html string of the gauge
     *
     * @param elements
     * @private
     */
    private getHTMLContent;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the print.
     *
     * @return {void}
     * @private
     */
    destroy(): void;
}
