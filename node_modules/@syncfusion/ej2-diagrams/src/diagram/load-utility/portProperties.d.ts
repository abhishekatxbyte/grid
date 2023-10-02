import { HorizontalAlignment, PortShapes, VerticalAlignment } from "../enum/enum";
import { PortModel } from "../objects/port-model";
import { PointModel } from "../primitives/point-model";
import { EJ1SerializationModule } from "./modelProperties";
export declare class PortProperties {
    private diagram;
    private modelProperties;
    constructor(modelProperties: EJ1SerializationModule);
    setPortProperties(oldPorts: EJ1Port[]): PortModel[];
    setPortConstraints(constraints: number): number;
    setPortVisibility(visibility: number): number;
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
export interface EJ1Port extends PortModel {
    name: string;
    fillColor: string;
    borderColor: string;
    borderWidth: number;
    opacity: number;
    horizontalAlignment: HorizontalAlignment;
    verticalAlignment: VerticalAlignment;
    shape: PortShapes;
    offset: PointModel;
}
