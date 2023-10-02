import { createElement, Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { triggerDownload } from '../utils/helper';
/**
 * ImageExport module handles the export to image functionality for treemap.
 *
 * @hidden
 */
var ImageExport = /** @class */ (function () {
    /**
     * Constructor for Maps
     *
     * @param {TreeMap} control - Specifies the treemap instance
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    function ImageExport(control) {
    }
    /**
     * This method is used to perform the export functionality for the rendered treemap.
     *
     * @param {TreeMap} treeMap - Specifies the treemap instance.
     * @param {ExportType} type - Specifies the type of the image file.
     * @param {string} fileName - Specifies the file name of the image file.
     * @param {boolean} allowDownload - Specifies whether to download the file or not.
     * @returns {Promise} - Returns the promise string.
     * @private
     */
    ImageExport.prototype.export = function (treeMap, type, fileName, allowDownload) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        var promise = new Promise(function (resolve, reject) {
            var element = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'height': treeMap.availableSize.height.toString(),
                    'width': treeMap.availableSize.width.toString()
                }
            });
            var exportElement = treeMap.svgObject.cloneNode(true);
            var backgroundElement = exportElement.childNodes[0];
            if (!isNullOrUndefined(backgroundElement)) {
                var backgroundColor = backgroundElement.getAttribute('fill');
                if ((treeMap.theme === 'Tailwind' || treeMap.theme === 'Bootstrap5' || treeMap.theme === 'Fluent' || treeMap.theme === 'Material3') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                    exportElement.childNodes[0].setAttribute('fill', 'rgba(255,255,255, 1)');
                }
                else if ((treeMap.theme === 'TailwindDark' || treeMap.theme === 'Bootstrap5Dark' || treeMap.theme === 'FluentDark' || treeMap.theme === 'Material3Dark') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                    exportElement.childNodes[0].setAttribute('fill', 'rgba(0, 0, 0, 1)');
                }
            }
            var isDownload = !(Browser.userAgent.toString().indexOf('HeadlessChrome') > -1);
            var svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                exportElement.outerHTML +
                '</svg>';
            var url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
                [(new XMLSerializer()).serializeToString(exportElement)], { type: 'image/svg+xml' }));
            if (type === 'SVG') {
                if (allowDownload) {
                    triggerDownload(fileName, type, url, isDownload);
                }
                else {
                    resolve(null);
                }
            }
            else {
                var image_1 = new Image();
                var context_1 = element.getContext('2d');
                image_1.onload = (function () {
                    context_1.drawImage(image_1, 0, 0);
                    window.URL.revokeObjectURL(url);
                    if (allowDownload) {
                        triggerDownload(fileName, type, element.toDataURL('image/png').replace('image/png', 'image/octet-stream'), isDownload);
                    }
                    else {
                        if (type === 'JPEG') {
                            resolve(element.toDataURL('image/jpeg'));
                        }
                        else if (type === 'PNG') {
                            resolve(element.toDataURL('image/png'));
                        }
                    }
                });
                image_1.src = url;
            }
        });
        return promise;
    };
    ImageExport.prototype.getModuleName = function () {
        // Returns te module name
        return 'ImageExport';
    };
    /**
     * To destroy the ImageExport.
     *
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ImageExport.prototype.destroy = function () { };
    return ImageExport;
}());
export { ImageExport };
