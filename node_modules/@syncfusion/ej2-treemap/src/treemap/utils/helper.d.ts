import { BorderModel, FontModel, ColorMappingModel } from '../model/base-model';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { Alignment, LabelPosition } from '../utils/enum';
import { TreeMap } from '../treemap';
import { IShapes } from '../model/interface';
import { ExportType } from '../utils/enum';
/**
 * Specifies the size parameters.
 */
export declare class Size {
    /**
     * Defines the height in the size object.
     */
    height: number;
    /**
     * Defines the width in the size object.
     */
    width: number;
    constructor(width: number, height: number);
}
/**
 *
 * @param {string} value - specifies the text.
 * @param {number} containerSize - specifies the container size value.
 * @returns {number} - Returns the number value which is converted from string.
 */
export declare function stringToNumber(value: string, containerSize: number): number;
/**
 * Internal use of type rect
 *
 * @private
 */
export declare class Rect {
    x: number;
    y: number;
    height: number;
    width: number;
    constructor(x: number, y: number, width: number, height: number);
}
/**
 * Internal use of rectangle options
 *
 * @private
 */
export declare class RectOption {
    id: string;
    fill: string;
    x: number;
    y: number;
    height: number;
    width: number;
    opacity: number;
    stroke: string;
    ['stroke-width']: number;
    ['stroke-dasharray']: string;
    constructor(id: string, fill: string, border: BorderModel, opacity: number, rect: Rect, dashArray?: string);
}
export declare class PathOption {
    id: string;
    opacity: number;
    fill: string;
    stroke: string;
    ['stroke-width']: number;
    ['stroke-dasharray']: string;
    d: string;
    constructor(id: string, fill: string, width: number, color: string, opacity?: number, dashArray?: string, d?: string);
}
/**
 * Function to measure the height and width of the text.
 *
 * @param  {string} text - Specifies the text.
 * @param  {FontModel} font - Specifies the font.
 * @returns {Size} - Returns the size.
 * @private
 */
export declare function measureText(text: string, font: FontModel): Size;
/**
 * Internal use of text options
 *
 * @private
 */
export declare class TextOption {
    anchor: string;
    id: string;
    transform: string;
    x: number;
    y: number;
    text: string | string[];
    baseLine: string;
    connectorText: string;
    constructor(id?: string, x?: number, y?: number, anchor?: string, text?: string | string[], transform?: string, baseLine?: string, connectorText?: string);
}
/**
 * Trim the title text
 *
 * @param {number} maxWidth - Specifies the maximum width
 * @param {string} text - Specifies the text
 * @param {FontModel} font - Specifies the font
 * @returns {string} - Returns the string
 * @private
 */
export declare function textTrim(maxWidth: number, text: string, font: FontModel): string;
/**
 * Specifies the location parameters.
 */
export declare class Location {
    /**
     * Defines the horizontal position.
     */
    x: number;
    /**
     * Defines the vertical position.
     */
    y: number;
    constructor(x: number, y: number);
}
/**
 * Method to calculate x position of title
 *
 * @param {Rect} location - Specifies the location of text.
 * @param {Alignment} alignment - Specifies the alignment of the text.
 * @param {Size} textSize - Specifies the size of the text.
 * @param {type} type - Specifies whether the provided text is title or subtitle.
 * @returns {Location} - Returns the location of text.
 * @private
 */
export declare function findPosition(location: Rect, alignment: Alignment, textSize: Size, type: string): Location;
/**
 *
 * @param {SvgRenderer} renderer - Specifies the rendering element of the SVG.
 * @param {any} renderOptions - Specifies the settings of the text.
 * @param {string} text - Specifies the text.
 * @returns {HTMLElement} - Returns the HTML element for the text.
 */
export declare function createTextStyle(renderer: SvgRenderer, renderOptions: any, text: string): HTMLElement;
/**
 * Internal rendering of text
 *
 * @param {TextOption} options - Specifies the text option
 * @param {FontModel} font - Specifies the font model
 * @param {string} color - Specifies the color
 * @param {HTMLElement | Element} parent - Specifies the parent element of the text
 * @param {boolean} isMinus - Specifies the boolean value
 * @returns {Element} - Returns the element
 * @private
 */
export declare function renderTextElement(options: TextOption, font: FontModel, color: string, parent: HTMLElement | Element, isMinus?: boolean): Element;
/**
 *
 * @param {string} targetId - Specifies the id of the element to which template is to be appended.
 * @param {Element} targetElement - Specifies the element to which template is to be appended.
 * @param {string} contentItemTemplate - Specifies the content to be appended as template.
 * @returns {void}
 */
export declare function setItemTemplateContent(targetId: string, targetElement: Element, contentItemTemplate: string): void;
/**
 *
 * @param {string} id - Specifies the id of the element.
 * @returns {Element} - Returns the element.
 */
export declare function getElement(id: string): Element;
/**
 *
 * @param {any} a - Specifies the first order of TreeMap leaf elements.
 * @param {any} b - Specifies the second order of TreeMap leaf elements.
 * @returns {number} - Returns the order of the TreeMap leaf element.
 */
export declare function itemsToOrder(a: any, b: any): number;
/**
 *
 * @param {string[]} source - Specifies the data from the data source.
 * @param {string} pathName - Specifies the path name in the data source.
 * @param {any} processData - Specifies the data source object.
 * @param {TreeMap} treemap - Specifies the treemap instance.
 * @returns {boolean} - Specifies whether data is available in the data source or not.
 */
export declare function isContainsData(source: string[], pathName: string, processData: any, treemap: TreeMap): boolean;
/**
 *
 * @param {any} data - Specifies the data to which the children elements to be found.
 * @returns {any} - Returns the children elements of the TreeMap leaf element.
 */
export declare function findChildren(data: any): any;
/**
 *
 * @param {any} data - Specifies the data to which highlight must be done.
 * @param {items} items - Specifies the data source items.
 * @param {string} mode - Specifies the mode of highlight.
 * @param {TreeMap} treeMap - Specifies the treemap instance.
 * @returns {string[]} - Returns the highlighted items.
 */
export declare function findHightLightItems(data: any, items: string[], mode: string, treeMap: TreeMap): string[];
/**
 * Function to compile the template function for maps.
 *
 * @param {string} template - Specifies the template
 * @returns {Function} - Returns the template function
 * @private
 */
export declare function getTemplateFunction(template: string | Function): any;
/**
 * @private
 * @param {HTMLCollection} element - Specifies the element
 * @param {string} labelId - Specifies the label id
 * @param {Object} data - Specifies the data
 * @returns {HTMLElement} - Returns the element
 */
export declare function convertElement(element: HTMLCollection, labelId: string, data: any): HTMLElement;
/**
 *
 * @param {Rect} rect - Specifies the area.
 * @param {LabelPosition} position - Specifies the position
 * @param {Size} labelSize - Specifies the label size.
 * @param {string} type - Specifies the type.
 * @param {TreeMap} treemap - Specifies the treemap instance.
 * @returns {Location} - Returns the text location.
 */
export declare function findLabelLocation(rect: Rect, position: LabelPosition, labelSize: Size, type: string, treemap: TreeMap): Location;
/**
 *
 * @param {HTMLElement} element - Specifies the element to be measured.
 * @param {HTMLElement} parentElement - Specifies the parent element of the element to be measured.
 * @returns {Size} - Returns the element size.
 */
export declare function measureElement(element: HTMLElement, parentElement: HTMLElement): Size;
/**
 *
 * @param {Rect} rect - Specifies the area.
 * @returns {number} - Returns the area width.
 */
export declare function getArea(rect: Rect): number;
/**
 *
 * @param {Rect} input - Specifies input for the calculation.
 * @returns {number} - Returns the shortest edge.
 */
export declare function getShortestEdge(input: Rect): number;
/**
 *
 * @param {Rect} rect - Specifies the rectangle bounds of the container.
 * @returns {Rect} - Returns the rectangle bounds.
 */
export declare function convertToContainer(rect: Rect): Rect;
/**
 *
 * @param {Rect} container - Specifies the rectangle bounds of the container.
 * @returns {Rect} - Returns the rectangle bounds.
 */
export declare function convertToRect(container: Rect): Rect;
/**
 *
 * @param {number} pageX - Specifies the horizontal position of the mouse location.
 * @param {number} pageY - Specifies the vertical position of the mouse location.
 * @param {Element} element - Specifies the element to which the click is done.
 * @returns {Location} - Returns the clicked location.
 */
export declare function getMousePosition(pageX: number, pageY: number, element: Element): Location;
/**
 *
 * @param {ColorMappingModel[]} colorMapping - Specifies the color mapping instance.
 * @param {string} equalValue - Specifies the equal value.
 * @param {number | string} value - Specifies the range value.
 * @returns {any} - Returns the color mapping object.
 * @private
 */
export declare function colorMap(colorMapping: ColorMappingModel[], equalValue: string, value: number | string): any;
/**
 *
 * @param {ColorMappingModel} colorMapping - Specifies the color mapping object.
 * @param {number} rangeValue - Specifies the range value.
 * @returns {string} - Returns the opacity for the color mapping.
 * @private
 */
export declare function deSaturationColor(colorMapping: ColorMappingModel, rangeValue: number): string;
/**
 *
 * @param {ColorMappingModel} colorMap - Specifies the color mapping object.
 * @param {number} value - Specifies the range value.
 * @returns {string} - Returns the fill color.
 */
export declare function colorCollections(colorMap: ColorMappingModel, value: number): string;
/**
 *
 * @param {number} r - Specifies the red color value.
 * @param {number} g - Specifies the green color value.
 * @param {number} b - Specifies the blue color value.
 * @returns {string} - Returns the fill color.
 */
export declare function rgbToHex(r: number, g: number, b: number): string;
/**
 *
 * @param {ColorMappingModel} colorMap - Specifies the color mapping.
 * @param {number} value - Specifies the range value.
 * @returns {string} - Returns the fill color.
 */
export declare function getColorByValue(colorMap: ColorMappingModel, value: number): string;
/**
 *
 * @param {number} value - Specifies the range value.
 * @param {ColorMappingModel} colorMap - Specifies the color mapping.
 * @returns {ColorValue} - Returns the color value object.
 */
export declare function getGradientColor(value: number, colorMap: ColorMappingModel): ColorValue;
/**
 *
 * @param {number} percent - Specifies the percentage of the color.
 * @param {number} previous - Specifies the previous color.
 * @param {number} next - Specifies the next color.
 * @returns {ColorValue} - Returns the color value object.
 */
export declare function getPercentageColor(percent: number, previous: string, next: string): ColorValue;
/**
 *
 * @param {number} percent - Specifies the percentage of the color.
 * @param {number} previous - Specifies the previous color.
 * @param {number} next - Specifies the next color.
 * @returns {number} - Returns the color value.
 */
export declare function getPercentage(percent: number, previous: number, next: number): number;
/**
 *
 * @param {number} maximumWidth - Specifies the length of the text.
 * @param {string} dataLabel - Specifies the label.
 * @param {FontModel} font - Specifies the font of the label.
 * @returns {string[]} - Returns the labels.
 */
export declare function wordWrap(maximumWidth: number, dataLabel: string, font: FontModel): string[];
/**
 *
 * @param {number} maxWidth - Specifies the length of the text.
 * @param {string} label - Specifies the label.
 * @param {FontModel} font - Specifies the font of the label.
 * @returns {string[]} - Returns the labels.
 */
export declare function textWrap(maxWidth: number, label: string, font: FontModel): string[];
/**
 * hide function
 *
 * @param {number} maxWidth - Specifies the maximum width.
 * @param {number} maxHeight - Specifies the maximum height.
 * @param {string} text - Specifies the text.
 * @param {FontModel} font - Specifies the font.
 * @returns {string} - Returns the hidden text.
 * @private
 */
export declare function hide(maxWidth: number, maxHeight: number, text: string, font: FontModel): string;
/**
 *
 * @param {number} a - Specifies the first value of the leaf.
 * @param {number} b - Specifies the second value of the leaf.
 * @returns {number} - Returns whether values are equal or not.
 */
export declare function orderByArea(a: number, b: number): number;
/**
 *
 * @param {TreeMap} treemap - Specifies the treemap instance.
 * @param {Element} element - Specifies the selected TreeMap leaf item.
 * @param {string} className -Specifies the selected class name.
 * @returns {void}
 */
export declare function maintainSelection(treemap: TreeMap, element: Element, className: string): void;
/**
 *
 * @param {TreeMap} treemap - Specifies the treemap instance.
 * @param {Element} legendGroup - Specifies the selected element.
 * @returns {void}
 */
export declare function legendMaintain(treemap: TreeMap, legendGroup: Element): void;
/**
 *
 * @param {HTMLCollection} elements - Specifies the selected TreeMap element.
 * @param {string} type - Specifies the selection type.
 * @param {TreeMap} treemap - Specifies the TreeMap instance.
 * @returns {void}
 */
export declare function removeClassNames(elements: HTMLCollection, type: string, treemap: TreeMap): void;
/**
 *
 * @param {SVGPathElement} element - Specifies the SVG path element.
 * @param {any} options - Specifies the settings for the SVG path element.
 * @returns {void}
 */
export declare function applyOptions(element: SVGPathElement, options: any): void;
/**
 *
 * @param {string} format - Specifies the format value.
 * @param {any} data - Specifies the data source object.
 * @param {TreeMap} treemap - Specifies the TreeMap instance.
 * @returns {string} - Returns the formatted text.
 */
export declare function textFormatter(format: string, data: any, treemap: TreeMap): string;
/**
 *
 * @param {number} value - Specifies the text to be formatted.
 * @param {TreeMap} treemap - Specifies the TreeMap instance.
 * @returns {string | number} - Returns the formatted text.
 */
export declare function formatValue(value: number, treemap: TreeMap): string | number;
/**
 * @private
 */
export declare class ColorValue {
    r: number;
    g: number;
    b: number;
    constructor(r?: number, g?: number, b?: number);
}
/**
 * @param {ColorValue} value - Specfies the color value
 * @returns {string} - Returns the string
 * @private
 */
export declare function convertToHexCode(value: ColorValue): string;
/**
 * @param {number} value - Specifies the value
 * @returns {string} - Returns the string
 * @private */
export declare function componentToHex(value: number): string;
/**
 * @param {string} hex - Specifies the hex value
 * @returns {ColorValue} - Returns the color value
 * @private
 */
export declare function convertHexToColor(hex: string): ColorValue;
/**
 * @param {string} color - Specifies the color
 * @returns {string} - Returns the string
 * @private
 */
export declare function colorNameToHex(color: string): string;
/**
 * @param {Location} location - Specifies the location
 * @param {string} shape - Specifies the shape
 * @param {Size} size - Specifies the size
 * @param {string} url - Specifies the url
 * @param {PathOption} options - Specifies the options
 * @param {string} label - Specifies the label
 * @returns {Element} - Returns the element
 * @private
 */
export declare function drawSymbol(location: Location, shape: string, size: Size, url: string, options: PathOption, label: string): Element;
/**
 * @param {Location} location - Specifies the location
 * @param {Size} size - Specifies the size
 * @param {string} shape - Specifies the shape
 * @param {PathOption} options - Specifies the path option
 * @param {string} url - Specifies the string
 * @returns {IShapes} - Returns the shapes
 * @private
 */
export declare function renderLegendShape(location: Location, size: Size, shape: string, options: PathOption, url: string): IShapes;
/**
 *
 * @param {any} data - Specifies the data source object.
 * @param {any} item - Specifies the leaf item.
 * @returns {boolean} - Returns whether the TreeMap item is level item or leaf item.
 */
export declare function isParentItem(data: any[], item: any): boolean;
/**
 * Specifies the data to be received through Ajax request for treemap.
 */
export declare class TreeMapAjax {
    /** Defines the options for the data for treemap. */
    dataOptions: string | any;
    /** Defines the type of the data. */
    type: string;
    /** Specifies whether the request is asynchronous or not. */
    async: boolean;
    /** Defines the type of the content. */
    contentType: string;
    /** Defines the data to be sent through the request. */
    sendData: string | any;
    constructor(options: string | any, type?: string, async?: boolean, contentType?: string, sendData?: string | any);
}
/**
 *
 * @param {any[]} collection - Specifies the legend collection.
 * @returns {void}
 * @private
 */
export declare function removeShape(collection: any[]): void;
/**
 *
 * @param {any[]} collection - Specifies the legend collection.
 * @returns {void}
 * @private
 */
export declare function removeLegend(collection: any[]): void;
/**
 *
 * @param {Element} element - Specifies the selected element.
 * @param {string} fill - Specifies the fill color.
 * @param {string} opacity - Specifies the opacity.
 * @param {string} borderColor - Specifies the border color.
 * @param {string} borderWidth - Specifies the border width.
 * @returns {void}
 */
export declare function setColor(element: Element, fill: string, opacity: string, borderColor: string, borderWidth: string): void;
/**
 *
 * @param {any[]} collection - Specifies the selected item collection.
 * @param {any[]} element - Specifies the selected element collection.
 * @param {TreeMap} treemap - Specifies the TreeMap instance.
 * @returns {void}
 */
export declare function removeSelectionWithHighlight(collection: any[], element: any[], treemap: TreeMap): void;
/**
 *
 * @param {number} length - Specifies the length of the legend group.
 * @param {any} item - Specifies the legend item.
 * @param {TreeMap} treemap - Specifies the TreeMap instance.
 * @returns {number} - Returns the legend index.
 */
export declare function getLegendIndex(length: number, item: any, treemap: TreeMap): number;
/**
 *
 * @param {any[]} collection - Specifies the legend collection.
 * @param {number} index - Specifies the index of legend.
 * @param {number} number - Specifies the leaf item index.
 * @param {Element} legendElement - Specifies the legend element.
 * @param {Element} shapeElement - Specifies the shape element.
 * @param {any[]} renderItems - Specifies the item index.
 * @param {any[]} legendCollection - Specifies the legend collection.
 * @returns {void}
 */
export declare function pushCollection(collection: any[], index: number, number: number, legendElement: Element, shapeElement: Element, renderItems: any[], legendCollection: any[]): void;
/**
 * To trigger the download element
 *
 * @param {string} fileName - Specifies the file name
 * @param {ExportType} type - Specifies the type
 * @param {string} url - Specifies the url
 * @param {boolean} isDownload - Specifies the boolean value
 * @returns {void}
 * @private
 */
export declare function triggerDownload(fileName: string, type: ExportType, url: string, isDownload: boolean): void;
/**
 *
 * @param {string} id - Specifies the id of the element to be removed.
 * @returns {void}
 */
export declare function removeElement(id: string): void;
