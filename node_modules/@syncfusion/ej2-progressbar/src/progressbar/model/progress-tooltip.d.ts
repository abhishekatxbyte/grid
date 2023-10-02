import { ProgressBar } from '../progressbar';
/**
 * class for tooltip.
 */
export declare class ProgressTooltip {
    private control;
    /**
     * Constructor for progress tooltip.
     *
     * @param {ProgressBar} control
     */
    constructor(control: ProgressBar);
    private text;
    private svgTooltip;
    private textFormat;
    isRendered: boolean;
    private fadeInInterval;
    /**
     * Method to render the tooltip for progress bar.
     */
    tooltip(e?: PointerEvent | TouchEvent): void;
    /**
     * Function to delay tooltip at initial stage of circular progress.
     */
    private tooltipDelay;
    /**
     * Function to animate tooltip.
     */
    private toolTipAnimation;
    private renderTooltip;
    /**
     * Function to get format of tooltip text.
     */
    private format;
    /**
     * Function to remove tooltip.
     */
    removeTooltip(duration: number): void;
    /**
     * Function to get arguments of tooltip.
     */
    private triggerTooltipRender;
    /**
     * Function to pass arguments into svg tooltip.
     */
    private createTooltip;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
