import { TreeMap } from '../treemap';
import { ColorMappingModel } from '../model/base-model';
import { Rect } from '../utils/helper';
/**
 * Legend module class
 */
export declare class TreeMapLegend {
    private treemap;
    /** collection of rendering legends */
    /** @private */
    legendRenderingCollections: any[];
    /** collection of legends */
    /** @private */
    legendCollections: any[];
    /** @private */
    outOfRangeLegend: any;
    private legendHeight;
    private legendWidth;
    private totalPages;
    private page;
    private translate;
    /** @private */
    legendBorderRect: Rect;
    private currentPage;
    /** @private */
    heightIncrement: number;
    /** @private */
    widthIncrement: number;
    private textMaxWidth;
    /** @private */
    legendGroup: Element;
    private legendNames;
    private defsElement;
    private gradientCount;
    private legendLinearGradient;
    private legendInteractiveGradient;
    private clearTimeout;
    private legendItemRect;
    constructor(treemap: TreeMap);
    /**
     * method for legend
     * @private
     */
    renderLegend(): void;
    /** @private */
    calculateLegendBounds(): void;
    private getPageChanged;
    private findColorMappingLegendItems;
    private findPaletteLegendItems;
    private calculateLegendItems;
    private removeDuplicates;
    private isAddNewLegendData;
    /**
     * To draw the legend
     * @private
     */
    drawLegend(): void;
    private defaultLegendRtlLocation;
    private drawLegendItem;
    private renderLegendBorder;
    private renderLegendTitle;
    /**
     * To rendered the interactive pointer
     *
     * @param {PointerEvent | TouchEvent} e - Specifies the pointer argument.
     * @returns {void}
     * @private
     */
    renderInteractivePointer(e: PointerEvent | TouchEvent): void;
    private drawInteractivePointer;
    private getLegendAlignment;
    /** @private */
    mouseUpHandler(e: PointerEvent): void;
    /**
     * To remove the interactive pointer
     * @private
     */
    removeInteractivePointer(): void;
    /**
     * To change the next page
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    changeNextPage(e: PointerEvent): void;
    /**
     * Wire events for event handler
     *
     * @param {Element} element - Specifies the element.
     * @returns {void}
     * @private
     */
    wireEvents(element: Element): void;
    /**
     * To add the event listener
     * @private
     */
    addEventListener(): void;
    /**
     * To remove the event listener
     * @private
     */
    removeEventListener(): void;
    /**
     * Get module name.
     *
     * @returns {string} Returns the legend module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the legend.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
    /**
     * Get the gradient color for interactive legend.
     *
     * @param {ColorMappingModel} colorMap - Specifies the color mapping instance.
     * @param {number} legendIndex - Specifies the index of legend.
     * @returns {string} - Returns the legend color.
     * @private
     */
    legendGradientColor(colorMap: ColorMappingModel, legendIndex: number): string;
}
