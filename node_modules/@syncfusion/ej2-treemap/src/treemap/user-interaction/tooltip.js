var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import { Tooltip } from '@syncfusion/ej2-svg-base';
import { Browser, createElement, isNullOrUndefined, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { getMousePosition, textFormatter, formatValue } from '../utils/helper';
import { tooltipRendering } from '../model/constants';
/**
 * Render Tooltip
 */
var TreeMapTooltip = /** @class */ (function () {
    function TreeMapTooltip(treeMap) {
        this.treemap = treeMap;
        this.tooltipSettings = this.treemap.tooltipSettings;
        this.tooltipId = this.treemap.element.id + '_TreeMapTooltip';
        this.addEventListener();
    }
    TreeMapTooltip.prototype.renderTooltip = function (e) {
        var _this = this;
        var pageX;
        var pageY;
        var target;
        var touchArg;
        var tootipArgs;
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var value;
        var targetId = target.id;
        var item = {};
        var tooltipEle;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var location;
        var toolTipData = {};
        var tooltipContent = [];
        var markerFill;
        if (targetId.indexOf('_Item_Index') > -1) {
            item = this.treemap.layout.renderItems[parseFloat(targetId.split('_Item_Index_')[1])];
            if (!isNullOrUndefined(item)) {
                value = item['weight'];
                toolTipData = item['data'];
                if (!isNullOrUndefined(item['options'])) {
                    markerFill = item['options']['fill'];
                }
                if (this.treemap.enableRtl) {
                    tooltipContent = [SanitizeHtmlHelper.sanitize(textFormatter(this.tooltipSettings.format, toolTipData, this.treemap)) ||
                            SanitizeHtmlHelper.sanitize(formatValue(value, this.treemap) + ' : ' + this.treemap.weightValuePath.toString())];
                }
                else {
                    tooltipContent = [SanitizeHtmlHelper.sanitize(textFormatter(this.tooltipSettings.format, toolTipData, this.treemap)) ||
                            SanitizeHtmlHelper.sanitize(this.treemap.weightValuePath.toString() + ' : ' + formatValue(value, this.treemap))];
                }
                if (document.getElementById(this.tooltipId)) {
                    tooltipEle = document.getElementById(this.tooltipId);
                }
                else {
                    tooltipEle = createElement('div', {
                        id: this.treemap.element.id + '_TreeMapTooltip',
                        className: 'EJ2-TreeMap-Tooltip'
                    });
                    tooltipEle.style.cssText = 'position: absolute;pointer-events:none;';
                    document.getElementById(this.treemap.element.id + '_Secondary_Element').appendChild(tooltipEle);
                }
                location = getMousePosition(pageX, pageY, this.treemap.svgObject);
                location.y = (this.tooltipSettings.template) ? location.y + 10 : location.y;
                this.tooltipSettings.textStyle.size = this.tooltipSettings.textStyle.size || this.treemap.themeStyle.tooltipFontSize;
                this.tooltipSettings.textStyle.fontFamily = this.treemap.themeStyle.fontFamily;
                this.tooltipSettings.textStyle.fontStyle = !isNullOrUndefined(this.tooltipSettings.textStyle.fontStyle) ? this.tooltipSettings.textStyle.fontStyle : 'Normal';
                this.tooltipSettings.textStyle.fontWeight = this.tooltipSettings.textStyle.fontWeight || this.treemap.themeStyle.fontWeight;
                this.tooltipSettings.textStyle.color = this.treemap.themeStyle.tooltipFontColor
                    || this.tooltipSettings.textStyle.color;
                this.tooltipSettings.textStyle.opacity = this.treemap.themeStyle.tooltipTextOpacity
                    || this.tooltipSettings.textStyle.opacity;
                tootipArgs = {
                    cancel: false, name: tooltipRendering, item: item,
                    options: {
                        location: location, text: tooltipContent, data: toolTipData,
                        textStyle: this.tooltipSettings.textStyle, template: this.tooltipSettings.template
                    },
                    treemap: this.treemap,
                    element: target, eventArgs: e
                };
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                this.treemap.trigger(tooltipRendering, tootipArgs, function (args) {
                    _this.addTooltip(tootipArgs, markerFill, tooltipEle);
                });
            }
        }
        else {
            this.removeTooltip();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.treemap.clearTemplate();
        }
    };
    TreeMapTooltip.prototype.addTooltip = function (tootipArgs, markerFill, tooltipEle, eventArgs) {
        var cancel;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var args;
        if (!isNullOrUndefined(tootipArgs)) {
            var c = tootipArgs.cancel, otherArgs = __rest(tootipArgs, ["cancel"]);
            cancel = c;
            args = otherArgs.options;
        }
        else {
            cancel = eventArgs.cancel;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            args = eventArgs;
        }
        if (!cancel) {
            this.svgTooltip = new Tooltip({
                enable: true,
                header: '',
                data: args['data'],
                template: args['template'],
                content: args['text'],
                shapes: [],
                location: args['location'],
                palette: [markerFill],
                areaBounds: this.treemap.areaRect,
                textStyle: args['textStyle'],
                fill: this.treemap.tooltipSettings.fill ? this.treemap.tooltipSettings.fill : this.treemap.themeStyle.tooltipFillColor
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.treemap.isVue || this.treemap.isVue3) {
                this.svgTooltip.controlInstance = this.treemap;
            }
            this.svgTooltip.opacity = this.treemap.themeStyle.tooltipFillOpacity || this.svgTooltip.opacity;
            this.svgTooltip.appendTo(tooltipEle);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.treemap.renderReactTemplates();
        }
        else {
            this.removeTooltip();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.treemap.clearTemplate();
        }
    };
    TreeMapTooltip.prototype.mouseUpHandler = function (e) {
        this.renderTooltip(e);
        clearTimeout(this.clearTimeout);
        this.clearTimeout = setTimeout(this.removeTooltip.bind(this), 2000);
    };
    TreeMapTooltip.prototype.removeTooltip = function () {
        if (document.getElementsByClassName('EJ2-TreeMap-Tooltip').length > 0) {
            var tooltipElementId = document.getElementsByClassName('EJ2-TreeMap-Tooltip')[0];
            tooltipElementId.parentNode.removeChild(tooltipElementId);
        }
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To bind events for tooltip module
     * @private
     */
    TreeMapTooltip.prototype.addEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.on(Browser.touchMoveEvent, this.renderTooltip, this);
        this.treemap.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To unbind events for tooltip module
     * @private
     */
    TreeMapTooltip.prototype.removeEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.off(Browser.touchMoveEvent, this.renderTooltip);
        this.treemap.off(Browser.touchEndEvent, this.mouseUpHandler);
    };
    /**
     * Get module name.
     *
     * @returns {string} returns string
     */
    TreeMapTooltip.prototype.getModuleName = function () {
        return 'treeMapTooltip';
    };
    /**
     * To destroy the tooltip.
     *
     * @returns {void}
     * @private
     */
    TreeMapTooltip.prototype.destroy = function () {
        if (!isNullOrUndefined(this.svgTooltip)) {
            this.svgTooltip.destroy();
        }
        this.svgTooltip = null;
        this.tooltipSettings = null;
        this.removeEventListener();
        this.treemap = null;
    };
    return TreeMapTooltip;
}());
export { TreeMapTooltip };
