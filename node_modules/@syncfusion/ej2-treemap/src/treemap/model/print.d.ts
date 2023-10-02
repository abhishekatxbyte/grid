import { TreeMap } from '../../index';
/**
 * Print module handles the print functionality for treemap.
 *
 * @hidden
 */
export declare class Print {
    /**
     * Constructor for Maps
     *
     * @param {TreeMap} control - Specifies the treemap instance.
     */
    constructor(control: TreeMap);
    /**
     * This method is used to perform the print functionality in treemap.
     *
     * @param {TreeMap} treeMap - Specifies the treemap instance.
     * @param { string[] | string | Element} elements - Specifies the element.
     * @returns {void}
     * @private
     */
    print(treeMap: TreeMap, elements?: string[] | string | Element): void;
    /**
     * To get the html string of the Maps
     *
     * @param {TreeMap} treeMap - Specifies the treemap instance.
     * @param {string[] | string | Element} elements - Specifies the element
     * @returns {Element} - Returns the element
     * @private
     */
    getHTMLContent(treeMap: TreeMap, elements?: string[] | string | Element): Element;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the Print module.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
