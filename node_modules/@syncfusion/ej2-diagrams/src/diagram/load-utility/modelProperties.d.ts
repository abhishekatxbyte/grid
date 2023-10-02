import { Diagram } from "../diagram";
import { ConnectorModel } from "../objects/connector-model";
import { NodeModel } from "../objects/node-model";
import { ConnectorProperties } from "./connectorProperties";
import { LabelProperties } from "./labelProperties";
import { NodeProperties } from "./nodeProperties";
import { PortProperties } from "./portProperties";
export declare class EJ1SerializationModule {
    private diagram;
    labelProperties: LabelProperties;
    connectorProperties: ConnectorProperties;
    portProperties: PortProperties;
    nodeProperties: NodeProperties;
    constructor(diagram: Diagram);
    convertedData: any;
    getSerializedData(data: Object): any;
    getNodeDefaults(node: NodeModel): NodeModel;
    getConnectorDefaults(connector: ConnectorModel): ConnectorModel;
    setLayers(convertedData: Object | any, data: Diagram): void;
    setDataSourceSettings(convertedData: Object | any, data: Object | any): void;
    setRulerSettings(convertedData: Object | any, data: Object | any): void;
    setRulerProperties(ruler: any): any;
    setSnapSettings(convertedData: Object | any, data: Object | any): void;
    setSnapConstraints(constraints: number): number;
    setGridLines(gridlines: any): any;
    setScrollSettings(convertedData: Object | any, data: Object | any): void;
    setPageSettings(convertedData: Object | any, data: Object | any): void;
    setContextMenu(convertedData: Object | any, data: Object | any): void;
    items: any;
    getContextMenuItems(contextMenuItems: any): any;
    setTooltip(convertedData: Object | any, data: Object | any): void;
    setModelLayout(convertedData: Object | any, data: Object | any): void;
    setSelectedItems(convertedData: Object | any, data: Object | any): void;
    setSelectorConstraints(constraints: number): void;
    setDiagramConstraints(constraints: number): number;
    setDiagramTool(tool: number): number;
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
