import { formatUnit, EventHandler, getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * To handle scroll event on chart and from TreeGrid
 *
 * @hidden
 */
var ChartScroll = /** @class */ (function () {
    /**
     * Constructor for the scrolling.
     *
     * @param {Gantt} parent .
     * @hidden
     */
    function ChartScroll(parent) {
        this.previousScroll = { top: 0, left: 0 };
        this.parent = parent;
        this.element = this.parent.ganttChartModule.scrollElement;
        this.addEventListeners();
    }
    /**
     * Bind event
     *
     * @returns {void} .
     */
    ChartScroll.prototype.addEventListeners = function () {
        this.parent.on('grid-scroll', this.gridScrollHandler, this);
        EventHandler.add(this.element, 'scroll', this.onScroll, this);
        this.parent.treeGrid.grid.on('showGanttShimmer', this.updateShimmer, this);
        this.parent.treeGrid.grid.on('removeGanttShimmer', this.removeShimmer, this);
    };
    /**
     * Unbind events
     *
     * @returns {void} .
     */
    ChartScroll.prototype.removeEventListeners = function () {
        EventHandler.remove(this.element, 'scroll', this.onScroll);
        this.parent.off('grid-scroll', this.gridScrollHandler);
        this.parent.treeGrid.grid.off('showGanttShimmer', this.updateShimmer);
        this.parent.treeGrid.grid.off('removeGanttShimmer', this.removeShimmer);
    };
    /**
     *
     * @param {object} args .
     * @returns {void} .
     */
    ChartScroll.prototype.gridScrollHandler = function (args) {
        this.element.scrollTop = getValue('top', args);
        this.isFromTreeGrid = true;
    };
    /**
     * Method to update vertical grid line, holiday, event markers and weekend container's top position on scroll action
     *
     * @returns {void} .
     * @private
     */
    ChartScroll.prototype.updateTopPosition = function () {
        var content = this.parent.treeGrid.element.querySelector('.e-content');
        var contentScrollTop = content.scrollTop;
        var scrollTop;
        if (this.parent.virtualScrollModule && this.parent.enableVirtualization) {
            var top_1 = this.parent.virtualScrollModule.getTopPosition();
            scrollTop = contentScrollTop - top_1;
        }
        else {
            scrollTop = contentScrollTop;
        }
        if (!isNullOrUndefined(this.parent.dayMarkersModule)) {
            var holidayContainer = getValue('nonworkingDayRender.holidayContainer', this.parent.dayMarkersModule);
            var weekendContainer = getValue('nonworkingDayRender.weekendContainer', this.parent.dayMarkersModule);
            var eventMarkersContainer = getValue('eventMarkerRender.eventMarkersContainer', this.parent.dayMarkersModule);
            if (holidayContainer) {
                holidayContainer.style.top = formatUnit(scrollTop);
            }
            if (weekendContainer) {
                weekendContainer.style.top = formatUnit(scrollTop);
            }
            if (eventMarkersContainer) {
                eventMarkersContainer.style.top = formatUnit(scrollTop);
            }
        }
        if (this.parent.chartVerticalLineContainer) {
            this.parent.chartVerticalLineContainer.style.top = formatUnit(scrollTop);
        }
    };
    ChartScroll.prototype.removeShimmer = function () {
        var parent = this.parent;
        setTimeout(function () {
            parent.hideMaskRow();
            if (parent.viewType === 'ResourceView' && !parent.allowTaskbarOverlap && parent.showOverAllocation) {
                for (var i = 0; i < parent.currentViewData.length; i++) {
                    var tr = parent.chartRowsModule.ganttChartTableBody.childNodes[i];
                    if (tr['style'].display !== 'none' && parent.currentViewData[i].hasChildRecords && !parent.currentViewData[i].expanded) {
                        parent.treeGrid.getRowByIndex(i)['style'].height = tr['style'].height;
                    }
                }
                parent.contentHeight = parent.enableRtl ? parent['element'].getElementsByClassName('e-content')[2].children[0]['offsetHeight'] :
                    parent['element'].getElementsByClassName('e-content')[0].children[0]['offsetHeight'];
                document.getElementsByClassName('e-chart-rows-container')[0]['style'].height = parent.contentHeight + 'px';
            }
        }, 0);
    };
    ChartScroll.prototype.updateShimmer = function () {
        var parent = this.parent;
        setTimeout(function () {
            parent.showMaskRow();
        }, 0);
    };
    ChartScroll.prototype.updateSpinner = function () {
        var parent = this.parent;
        this.parent.showSpinner();
        window.clearTimeout(this.isScrolling);
        this.isScrolling = setTimeout(function () {
            parent.hideSpinner();
        }, 200);
    };
    /**
     * Scroll event handler
     *
     * @returns {void} .
     */
    ChartScroll.prototype.onScroll = function () {
        var scrollArgs = {};
        if (this.element.scrollTop !== this.previousScroll.top) {
            // eslint-disable-next-line
            !this.isFromTreeGrid ? this.parent.notify('chartScroll', { top: this.element.scrollTop }) : (this.isFromTreeGrid = false);
            scrollArgs.previousScrollTop = this.previousScroll.top;
            this.previousScroll.top = this.element.scrollTop;
            scrollArgs.scrollTop = this.element.scrollTop;
            scrollArgs.scrollDirection = 'Vertical';
            scrollArgs.action = 'VerticalScroll';
            this.updateTopPosition();
        }
        if (this.element.scrollLeft !== this.previousScroll.left) {
            this.parent.ganttChartModule.chartTimelineContainer.scrollLeft = this.element.scrollLeft;
            scrollArgs.previousScrollLeft = this.previousScroll.left;
            this.previousScroll.left = this.element.scrollLeft;
            scrollArgs.scrollLeft = this.element.scrollLeft;
            scrollArgs.scrollDirection = 'Horizontal';
            scrollArgs.action = 'HorizontalScroll';
        }
        if ((scrollArgs.scrollDirection !== 'Horizontal' && !isNullOrUndefined(scrollArgs.scrollDirection)) && this.parent.enableVirtualization === true && (this.parent.isToolBarClick
            || isNullOrUndefined(this.parent.isToolBarClick))) {
            this.parent.isVirtualScroll = true;
            if (this.parent.showIndicator || isNullOrUndefined(this.parent.showIndicator)) {
                if (!this.parent.enableVirtualMaskRow && this.parent.enableVirtualization && this.parent.loadingIndicator.indicatorType === 'Spinner') {
                    this.updateSpinner();
                }
            }
        }
        this.parent.isToolBarClick = true;
        scrollArgs.requestType = 'scroll';
        this.parent.trigger('actionComplete', scrollArgs);
    };
    /**
     * To set height for chart scroll container
     *
     * @param {string | number} height - To set height for scroll container in chart side
     * @returns {void} .
     * @private
     */
    ChartScroll.prototype.setHeight = function (height) {
        this.element.style.height = formatUnit(height);
    };
    /**
     * To set width for chart scroll container
     *
     * @param {string | number} width - To set width to scroll container
     * @returns {void} .
     * @private
     */
    ChartScroll.prototype.setWidth = function (width) {
        this.element.style.width = formatUnit(width);
    };
    /**
     * To set scroll top for chart scroll container
     *
     * @param {number} scrollTop - To set scroll top for scroll container
     * @returns {void} .
     * @private
     */
    ChartScroll.prototype.setScrollTop = function (scrollTop) {
        this.element.scrollTop = scrollTop;
        this.parent.treeGrid.element.querySelector('.e-content').scrollTop = scrollTop;
    };
    /**
     * To set scroll left for chart scroll container
     *
     * @param {number} scrollLeft  - To set scroll left for scroll container
     * @param {number} leftSign - specifies left sign
     * @returns {void} .
     */
    ChartScroll.prototype.setScrollLeft = function (scrollLeft, leftSign) {
        if (leftSign) {
            scrollLeft = leftSign === -1 && this.parent.enableRtl ? -scrollLeft : scrollLeft;
        }
        this.element.scrollLeft = scrollLeft;
        this.parent.ganttChartModule.chartTimelineContainer.scrollLeft = this.element.scrollLeft;
        this.previousScroll.left = this.element.scrollLeft;
    };
    /**
     * Destroy scroll related elements and unbind the events
     *
     * @returns {void} .
     * @private
     */
    ChartScroll.prototype.destroy = function () {
        this.removeEventListeners();
    };
    return ChartScroll;
}());
export { ChartScroll };
