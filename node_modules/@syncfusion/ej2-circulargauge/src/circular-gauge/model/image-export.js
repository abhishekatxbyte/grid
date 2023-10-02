import { createElement, Browser } from '@syncfusion/ej2-base';
/**
 * Represent the Image Export for gauge
 *
 * @hidden
 */
var ImageExport = /** @class */ (function () {
    /**
     * Constructor for gauge
     *
     *  @param {CircularGauge} control - Specfies the instance of the gauge
     */
    // eslint-disable-next-line
    function ImageExport(control) {
    }
    /**
     * To export the file as image/svg format
     *
     * @param {CircularGauge} gauge - Specifies the instance of Circular Gauge.
     * @param {ExportType} type - Specifies the type of the image file.
     * @param {string} fileName - Specifies the file name of the image file.
     * @param {boolean} allowDownload - Specifies whether to download the image file or not.
     * @returns {Promise<string>} - Returns promise string.
     * @private
     */
    ImageExport.prototype.export = function (gauge, type, fileName, allowDownload) {
        var _this = this;
        // eslint-disable-next-line
        var promise = new Promise(function (resolve, reject) {
            var isDownload = !(Browser.userAgent.toString().indexOf('HeadlessChrome') > -1);
            var element = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': gauge.availableSize.width.toString(),
                    'height': gauge.availableSize.height.toString()
                }
            });
            var exportElement = gauge.svgObject.cloneNode(true);
            var backgroundElement = exportElement.childNodes[0];
            var backgroundColor = backgroundElement.getAttribute('fill');
            if ((gauge.theme === 'Tailwind' || gauge.theme === 'Bootstrap5' || gauge.theme === 'Fluent' || gauge.theme === 'Material3') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                exportElement.childNodes[0].setAttribute('fill', 'rgba(255,255,255, 1)');
            }
            else if ((gauge.theme === 'TailwindDark' || gauge.theme === 'Bootstrap5Dark' || gauge.theme === 'FluentDark' || gauge.theme === 'Material3Dark') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                exportElement.childNodes[0].setAttribute('fill', 'rgba(0, 0, 0, 1)');
            }
            var svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                exportElement.outerHTML +
                '</svg>';
            var url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
                [(new XMLSerializer()).serializeToString(exportElement)], { type: 'image/svg+xml' }));
            if (type === 'SVG') {
                if (allowDownload) {
                    _this.triggerDownload(fileName, type, url, isDownload);
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
                        _this.triggerDownload(fileName, type, element.toDataURL('image/png').replace('image/png', 'image/octet-stream'), isDownload);
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
    /* eslint-disable-next-line @typescript-eslint/no-empty-function */
    ImageExport.prototype.destroy = function () { };
    /**
     * To trigger the download element
     *
     * @param {string} fileName - Specifies the file name.
     * @param {ExportType} type - Specifies the export type.
     * @param {string} url - Specifies the url.
     * @param {boolean} isDownload - Specifies the boolean value.
     * @returns {void}
     */
    ImageExport.prototype.triggerDownload = function (fileName, type, url, isDownload) {
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
    };
    return ImageExport;
}());
export { ImageExport };
