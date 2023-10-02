import { AnnotationModel } from "../objects/annotation-model";
import { NodeModel } from "../objects/node-model";
import { LabelProperties } from "./labelProperties";
import { PortProperties } from "./portProperties";
export declare class NodeProperties {
    labelProperties: LabelProperties;
    portProperties: PortProperties;
    private diagram;
    constructor(labelProperties: LabelProperties, portProperties: PortProperties);
    renderNodesCollection(convertedData: any, data: any): NodeModel;
    convertToNode(node: NodeModel): NodeModel;
    getChildren(newNode: NodeModel, node: NodeModel): any;
    setShape(newNode: any, node: any): any;
    getImageContentAlignment(option: string): string;
    setNodeConstraints(constraints: number): number;
    setGradient(gradient: any): any;
    getGradientStops(gradientStops: any[]): any[];
    renderBpmnShape(newNode: any, node: any): any;
    renderSwimlaneShape(newNode: any, node: any): any;
    renderEventsCollection(subProcessEvents: any): any;
    renderProcessesCollection(node: any): any[];
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
export interface EJ1Node extends NodeModel {
    name: string;
    labels: AnnotationModel[];
    fillColor: string;
    borderDashArray: string;
    opacity: number;
    gradient: string;
    zOrder: number;
    marginLeft: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    horizontalAlign: EJ1HorizontalAlignment;
    verticalAlign: EJ1VerticalAlignment;
}
export declare type EJ1HorizontalAlignment = 
/**
* Stretch - Stretches the diagram element throughout its immediate parent
*/
'Stretch' | 
/**
 * Left - Aligns the diagram element at the left of its immediate parent
 */
'Left' | 
/**
 * Right - Aligns the diagram element at the right of its immediate parent
 */
'Right' | 
/**
 * Center - Aligns the diagram element at the center of its immediate parent
 */
'Center' | 
/**
 * Auto - Aligns the diagram element based on the characteristics of its immediate parent
 */
'Auto';
/**
* Defines how the diagram elements have to be aligned with respect to its immediate parent
* * Stretch - Stretches the diagram element throughout its immediate parent
* * Top - Aligns the diagram element at the top of its immediate parent
* * Bottom - Aligns the diagram element at the bottom of its immediate parent
* * Center - Aligns the diagram element at the center of its immediate parent
* * Auto - Aligns the diagram element based on the characteristics of its immediate parent
*/
export declare type EJ1VerticalAlignment = 
/**
 * Stretch - Stretches the diagram element throughout its immediate parent
 */
'Stretch' | 
/**
 * Top - Aligns the diagram element at the top of its immediate parent
 */
'Top' | 
/**
 * Bottom - Aligns the diagram element at the bottom of its immediate parent
 */
'Bottom' | 
/**
 * Center - Aligns the diagram element at the center of its immediate parent
 */
'Center' | 
/**
 * Auto - Aligns the diagram element based on the characteristics of its immediate parent
 */
'Auto';
