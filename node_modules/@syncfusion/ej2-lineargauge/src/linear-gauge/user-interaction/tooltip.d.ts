import { LinearGauge } from '../../linear-gauge';
/**
 * Represent the tooltip rendering for gauge
 *
 * @hidden
 */
export declare class GaugeTooltip {
    private gauge;
    private element;
    private currentAxis;
    private axisIndex;
    private currentPointer;
    private currentRange;
    private isTouch;
    private svgTooltip;
    private textStyle;
    private borderStyle;
    private pointerElement;
    private tooltip;
    private clearTimeout;
    private tooltipId;
    constructor(gauge: LinearGauge);
    /**
     * Internal use for tooltip rendering
     *
     * @param {PointerEvent} e - Specifies the pointer event argument
     * @private
     */
    renderTooltip(e: PointerEvent): void;
    private tooltipRender;
    private tooltipCreate;
    private svgCreate;
    private getTooltipPosition;
    private getTooltipLocation;
    removeTooltip(): void;
    mouseUpHandler(e: PointerEvent): void;
    /**
     * To bind events for tooltip module
     *
     * @private
     */
    addEventListener(): void;
    /**
     * To unbind events for tooltip module
     *
     * @private
     */
    removeEventListener(): void;
    protected getModuleName(): string;
    /**
     *
     * @return {void}
     * @private
     */
    destroy(): void;
}
