import { LinearGauge } from '../../index';
import { ExportType } from '../utils/enum';
/**
 * Represent the print and export for gauge.
 *
 * @hidden
 */
export declare class ImageExport {
    /**
     * Constructor for gauge
     *
     * @param {LinearGauge} control - Specifies the Linear Gauge instance.
     */
    constructor(control: LinearGauge);
    /**
     * To export the file as image/svg format
     *
     * @param type
     * @param fileName
     * @private
     */
    export(gauge: LinearGauge, type: ExportType, fileName: string, allowDownload?: boolean): Promise<string>;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the ImageExport.
     *
     * @return {void}
     * @private
     */
    destroy(): void;
}
