import { AnnotationConstraints } from "../enum/enum";
var LabelProperties = /** @class */ (function () {
    function LabelProperties(modelProperties) {
        this.modelProperties = modelProperties;
    }
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update and assign the annotation properties from EJ1 to EJ2
    LabelProperties.prototype.setLabelProperties = function (oldLabels, item) {
        var labelCollection = [];
        if (oldLabels.length > 0) {
            for (var i = 0; i < oldLabels.length; i++) {
                var label = oldLabels[parseInt(i.toString(), 10)];
                var newLabel = {};
                (newLabel).style = {};
                if (label.name) {
                    newLabel.id = label.name;
                }
                if (label.addInfo) {
                    newLabel.addInfo = label.addInfo;
                }
                if (label.content) {
                    newLabel.content = label.content;
                }
                if (label.constraints) {
                    newLabel.constraints = this.setLabelConstraints(label.constraints);
                }
                //  if (label.readOnly)
                //      newLabel.constraints = newLabel.constraints | AnnotationConstraints.ReadOnly;
                if (label.dragLimit) {
                    newLabel.dragLimit = { left: label.dragLimit.left, right: label.dragLimit.right, top: label.dragLimit.top, bottom: label.dragLimit.bottom };
                }
                if (label.height) {
                    newLabel.height = label.height;
                }
                if (label.horizontalAlignment) {
                    newLabel.horizontalAlignment = label.horizontalAlignment;
                }
                if (label.verticalAlignment) {
                    newLabel.verticalAlignment = label.verticalAlignment;
                }
                if (label.hyperlink) {
                    newLabel.hyperlink = label.hyperlink;
                }
                if (label.margin) {
                    newLabel.margin = { left: label.margin.left, right: label.margin.right, top: label.margin.top, bottom: label.margin.bottom };
                }
                if (label.rotateAngle) {
                    newLabel.rotateAngle = label.rotateAngle;
                }
                if (label.fillColor) {
                    newLabel.style.color = label.fillColor;
                }
                if (label.fontFamily) {
                    newLabel.style.fontFamily = label.fontFamily;
                }
                if (label.fontSize) {
                    newLabel.style.fontSize = label.fontSize;
                }
                if (label.italic) {
                    newLabel.style.italic = label.italic;
                }
                if (label.bold) {
                    newLabel.style.bold = label.bold;
                }
                if (label.borderColor) {
                    newLabel.style.strokeColor = label.borderColor;
                }
                if (label.borderWidth) {
                    newLabel.style.strokeWidth = label.borderWidth;
                }
                if (label.textWrapping) {
                    newLabel.style.textWrapping = label.textWrapping;
                }
                if (label.textAlign) {
                    newLabel.style.textAlign = label.textAlign;
                }
                if (label.textDecoration) {
                    newLabel.style.textDecoration = label.textDecoration;
                }
                if (label.fillColor) {
                    newLabel.style.fill = label.fillColor === 'white' ? 'transparent' : label.fillColor;
                }
                if (label.opacity) {
                    newLabel.style.opacity = label.opacity;
                }
                //  if (label.templateId)
                //  newLabel.template = getTemplateContent(label.templateId);
                if (label.visible) {
                    newLabel.visibility = label.visible;
                }
                if (label.width) {
                    newLabel.width = label.width;
                }
                labelCollection.push(newLabel);
            }
        }
        return labelCollection;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the annotation constraints from EJ1 to EJ2
    LabelProperties.prototype.setLabelConstraints = function (constraints) {
        var annotationConstraints = AnnotationConstraints.None;
        if (constraints & AnnotationConstraints.Select) {
            annotationConstraints = annotationConstraints | AnnotationConstraints.Select;
        }
        if (constraints & AnnotationConstraints.Drag) {
            annotationConstraints = annotationConstraints | AnnotationConstraints.Drag;
        }
        if (constraints & AnnotationConstraints.Resize) {
            annotationConstraints = annotationConstraints | AnnotationConstraints.Resize;
        }
        if (constraints & AnnotationConstraints.Rotate) {
            annotationConstraints = annotationConstraints | AnnotationConstraints.Rotate;
        }
        return annotationConstraints;
    };
    /**
*To destroy the ruler
*
* @returns {void} To destroy the ruler
*/
    LabelProperties.prototype.destroy = function () {
        /**
         * Destroys the Node properties module
         */
    };
    /**
 * Get module name.
 */
    LabelProperties.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'LabelProperties';
    };
    return LabelProperties;
}());
export { LabelProperties };
