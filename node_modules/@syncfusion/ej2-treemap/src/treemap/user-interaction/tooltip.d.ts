import { TreeMap } from '../treemap';
/**
 * Render Tooltip
 */
export declare class TreeMapTooltip {
    private treemap;
    private tooltipSettings;
    private svgTooltip;
    private isTouch;
    private tooltipId;
    private clearTimeout;
    constructor(treeMap: TreeMap);
    renderTooltip(e: PointerEvent): void;
    private addTooltip;
    mouseUpHandler(e: PointerEvent): void;
    removeTooltip(): void;
    /**
     * To bind events for tooltip module
     * @private
     */
    addEventListener(): void;
    /**
     * To unbind events for tooltip module
     * @private
     */
    removeEventListener(): void;
    /**
     * Get module name.
     *
     * @returns {string} returns string
     */
    protected getModuleName(): string;
    /**
     * To destroy the tooltip.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
