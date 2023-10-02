import { print as printFunction, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getElement } from '../utils/helper';
import { beforePrint } from '../model/constant';
/**
 * Represent the print and export for gauge.
 *
 * @hidden
 */
var Print = /** @class */ (function () {
    /**
     * Constructor for gauge
     *
     * @param {LinearGauge} control - Specifies the linear gauge instance.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    function Print(control) {
    }
    /**
     * To print the gauge
     *
     * @param elements
     * @private
     */
    Print.prototype.print = function (gauge, elements) {
        var printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        printWindow.moveTo(0, 0);
        printWindow.resizeTo(screen.availWidth, screen.availHeight);
        var argsData = {
            cancel: false, htmlContent: this.getHTMLContent(gauge, elements), name: beforePrint
        };
        gauge.trigger('beforePrint', argsData, function () {
            if (!argsData.cancel) {
                printFunction(argsData.htmlContent, printWindow);
            }
        });
    };
    /**
     * To get the html string of the gauge
     *
     * @param elements
     * @private
     */
    Print.prototype.getHTMLContent = function (gauge, elements) {
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
            var exportElement = gauge.element.cloneNode(true);
            var backgroundElement = exportElement.getElementsByTagName('svg')[0];
            if (!isNullOrUndefined(backgroundElement)) {
                backgroundElement = backgroundElement.childNodes[0];
                if (!isNullOrUndefined(backgroundElement)) {
                    var backgroundColor = backgroundElement.getAttribute('fill');
                    if ((gauge.theme === 'Tailwind' || gauge.theme === 'Bootstrap5' || gauge.theme === 'Fluent' || gauge.theme === 'Material3') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                        backgroundElement.setAttribute('fill', 'rgba(255,255,255, 1)');
                    }
                    else if ((gauge.theme === 'TailwindDark' || gauge.theme === 'Bootstrap5Dark' || gauge.theme === 'FluentDark' || gauge.theme === 'Material3Dark') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
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
     */
    Print.prototype.getModuleName = function () {
        return 'Print';
    };
    /**
     * To destroy the print.
     *
     * @return {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Print.prototype.destroy = function () {
    };
    return Print;
}());
export { Print };
