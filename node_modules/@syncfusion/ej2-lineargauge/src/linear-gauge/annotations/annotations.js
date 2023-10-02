/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
import { createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getTemplateFunction, getElement, getElementOffset, getExtraWidth } from '../utils/helper';
import { getFontStyle, valueToCoefficient } from '../utils/helper';
import { annotationRender } from '../model/constant';
/**
 * Represent the Annotation rendering for gauge
 *
 * @hidden
 */
var Annotations = /** @class */ (function () {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function Annotations() {
    }
    /**
     * To render annotation elements.
     *
     * @param {LinearGauge} gauge - Specifies the instance of Linear Gauge.
     *
     * @private
     */
    Annotations.prototype.renderAnnotationElements = function (gauge) {
        var _this = this;
        var secondaryID = gauge.element.id + '_Secondary_Element';
        var annotationGroup = createElement('div', { id: gauge.element.id + '_AnnotationsGroup' });
        annotationGroup.style.position = 'absolute';
        annotationGroup.style.top = '0px';
        annotationGroup.style.left = '0px';
        gauge.annotations.map(function (annotation, index) {
            if (annotation.content !== null) {
                _this.createAnnotationTemplate(annotationGroup, index, gauge);
            }
        });
        if (annotationGroup.childElementCount > 0 && !(isNullOrUndefined(getElement(secondaryID)))) {
            getElement(secondaryID).appendChild(annotationGroup);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gauge.renderReactTemplates();
    };
    /**
     * To create annotation elements
     *
     * @param {HTMLElement} element - Specifies the content of the annotation to be updated in it.
     * @param {number} annotationIndex - Specifies the index number of the annotation in which the content is to be changed.
     * @param {LinearGauge} gauge - Specifies the instance of Linear Gauge.
     *
     * @private
     */
    Annotations.prototype.createAnnotationTemplate = function (element, annotationIndex, gauge) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var left;
        var top;
        var templateFn;
        var renderAnnotation = false;
        var templateElement;
        var axis;
        var axisIndex;
        var annotation = gauge.annotations[annotationIndex];
        var childElement = createElement('div', {
            id: gauge.element.id + '_Annotation_' + annotationIndex
        });
        childElement.style.cssText = 'position: absolute; z-index:' + annotation.zIndex + ';';
        var style = {
            size: annotation.font.size,
            color: annotation.font.color,
            fontFamily: annotation.font.fontFamily,
            fontWeight: annotation.font.fontWeight,
            fontStyle: annotation.font.fontStyle,
            opacity: annotation.font.opacity
        };
        var argsData = {
            cancel: false, name: annotationRender, content: annotation.content,
            annotation: annotation, textStyle: style
        };
        argsData.textStyle.color = style.color || gauge.themeStyle.labelColor;
        gauge.trigger(annotationRender, argsData, function () {
            if (!argsData.cancel) {
                templateFn = getTemplateFunction(argsData.content, gauge);
                if (templateFn && templateFn(gauge, gauge, argsData.content, gauge.element.id + '_ContentTemplate' + annotationIndex).length) {
                    templateElement = Array.prototype.slice.call(templateFn(gauge, gauge, argsData.content, gauge.element.id + '_ContentTemplate' + annotationIndex));
                    var length_1 = templateElement.length;
                    for (var i = 0; i < length_1; i++) {
                        childElement.appendChild(templateElement[i]);
                    }
                }
                else {
                    var annotationElement = createElement('div', {
                        innerHTML: !isNullOrUndefined(argsData.content) ? argsData.content.toString() : null
                    });
                    annotationElement.style.cssText = getFontStyle(argsData.textStyle);
                    childElement.appendChild(annotationElement);
                }
                var offset = getElementOffset(childElement.cloneNode(true), gauge.element);
                if (!(isNullOrUndefined(annotation.axisValue))) {
                    axisIndex = isNullOrUndefined(annotation.axisIndex) ? 0 : annotation.axisIndex;
                    axis = gauge.axes[axisIndex];
                    var range = axis.visibleRange;
                    renderAnnotation = (annotation.axisValue >= range.min && annotation.axisValue <= range.max) ? true : false;
                    var line = axis.lineBounds;
                    var extraWidth = getExtraWidth(gauge.element);
                    var axisCollection = getElement(gauge.element.id + '_Axis_Collections');
                    if (!isNullOrUndefined(axisCollection)) {
                        var transformValue = axisCollection.getAttribute('transform').split('(')[1].split(')')[0];
                        var leftTransformValue = parseInt(transformValue.split(',')[0], 10);
                        var topTransformValue = parseInt(transformValue.split(',')[1], 10);
                        if (gauge.orientation === 'Vertical') {
                            left = line.x + parseFloat(annotation.x.toString()) + leftTransformValue - extraWidth;
                            top = ((valueToCoefficient(parseFloat(annotation.axisValue.toString()), axis, gauge.orientation, range) * line.height) + line.y);
                            top += parseFloat(annotation.y.toString());
                        }
                        else {
                            left = ((valueToCoefficient(parseFloat(annotation.axisValue.toString()), axis, gauge.orientation, range) * line.width) + line.x - extraWidth);
                            left += parseFloat(annotation.x.toString());
                            top = line.y + parseFloat(annotation.y.toString()) + topTransformValue;
                        }
                        left -= (offset.width / 2);
                        top -= (offset.height / 2);
                    }
                }
                else {
                    var elementRect = gauge.element.getBoundingClientRect();
                    var bounds = gauge.svgObject.getBoundingClientRect();
                    renderAnnotation = true;
                    left = Math.abs(bounds.left - elementRect.left);
                    top = Math.abs(bounds.top - elementRect.top);
                    left = (annotation.horizontalAlignment === 'None') ? (left + annotation.x) : left;
                    top = (annotation.verticalAlignment === 'None') ? top + annotation.y : top;
                    switch (annotation.verticalAlignment) {
                        case 'Near':
                            top = top + annotation.y;
                            break;
                        case 'Center':
                            top = top + annotation.y + ((bounds.height / 2) - (offset.height / 2));
                            break;
                        case 'Far':
                            top = (top + bounds.height) + annotation.y - offset.height;
                            break;
                    }
                    switch (annotation.horizontalAlignment) {
                        case 'Near':
                            left = left + annotation.x;
                            break;
                        case 'Center':
                            left = left + annotation.x + ((bounds.width / 2) - (offset.width / 2));
                            break;
                        case 'Far':
                            left = (left + bounds.width) + annotation.x - offset.width;
                            break;
                    }
                }
                childElement.style.left = left + 'px';
                childElement.style.top = top + 'px';
                if (renderAnnotation) {
                    element.appendChild(childElement);
                }
            }
        });
    };
    /*
     * Get module name.
     */
    Annotations.prototype.getModuleName = function () {
        return 'Annotations';
    };
    /**
     * To destroy the annotation.
     *
     * @return {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Annotations.prototype.destroy = function () { };
    return Annotations;
}());
export { Annotations };
