import { Animation, isNullOrUndefined } from '@syncfusion/ej2-base';
import { animationComplete } from '../model/constant';
import { Size, valueToCoefficient, PathOption } from '../utils/helper';
import { calculateShapes, getBox } from '../utils/helper';
/**
 * To handle the animation for gauge
 *
 * @private
 */
var Animations = /** @class */ (function () {
    function Animations(gauge) {
        this.gauge = gauge;
    }
    /**
     * To do the marker pointer animation.
     *
     * @param element - Specifies the element of the marker pointer to which animation must be propagated.
     * @param axis - Specifies the axis in which the marker pointer is available to which animation must be propagated.
     * @param pointer - Specifies the pointer to which the animation must be propagated.
     */
    Animations.prototype.performMarkerAnimation = function (element, axis, pointer) {
        var _this = this;
        var markerElement = element;
        var options;
        var timeStamp;
        var range = axis.visibleRange;
        var rectHeight = (this.gauge.orientation === 'Vertical') ? axis.lineBounds.height : axis.lineBounds.width;
        var rectY = (this.gauge.orientation === 'Vertical') ? axis.lineBounds.y : axis.lineBounds.x;
        if (this.gauge.orientation === 'Vertical') {
            pointer.bounds.y = (valueToCoefficient(pointer.currentValue, axis, this.gauge.orientation, range) * rectHeight) + rectY;
        }
        else {
            pointer.bounds.x = (valueToCoefficient(pointer.currentValue, axis, this.gauge.orientation, range) * rectHeight) + rectY;
        }
        options = new PathOption(markerElement.id, null, null, null);
        options = calculateShapes(pointer.bounds, pointer.markerType, new Size(pointer.width, pointer.height), pointer.imageUrl, options, this.gauge.orientation, axis, pointer);
        var currentValue;
        var start = typeof (pointer.startValue) === 'string' ? parseInt(pointer.startValue, 10) : pointer.startValue;
        var end = pointer.currentValue;
        start = (start === end) ? range.min : start;
        var val = Math.abs(start - end);
        var currentPath = options.d;
        var cx = options['cx'];
        var cy = options['cy'];
        var x = options['x'];
        var y = options['y'];
        new Animation({}).animate(markerElement, {
            duration: pointer.animationDuration,
            progress: function (args) {
                if (args.timeStamp >= args.delay) {
                    timeStamp = ((args.timeStamp - args.delay) / args.duration);
                    currentValue = (start < end) ? start + (timeStamp * val) : start - (timeStamp * val);
                    if (_this.gauge.orientation === 'Vertical') {
                        pointer.bounds.y = (valueToCoefficient(currentValue, axis, _this.gauge.orientation, range) *
                            rectHeight) + rectY;
                        options = calculateShapes(pointer.bounds, pointer.markerType, new Size(pointer.width, pointer.height), pointer.imageUrl, options, _this.gauge.orientation, axis, pointer);
                        if (!isNullOrUndefined(options['r'])) {
                            markerElement.setAttribute('cy', options['cy'].toString());
                        }
                        else if (!isNullOrUndefined(options['y'])) {
                            markerElement.setAttribute('y', options['y'].toString());
                        }
                        else {
                            markerElement.setAttribute('d', options.d);
                        }
                    }
                    else {
                        pointer.bounds.x = (valueToCoefficient(currentValue, axis, _this.gauge.orientation, range) *
                            rectHeight) + rectY;
                        options = calculateShapes(pointer.bounds, pointer.markerType, new Size(pointer.width, pointer.height), pointer.imageUrl, options, _this.gauge.orientation, axis, pointer);
                        if (!isNullOrUndefined(options['r'])) {
                            markerElement.setAttribute('cx', options['cx'].toString());
                        }
                        else if (!isNullOrUndefined(options['x'])) {
                            markerElement.setAttribute('x', options['x'].toString());
                        }
                        else {
                            markerElement.setAttribute('d', options.d);
                        }
                    }
                }
            },
            end: function () {
                if (!isNullOrUndefined(cy)) {
                    markerElement.setAttribute('cy', cy.toString());
                    markerElement.setAttribute('cx', cx.toString());
                }
                else if (!isNullOrUndefined(y)) {
                    markerElement.setAttribute('y', y.toString());
                    markerElement.setAttribute('x', x.toString());
                }
                else {
                    markerElement.setAttribute('d', currentPath);
                }
                pointer.isPointerAnimation = false;
                pointer.animationComplete = true;
                pointer.startValue = pointer.value = pointer.currentValue;
                _this.gauge.trigger(animationComplete, { axis: axis, pointer: pointer });
            }
        });
    };
    /**
     * Perform the bar pointer animation
     *
     * @param element
     * @param axis
     * @param pointer
     */
    Animations.prototype.performBarAnimation = function (element, axis, pointer) {
        var _this = this;
        var radix = 10;
        var timeStamp;
        var value2;
        var value1;
        var currentValue;
        var clipHeight;
        var clipY;
        var clipX;
        var clipVal;
        var clipWidth;
        var currentHeight;
        var clipElement;
        var range = axis.visibleRange;
        var pointerElement = element;
        var lineHeight = (this.gauge.orientation === 'Vertical') ? axis.lineBounds.height : axis.lineBounds.width;
        var lineY = (this.gauge.orientation === 'Vertical') ? axis.lineBounds.y : axis.lineBounds.x;
        var start = typeof (pointer.startValue) === 'string' ? parseInt(pointer.startValue, 10) : pointer.startValue;
        var end = pointer.currentValue;
        start = (start === end) ? range.min : start;
        var path = '';
        var currentPath = '';
        var tagName = pointerElement.tagName;
        var val = Math.abs(start - end);
        var pointerValue = (valueToCoefficient(end, axis, this.gauge.orientation, range) * lineHeight) + lineY;
        var startPointerVal = (valueToCoefficient(range.min, axis, this.gauge.orientation, range) *
            lineHeight) + lineY;
        var rectY = (this.gauge.orientation === 'Vertical') ? !axis.isInversed ? pointerValue : startPointerVal :
            axis.isInversed ? pointerValue : startPointerVal;
        var rectHeight = Math.abs(startPointerVal - pointerValue);
        if (this.gauge.container.type === 'Thermometer' && start === 0 && this.gauge.container.width > 0) {
            clipElement = pointerElement.parentElement.childNodes[1].childNodes[0].childNodes[0];
            if (this.gauge.orientation === 'Vertical') {
                clipY = clipElement.getAttribute('y');
                clipHeight = clipElement.getAttribute('height');
                clipVal = parseInt(clipY, radix) + parseInt(clipHeight, radix);
                clipElement.setAttribute('y', clipVal.toString());
            }
            else {
                clipX = clipElement.getAttribute('x');
                clipWidth = clipElement.getAttribute('width');
                clipVal = parseInt(clipX, radix) + parseInt(clipWidth, radix);
                clipElement.setAttribute('width', '0');
            }
        }
        path = pointer.value === axis.minimum && this.gauge.container.type === 'RoundedRectangle' ? '' : getBox(pointer.bounds, this.gauge.container.type, this.gauge.orientation, new Size(pointer.bounds.width, pointer.bounds.height), 'bar', this.gauge.container.width, axis, pointer.roundedCornerRadius);
        new Animation({}).animate(pointerElement, {
            duration: pointer.animationDuration,
            progress: function (animate) {
                if (animate.timeStamp >= animate.delay) {
                    timeStamp = ((animate.timeStamp - animate.delay) / animate.duration);
                    currentValue = (start < end) ? start + (timeStamp * val) : start - (timeStamp * val);
                    value2 = (valueToCoefficient(currentValue, axis, _this.gauge.orientation, range) * lineHeight) + lineY;
                    value1 = (valueToCoefficient(range.min, axis, _this.gauge.orientation, range) * lineHeight) + lineY;
                    currentHeight = Math.abs(value2 - value1);
                    if (_this.gauge.orientation === 'Vertical') {
                        pointer.bounds.y = (!axis.isInversed) ? value2 : value1;
                        pointer.bounds.height = currentHeight;
                    }
                    else {
                        pointer.bounds.x = (axis.isInversed) ? value2 : value1;
                        pointer.bounds.width = currentHeight;
                    }
                    if (tagName === 'path') {
                        if (start === 0 && _this.gauge.container.type === 'Thermometer') {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            (_this.gauge.orientation === 'Vertical') ?
                                clipElement.setAttribute('y', (clipVal - (timeStamp * parseInt(clipHeight, radix))).toString()) :
                                clipElement.setAttribute('width', (timeStamp * parseInt(clipWidth, radix)).toString());
                        }
                        currentPath = pointer.value === axis.minimum && _this.gauge.container.type === 'RoundedRectangle' ? '' : getBox(pointer.bounds, _this.gauge.container.type, _this.gauge.orientation, new Size(pointer.bounds.width, pointer.bounds.height), 'bar', _this.gauge.container.width, axis, pointer.roundedCornerRadius);
                        pointerElement.setAttribute('d', currentPath);
                    }
                    else {
                        if (_this.gauge.orientation === 'Vertical') {
                            pointerElement.setAttribute('y', pointer.bounds.y.toString());
                            pointerElement.setAttribute('height', pointer.bounds.height.toString());
                        }
                        else {
                            pointerElement.setAttribute('x', pointer.bounds.x.toString());
                            pointerElement.setAttribute('width', pointer.bounds.width.toString());
                        }
                    }
                }
            },
            end: function () {
                if (tagName === 'path') {
                    if (start === 0 && _this.gauge.container.type === 'Thermometer') {
                        pointerElement.parentElement.children[1].remove();
                    }
                    else {
                        pointerElement.setAttribute('d', path);
                    }
                }
                else {
                    if (_this.gauge.orientation === 'Vertical') {
                        pointerElement.setAttribute('y', rectY.toString());
                        pointerElement.setAttribute('height', rectHeight.toString());
                    }
                    else {
                        pointerElement.setAttribute('x', rectY.toString());
                        pointerElement.setAttribute('width', rectHeight.toString());
                    }
                }
                pointer.isPointerAnimation = false;
                pointer.startValue = pointer.value = pointer.currentValue;
                _this.gauge.trigger(animationComplete, { axis: axis, pointer: pointer });
            }
        });
    };
    return Animations;
}());
export { Animations };
