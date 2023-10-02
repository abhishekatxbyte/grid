import { print as printFunction, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getElement } from '../utils/helper';
import { beforePrint } from '../model/constants';
/**
 * Print module handles the print functionality for treemap.
 *
 * @hidden
 */
var Print = /** @class */ (function () {
    /**
     * Constructor for Maps
     *
     * @param {TreeMap} control - Specifies the treemap instance.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    function Print(control) {
    }
    /**
     * This method is used to perform the print functionality in treemap.
     *
     * @param {TreeMap} treeMap - Specifies the treemap instance.
     * @param { string[] | string | Element} elements - Specifies the element.
     * @returns {void}
     * @private
     */
    Print.prototype.print = function (treeMap, elements) {
        var printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        printWindow.moveTo(0, 0);
        printWindow.resizeTo(screen.availWidth, screen.availHeight);
        var argsData = {
            cancel: false, htmlContent: this.getHTMLContent(treeMap, elements), name: beforePrint
        };
        treeMap.trigger(beforePrint, argsData, function () {
            if (!argsData.cancel) {
                printFunction(argsData.htmlContent, printWindow);
            }
        });
    };
    /**
     * To get the html string of the Maps
     *
     * @param {TreeMap} treeMap - Specifies the treemap instance.
     * @param {string[] | string | Element} elements - Specifies the element
     * @returns {Element} - Returns the element
     * @private
     */
    Print.prototype.getHTMLContent = function (treeMap, elements) {
        var div = createElement('div');
        if (elements) {
            if (elements instanceof Array) {
                elements.forEach(function (value) {
                    div.appendChild(getElement(value).cloneNode(true));
                });
            }
            else if (elements instanceof Element) {
                div.appendChild(elements.cloneNode(true));
            }
            else {
                div.appendChild(getElement(elements).cloneNode(true));
            }
        }
        else {
            var exportElement = treeMap.element.cloneNode(true);
            var backgroundElement = exportElement.getElementsByTagName('svg')[0];
            if (!isNullOrUndefined(backgroundElement)) {
                backgroundElement = backgroundElement.childNodes[0];
                if (!isNullOrUndefined(backgroundElement)) {
                    var backgroundColor = backgroundElement.getAttribute('fill');
                    if ((treeMap.theme === 'Tailwind' || treeMap.theme === 'Bootstrap5' || treeMap.theme === 'Fluent' || treeMap.theme === 'Material3') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                        backgroundElement.setAttribute('fill', 'rgba(255,255,255, 1)');
                    }
                    else if ((treeMap.theme === 'TailwindDark' || treeMap.theme === 'Bootstrap5Dark' || treeMap.theme === 'FluentDark' || treeMap.theme === 'Material3Dark') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                        backgroundElement.setAttribute('fill', 'rgba(0, 0, 0, 1)');
                    }
                }
            }
            div.appendChild(exportElement);
        }
        return div;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    Print.prototype.getModuleName = function () {
        // Returns te module name
        return 'Print';
    };
    /**
     * To destroy the Print module.
     *
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Print.prototype.destroy = function () { };
    return Print;
}());
export { Print };
