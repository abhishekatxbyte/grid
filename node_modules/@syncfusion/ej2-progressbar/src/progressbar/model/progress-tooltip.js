import { Tooltip as SVGTooltip } from '@syncfusion/ej2-svg-base';
import { Animation } from '@syncfusion/ej2-base';
import { effect, ProgressLocation } from '../utils/helper';
import { tooltipRender } from './constant';
/**
 * class for tooltip.
 */
var ProgressTooltip = /** @class */ (function () {
    /**
     * Constructor for progress tooltip.
     *
     * @param {ProgressBar} control
     */
    function ProgressTooltip(control) {
        // Defines text collection passed to svg tooltip.
        this.text = [];
        this.control = control;
    }
    /**
     * Method to render the tooltip for progress bar.
     */
    ProgressTooltip.prototype.tooltip = function (e) {
        var svgElement = document.getElementById(this.control.element.id + '_tooltip');
        var isTooltip = (svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0);
        this.renderTooltip(e, this.control, !isTooltip);
        if (this.control.tooltip.enable && this.control.type === 'Circular' && this.control.animation.enable && !(this.control.tooltip.showTooltipOnHover)) {
            svgElement.style.visibility = 'hidden';
            var delay = this.control.secondaryProgress ? this.control.circular.delay + this.control.animation.duration :
                this.control.animation.duration;
            this.tooltipDelay(this.control, svgElement, delay);
        }
        if (this.control.animation.enable && !(this.control.tooltip.showTooltipOnHover) && !(this.control.type === 'Circular')) {
            var delay = this.control.secondaryProgress ? this.control.linear.delay : this.control.animation.delay;
            if (this.control.secondaryProgress) {
                svgElement.style.visibility = 'hidden';
            }
            this.toolTipAnimation(svgElement, this.control, delay);
        }
    };
    /**
     * Function to delay tooltip at initial stage of circular progress.
     */
    ProgressTooltip.prototype.tooltipDelay = function (progress, element, delay) {
        var animation = new Animation({});
        animation.animate(element, {
            duration: progress.animation.duration,
            delay: delay,
            progress: function (args) {
                args.element.style.visibility = 'visible';
            }
        });
    };
    /**
     * Function to animate tooltip.
     */
    ProgressTooltip.prototype.toolTipAnimation = function (element, progress, delay) {
        var _this = this;
        var animation = new Animation({});
        var endValue = parseInt(element.style.left, 10);
        var tooltipSVG = document.getElementById(this.control.element.id + '_tooltip_svg');
        var width = parseInt(tooltipSVG.getAttribute('width'), 10);
        animation.animate(element, {
            duration: progress.animation.duration,
            delay: delay,
            progress: function (args) {
                progress.cancelResize = true;
                args.name = 'SlideRight';
                if (progress.type === 'Linear') {
                    if (args.timeStamp >= args.delay) {
                        args.element.style.visibility = 'visible';
                        var value = effect(args.timeStamp, (0 - (width / 2 - _this.control.progressRect.x - 5)), endValue + (width / 2 - _this.control.progressRect.x - 5), args.duration, progress.enableRtl);
                        args.element.style.left = '';
                        args.element.style.left = value + 'px'.toString();
                    }
                }
            },
            end: function (args) {
                progress.cancelResize = false;
                args.element.style.left = '';
                args.element.style.left = endValue + 'px'.toString();
            }
        });
    };
    ProgressTooltip.prototype.renderTooltip = function (e, chart, isFirst) {
        this.textFormat = this.format((this.control.tooltip.showTooltipOnHover) ? e.target.id.indexOf('Linearbuffer') >= 0 || e.target.id.indexOf('Circularbuffer') >= 0 ? this.control.secondaryProgress : this.control.value : this.control.value);
        this.triggerTooltipRender(e, isFirst, this.textFormat);
    };
    /**
     * Function to get format of tooltip text.
     */
    ProgressTooltip.prototype.format = function (formatValue) {
        var currentFormat = formatValue.toString();
        var value;
        if (this.control.tooltip.format) {
            currentFormat = this.control.tooltip.format;
            value = new RegExp('${value' + '}', 'gm');
            currentFormat = currentFormat.replace(value.source, formatValue.toString());
        }
        return currentFormat;
    };
    /**
     * Function to remove tooltip.
     */
    ProgressTooltip.prototype.removeTooltip = function (duration) {
        var _this = this;
        var tooltipElement = document.getElementById(this.control.element.id + '_tooltip');
        if (tooltipElement) {
            this.fadeInInterval = +setTimeout(function () {
                if (_this.svgTooltip) {
                    _this.svgTooltip.fadeOut();
                }
            }, duration);
        }
    };
    /**
     * Function to get arguments of tooltip.
     */
    ProgressTooltip.prototype.triggerTooltipRender = function (e, isFirst, textCollection) {
        var padding = 5;
        var argsData = {
            cancel: false, name: tooltipRender, text: textCollection + '%'
        };
        this.control.trigger(tooltipRender, argsData);
        textCollection = argsData.text;
        if (!argsData.cancel) {
            this.text = [].concat(argsData.text);
            if (this.control.type === 'Linear') {
                var linearEndPointX = (this.control.linear.linearProgressWidth - padding / 2 + (this.control.progressRect.x));
                var linearEndPointY = (this.control.cornerRadius === 'Round4px') ? (this.control.progressRect.y + padding) : (this.control.progressRect.y + (this.control.progressRect.height / 2)) -
                    (this.control.progressThickness ? this.control.progressThickness : this.control.themeStyle.linearProgressThickness) / 2 +
                    padding;
                this.createTooltip(this.control, isFirst, (this.control.tooltip.enable && !this.control.tooltip.showTooltipOnHover || !(e.target.id.indexOf('Linearbuffer') >= 0)) ? (new ProgressLocation((this.control.cornerRadius === 'Round4px') ? linearEndPointX - padding : linearEndPointX, linearEndPointY)) : (new ProgressLocation(this.control.linear.bufferWidth - (padding / 2) + (this.control.progressRect.x), linearEndPointY)), this.control.initialClipRect);
            }
            else {
                var circularEndPointX = this.control.circular.endPosition.x - padding / 2;
                var circularEndPointY = this.control.circular.endPosition.y + this.control.progressRect.y - padding / 2;
                this.createTooltip(this.control, isFirst, (this.control.tooltip.enable && !this.control.tooltip.showTooltipOnHover || !(e.target.id.indexOf('Circularbuffer') >= 0)) ? (new ProgressLocation(circularEndPointX, circularEndPointY)) : (new ProgressLocation(this.control.circular.bufferEndPosition.x - padding / 2, this.control.circular.bufferEndPosition.y + this.control.progressRect.y - padding / 2)), this.control.initialClipRect);
            }
        }
        this.isRendered = true;
    };
    /**
     * Function to pass arguments into svg tooltip.
     */
    ProgressTooltip.prototype.createTooltip = function (chart, isFirst, location, bounds) {
        if (isFirst) {
            this.svgTooltip = new SVGTooltip({
                opacity: this.control.tooltip.textStyle.opacity ? this.control.tooltip.textStyle.opacity : ((this.control.theme === 'Material3' || this.control.theme === 'Material3Dark') ? 1 : 0.75),
                header: '',
                content: this.text,
                fill: this.control.tooltip.fill,
                border: this.control.tooltip.border,
                enableAnimation: true,
                location: location,
                theme: this.control.theme,
                areaBounds: bounds,
                template: null,
                // To set tooltip location.
                offset: 7.5,
                // To set left and right margin of tooltip.
                marginX: 8,
                // To set top margin of tooltip.
                marginY: 4.5,
                textStyle: this.control.tooltip.textStyle,
                arrowPadding: 7,
                availableSize: this.control.progressSize,
                duration: 300,
                blazorTemplate: { name: 'Template', parent: this.control.tooltip },
                controlInstance: this.control,
                enableRTL: chart.enableRtl,
                controlName: 'Progressbar'
            }, '#' + this.control.element.id + '_tooltip');
        }
        else {
            if (this.svgTooltip) {
                this.svgTooltip.location = location;
                this.svgTooltip.content = this.text;
                this.svgTooltip.header = '';
                this.svgTooltip.offset = 7.5;
                this.svgTooltip.textStyle = this.control.tooltip.textStyle;
                this.svgTooltip.areaBounds = bounds;
                this.svgTooltip.arrowPadding = 7;
                this.svgTooltip.dataBind();
            }
        }
    };
    /**
     * Get module name.
     */
    ProgressTooltip.prototype.getModuleName = function () {
        return 'ProgressTooltip';
    };
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     * @private
     */
    ProgressTooltip.prototype.destroy = function () {
        // Destroy method performed here
    };
    return ProgressTooltip;
}());
export { ProgressTooltip };
