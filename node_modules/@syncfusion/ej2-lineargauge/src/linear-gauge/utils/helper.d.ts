import { FontModel, BorderModel } from '../model/base-model';
import { AxisModel } from '../axes/axis-model';
import { IVisiblePointer } from '../model/interface';
import { Axis, Pointer, Range } from '../axes/axis';
import { Orientation, MarkerType, LinearGaugeTheme } from './enum';
import { LinearGauge } from '../../linear-gauge';
import { ExportType } from '../utils/enum';
/**
 * Specifies Linear-Gauge Helper methods
 */
/** @private */
export declare function stringToNumber(value: string, containerSize: number): number;
/** @private */
export declare function stringToNumberSize(value: string, containerSize: number): number;
/**
 * Function to measure the height and width of the text.
 *
 * @param  {string} text - Specifies the text to be measured.
 * @param  {FontModel} font - Specifies the font of the text.
 * @returns {Size} Returns the size of the text.
 * @private
 */
export declare function measureText(text: string, font: FontModel): Size;
/**
 * Trim the title text
 *
 * @private
 *
 */
export declare function textTrim(maxWidth: number, text: string, font: FontModel): string;
/** @private */
export declare function withInRange(value: number, start: number, end: number, max: number, min: number, type: string): boolean;
export declare function convertPixelToValue(parentElement: HTMLElement, pointerElement: Element, orientation: Orientation, axis: Axis, type: string, location: GaugeLocation): number;
export declare function getPathToRect(path: SVGPathElement, size: Size, parentElement: HTMLElement): Rect;
/** @private */
export declare function getElement(id: string): HTMLElement;
/** @private */
export declare function removeElement(id: string): void;
/** @private */
export declare function isPointerDrag(axes: AxisModel[]): boolean;
/** @private */
export declare function valueToCoefficient(value: number, axis: Axis, orientation: Orientation, range: VisibleRange): number;
export declare function getFontStyle(font: FontModel): string;
export declare function textFormatter(format: string, data: any, gauge: LinearGauge): string;
export declare function formatValue(value: number, gauge: LinearGauge): string | number;
/** @private */
export declare function getLabelFormat(format: string): string;
/** @private */
export declare function getTemplateFunction(template: string | Function, gauge: LinearGauge): any;
/** @private */
export declare function getElementOffset(childElement: HTMLElement, parentElement: HTMLElement): Size;
/**
 * To trigger the download element
 *
 * @param {string} fileName - Specifies the name of the exported file.
 * @param {ExportType} type - Specifies the extension type of the file to which the Linear Gauge must be exported.
 * @param {string} url - Specifies the blob URL of the exported file of Linear Gauge.
 * @param {boolean} isDownload - Specifies whether the exported file must be downloaded or not.
 * @private
 */
export declare function triggerDownload(fileName: string, type: ExportType, url: string, isDownload: boolean): void;
/** @private */
export declare class VisibleRange {
    min?: number;
    max?: number;
    interval?: number;
    delta?: number;
    constructor(min: number, max: number, interval: number, delta: number);
}
/**
 * Specifies the location of the element in the linear gauge.
 */
export declare class GaugeLocation {
    /**
     * Specifies the x position of the location in pixels.
     */
    x: number;
    /**
     * Specifies the y position of the location in pixels.
     */
    y: number;
    constructor(x: number, y: number);
}
/**
 * Specifies the size information of an element.
 */
export declare class Size {
    /**
     * Specifies the height of an element.
     */
    height: number;
    /**
     * Specifies the width of an element.
     */
    width: number;
    constructor(width: number, height: number);
}
/** @private */
export declare class Rect {
    x: number;
    y: number;
    height: number;
    width: number;
    constructor(x: number, y: number, width: number, height: number);
}
/** @private */
export declare class CustomizeOption {
    id: string;
    constructor(id?: string);
}
/** @private */
export declare class PathOption extends CustomizeOption {
    opacity: number;
    fill: string;
    stroke: string;
    ['stroke-width']: number;
    ['stroke-dasharray']: string;
    d: string;
    transform: string;
    cx: number;
    cy: number;
    r: number;
    constructor(id: string, fill: string, width: number, color: string, opacity?: number, dashArray?: string, d?: string, transform?: string);
}
/** @private */
export declare class RectOption {
    x: number;
    y: number;
    id: string;
    height: number;
    width: number;
    rx: number;
    ry: number;
    opacity: number;
    transform: string;
    stroke: string;
    fill: string;
    ['stroke-width']: number;
    ['stroke-dasharray']: string;
    constructor(id: string, fill: string, border: BorderModel, opacity: number, rect: Rect);
}
/** @private */
export declare class TextOption extends CustomizeOption {
    anchor: string;
    text: string;
    transform: string;
    x: number;
    y: number;
    baseLine: string;
    constructor(id?: string, x?: number, y?: number, anchor?: string, text?: string, transform?: string, baseLine?: string);
}
/** @private */
export declare class VisibleLabels {
    text: string;
    value: number;
    size: Size;
    x?: number;
    y?: number;
    angle: number;
    constructor(text: string, value: number, size: Size, x?: number, y?: number);
}
/** @private */
export declare class Align {
    axisIndex: number;
    align: string;
    constructor(axisIndex: number, align: string);
}
/** @private */
export declare function textElement(options: TextOption, font: FontModel, color: string, parent: HTMLElement | Element): Element;
export declare function calculateNiceInterval(min: number, max: number, size: number, orientation: Orientation): number;
export declare function getActualDesiredIntervalsCount(size: number, orientation: Orientation): number;
/** @private */
export declare function getPointer(target: HTMLElement, gauge: LinearGauge): IVisiblePointer;
/** @private */
export declare function getRangeColor(value: number, ranges: Range[]): string;
/**
 * Function to get the mouse position
 *
 * @param {number} pageX - Specifies the horizontal position of the click event.
 * @param {number} pageY - Specifies the vertical position of the click event.
 * @param {number} element - Specifies the target element of the client event.
 * @private
 */
export declare function getMousePosition(pageX: number, pageY: number, element: Element): GaugeLocation;
/** @private */
export declare function getRangePalette(theme: LinearGaugeTheme): string[];
/** @private */
export declare function calculateShapes(location: Rect, shape: MarkerType, size: Size, url: string, options: PathOption, orientation: Orientation, axis: Axis, pointer: Pointer): PathOption;
/** @private */
export declare function getBox(location: Rect, boxName: string, orientation: Orientation, size: Size, type: string, containerWidth: number, axis: Axis, cornerRadius: number): string;
/** @private */
export declare function getExtraWidth(gaugeElement: HTMLElement): number;
