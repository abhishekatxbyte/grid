import { CircularGauge } from '../../index';
import { ExportType } from '../utils/enum';
/**
 * Represent the Image Export for gauge
 *
 * @hidden
 */
export declare class ImageExport {
    /**
     * Constructor for gauge
     *
     *  @param {CircularGauge} control - Specfies the instance of the gauge
     */
    constructor(control: CircularGauge);
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
    export(gauge: CircularGauge, type: ExportType, fileName: string, allowDownload?: boolean): Promise<string>;
    protected getModuleName(): string;
    /**
     * To destroy the ImageExport.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
    /**
     * To trigger the download element
     *
     * @param {string} fileName - Specifies the file name.
     * @param {ExportType} type - Specifies the export type.
     * @param {string} url - Specifies the url.
     * @param {boolean} isDownload - Specifies the boolean value.
     * @returns {void}
     */
    private triggerDownload;
}
