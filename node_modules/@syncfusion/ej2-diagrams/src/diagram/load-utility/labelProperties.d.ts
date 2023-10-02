import { HorizontalAlignment, TextAlign, TextDecoration, TextWrap, VerticalAlignment } from "../enum/enum";
import { AnnotationModel } from "../objects/annotation-model";
import { EJ1SerializationModule } from "./modelProperties";
export declare class LabelProperties {
    private diagram;
    private modelProperties;
    constructor(modelProperties: EJ1SerializationModule);
    setLabelProperties(oldLabels: AnnotationModel[], item: Object): AnnotationModel[];
    setLabelConstraints(constraints: number): number;
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
export interface labels extends AnnotationModel {
    name: string;
    fillColor: string;
    fontFamily: string;
    fontSize: number;
    italic: boolean;
    bold: boolean;
    borderColor: string;
    borderWidth: number;
    opacity: number;
    visible: boolean;
    horizontalAlignment: HorizontalAlignment;
    verticalAlignment: VerticalAlignment;
    textWrapping: TextWrap;
    textAlign: TextAlign;
    textDecoration: TextDecoration;
}
