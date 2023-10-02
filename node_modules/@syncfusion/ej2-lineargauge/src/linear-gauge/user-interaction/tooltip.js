/* eslint-disable valid-jsdoc */
import { createElement, Browser, isNullOrUndefined, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { tooltipRender } from '../model/constant';
import { Tooltip } from '@syncfusion/ej2-svg-base';
import { getElement, GaugeLocation, textFormatter, formatValue, Rect, getMousePosition } from '../utils/helper';
import { getPointer } from '../utils/helper';
/**
 * Represent the tooltip rendering for gauge
 *
 * @hidden
 */
var GaugeTooltip = /** @class */ (function () {
    function GaugeTooltip(gauge) {
        this.gauge = gauge;
        this.element = gauge.element;
        this.tooltip = gauge.tooltip;
        this.textStyle = this.tooltip.textStyle;
        this.borderStyle = this.tooltip.border;
        this.tooltipId = this.gauge.element.id + '_LinearGauge_Tooltip';
        this.addEventListener();
    }
    /**
     * Internal use for tooltip rendering
     *
     * @param {PointerEvent} e - Specifies the pointer event argument
     * @private
     */
    GaugeTooltip.prototype.renderTooltip = function (e) {
        var pageX;
        var pageY;
        var target;
        var touchArg;
        if (e.type.indexOf('touch') !== -1) {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].pageX;
            pageY = touchArg.changedTouches[0].pageY;
            target = touchArg.target;
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.pageX;
            pageY = e.pageY;
            target = e.target;
        }
        var tooltipEle;
        var tooltipContent;
        if (target.id.indexOf('Pointer') > -1 && this.gauge.tooltip.type.indexOf('Pointer') > -1) {
            this.pointerElement = target;
            var areaRect = this.gauge.element.getBoundingClientRect();
            var current = getPointer(this.pointerElement, this.gauge);
            this.currentAxis = current.axis;
            this.axisIndex = current.axisIndex;
            this.currentPointer = current.pointer;
            var customTooltipFormat = this.tooltip.format && this.tooltip.format.match('{value}') !== null;
            var tooltipStyle = {
                size: this.tooltip.textStyle.size,
                color: this.tooltip.textStyle.color,
                fontFamily: this.tooltip.textStyle.fontFamily,
                fontWeight: this.tooltip.textStyle.fontWeight,
                fontStyle: this.tooltip.textStyle.fontStyle,
                opacity: this.tooltip.textStyle.opacity
            };
            tooltipStyle.color = tooltipStyle.color || this.gauge.themeStyle.tooltipFontColor;
            tooltipStyle.size = tooltipStyle.size || this.gauge.themeStyle.tooltipFontSize;
            tooltipStyle.fontFamily = tooltipStyle.fontFamily || this.gauge.themeStyle.fontFamily;
            tooltipStyle.fontWeight = tooltipStyle.fontWeight || this.gauge.themeStyle.labelWeight;
            tooltipStyle.opacity = tooltipStyle.opacity || this.gauge.themeStyle.tooltipTextOpacity;
            tooltipContent = customTooltipFormat ? textFormatter(this.tooltip.format, { value: this.currentPointer.currentValue }, this.gauge) :
                formatValue(this.currentPointer.currentValue, this.gauge).toString();
            tooltipEle = this.tooltipCreate(tooltipEle);
            this.tooltipRender(tooltipContent, target, tooltipEle, e, areaRect, pageX, pageY, tooltipStyle);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.renderReactTemplates();
        }
        else if (target.id.indexOf('Range') > -1 && this.gauge.tooltip.type.indexOf('Range') > -1) {
            this.pointerElement = target;
            var areaRect = this.gauge.element.getBoundingClientRect();
            var current = getPointer(this.pointerElement, this.gauge);
            this.currentAxis = current.axis;
            this.axisIndex = current.axisIndex;
            var rangePosition = Number(target.id.charAt(target.id.length - 1));
            this.currentRange = this.currentAxis.ranges[rangePosition];
            var startData = (this.currentRange.start).toString();
            var endData = (this.currentRange.end).toString();
            var rangeTooltipFormat = this.gauge.tooltip.rangeSettings.format || this.currentAxis.labelStyle.format;
            var customTooltipFormat = rangeTooltipFormat && (rangeTooltipFormat.match('{end}') !== null ||
                rangeTooltipFormat.match('{start}') !== null);
            var rangeTooltipStyle = {
                size: this.tooltip.rangeSettings.textStyle.size,
                color: this.tooltip.rangeSettings.textStyle.color,
                fontFamily: this.tooltip.rangeSettings.textStyle.fontFamily,
                fontWeight: this.tooltip.rangeSettings.textStyle.fontWeight,
                fontStyle: this.tooltip.rangeSettings.textStyle.fontStyle,
                opacity: this.tooltip.rangeSettings.textStyle.opacity
            };
            rangeTooltipStyle.color = rangeTooltipStyle.color || this.gauge.themeStyle.tooltipFontColor;
            rangeTooltipStyle.size = rangeTooltipStyle.size || this.gauge.themeStyle.tooltipFontSize;
            rangeTooltipStyle.fontFamily = rangeTooltipStyle.fontFamily || this.gauge.themeStyle.fontFamily;
            rangeTooltipStyle.fontWeight = rangeTooltipStyle.fontWeight || this.gauge.themeStyle.labelWeight;
            rangeTooltipStyle.opacity = rangeTooltipStyle.opacity || this.gauge.themeStyle.tooltipTextOpacity;
            tooltipContent = customTooltipFormat ? rangeTooltipFormat.replace(/{start}/g, startData).replace(/{end}/g, endData) :
                'Start : ' + startData + '<br>' + 'End : ' + endData;
            tooltipEle = this.tooltipCreate(tooltipEle);
            this.tooltipRender(tooltipContent, target, tooltipEle, e, areaRect, pageX, pageY, rangeTooltipStyle);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.renderReactTemplates();
        }
        else {
            this.removeTooltip();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.clearTemplate();
        }
    };
    GaugeTooltip.prototype.tooltipRender = function (tooltipContent, target, tooltipEle, e, areaRect, pageX, pageY, tooltipStyle) {
        var _this = this;
        var location = this.getTooltipLocation();
        if ((this.tooltip.rangeSettings.showAtMousePosition && target.id.indexOf('Range') > -1) ||
            (this.tooltip.showAtMousePosition && target.id.indexOf('Pointer') > -1)) {
            location = getMousePosition(pageX, pageY, this.gauge.svgObject);
        }
        var args = {
            name: tooltipRender,
            cancel: false,
            gauge: this.gauge,
            event: e,
            location: location,
            content: tooltipContent,
            tooltip: this.tooltip,
            axis: this.currentAxis,
            pointer: this.currentPointer
        };
        var tooltipPos = this.getTooltipPosition();
        location.y += ((this.tooltip.rangeSettings.template && tooltipPos === 'Top') ||
            (this.tooltip.template && tooltipPos === 'Top')) ? 20 : 0;
        location.x += ((this.tooltip.rangeSettings.template && tooltipPos === 'Right') ||
            (this.tooltip.template && tooltipPos === 'Right')) ? 20 : 0;
        this.gauge.trigger(tooltipRender, args, function () {
            var template = (target.id.indexOf('Range') > -1) ? args.tooltip.rangeSettings.template : args.tooltip.template;
            if (template !== null && Object.keys(template).length === 1 && typeof template !== 'function') {
                template = template[Object.keys(template)[0]];
            }
            if (!args.cancel) {
                var fillColor = (target.id.indexOf('Range') > -1) ? _this.tooltip.rangeSettings.fill : _this.tooltip.fill;
                _this.svgTooltip = _this.svgCreate(_this.svgTooltip, args, _this.gauge, areaRect, fillColor, template, tooltipPos, location, target, tooltipStyle);
                _this.svgTooltip.opacity = _this.gauge.themeStyle.tooltipFillOpacity || _this.svgTooltip.opacity;
                _this.svgTooltip.appendTo(tooltipEle);
            }
        });
    };
    GaugeTooltip.prototype.tooltipCreate = function (tooltipEle) {
        if (document.getElementById(this.tooltipId)) {
            tooltipEle = document.getElementById(this.tooltipId);
        }
        else {
            tooltipEle = createElement('div', {
                id: this.tooltipId,
                className: 'EJ2-LinearGauge-Tooltip'
            });
            tooltipEle.style.cssText = 'position: absolute;pointer-events:none;';
            document.getElementById(this.gauge.element.id + '_Secondary_Element').appendChild(tooltipEle);
        }
        return tooltipEle;
    };
    GaugeTooltip.prototype.svgCreate = function (svgTooltip, args, gauge, areaRect, fill, template, tooltipPos, location, target, textStyle) {
        var tooltipBorder = (target.id.indexOf('Range') > -1) ? args.tooltip.rangeSettings.border : args.tooltip.border;
        textStyle = {
            color: args.tooltip.textStyle.color || textStyle.color,
            fontFamily: args.tooltip.textStyle.fontFamily || textStyle.fontFamily,
            fontStyle: args.tooltip.textStyle.fontStyle || textStyle.fontStyle,
            fontWeight: args.tooltip.textStyle.fontWeight || textStyle.fontWeight,
            opacity: args.tooltip.textStyle.opacity || textStyle.opacity,
            size: args.tooltip.textStyle.size || textStyle.size
        };
        svgTooltip = new Tooltip({
            enable: true,
            header: '',
            data: { value: args.content },
            template: template,
            content: [SanitizeHtmlHelper.sanitize(args.content)],
            shapes: [],
            location: args.location,
            palette: [],
            inverted: !(args.gauge.orientation === 'Horizontal'),
            enableAnimation: args.tooltip.enableAnimation,
            fill: fill || gauge.themeStyle.tooltipFillColor,
            availableSize: gauge.availableSize,
            areaBounds: new Rect((this.gauge.orientation === 'Vertical') ? areaRect.left : location.x, (this.gauge.orientation === 'Vertical') ? location.y : (tooltipPos === 'Bottom') ? location.y : areaRect.top, tooltipPos === 'Right' ? Math.abs(areaRect.left - location.x) : areaRect.width, areaRect.height),
            textStyle: textStyle,
            border: tooltipBorder,
            theme: args.gauge.theme
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (gauge.isVue || gauge.isVue3) {
            svgTooltip.controlInstance = gauge;
        }
        return svgTooltip;
    };
    GaugeTooltip.prototype.getTooltipPosition = function () {
        var position;
        if (this.gauge.orientation === 'Vertical') {
            position = (!this.currentAxis.opposedPosition) ? 'Left' : 'Right';
        }
        else {
            position = (this.currentAxis.opposedPosition) ? 'Top' : 'Bottom';
        }
        return position;
    };
    GaugeTooltip.prototype.getTooltipLocation = function () {
        var lineX;
        var lineY;
        var x;
        var y;
        var lineId = this.gauge.element.id + '_AxisLine_' + this.axisIndex;
        var tickID = this.gauge.element.id + '_MajorTicksLine_' + this.axisIndex;
        var lineBounds;
        if (getElement(lineId)) {
            lineBounds = getElement(lineId).getBoundingClientRect();
            lineX = lineBounds.left;
            lineY = lineBounds.top;
        }
        else {
            lineBounds = getElement(tickID).getBoundingClientRect();
            lineX = (!this.currentAxis.opposedPosition) ? (lineBounds.left + lineBounds.width) : lineBounds.left;
            lineY = (!this.currentAxis.opposedPosition) ? (lineBounds.top + lineBounds.height) : lineBounds.top;
        }
        var bounds = this.pointerElement.getBoundingClientRect();
        var elementRect = this.gauge.element.getBoundingClientRect();
        x = bounds.left - elementRect.left;
        y = bounds.top - elementRect.top;
        var height = bounds.height;
        var width = bounds.width;
        var tooltipPosition = (this.pointerElement.id.indexOf('Range') > -1) ? this.tooltip.rangeSettings.position :
            this.tooltip.position;
        if (this.gauge.orientation === 'Vertical') {
            x = (lineX - elementRect.left);
            if (this.pointerElement.id.indexOf('Range') > -1 || this.pointerElement.id.indexOf('BarPointer') > -1) {
                y = (!this.currentAxis.isInversed) ? ((tooltipPosition === 'End') ? y : ((tooltipPosition === 'Start') ?
                    y + height : y + (height / 2))) : ((tooltipPosition === 'End') ? y + height : ((tooltipPosition === 'Start') ?
                    y + height : y + (height / 2)));
            }
            else {
                y = (this.currentPointer.type === 'Marker') ? y + (height / 2) : (!this.currentAxis.isInversed) ? y : y + height;
            }
        }
        else {
            y = (lineY - elementRect.top);
            if (this.pointerElement.id.indexOf('Range') > -1 || this.pointerElement.id.indexOf('BarPointer') > -1) {
                x = (!this.currentAxis.isInversed) ? ((tooltipPosition === 'End') ? x + width : ((tooltipPosition === 'Start') ?
                    x : x + (width / 2))) : ((tooltipPosition === 'End') ? x : ((tooltipPosition === 'Start') ? x + width : x + (width / 2)));
            }
            else {
                x = (this.currentPointer.type === 'Marker') ? (x + width / 2) : (!this.currentAxis.isInversed) ? x + width : x;
            }
        }
        var location = new GaugeLocation(x, y);
        return location;
    };
    GaugeTooltip.prototype.removeTooltip = function () {
        if (document.getElementsByClassName('EJ2-LinearGauge-Tooltip').length > 0) {
            document.getElementsByClassName('EJ2-LinearGauge-Tooltip')[0].remove();
        }
    };
    GaugeTooltip.prototype.mouseUpHandler = function (e) {
        this.renderTooltip(e);
        clearTimeout(this.clearTimeout);
        this.clearTimeout = setTimeout(this.removeTooltip.bind(this), 2000);
    };
    /**
     * To bind events for tooltip module
     *
     * @private
     */
    GaugeTooltip.prototype.addEventListener = function () {
        if (this.gauge.isDestroyed) {
            return;
        }
        this.gauge.on(Browser.touchMoveEvent, this.renderTooltip, this);
        this.gauge.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    };
    /**
     * To unbind events for tooltip module
     *
     * @private
     */
    GaugeTooltip.prototype.removeEventListener = function () {
        if (this.gauge.isDestroyed) {
            return;
        }
        this.gauge.off(Browser.touchMoveEvent, this.renderTooltip);
        this.gauge.off(Browser.touchEndEvent, this.mouseUpHandler);
    };
    /*
     * Get module name.
     */
    GaugeTooltip.prototype.getModuleName = function () {
        return 'Tooltip';
    };
    /**
     *
     * @return {void}
     * @private
     */
    GaugeTooltip.prototype.destroy = function () {
        this.element = null;
        this.currentAxis = null;
        this.currentPointer = null;
        this.currentRange = null;
        if (!isNullOrUndefined(this.svgTooltip)) {
            this.svgTooltip.destroy();
        }
        this.svgTooltip = null;
        this.textStyle = null;
        this.borderStyle = null;
        this.pointerElement = null;
        this.tooltip = null;
        this.removeEventListener();
        this.gauge = null;
    };
    return GaugeTooltip;
}());
export { GaugeTooltip };
