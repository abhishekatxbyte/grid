import { stringToNumber, textElement, appendPath, getAngleFromValue, getLocationFromAngle, getRoundedPathArc, calculateShapes, PathOption, Size, TextOption } from '../utils/helper-common';
import { linear, getCompleteArc } from '../utils/helper-pointer-renderer';
import { Animation, isNullOrUndefined } from '@syncfusion/ej2-base';
import { animationComplete } from '../model/constants';
/**
 * Specifies the Axis rendering for circular gauge
 */
var PointerRenderer = /** @class */ (function () {
    /**
     * Constructor for pointer renderer.
     *
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @private.
     */
    function PointerRenderer(gauge) {
        this.gauge = gauge;
    }
    /**
     * Method to render the axis pointers of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {number} axisIndex - Specifies the axis index.
     * @param {Element} element - Specifies the element.
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @param {boolean} animate - Specifies the boolean value.
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.drawPointers = function (axis, axisIndex, element, gauge, animate) {
        var _this = this;
        if (animate === void 0) { animate = true; }
        var pointerElement = gauge.renderer.createGroup({
            id: gauge.element.id + '_Axis_Pointers_' + axisIndex
        });
        var childElement;
        if (this.gauge.allowComponentRender) {
            axis.pointers.map(function (pointer, pointerIndex) {
                if (!isNullOrUndefined(pointer.offset) && pointer.offset.length > 0) {
                    pointer.currentDistanceFromScale = stringToNumber(pointer.offset, axis.currentRadius);
                }
                else {
                    pointer.currentDistanceFromScale = pointer.offset;
                }
                pointer.pathElement = [];
                _this.calculatePointerRadius(axis, pointer);
                childElement = gauge.renderer.createGroup({
                    id: gauge.element.id + '_Axis_' + axisIndex + '_Pointer_' + pointerIndex
                });
                _this['draw' + pointer.type + 'Pointer'](axis, axisIndex, pointerIndex, childElement, gauge);
                _this.setPointerValue(axis, pointer, pointer.currentValue);
                pointerElement.appendChild(childElement);
                if ((animate || pointer.animation.enable) && (!_this.gauge.isPropertyChange || pointer.isPointerAnimation)) {
                    pointer.previousValue = !_this.gauge.isPropertyChange ? axis.minimum : pointer.previousValue;
                    _this.doPointerAnimation(childElement, pointer, axis);
                }
            });
            element.appendChild(pointerElement);
        }
    };
    /**
     * Measure the pointer length of the circular gauge.
     *
     * @returns {void}
     */
    PointerRenderer.prototype.calculatePointerRadius = function (axis, pointer) {
        var padding = 5;
        pointer.currentRadius = !isNullOrUndefined(pointer.radius) ?
            stringToNumber(pointer.radius, axis.currentRadius) : pointer.position !== 'Auto' ?
            this.pointerRadiusForPosition(axis, pointer) : (axis.currentRadius - (axis.farSize + padding));
    };
    /**
     * Measure the pointer length of the circular gauge based on pointer position.
     *
     * @returns {number}
     */
    PointerRenderer.prototype.pointerRadiusForPosition = function (axis, pointer) {
        if (pointer.markerShape === 'Text') {
            var pointerRadius = void 0;
            var pointerSize = parseInt(pointer.textStyle.size, 10);
            var markerOffset = pointer.position === 'Cross' ? pointerSize / 5 : 0;
            // eslint-disable-next-line prefer-const
            pointerRadius = pointer.position === 'Inside' ?
                (axis.currentRadius - pointerSize / 1.2 - axis.lineStyle.width / 2 - markerOffset - pointer.currentDistanceFromScale) :
                pointer.position === 'Outside' ?
                    (axis.currentRadius + axis.lineStyle.width / 2 + pointerSize / 4 + markerOffset +
                        pointer.currentDistanceFromScale) :
                    (axis.currentRadius - pointerSize / 6 - markerOffset - pointer.currentDistanceFromScale);
            return pointerRadius;
        }
        else {
            var pointerRadius = void 0;
            var rangeBarOffset = pointer.type === 'RangeBar' ? pointer.pointerWidth : 0;
            var markerOffset = pointer.type === 'Marker' ? ((pointer.markerShape === 'InvertedTriangle' ||
                pointer.markerShape === 'Triangle') ? (pointer.position === 'Cross' ? pointer.markerWidth / 2 : 0) :
                pointer.markerWidth / 2) : 0;
            // eslint-disable-next-line prefer-const
            pointerRadius = pointer.position === 'Inside' ?
                (axis.currentRadius - axis.lineStyle.width / 2 - markerOffset - pointer.currentDistanceFromScale) :
                pointer.position === 'Outside' ?
                    (axis.currentRadius + rangeBarOffset + axis.lineStyle.width / 2 + markerOffset + pointer.currentDistanceFromScale) :
                    (axis.currentRadius + rangeBarOffset / 2 - pointer.currentDistanceFromScale -
                        ((pointer.markerShape === 'InvertedTriangle' || pointer.markerShape === 'Triangle') ? markerOffset : 0));
            return pointerRadius;
        }
    };
    /**
     * Method to render the needle pointer of the ciruclar gauge.
     *
     * @param {Axis} axis - Specifies the axis
     * @param {number} axisIndex - Specifies the axis index.
     * @param {number} index - Specifies the index.
     * @param {Element} parentElement - Specifies the parent element.
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @returns {void}
     */
    PointerRenderer.prototype.drawNeedlePointer = function (axis, axisIndex, index, parentElement, gauge) {
        var pointer = axis.pointers[index];
        var needle = pointer.needleTail;
        var cap = pointer.cap;
        var pointerRadius;
        var location;
        var direction;
        var needleStartWidth = pointer.needleStartWidth;
        var needleEndWidth = pointer.needleEndWidth;
        var mid = gauge.midPoint;
        var width = pointer.pointerWidth / 2;
        var rectDirection;
        var gradientColor;
        var gradientTailColor;
        var gradientCapColor;
        // To render the needle
        location = getLocationFromAngle(0, pointer.currentRadius, mid);
        if ((needleStartWidth === 0) && (needleEndWidth === 0) && width) {
            direction = 'M ' + mid.x + ' ' + (mid.y) + ' L ' + (location.x) + ' ' + mid.y +
                ' L ' + (mid.x) + ' ' + (mid.y) + ' Z';
        }
        else {
            direction = 'M ' + mid.x + ' ' + (mid.y - width - needleEndWidth) + ' L ' + (location.x) + ' ' + mid.y +
                ' L ' + location.x + ' ' + (mid.y + needleStartWidth) + ' L ' + mid.x + ' ' + (mid.y + width + needleEndWidth) + ' Z';
        }
        if (gauge.gradientModule) {
            gradientColor = gauge.gradientModule.getGradientColorString(pointer);
        }
        pointer.pathElement.push(appendPath(new PathOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_Needle_' + index, gradientColor ? gradientColor :
            pointer.color || this.gauge.themeStyle.needleColor, pointer.border.width, pointer.border.color, null, pointer.border.dashArray, direction), parentElement, gauge));
        // eslint-disable-next-line prefer-const
        pointerRadius = stringToNumber(pointer.needleTail.length, pointer.currentRadius);
        // To render the rect element for touch
        rectDirection = 'M ' + mid.x + ' ' + (mid.y - width) + ' L ' + (location.x) + ' ' + (mid.y - width) +
            ' L ' + location.x + ' ' + (mid.y + width) + ' L ' + mid.x + ' ' + (mid.y + width);
        // To render the needle tail
        if (gauge.gradientModule) {
            gradientTailColor = gauge.gradientModule.getGradientColorString(needle);
        }
        if (pointerRadius) {
            location = getLocationFromAngle(180, pointerRadius, gauge.midPoint);
            direction = 'M ' + mid.x + ' ' + (mid.y - width) +
                ' L ' + (location.x) + ' ' + (mid.y - width) +
                ' L ' + (location.x) + ' ' + (mid.y + width) +
                ' L ' + (mid.x) + ' ' + (mid.y + width) + ' Z';
            pointer.pathElement.push(appendPath(new PathOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_NeedleTail_' + index, gradientTailColor ? gradientTailColor : pointer.needleTail.color || this.gauge.themeStyle.needleTailColor, pointer.needleTail.border.width, pointer.needleTail.border.color, null, pointer.needleTail.border.dashArray, direction), parentElement, gauge));
            rectDirection += ' L ' + location.x + ' ' + (mid.y + width) + ' L ' + location.x + ' ' + (mid.y - width);
        }
        // To render the cap
        if (gauge.gradientModule) {
            gradientCapColor = gauge.gradientModule.getGradientColorString(cap);
        }
        if (pointer.cap.radius) {
            pointer.pathElement.push(appendPath(calculateShapes(mid, 'Circle', new Size(pointer.cap.radius * 2, pointer.cap.radius * 2), '', new PathOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_NeedleCap_' + index, gradientCapColor ? gradientCapColor : pointer.cap.color || this.gauge.themeStyle.capColor, pointer.cap.border.width, pointer.cap.border.color, null, pointer.cap.border.dashArray, '', '')), parentElement, gauge, 'Ellipse'));
        }
        pointer.pathElement.push(appendPath(new PathOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_NeedleRect_' + index, 'transparent', 0, 'transpanret', null, '0', rectDirection + ' Z'), parentElement, gauge));
    };
    /**
     * Method to set the pointer value of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {Pointer} pointer - Specifies the pointer.
     * @param {number} value - Specifies the value.
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.setPointerValue = function (axis, pointer, value) {
        var _this = this;
        var checkMinValue = value === axis.visibleRange.min && pointer.type === 'RangeBar';
        var location = this.gauge.midPoint;
        var isClockWise = axis.direction === 'ClockWise';
        var radius = pointer.roundedCornerRadius;
        var minRadius = (radius * 0.25);
        if (radius > 0 && radius <= 5) {
            radius = 6;
            minRadius = (radius * 0.25);
        }
        var startAngle = getAngleFromValue(axis.visibleRange.min, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
        var endAngle = getAngleFromValue(value, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
        if (isClockWise) {
            if (startAngle > endAngle) {
                endAngle = Math.round(startAngle) === Math.round(endAngle) && !checkMinValue ?
                    Math.round(endAngle) - (pointer.roundedCornerRadius > 0 ? 1.5 : 0.5) : Math.round(endAngle);
            }
            else {
                endAngle = startAngle === endAngle && !checkMinValue ? endAngle + 1 : endAngle;
            }
        }
        else {
            endAngle = Math.round(startAngle) === Math.round(endAngle) && !checkMinValue ?
                [startAngle, startAngle = (endAngle > startAngle ? endAngle + (pointer.roundedCornerRadius > 0 ? 1.5 : 0.5) : endAngle - 1)][0]
                : [startAngle, startAngle = endAngle][0];
        }
        if (value <= (axis.visibleRange.min + axis.visibleRange.interval) && pointer.roundedCornerRadius) {
            radius = value === axis.visibleRange.min || (axis.visibleRange.min + 1) ? 8 : radius;
            radius /= 2;
            minRadius = radius * 0.25;
        }
        var oldStartValue = ((((pointer.currentRadius - (pointer.pointerWidth / 2)) * ((startAngle * Math.PI) / 180) -
            (radius / minRadius)) / (pointer.currentRadius - (pointer.pointerWidth / 2))) * 180) / Math.PI;
        var oldEndValue = ((((pointer.currentRadius - (pointer.pointerWidth / 2)) * ((endAngle * Math.PI) / 180) +
            (radius / minRadius)) / (pointer.currentRadius - (pointer.pointerWidth / 2))) * 180) / Math.PI;
        var angleValue = value === axis.maximum && (axis.startAngle === axis.endAngle ||
            Math.abs(axis.startAngle - axis.endAngle) === 360) && pointer.type === 'RangeBar' ? 45 : 180;
        var roundStartAngle = ((((pointer.currentRadius) * ((startAngle * Math.PI) / angleValue) +
            radius) / (pointer.currentRadius)) * angleValue) / Math.PI;
        var roundEndAngle = ((((pointer.currentRadius) * ((endAngle * Math.PI) / angleValue) -
            radius) / (pointer.currentRadius)) * angleValue) / Math.PI;
        if (roundStartAngle > roundEndAngle && (roundStartAngle - roundEndAngle) <= 36 && pointer.type === 'RangeBar') {
            roundStartAngle = startAngle;
            roundEndAngle = endAngle;
        }
        if (isNullOrUndefined(pointer.currentRadius)) {
            this.calculatePointerRadius(axis, pointer);
        }
        pointer.pathElement.map(function (element) {
            if (pointer.type === 'RangeBar') {
                if (radius && !checkMinValue) {
                    element.setAttribute('d', getRoundedPathArc(location, Math.floor(roundStartAngle), Math.ceil(roundEndAngle), oldStartValue, oldEndValue, pointer.currentRadius, pointer.pointerWidth, pointer.pointerWidth));
                    radius = 0;
                }
                else {
                    element.setAttribute('d', getCompleteArc(location, startAngle, endAngle, pointer.currentRadius, (pointer.currentRadius - pointer.pointerWidth), checkMinValue));
                }
            }
            else {
                if (pointer.type === 'Marker' && pointer.markerShape === 'Text') {
                    _this.calculateTextElement(axis, pointer, value, element);
                }
                else {
                    element.setAttribute('transform', 'rotate(' + getAngleFromValue(value, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise) + ',' + location.x + ',' + location.y + ')');
                }
            }
            element.setAttribute('aria-label', pointer.description || 'Pointer:' + value.toString());
        });
    };
    /**
     * Method to set the text value of the circular gauge.
     *
     * @param {Axis} axis - Specifies the axis.
     * @param {Pointer} pointer - Specifies the pointer.
     * @param {number} value - Specifies the value.
     * @param {Element} element - Specifies the text element.
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.calculateTextElement = function (axis, pointer, value, element) {
        var textangle = getAngleFromValue(value, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise');
        var textlocation = getLocationFromAngle(textangle, pointer.currentRadius, this.gauge.midPoint);
        element.setAttribute('transform', 'rotate(' + (textangle + 90) + ',' + textlocation.x + ',' + textlocation.y + ')');
        element.setAttribute('x', String(textlocation.x));
        element.setAttribute('y', String(textlocation.y));
    };
    /**
     * Method to render the marker pointer of the ciruclar gauge.
     *
     * @param {Axis} axis - Specifies the axis
     * @param {number} axisIndex - Specifies the axis index.
     * @param {number} index - Specifies the index.
     * @param {Element} parentElement - Specifies the parent element.
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @returns {void}
     */
    PointerRenderer.prototype.drawMarkerPointer = function (axis, axisIndex, index, parentElement, gauge) {
        var pointer = axis.pointers[index];
        var min = axis.visibleRange.min;
        var max = axis.visibleRange.max;
        var gradientMarkerColor;
        var angle = Math.round(getAngleFromValue(pointer.value, max, min, axis.startAngle, axis.endAngle, axis.direction === 'ClockWise'));
        var shapeBasedOnPosition = pointer.markerShape;
        if (gauge.gradientModule) {
            gradientMarkerColor = gauge.gradientModule.getGradientColorString(pointer);
        }
        if (isNullOrUndefined(pointer.radius) && !isNullOrUndefined(pointer.position) && (pointer.markerShape === 'InvertedTriangle' ||
            pointer.markerShape === 'Triangle')) {
            shapeBasedOnPosition = ((pointer.position === 'Outside' || pointer.position === 'Cross') && pointer.markerShape === 'Triangle' ?
                'InvertedTriangle' : (pointer.position === 'Inside' &&
                pointer.markerShape === 'InvertedTriangle' ? 'Triangle' : pointer.markerShape));
        }
        var location = getLocationFromAngle((pointer.markerShape === 'Text') ? angle : 0, pointer.currentRadius, gauge.midPoint);
        if (pointer.markerShape === 'Text') {
            var style = {
                size: pointer.textStyle.size,
                color: pointer.textStyle.color || this.gauge.themeStyle.pointerColor,
                fontFamily: pointer.textStyle.fontFamily,
                fontStyle: pointer.textStyle.fontStyle,
                fontWeight: pointer.textStyle.fontWeight || this.gauge.themeStyle.fontWeight,
                opacity: pointer.textStyle.opacity
            };
            var textOption = new TextOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_Marker_' + index, location.x, location.y, 'middle', pointer.text, 'rotate(' + (angle + 90) + ',' +
                (location.x) + ',' + location.y + ')', 'auto');
            var textObject = textElement(textOption, style, style.color, parentElement, 'pointer-events : auto; ');
            textObject.style.visibility = (pointer.animation.enable && (!this.gauge.isPropertyChange || pointer.isPointerAnimation) && this.gauge.animatePointer) ? 'hidden' : 'visible';
            pointer.pathElement.push(textObject);
        }
        else {
            pointer.pathElement.push(appendPath(calculateShapes(location, shapeBasedOnPosition, new Size(pointer.markerWidth, pointer.markerHeight), pointer.imageUrl, new PathOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_Marker_' + index, gradientMarkerColor ? gradientMarkerColor : pointer.color || this.gauge.themeStyle.pointerColor, pointer.border.width, pointer.border.color, null, pointer.border.dashArray, '', '')), parentElement, gauge, pointer.markerShape === 'Circle' ? 'Ellipse' : (pointer.markerShape === 'Image' ? 'Image' : 'Path')));
        }
    };
    /**
     * Method to render the range bar pointer of the ciruclar gauge.
     *
     * @param {Axis} axis - Specifies the axis
     * @param {number} axisIndex - Specifies the axis index.
     * @param {number} index - Specifies the index.
     * @param {Element} parentElement - Specifies the parent element.
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @returns {void}
     */
    PointerRenderer.prototype.drawRangeBarPointer = function (axis, axisIndex, index, parentElement, gauge) {
        var pointer = axis.pointers[index];
        var gradientBarColor;
        if (gauge.gradientModule) {
            gradientBarColor = gauge.gradientModule.getGradientColorString(pointer);
        }
        pointer.pathElement.push(appendPath(new PathOption(gauge.element.id + '_Axis_' + axisIndex + '_Pointer_RangeBar_' + index, gradientBarColor ? gradientBarColor :
            pointer.color || this.gauge.themeStyle.pointerColor, pointer.border.width, pointer.border.color, 1, pointer.border.dashArray, ''), parentElement, gauge));
    };
    /**
     * Method to perform the animation of the pointer in circular gauge.
     *
     * @param {Element} pointerElement - specifies the pointer element.
     * @param {Pointer} pointer - Specifies the pointer.
     * @param {Axis} axis - Specifies the axis.
     * @returns {void}
     */
    PointerRenderer.prototype.doPointerAnimation = function (pointerElement, pointer, axis) {
        var _this = this;
        var startValue = !isNullOrUndefined(pointer.previousValue) ? pointer.previousValue : axis.visibleRange.min;
        var endValue = pointer.currentValue;
        if (pointer.animation.enable && startValue !== endValue && this.gauge.animatePointer) {
            pointer.pathElement.map(function (element) {
                if (pointer.type === 'RangeBar') {
                    _this.performRangeBarAnimation(element, startValue, endValue, axis, pointer);
                }
                else {
                    if (pointer.type === 'Marker' && pointer.markerShape === 'Text') {
                        _this.performTextAnimation(pointerElement, startValue, endValue, axis, pointer);
                    }
                    else {
                        _this.performNeedleAnimation(element, startValue, endValue, axis, pointer);
                    }
                }
            });
        }
    };
    /**
     * @param {HTMLElement} element - specifies the element.
     * @param {number} start - specifies the start.
     * @param {number} end - specifies the end.
     * @param {Axis} axis - specifies the axis.
     * @param {Pointer} pointer - specfies the pointer.
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.performTextAnimation = function (element, start, end, axis, pointer) {
        var _this = this;
        var isClockWise = axis.direction === 'ClockWise';
        var textangle;
        var textlocation;
        var pointerValue = 0;
        var timeStamp;
        start = typeof (start) === 'string' ? parseInt(start, 10) : start;
        end = typeof (end) === 'string' ? parseInt(end, 10) : end;
        element = !isNullOrUndefined(element.children[0]) ? element.children[0] : element;
        var val = Math.abs(start - end);
        new Animation({}).animate(element, {
            duration: pointer.animation.duration,
            progress: function (args) {
                if (args.timeStamp > args.delay) {
                    timeStamp = (args.timeStamp / pointer.animation.duration);
                    pointerValue = end > start ? start + (timeStamp * val) : start - (timeStamp * val);
                    textangle = getAngleFromValue(pointerValue, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
                    textlocation = getLocationFromAngle(textangle, pointer.currentRadius, _this.gauge.midPoint);
                    element.setAttribute('transform', 'rotate(' + (textangle + 90) + ',' + textlocation.x + ',' + textlocation.y + ')');
                    element.setAttribute('x', String(textlocation.x));
                    element.setAttribute('y', String(textlocation.y));
                    element.style.visibility = 'visible';
                }
            },
            end: function () {
                _this.setPointerValue(axis, pointer, end);
                pointer.isPointerAnimation = false;
                _this.gauge.trigger(animationComplete, { axis: axis, pointer: pointer });
            }
        });
    };
    /**
     * Perform the needle and marker pointer animation for circular gauge.
     *
     * @param {HTMLElement} element - Specifies the element
     * @param {number} start - Specifies the start
     * @param {number} end - Specifies the end
     * @param {Axis} axis - Specifies the axis
     * @param {Pointer} pointer - Specifies the pointer.
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.performNeedleAnimation = function (element, start, end, axis, pointer) {
        var _this = this;
        var isClockWise = axis.direction === 'ClockWise';
        start = typeof (start) === 'string' ? parseInt(start, 10) : start;
        end = typeof (end) === 'string' ? parseInt(end, 10) : end;
        var startAngle = getAngleFromValue(start, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
        var pointAngle = getAngleFromValue(end, axis.visibleRange.max, axis.visibleRange.min, axis.startAngle, axis.endAngle, isClockWise);
        var endAngle = startAngle > pointAngle ? (pointAngle + 360) : pointAngle;
        var sweepAngle;
        new Animation({}).animate(element, {
            duration: pointer.animation.duration,
            progress: function (args) {
                sweepAngle = (start < end || Math.round(startAngle) === Math.round(endAngle)) ?
                    isClockWise ? (endAngle - startAngle) : (endAngle - startAngle - 360) :
                    isClockWise ? (endAngle - startAngle - 360) : (endAngle - startAngle);
                element.style.animation = 'None';
                if (start !== end) {
                    element.setAttribute('transform', 'rotate(' + linear(args.timeStamp, startAngle, sweepAngle, args.duration) + ',' +
                        _this.gauge.midPoint.x.toString() + ',' + _this.gauge.midPoint.y.toString() + ')');
                }
            },
            end: function () {
                _this.setPointerValue(axis, pointer, end);
                pointer.isPointerAnimation = false;
                if (pointer.type === 'Marker' || (element.id.indexOf('_Pointer_NeedleCap') >= 0)) {
                    _this.gauge.trigger(animationComplete, { axis: axis, pointer: pointer });
                }
            }
        });
    };
    /**
     * Perform the range bar pointer animation for circular gauge.
     *
     * @param {HTMLElement} element - Specifies the element.
     * @param {number} start - Specifies the start.
     * @param {number} end - Specifies the end.
     * @param {Axis} axis - Specifies the axis.
     * @param {Pointer} pointer - Specifies the pointer.
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.performRangeBarAnimation = function (element, start, end, axis, pointer) {
        var _this = this;
        start = typeof (start) === 'string' ? parseInt(start, 10) : start;
        end = typeof (end) === 'string' ? parseInt(end, 10) : end;
        var pointerValue;
        var timeStamp;
        var val = Math.abs(start - end);
        new Animation({}).animate(element, {
            duration: pointer.animation.duration,
            progress: function (arg) {
                timeStamp = (arg.timeStamp / arg.duration);
                pointerValue = end > start ? start + (timeStamp * val) : start - (timeStamp * val);
                _this.setPointerValue(axis, pointer, pointerValue);
            },
            end: function () {
                _this.setPointerValue(axis, pointer, end);
                pointer.isPointerAnimation = false;
                _this.gauge.trigger(animationComplete, { axis: axis, pointer: pointer });
            }
        });
    };
    /**
     *
     * @returns {void}
     * @private
     */
    PointerRenderer.prototype.destroy = function () {
        this.gauge = null;
    };
    return PointerRenderer;
}());
export { PointerRenderer };
