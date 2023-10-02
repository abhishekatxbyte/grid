import { createElement, compile, merge, isNullOrUndefined, remove, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
/**
 * Specifies the size parameters.
 */
var Size = /** @class */ (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    return Size;
}());
export { Size };
/**
 *
 * @param {string} value - specifies the text.
 * @param {number} containerSize - specifies the container size value.
 * @returns {number} - Returns the number value which is converted from string.
 */
export function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/**
 * Internal use of type rect
 *
 * @private
 */
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Rect;
}());
export { Rect };
/**
 * Internal use of rectangle options
 *
 * @private
 */
var RectOption = /** @class */ (function () {
    function RectOption(id, fill, border, opacity, rect, dashArray) {
        this.y = rect.y;
        this.x = rect.x;
        this.height = rect.height;
        this.width = rect.width;
        this.id = id;
        this.fill = fill;
        this.opacity = opacity;
        this.stroke = border.color;
        this['stroke-width'] = border.width;
        this['stroke-dasharray'] = dashArray;
    }
    return RectOption;
}());
export { RectOption };
var PathOption = /** @class */ (function () {
    function PathOption(id, fill, width, color, opacity, dashArray, d) {
        this.id = id;
        this.opacity = opacity;
        this.fill = fill;
        this.stroke = color;
        this['stroke-width'] = width;
        this['stroke-dasharray'] = dashArray;
        this.d = d;
    }
    return PathOption;
}());
export { PathOption };
/**
 * Function to measure the height and width of the text.
 *
 * @param  {string} text - Specifies the text.
 * @param  {FontModel} font - Specifies the font.
 * @returns {Size} - Returns the size.
 * @private
 */
export function measureText(text, font) {
    var measureObject = document.getElementById('treeMapMeasureText');
    if (measureObject === null) {
        measureObject = createElement('text', { id: 'treeMapMeasureText' });
        document.body.appendChild(measureObject);
    }
    measureObject.innerHTML = SanitizeHtmlHelper.sanitize(text);
    measureObject.style.position = 'absolute';
    measureObject.style.fontSize = font.size;
    measureObject.style.fontWeight = font.fontWeight;
    measureObject.style.fontStyle = font.fontStyle;
    measureObject.style.fontFamily = font.fontFamily;
    measureObject.style.visibility = 'hidden';
    measureObject.style.top = '-100';
    measureObject.style.left = '0';
    measureObject.style.whiteSpace = 'nowrap';
    // For bootstrap line height issue
    measureObject.style.lineHeight = 'normal';
    return new Size(measureObject.clientWidth, measureObject.clientHeight);
}
/**
 * Internal use of text options
 *
 * @private
 */
var TextOption = /** @class */ (function () {
    function TextOption(id, x, y, anchor, text, transform, baseLine, connectorText) {
        if (transform === void 0) { transform = ''; }
        this.transform = '';
        this.baseLine = 'auto';
        this.id = id;
        this.text = text;
        this.transform = transform;
        this.anchor = anchor;
        this.x = x;
        this.y = y;
        this.baseLine = baseLine;
        this.connectorText = connectorText;
    }
    return TextOption;
}());
export { TextOption };
/**
 * Trim the title text
 *
 * @param {number} maxWidth - Specifies the maximum width
 * @param {string} text - Specifies the text
 * @param {FontModel} font - Specifies the font
 * @returns {string} - Returns the string
 * @private
 */
export function textTrim(maxWidth, text, font) {
    var label = text;
    var size = measureText(text, font).width;
    if (size > maxWidth) {
        var textLength = text.length;
        for (var i = textLength - 1; i >= 0; --i) {
            label = text.substring(0, i) + '...';
            size = measureText(label, font).width;
            if (size <= maxWidth || label.length < 4) {
                if (label.length < 4) {
                    label = ' ';
                }
                return label;
            }
        }
    }
    return label;
}
/**
 * Specifies the location parameters.
 */
var Location = /** @class */ (function () {
    function Location(x, y) {
        this.x = x;
        this.y = y;
    }
    return Location;
}());
export { Location };
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
export function findPosition(location, alignment, textSize, type) {
    var x;
    switch (alignment) {
        case 'Near':
            x = location.x;
            break;
        case 'Center':
            x = (type === 'title') ? (location.width / 2 - textSize.width / 2) :
                ((location.x + (location.width / 2)) - textSize.width / 2);
            break;
        case 'Far':
            x = (type === 'title') ? (location.width - location.y - textSize.width) :
                ((location.x + location.width) - textSize.width);
            break;
    }
    var y = (type === 'title') ? location.y + (textSize.height / 2) : ((location.y + location.height / 2) + textSize.height / 2);
    return new Location(x, y);
}
/**
 *
 * @param {SvgRenderer} renderer - Specifies the rendering element of the SVG.
 * @param {any} renderOptions - Specifies the settings of the text.
 * @param {string} text - Specifies the text.
 * @returns {HTMLElement} - Returns the HTML element for the text.
 */
export function createTextStyle(renderer, renderOptions, text) {
    var htmlObject = renderer.createText(renderOptions, text);
    htmlObject.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
    htmlObject.style['user-select'] = 'none';
    htmlObject.style['-moz-user-select'] = 'none';
    htmlObject.style['-webkit-touch-callout'] = 'none';
    htmlObject.style['-webkit-user-select'] = 'none';
    htmlObject.style['-khtml-user-select'] = 'none';
    htmlObject.style['-ms-user-select'] = 'none';
    htmlObject.style['-o-user-select'] = 'none';
    return htmlObject;
}
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
export function renderTextElement(options, font, color, parent, isMinus) {
    if (isMinus === void 0) { isMinus = false; }
    var renderOptions = {
        'font-size': font.size,
        'font-style': font.fontStyle,
        'font-family': font.fontFamily,
        'font-weight': font.fontWeight,
        'text-anchor': options.anchor,
        'transform': options.transform,
        'opacity': font.opacity,
        'dominant-baseline': options.baseLine,
        'id': options.id,
        'x': options.x,
        'y': options.y,
        'fill': color
    };
    var text = typeof options.text === 'string' ? options.text : isMinus ? options.text[options.text.length - 1] : options.text[0];
    var tspanElement;
    var renderer = new SvgRenderer('');
    var height;
    var htmlObject;
    var breadCrumbText = !isNullOrUndefined(text) && !isNullOrUndefined(options.connectorText) ?
        (text.search(options.connectorText[1]) >= 0) : false;
    if (breadCrumbText) {
        var drilledLabel = text;
        var spacing = 5;
        var drillLevelText = drilledLabel.split('#');
        for (var z = 0; z < drillLevelText.length; z++) {
            var drillText = (drillLevelText[z].search(options.connectorText) !== -1 &&
                !isNullOrUndefined(options.connectorText)) ?
                options.connectorText : drillLevelText[z];
            renderOptions['id'] = options.id + '_' + z;
            htmlObject = createTextStyle(renderer, renderOptions, drillText);
            if (z % 2 === 0 && z !== 0) {
                var re = /\s+/g;
                drillText = drillText.replace(re, '&nbsp');
            }
            var size = measureText(drillText, font);
            renderOptions['x'] = z !== 0 ? renderOptions['x'] + size.width : renderOptions['x'] + size.width + spacing;
            parent.appendChild(htmlObject);
        }
    }
    else {
        htmlObject = createTextStyle(renderer, renderOptions, text);
        parent.appendChild(htmlObject);
    }
    if (typeof options.text !== 'string' && options.text.length > 1) {
        for (var i = 1, len = options.text.length; i < len; i++) {
            height = (measureText(options.text[i], font).height);
            tspanElement = renderer.createTSpan({
                'x': options.x, 'id': options.id,
                'y': (options.y) + (i * height)
            }, options.text[i]);
            htmlObject.appendChild(tspanElement);
        }
        parent.appendChild(htmlObject);
    }
    return htmlObject;
}
/**
 *
 * @param {string} targetId - Specifies the id of the element to which template is to be appended.
 * @param {Element} targetElement - Specifies the element to which template is to be appended.
 * @param {string} contentItemTemplate - Specifies the content to be appended as template.
 * @returns {void}
 */
export function setItemTemplateContent(targetId, targetElement, contentItemTemplate) {
    var itemSelect = targetId.split('_RectPath')[0];
    var itemTemplate;
    if (targetId.indexOf('_LabelTemplate') > -1) {
        itemTemplate = targetElement;
    }
    else {
        itemTemplate = document.querySelector('#' + itemSelect + '_LabelTemplate');
    }
    if (!isNullOrUndefined(itemTemplate)) {
        itemTemplate.innerHTML = contentItemTemplate;
    }
}
/**
 *
 * @param {string} id - Specifies the id of the element.
 * @returns {Element} - Returns the element.
 */
export function getElement(id) {
    return document.getElementById(id);
}
/**
 *
 * @param {any} a - Specifies the first order of TreeMap leaf elements.
 * @param {any} b - Specifies the second order of TreeMap leaf elements.
 * @returns {number} - Returns the order of the TreeMap leaf element.
 */
export function itemsToOrder(a, b) {
    return a['weight'] === b['weight'] ? 0 : a['weight'] < b['weight'] ? 1 : -1;
}
/**
 *
 * @param {string[]} source - Specifies the data from the data source.
 * @param {string} pathName - Specifies the path name in the data source.
 * @param {any} processData - Specifies the data source object.
 * @param {TreeMap} treemap - Specifies the treemap instance.
 * @returns {boolean} - Specifies whether data is available in the data source or not.
 */
export function isContainsData(source, pathName, processData, treemap) {
    var isExist = false;
    var name = '';
    var path;
    var leaf = treemap.leafItemSettings;
    for (var i = 0; i < source.length; i++) {
        path = treemap.levels[i] ? treemap.levels[i].groupPath : leaf.labelPath ? leaf.labelPath :
            treemap.weightValuePath;
        var data = processData[path] || 'undefined';
        if (source[i] === data) {
            name += data + (i === source.length - 1 ? '' : '#');
            if (name === pathName) {
                isExist = true;
                break;
            }
        }
    }
    return isExist;
}
/**
 *
 * @param {any} data - Specifies the data to which the children elements to be found.
 * @returns {any} - Returns the children elements of the TreeMap leaf element.
 */
export function findChildren(data) {
    var children;
    if (data) {
        var keys = Object.keys(data);
        children = {};
        for (var i = 0; i < keys.length; i++) {
            if (data[keys[i]] instanceof Array) {
                children['values'] = data[keys[i]];
                children['key'] = keys[i];
                break;
            }
        }
    }
    return children;
}
/**
 *
 * @param {any} data - Specifies the data to which highlight must be done.
 * @param {items} items - Specifies the data source items.
 * @param {string} mode - Specifies the mode of highlight.
 * @param {TreeMap} treeMap - Specifies the treemap instance.
 * @returns {string[]} - Returns the highlighted items.
 */
export function findHightLightItems(data, items, mode, treeMap) {
    if (mode === 'Child') {
        items.push(data['levelOrderName']);
        var children = findChildren(data)['values'];
        if (children && children.length > 0) {
            for (var i = 0; i < children.length; i++) {
                if (items.indexOf(children[i]['levelOrderName']) === -1) {
                    items.push(children[i]['levelOrderName']);
                }
            }
            for (var j = 0; j < children.length; j++) {
                findHightLightItems(children[j], items, mode, treeMap);
            }
        }
    }
    else if (mode === 'Parent') {
        if (typeof data['levelOrderName'] === 'string' && items.indexOf(data['levelOrderName']) === -1) {
            items.push(data['levelOrderName']);
            findHightLightItems(data['parent'], items, mode, treeMap);
        }
    }
    else if (mode === 'All') {
        var parentName = data['levelOrderName'].split('#')[0];
        var currentItem = void 0;
        for (var i = 0; i < treeMap.layout.renderItems.length; i++) {
            currentItem = treeMap.layout.renderItems[i];
            if ((currentItem['levelOrderName']).indexOf(parentName) > -1 && items.indexOf(currentItem['levelOrderName']) === -1) {
                items.push(currentItem['levelOrderName']);
            }
        }
    }
    else {
        items.push(data['levelOrderName']);
    }
    return items;
}
/**
 * Function to compile the template function for maps.
 *
 * @param {string} template - Specifies the template
 * @returns {Function} - Returns the template function
 * @private
 */
export function getTemplateFunction(template) {
    var templateFn = null;
    try {
        if (typeof template !== 'function' && document.querySelectorAll(template).length) {
            templateFn = compile(document.querySelector(template).innerHTML.trim());
        }
        else {
            templateFn = compile(template);
        }
    }
    catch (e) {
        templateFn = compile(template);
    }
    return templateFn;
}
/**
 * @private
 * @param {HTMLCollection} element - Specifies the element
 * @param {string} labelId - Specifies the label id
 * @param {Object} data - Specifies the data
 * @returns {HTMLElement} - Returns the element
 */
export function convertElement(element, labelId, data) {
    var childElement = createElement('div', {
        id: labelId
    });
    childElement.style.cssText = 'position: absolute;pointer-events: auto;';
    var elementLength = element.length;
    while (elementLength > 0) {
        childElement.appendChild(element[0]);
        elementLength--;
    }
    var templateHtml = childElement.innerHTML;
    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
        var regExp = RegExp;
        templateHtml = templateHtml.replace(new regExp('{{:' + keys[i] + '}}', 'g'), data[keys[i].toString()]);
    }
    childElement.innerHTML = templateHtml;
    return childElement;
}
/**
 *
 * @param {Rect} rect - Specifies the area.
 * @param {LabelPosition} position - Specifies the position
 * @param {Size} labelSize - Specifies the label size.
 * @param {string} type - Specifies the type.
 * @param {TreeMap} treemap - Specifies the treemap instance.
 * @returns {Location} - Returns the text location.
 */
export function findLabelLocation(rect, position, labelSize, type, treemap) {
    var location = new Location(0, 0);
    var padding = 5;
    var paddings = 2;
    var x = (type === 'Template') ? treemap.areaRect.x : 0;
    var y = (type === 'Template') ? treemap.areaRect.y : 0;
    location.x = (Math.abs(x - ((position.indexOf('Left') > -1) ? rect.x + padding : !(position.indexOf('Right') > -1) ?
        rect.x + ((rect.width / 2) - (labelSize.width / 2)) : (rect.x + rect.width) - labelSize.width))) - paddings;
    if (treemap.enableDrillDown && (treemap.renderDirection === 'BottomLeftTopRight'
        || treemap.renderDirection === 'BottomRightTopLeft')) {
        location.y = Math.abs((rect.y + rect.height) - labelSize.height + padding);
    }
    else {
        location.y = Math.abs(y - ((position.indexOf('Top') > -1) ? (type === 'Template' ? rect.y : rect.y + labelSize.height) :
            !(position.indexOf('Bottom') > -1) ? type === 'Template' ? (rect.y + ((rect.height / 2) - (labelSize.height / 2))) :
                (rect.y + (rect.height / 2) + labelSize.height / 4) : (rect.y + rect.height) - labelSize.height));
    }
    return location;
}
/**
 *
 * @param {HTMLElement} element - Specifies the element to be measured.
 * @param {HTMLElement} parentElement - Specifies the parent element of the element to be measured.
 * @returns {Size} - Returns the element size.
 */
export function measureElement(element, parentElement) {
    var size = new Size(0, 0);
    parentElement.appendChild(element);
    size.height = element.offsetHeight;
    size.width = element.offsetWidth;
    var measureElementId = document.getElementById(element.id);
    measureElementId.parentNode.removeChild(measureElementId);
    return size;
}
/**
 *
 * @param {Rect} rect - Specifies the area.
 * @returns {number} - Returns the area width.
 */
export function getArea(rect) {
    return (rect.width - rect.x) * (rect.height - rect.y);
}
/**
 *
 * @param {Rect} input - Specifies input for the calculation.
 * @returns {number} - Returns the shortest edge.
 */
export function getShortestEdge(input) {
    var container = convertToContainer(input);
    var width = container.width;
    var height = container.height;
    var result = Math.min(width, height);
    return result;
}
/**
 *
 * @param {Rect} rect - Specifies the rectangle bounds of the container.
 * @returns {Rect} - Returns the rectangle bounds.
 */
export function convertToContainer(rect) {
    var x = rect.x;
    var y = rect.y;
    var width = rect.width;
    var height = rect.height;
    return {
        x: x,
        y: y,
        width: width - x,
        height: height - y
    };
}
/**
 *
 * @param {Rect} container - Specifies the rectangle bounds of the container.
 * @returns {Rect} - Returns the rectangle bounds.
 */
export function convertToRect(container) {
    var xOffset = container.x;
    var yOffset = container.y;
    var width = container.width;
    var height = container.height;
    return {
        x: xOffset,
        y: yOffset,
        width: xOffset + width,
        height: yOffset + height
    };
}
/**
 *
 * @param {number} pageX - Specifies the horizontal position of the mouse location.
 * @param {number} pageY - Specifies the vertical position of the mouse location.
 * @param {Element} element - Specifies the element to which the click is done.
 * @returns {Location} - Returns the clicked location.
 */
export function getMousePosition(pageX, pageY, element) {
    var elementRect = element.getBoundingClientRect();
    var pageXOffset = element.ownerDocument.defaultView.pageXOffset;
    var pageYOffset = element.ownerDocument.defaultView.pageYOffset;
    var clientTop = element.ownerDocument.documentElement.clientTop;
    var clientLeft = element.ownerDocument.documentElement.clientLeft;
    var positionX = elementRect.left + pageXOffset - clientLeft;
    var positionY = elementRect.top + pageYOffset - clientTop;
    return new Location((pageX - positionX), (pageY - positionY));
}
/**
 *
 * @param {ColorMappingModel[]} colorMapping - Specifies the color mapping instance.
 * @param {string} equalValue - Specifies the equal value.
 * @param {number | string} value - Specifies the range value.
 * @returns {any} - Returns the color mapping object.
 * @private
 */
export function colorMap(colorMapping, equalValue, value) {
    var fill;
    var paths = [];
    var opacity;
    if (isNullOrUndefined(equalValue) && (isNullOrUndefined(value) && isNaN(value))) {
        return null;
    }
    for (var i = 0; i < colorMapping.length; i++) {
        var isEqualColor = false;
        var dataValue = value;
        if (!isNullOrUndefined(colorMapping[i].from) && !isNullOrUndefined(colorMapping[i].to)
            && !isNullOrUndefined(colorMapping[i].value)) {
            if ((value >= colorMapping[i].from && colorMapping[i].to >= value) &&
                (colorMapping[i].value === equalValue)) {
                isEqualColor = true;
                if (Object.prototype.toString.call(colorMapping[i].color) === '[object Array]') {
                    fill = !isEqualColor ? colorCollections(colorMapping[i], dataValue) : colorMapping[i].color[0];
                }
                else {
                    fill = colorMapping[i].color;
                }
            }
        }
        else if ((!isNullOrUndefined(colorMapping[i].from) && !isNullOrUndefined(colorMapping[i].to))
            || !isNullOrUndefined((colorMapping[i].value))) {
            if ((value >= colorMapping[i].from && colorMapping[i].to >= value)
                || (colorMapping[i].value === equalValue)) {
                if (colorMapping[i].value === equalValue) {
                    isEqualColor = true;
                }
                if (Object.prototype.toString.call(colorMapping[i].color) === '[object Array]') {
                    fill = !isEqualColor ? colorCollections(colorMapping[i], dataValue) : colorMapping[i].color[0];
                }
                else {
                    fill = colorMapping[i].color;
                }
            }
        }
        if (((value >= colorMapping[i].from && value <= colorMapping[i].to)
            || (colorMapping[i].value === equalValue))
            && !isNullOrUndefined(colorMapping[i].minOpacity) && !isNullOrUndefined(colorMapping[i].maxOpacity)
            && fill) {
            opacity = deSaturationColor(colorMapping[i], value);
        }
        if ((fill === '' || isNullOrUndefined(fill))
            && isNullOrUndefined(colorMapping[i].from) && isNullOrUndefined(colorMapping[i].to)
            && isNullOrUndefined(colorMapping[i].minOpacity) && isNullOrUndefined(colorMapping[i].maxOpacity)
            && isNullOrUndefined(colorMapping[i].value)) {
            fill = (Object.prototype.toString.call(colorMapping[i].color) === '[object Array]') ?
                colorMapping[i].color[0] : colorMapping[i].color;
        }
        opacity = !isNullOrUndefined(opacity) ? opacity : '1';
        paths.push(fill);
    }
    for (var j = paths.length - 1; j >= 0; j--) {
        fill = paths[j];
        j = (fill) ? -1 : j;
    }
    return { fill: fill, opacity: opacity };
}
/**
 *
 * @param {ColorMappingModel} colorMapping - Specifies the color mapping object.
 * @param {number} rangeValue - Specifies the range value.
 * @returns {string} - Returns the opacity for the color mapping.
 * @private
 */
export function deSaturationColor(colorMapping, rangeValue) {
    var opacity = 1;
    if ((rangeValue >= colorMapping.from && rangeValue <= colorMapping.to)) {
        var ratio = (rangeValue - colorMapping.from) / (colorMapping.to - colorMapping.from);
        opacity = (ratio * (colorMapping.maxOpacity - colorMapping.minOpacity)) + colorMapping.minOpacity;
    }
    return opacity.toString();
}
/**
 *
 * @param {ColorMappingModel} colorMap - Specifies the color mapping object.
 * @param {number} value - Specifies the range value.
 * @returns {string} - Returns the fill color.
 */
export function colorCollections(colorMap, value) {
    var gradientFill = getColorByValue(colorMap, value);
    return gradientFill;
}
/**
 *
 * @param {number} r - Specifies the red color value.
 * @param {number} g - Specifies the green color value.
 * @param {number} b - Specifies the blue color value.
 * @returns {string} - Returns the fill color.
 */
export function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
/**
 *
 * @param {ColorMappingModel} colorMap - Specifies the color mapping.
 * @param {number} value - Specifies the range value.
 * @returns {string} - Returns the fill color.
 */
export function getColorByValue(colorMap, value) {
    var color = '';
    var rbg;
    if (Number(value) === colorMap.from) {
        color = colorMap.color[0];
    }
    else if (Number(value) === colorMap.to) {
        color = colorMap.color[colorMap.color.length - 1];
    }
    else {
        rbg = getGradientColor(Number(value), colorMap);
        color = rgbToHex(rbg.r, rbg.g, rbg.b);
    }
    return color;
}
/**
 *
 * @param {number} value - Specifies the range value.
 * @param {ColorMappingModel} colorMap - Specifies the color mapping.
 * @returns {ColorValue} - Returns the color value object.
 */
export function getGradientColor(value, colorMap) {
    var previousOffset = colorMap.from;
    var nextOffset = colorMap.to;
    var percent = 0;
    var full = nextOffset - previousOffset;
    var midColor;
    percent = (value - previousOffset) / full;
    var previousColor;
    var nextColor;
    if (colorMap.color.length <= 2) {
        previousColor = colorMap.color[0].charAt(0) === '#' ? colorMap.color[0] : colorNameToHex(colorMap.color[0]);
        nextColor = colorMap.color[colorMap.color.length - 1].charAt(0) === '#' ?
            colorMap.color[colorMap.color.length - 1] : colorNameToHex(colorMap.color[colorMap.color.length - 1]);
    }
    else {
        previousColor = colorMap.color[0].charAt(0) === '#' ? colorMap.color[0] : colorNameToHex(colorMap.color[0]);
        nextColor = colorMap.color[colorMap.color.length - 1].charAt(0) === '#' ?
            colorMap.color[colorMap.color.length - 1] : colorNameToHex(colorMap.color[colorMap.color.length - 1]);
        var a = full / (colorMap.color.length - 1);
        var b = void 0;
        var c = void 0;
        var length_1 = colorMap.color.length - 1;
        var splitColorValueOffset = [];
        var splitColor = {};
        for (var j = 1; j < length_1; j++) {
            c = j * a;
            b = previousOffset + c;
            splitColor = { b: b, color: colorMap.color[j] };
            splitColorValueOffset.push(splitColor);
        }
        for (var i = 0; i < splitColorValueOffset.length; i++) {
            if (previousOffset <= value && value <= splitColorValueOffset[i]['b'] && i === 0) {
                midColor = splitColorValueOffset[i]['color'].charAt(0) === '#' ?
                    splitColorValueOffset[i]['color'] : colorNameToHex(splitColorValueOffset[i]['color']);
                nextColor = midColor;
                percent = value < splitColorValueOffset[i]['b'] ? 1 - Math.abs((value - splitColorValueOffset[i]['b']) / a)
                    : (value - splitColorValueOffset[i]['b']) / a;
            }
            else if (splitColorValueOffset[i]['b'] <= value && value <= nextOffset && i === (splitColorValueOffset.length - 1)) {
                midColor = splitColorValueOffset[i]['color'].charAt(0) === '#' ?
                    splitColorValueOffset[i]['color'] : colorNameToHex(splitColorValueOffset[i]['color']);
                previousColor = midColor;
                percent = value < splitColorValueOffset[i]['b'] ?
                    1 - Math.abs((value - splitColorValueOffset[i]['b']) / a) : (value - splitColorValueOffset[i]['b']) / a;
            }
            if (i !== splitColorValueOffset.length - 1 && i < splitColorValueOffset.length) {
                if (splitColorValueOffset[i]['b'] <= value && value <= splitColorValueOffset[i + 1]['b']) {
                    midColor = splitColorValueOffset[i]['color'].charAt(0) === '#' ?
                        splitColorValueOffset[i]['color'] : colorNameToHex(splitColorValueOffset[i]['color']);
                    previousColor = midColor;
                    nextColor = splitColorValueOffset[i + 1]['color'].charAt(0) === '#' ?
                        splitColorValueOffset[i + 1]['color'] : colorNameToHex(splitColorValueOffset[i + 1]['color']);
                    percent = Math.abs((value - splitColorValueOffset[i + 1]['b'])) / a;
                }
            }
        }
    }
    return getPercentageColor(percent, previousColor, nextColor);
}
/**
 *
 * @param {number} percent - Specifies the percentage of the color.
 * @param {number} previous - Specifies the previous color.
 * @param {number} next - Specifies the next color.
 * @returns {ColorValue} - Returns the color value object.
 */
export function getPercentageColor(percent, previous, next) {
    var nextColor = next.split('#')[1];
    var prevColor = previous.split('#')[1];
    var r = getPercentage(percent, parseInt(prevColor.substr(0, 2), 16), parseInt(nextColor.substr(0, 2), 16));
    var g = getPercentage(percent, parseInt(prevColor.substr(2, 2), 16), parseInt(nextColor.substr(2, 2), 16));
    var b = getPercentage(percent, parseInt(prevColor.substr(4, 2), 16), parseInt(nextColor.substr(4, 2), 16));
    return new ColorValue(r, g, b);
}
/**
 *
 * @param {number} percent - Specifies the percentage of the color.
 * @param {number} previous - Specifies the previous color.
 * @param {number} next - Specifies the next color.
 * @returns {number} - Returns the color value.
 */
export function getPercentage(percent, previous, next) {
    var full = next - previous;
    return Math.round((previous + (full * percent)));
}
/**
 *
 * @param {number} maximumWidth - Specifies the length of the text.
 * @param {string} dataLabel - Specifies the label.
 * @param {FontModel} font - Specifies the font of the label.
 * @returns {string[]} - Returns the labels.
 */
export function wordWrap(maximumWidth, dataLabel, font) {
    var textCollection = dataLabel.split(' ');
    var label = '';
    var labelCollection = [];
    var text;
    for (var i = 0, len = textCollection.length; i < len; i++) {
        text = textCollection[i];
        if (measureText(label.concat(text), font).width < maximumWidth) {
            label = label.concat((label === '' ? '' : ' ') + text);
        }
        else {
            if (label !== '') {
                labelCollection.push(textTrim(maximumWidth, label, font));
                label = text;
            }
            else {
                labelCollection.push(textTrim(maximumWidth, text, font));
                text = '';
            }
        }
        if (label && i === len - 1) {
            labelCollection.push(textTrim(maximumWidth, label, font));
        }
    }
    return labelCollection;
}
/**
 *
 * @param {number} maxWidth - Specifies the length of the text.
 * @param {string} label - Specifies the label.
 * @param {FontModel} font - Specifies the font of the label.
 * @returns {string[]} - Returns the labels.
 */
export function textWrap(maxWidth, label, font) {
    var resultText = [];
    var currentLength = 0;
    var totalWidth = measureText(label, font).width;
    var totalLength = label.length;
    if (maxWidth >= totalWidth) {
        resultText.push(label);
        return resultText;
    }
    else {
        for (var i = label.length; i > currentLength; i--) {
            var sliceString = label.slice(currentLength, i);
            totalWidth = measureText(sliceString, font).width;
            if (totalWidth <= maxWidth) {
                resultText.push(sliceString);
                currentLength += sliceString.length;
                if (totalLength === currentLength) {
                    return resultText;
                }
                i = totalLength + 1;
            }
        }
    }
    return resultText;
}
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
export function hide(maxWidth, maxHeight, text, font) {
    var hideText = text;
    var textSize = measureText(text, font);
    hideText = (textSize.width > maxWidth || textSize.height > maxHeight) ? ' ' : text;
    return hideText;
}
/**
 *
 * @param {number} a - Specifies the first value of the leaf.
 * @param {number} b - Specifies the second value of the leaf.
 * @returns {number} - Returns whether values are equal or not.
 */
export function orderByArea(a, b) {
    if (a['itemArea'] === b['itemArea']) {
        return 0;
    }
    else if (a['itemArea'] < b['itemArea']) {
        return 1;
    }
    return -1;
}
/**
 *
 * @param {TreeMap} treemap - Specifies the treemap instance.
 * @param {Element} element - Specifies the selected TreeMap leaf item.
 * @param {string} className -Specifies the selected class name.
 * @returns {void}
 */
export function maintainSelection(treemap, element, className) {
    var elementId = treemap.levelSelection;
    if (elementId) {
        for (var index = 0; index < elementId.length; index++) {
            if (element.getAttribute('id') === elementId[index]) {
                if (element.childElementCount > 0) {
                    element.children[0].setAttribute('class', className);
                    applyOptions(element.childNodes[0], {
                        border: treemap.selectionSettings.border, fill: treemap.selectionSettings.fill,
                        opacity: treemap.selectionSettings.opacity
                    });
                }
            }
            else {
                element.setAttribute('class', '');
            }
        }
    }
}
/**
 *
 * @param {TreeMap} treemap - Specifies the treemap instance.
 * @param {Element} legendGroup - Specifies the selected element.
 * @returns {void}
 */
export function legendMaintain(treemap, legendGroup) {
    var elementId = treemap.legendId;
    if (elementId) {
        for (var i = 0; i < elementId.length; i++) {
            for (var j = 0; j < legendGroup.childElementCount; j++) {
                if (legendGroup.childNodes[j]['id'] === elementId[i]) {
                    var treemapSVGRectElement = legendGroup.childNodes[j];
                    treemapSVGRectElement.setAttribute('fill', treemap.selectionSettings.fill);
                    treemapSVGRectElement.setAttribute('stroke', treemap.selectionSettings.border.color);
                    treemapSVGRectElement.setAttribute('stroke-width', (treemap.selectionSettings.border.width).toString());
                    treemapSVGRectElement.setAttribute('opacity', treemap.selectionSettings.opacity);
                }
            }
        }
    }
}
/**
 *
 * @param {HTMLCollection} elements - Specifies the selected TreeMap element.
 * @param {string} type - Specifies the selection type.
 * @param {TreeMap} treemap - Specifies the TreeMap instance.
 * @returns {void}
 */
export function removeClassNames(elements, type, treemap) {
    var element;
    var options = {};
    for (var j = 0; j < elements.length; j++) {
        element = isNullOrUndefined(elements[j].childNodes[0]) ? elements[j] :
            elements[j].childNodes[0];
        options = treemap.layout.renderItems[parseFloat(element.id.split('_Item_Index_')[1])]['options'];
        applyOptions(element, options);
        elements[j].classList.remove(type);
        j -= 1;
    }
}
/**
 *
 * @param {SVGPathElement} element - Specifies the SVG path element.
 * @param {any} options - Specifies the settings for the SVG path element.
 * @returns {void}
 */
export function applyOptions(element, options) {
    element.setAttribute('opacity', options['opacity']);
    if (!isNullOrUndefined(options['fill'])) {
        element.setAttribute('fill', options['fill']);
    }
    element.setAttribute('stroke', options['border']['color']);
    element.setAttribute('stroke-width', options['border']['width']);
}
/**
 *
 * @param {string} format - Specifies the format value.
 * @param {any} data - Specifies the data source object.
 * @param {TreeMap} treemap - Specifies the TreeMap instance.
 * @returns {string} - Returns the formatted text.
 */
export function textFormatter(format, data, treemap) {
    if (isNullOrUndefined(format)) {
        return null;
    }
    var keys = Object.keys(data);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        format = format.split('${' + key + '}').join(formatValue(data[key], treemap).toString());
    }
    return format;
}
/**
 *
 * @param {number} value - Specifies the text to be formatted.
 * @param {TreeMap} treemap - Specifies the TreeMap instance.
 * @returns {string | number} - Returns the formatted text.
 */
export function formatValue(value, treemap) {
    var formatValue;
    var formatFunction;
    if (treemap.format && !isNaN(Number(value))) {
        formatFunction = treemap.intl.getNumberFormat({ format: treemap.format, useGrouping: treemap.useGroupingSeparator });
        formatValue = formatFunction(Number(value));
    }
    else {
        formatValue = value;
    }
    return formatValue ? formatValue : '';
}
/**
 * @private
 */
var ColorValue = /** @class */ (function () {
    function ColorValue(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    return ColorValue;
}());
export { ColorValue };
/**
 * @param {ColorValue} value - Specfies the color value
 * @returns {string} - Returns the string
 * @private
 */
export function convertToHexCode(value) {
    return '#' + componentToHex(value.r) + componentToHex(value.g) + componentToHex(value.b);
}
/**
 * @param {number} value - Specifies the value
 * @returns {string} - Returns the string
 * @private */
export function componentToHex(value) {
    var hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}
/**
 * @param {string} hex - Specifies the hex value
 * @returns {ColorValue} - Returns the color value
 * @private
 */
export function convertHexToColor(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new ColorValue(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) :
        new ColorValue(255, 255, 255);
}
/**
 * @param {string} color - Specifies the color
 * @returns {string} - Returns the string
 * @private
 */
export function colorNameToHex(color) {
    color = color === 'transparent' ? 'white' : color;
    var element = document.getElementById('treeMapMeasureText');
    element.style.color = color;
    color = window.getComputedStyle(element).color;
    var isRGBValue = color.replace(/[()RGBrgba ]/g, '').split(',');
    return convertToHexCode(new ColorValue(parseInt(isRGBValue[0], 10), parseInt(isRGBValue[1], 10), parseInt(isRGBValue[2], 10)));
}
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
export function drawSymbol(location, shape, size, url, options, label) {
    var svgRenderer = new SvgRenderer('');
    var temp = renderLegendShape(location, size, shape, options, url);
    var htmlElement = svgRenderer['draw' + temp.functionName](temp.renderOption);
    htmlElement.setAttribute('aria-label', label);
    return htmlElement;
}
/**
 * @param {Location} location - Specifies the location
 * @param {Size} size - Specifies the size
 * @param {string} shape - Specifies the shape
 * @param {PathOption} options - Specifies the path option
 * @param {string} url - Specifies the string
 * @returns {IShapes} - Returns the shapes
 * @private
 */
export function renderLegendShape(location, size, shape, options, url) {
    var renderPath;
    var functionName = 'Path';
    var shapeWidth = size.width;
    var shapeHeight = size.height;
    var shapeX = location.x;
    var shapeY = location.y;
    var x = location.x + (-shapeWidth / 2);
    var y = location.y + (-shapeHeight / 2);
    switch (shape) {
        case 'Circle':
        case 'Bubble':
            functionName = 'Ellipse';
            merge(options, { 'rx': shapeWidth / 2, 'ry': shapeHeight / 2, 'cx': shapeX, 'cy': shapeY });
            break;
        case 'VerticalLine':
            renderPath = 'M' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' + 'L' + ' ' + shapeX + ' '
                + (shapeY + (-shapeHeight / 2));
            merge(options, { 'd': renderPath });
            break;
        case 'Diamond':
            renderPath = 'M' + ' ' + x + ' ' + shapeY + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + shapeY + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + shapeY + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Rectangle':
            renderPath = 'M' + ' ' + x + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (-shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Triangle':
            renderPath = 'M' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'InvertedTriangle':
            renderPath = 'M' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX - (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Pentagon':
            // eslint-disable-next-line no-case-declarations
            var eq = 72;
            // eslint-disable-next-line no-case-declarations
            var xValue = void 0;
            // eslint-disable-next-line no-case-declarations
            var yValue = void 0;
            for (var i = 0; i <= 5; i++) {
                xValue = (shapeWidth / 2) * Math.cos((Math.PI / 180) * (i * eq));
                yValue = (shapeWidth / 2) * Math.sin((Math.PI / 180) * (i * eq));
                if (i === 0) {
                    renderPath = 'M' + ' ' + (shapeX + xValue) + ' ' + (shapeY + yValue) + ' ';
                }
                else {
                    renderPath = renderPath.concat('L' + ' ' + (shapeX + xValue) + ' ' + (shapeY + yValue) + ' ');
                }
            }
            renderPath = renderPath.concat('Z');
            merge(options, { 'd': renderPath });
            break;
        case 'Star':
            renderPath = 'M ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + (location.x - size.width / 2)
                + ' ' + (location.y + size.height / 6) + ' L ' + (location.x + size.width / 2) + ' ' + (location.y + size.height / 6)
                + ' L ' + (location.x - size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' +
                (location.y + size.height / 2) + ' L ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' Z';
            merge(options, { 'd': renderPath });
            break;
        case 'Cross':
            renderPath = 'M' + ' ' + x + ' ' + shapeY + ' ' + 'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + shapeY + ' ' +
                'M' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' + 'L' + ' ' + shapeX + ' ' +
                (shapeY + (-shapeHeight / 2));
            merge(options, { 'd': renderPath });
            break;
        case 'Image':
            functionName = 'Image';
            merge(options, { 'href': url, 'height': shapeHeight, 'width': shapeWidth, x: x, y: y });
            break;
    }
    return { renderOption: options, functionName: functionName };
}
/**
 *
 * @param {any} data - Specifies the data source object.
 * @param {any} item - Specifies the leaf item.
 * @returns {boolean} - Returns whether the TreeMap item is level item or leaf item.
 */
export function isParentItem(data, item) {
    var isParentItem = false;
    for (var j = 0; j < data.length; j++) {
        if (item['levelOrderName'] === data[j]['levelOrderName']) {
            isParentItem = true;
            break;
        }
    }
    return isParentItem;
}
/**
 * Specifies the data to be received through Ajax request for treemap.
 */
var TreeMapAjax = /** @class */ (function () {
    function TreeMapAjax(options, type, async, contentType, sendData) {
        this.dataOptions = options;
        this.type = type || 'GET';
        this.async = async || true;
        this.contentType = contentType;
        this.sendData = sendData;
    }
    return TreeMapAjax;
}());
export { TreeMapAjax };
/**
 *
 * @param {any[]} collection - Specifies the legend collection.
 * @returns {void}
 * @private
 */
export function removeShape(collection) {
    if (collection.length > 0) {
        for (var i = 0; i < collection.length; i++) {
            var item = collection[i];
            setColor(item['legendEle'], item['oldFill'], item['oldOpacity'], item['oldBorderColor'], item['oldBorderWidth']);
        }
    }
}
/**
 *
 * @param {any[]} collection - Specifies the legend collection.
 * @returns {void}
 * @private
 */
export function removeLegend(collection) {
    if (collection.length > 0) {
        for (var j = 0; j < collection.length; j++) {
            var item = collection[j];
            setColor(item['legendEle'], item['oldFill'], item['oldOpacity'], item['oldBorderColor'], item['oldBorderWidth']);
            var dataCount = item['ShapeCollection']['Elements'].length;
            for (var k = 0; k < dataCount; k++) {
                setColor(item['ShapeCollection']['Elements'][k], item['shapeOldFill'], item['shapeOldOpacity'], item['shapeOldBorderColor'], item['shapeOldBorderWidth']);
            }
        }
    }
}
/**
 *
 * @param {Element} element - Specifies the selected element.
 * @param {string} fill - Specifies the fill color.
 * @param {string} opacity - Specifies the opacity.
 * @param {string} borderColor - Specifies the border color.
 * @param {string} borderWidth - Specifies the border width.
 * @returns {void}
 */
export function setColor(element, fill, opacity, borderColor, borderWidth) {
    element.setAttribute('fill', fill);
    element.setAttribute('opacity', opacity);
    element.setAttribute('stroke', borderColor);
    element.setAttribute('stroke-width', borderWidth);
}
/**
 *
 * @param {any[]} collection - Specifies the selected item collection.
 * @param {any[]} element - Specifies the selected element collection.
 * @param {TreeMap} treemap - Specifies the TreeMap instance.
 * @returns {void}
 */
export function removeSelectionWithHighlight(collection, element, treemap) {
    removeShape(collection);
    element = [];
    removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', treemap);
}
/**
 *
 * @param {number} length - Specifies the length of the legend group.
 * @param {any} item - Specifies the legend item.
 * @param {TreeMap} treemap - Specifies the TreeMap instance.
 * @returns {number} - Returns the legend index.
 */
export function getLegendIndex(length, item, treemap) {
    var index;
    for (var i = 0; i < length; i++) {
        var dataLength = treemap.treeMapLegendModule.legendCollections[i]['legendData'].length;
        for (var j = 0; j < dataLength; j++) {
            if (treemap.treeMapLegendModule.legendCollections[i]['legendData'][j]['levelOrderName'] === item['levelOrderName']) {
                index = i;
                break;
            }
        }
    }
    return index;
}
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
export function pushCollection(collection, index, number, legendElement, shapeElement, renderItems, legendCollection) {
    collection.push({
        legendEle: legendElement, oldFill: legendCollection[index]['legendFill'],
        oldOpacity: legendCollection[index]['opacity'], oldBorderColor: legendCollection[index]['borderColor'],
        oldBorderWidth: legendCollection[index]['borderWidth'],
        shapeElement: shapeElement, shapeOldFill: renderItems[number]['options']['fill'],
        shapeOldOpacity: renderItems[number]['options']['opacity'],
        shapeOldBorderColor: renderItems[number]['options']['border']['color'],
        shapeOldBorderWidth: renderItems[number]['options']['border']['width']
    });
}
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
export function triggerDownload(fileName, type, url, isDownload) {
    createElement('a', {
        attrs: {
            'download': fileName + '.' + type.toLocaleLowerCase(),
            'href': url
        }
    }).dispatchEvent(new MouseEvent(isDownload ? 'click' : 'move', {
        view: window,
        bubbles: false,
        cancelable: true
    }));
}
/**
 *
 * @param {string} id - Specifies the id of the element to be removed.
 * @returns {void}
 */
export function removeElement(id) {
    var element = document.getElementById(id);
    return element ? remove(element) : null;
}
