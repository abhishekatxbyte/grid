import { Diagram } from "../diagram";
import { AnnotationModel } from "../objects/annotation-model";
import { ConnectorModel } from "../objects/connector-model";
import { Point } from "../primitives/point";
import { LabelProperties } from "./labelProperties";
export declare class ConnectorProperties {
    private diagram;
    private modelproperties;
    labelProperties: LabelProperties;
    constructor(labelProperties: LabelProperties);
    renderConnectorsCollection(convertedData: Object, data: Diagram): void;
    convertToConnector(connector: ConnectorModel): ConnectorModel;
    getConnectorShape(shape: any): any;
    getDecoratorShape(shape: string): string;
    setConnectorSegments(segments: any): any;
    getSegmentPoints(points: Point[]): Point[];
    setConnectorConstraints(constraints: number): number;
    /**
*To destroy the ruler
*
* @returns {void} To destroy the ruler
*/
    destroy(): void;
    /**
 * Get module name.
 */
    protected getModuleName(): string;
}
export interface EJ1Connector extends ConnectorModel {
    name: string;
    labels: AnnotationModel[];
    lineColor: string;
    lineWidth: number;
    lineDashArray: string;
    opacity: number;
    lineHitPadding: number;
}
