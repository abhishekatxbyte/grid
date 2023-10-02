import { PivotEngine, IAxisSet } from '../../base/engine';
import { INumberIndex } from '../../base/engine';
import { IMultiLevelLabelClickEventArgs } from '@syncfusion/ej2-charts';
import { ChartSettingsModel } from '../../pivotview/model/chartsettings-model';
import { PivotView } from '../../pivotview/base/pivotview';
import { OlapEngine } from '../../base/olap/engine';
export declare class PivotChart {
    private chartSeries;
    private dataSourceSettings;
    private accumulationMenu;
    private currentColumn;
    private pivotIndex;
    private chartSettings;
    private element;
    private templateFn;
    private chartElement;
    private measureList;
    private headerColl;
    private maxLevel;
    private columnGroupObject;
    private persistSettings;
    private selectedLegend;
    private chartSeriesInfo;
    private fieldPosition;
    private measurePos;
    private measuresNames;
    private accumulationType;
    private accEmptyPoint;
    /** @hidden */
    calculatedWidth: number;
    /** @hidden */
    currentMeasure: string;
    /** @hidden */
    engineModule: PivotEngine | OlapEngine;
    /** @hidden */
    parent: PivotView;
    /**
     * Get component name.
     *
     * @returns {string} - string
     * @private
     */
    getModuleName(): string;
    /**
     * Initialize the pivot chart rendering
     *
     * @param {PivotView} parent - Specifies the pivot table component instance.
     * @param {ChartSettingsModel} chartSettings - Specifies the chart settings.
     * @returns {void}
     * @private
     */
    loadChart(parent: PivotView, chartSettings: ChartSettingsModel): void;
    /**
     * Refreshing chart based on the updated chartSettings.
     *
     * @returns {void}
     * @hidden
     */
    refreshChart(): void;
    private frameObjectWithKeys;
    private frameChartSeries;
    private bindChart;
    private legendClick;
    private pointClick;
    private frameAxesWithRows;
    private getFormat;
    /** @hidden */
    getColumnTotalIndex(pivotValues: IAxisSet[][]): INumberIndex;
    private groupHierarchyWithLevels;
    private frameMultiLevelLabels;
    private getZoomFactor;
    /** @hidden */
    getCalulatedWidth(): number;
    private configTooltipSettings;
    private configLegendSettings;
    private configXAxis;
    private configZoomSettings;
    private tooltipRender;
    private tooltipTemplateFn;
    private loaded;
    /** @hidden */
    updateView(): void;
    private creatMenu;
    private drillMenuOpen;
    private getMenuItems;
    private drillMenuSelect;
    /**
     * @returns {string} - string.
     * @hidden
     */
    getChartHeight(): string;
    private getChartAutoHeight;
    private axisLabelRender;
    private multiLevelLabelClick;
    /**
     * It helped to drills the row or columns.
     *
     * @param {IMultiLevelLabelClickEventArgs | any} args - It contains the drillInfo.
     * @returns {void}
     * @hidden
     */
    onDrill(args: IMultiLevelLabelClickEventArgs | any): void;
    private isAttributeDrill;
    private load;
    private multiLevelLabelRender;
    private resized;
    /** @hidden */
    getResizedChartHeight(): string;
    /**
     * To destroy the chart module
     *
     * @returns {void}
     * @hidden
     */
    destroy(): void;
}
