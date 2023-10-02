import { LinearGauge } from '../../index';
import { ExportType } from '../utils/enum';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
/**
 * Represent the print and export for gauge.
 *
 * @hidden
 */
export declare class PdfExport {
    /**
     * Constructor for gauge
     *
     * @param {LinearGauge} control - Specifies the Linear Gauge instance.
     */
    constructor(control: LinearGauge);
    /**
     * To export the file as pdf format
     *
     * @param {LinearGauge} gauge - Specifies the Linear Gauge instance.
     * @param {ExportType} type - Specifies the extension type of the file to which the Linear Gauge to be exported.
     * @param {string} fileName - Specifies the name of the file.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document to export the gauge.
     * @param {boolean} allowDownload - Specifies whether the exported file should be downloaded or not.
     * @returns {Promise<string>} Returns the promise string
     * @private
     */
    export(gauge: LinearGauge, type: ExportType, fileName: string, orientation?: PdfPageOrientation, allowDownload?: boolean): Promise<string>;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the PdfExport.
     *
     * @return {void}
     * @private
     */
    destroy(): void;
}
