/**
 * Tree Map Components
 */
import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { ModuleDeclaration } from '@syncfusion/ej2-base';
import { EmitType, Internationalization } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { BorderModel, TitleSettingsModel, MarginModel, LevelSettingsModel } from './model/base-model';
import { LeafItemSettingsModel, TooltipSettingsModel, LegendSettingsModel, InitialDrillSettingsModel } from './model/base-model';
import { HighlightSettingsModel, SelectionSettingsModel } from './model/base-model';
import { TreeMapModel } from './treemap-model';
import { LayoutMode, TreeMapTheme, RenderingMode } from './utils/enum';
import { ILoadEventArgs, ILoadedEventArgs, IPrintEventArgs } from '../treemap/model/interface';
import { ILegendItemRenderingEventArgs, ILegendRenderingEventArgs } from '../treemap/model/interface';
import { IItemRenderingEventArgs, IResizeEventArgs, IDoubleClickEventArgs } from '../treemap/model/interface';
import { IItemClickEventArgs, IItemMoveEventArgs, IMouseMoveEventArgs } from '../treemap/model/interface';
import { IDrillStartEventArgs, IItemSelectedEventArgs, ITreeMapTooltipRenderEventArgs } from '../treemap/model/interface';
import { IItemHighlightEventArgs, IDrillEndEventArgs, IThemeStyle } from '../treemap/model/interface';
import { Size, Rect } from '../treemap/utils/helper';
import { TreeMapAjax } from '../treemap/utils/helper';
import { LayoutPanel } from './layout/render-panel';
import { TreeMapTooltip } from './user-interaction/tooltip';
import { ExportType } from '../treemap/utils/enum';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import { TreeMapHighlight, TreeMapSelection } from './user-interaction/highlight-selection';
import { TreeMapLegend } from './layout/legend';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { Print } from './model/print';
import { ImageExport } from './model/image-export';
import { PdfExport } from './model/pdf-export';
/**
 * Represents the treemap control. It is used to visualize both hierarchical and flat data.
 * ```html
 * <div id="container"/>
 * <script>
 *   var treemap = new TreeMap();
 *   treemap.appendTo("#container");
 * </script>
 * ```
 */
export declare class TreeMap extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Sets and gets the module that is used to add tooltip in the treemap.
     * @private
     */
    treeMapTooltipModule: TreeMapTooltip;
    /**
     * Sets and gets the module that is used to add highlight functionality in the treemap.
     * @private
     */
    treeMapHighlightModule: TreeMapHighlight;
    /**
     * Sets and gets the module that is used to add selection functionality in the treemap.
     * @private
     */
    treeMapSelectionModule: TreeMapSelection;
    /**
     * Sets and gets the module that is used to add legend in the treemap.
     * @private
     */
    treeMapLegendModule: TreeMapLegend;
    /**
     * Sets and gets the module that is used to add print functionality in the treemap.
     *
     * @private
     */
    printModule: Print;
    /**
     * Sets and gets the module that is used to add imageExport functionality in the treemap.
     *
     * @private
     */
    imageExportModule: ImageExport;
    /**
     * Sets and gets the module that is used to add pdf export functionality in the treemap.
     *
     * @private
     */
    pdfExportModule: PdfExport;
    /**
     * Enables and disables the print functionality in treemap.
     *
     * @default false
     */
    allowPrint: boolean;
    /**
     * Enables and disables the export to image functionality in treemap.
     *
     * @default false
     */
    allowImageExport: boolean;
    /**
     * Enables and disables the export to pdf functionality in treemap.
     *
     * @default false
     */
    allowPdfExport: boolean;
    /**
     * Sets and gets the width of the treemap.
     *
     * @default null
     */
    width: string;
    /**
     * Sets and gets the height of the treemap.
     *
     * @default null
     */
    height: string;
    /**
     * Sets and gets the options for customizing the color and width of the treemap border.
     */
    border: BorderModel;
    /**
     * Sets and gets the options for customizing the margin in the treemap.
     */
    margin: MarginModel;
    /**
     * Sets and gets the background color of the treemap.
     *
     * @default null
     */
    background: string;
    /**
     * Sets and gets the theme styles supported for treemap. When the theme is set, the styles associated with the theme will be set in the treemap.
     *
     * @default Material
     */
    theme: TreeMapTheme;
    /**
     * Sets and gets the options for customizing the title of the treemap.
     */
    titleSettings: TitleSettingsModel;
    /**
     * Specifies the rendering type for the layout of the treemap.
     *
     * @default 'Squarified'
     */
    layoutType: LayoutMode;
    /**
     * Sets and gets the data source for the treemap.
     *
     * @isGenericType true
     * @isObservable true
     * @default null
     */
    dataSource: DataManager | TreeMapAjax | Object[];
    /**
     * Sets and gets the query to select particular data from the shape data.
     * This property is applicable only when the data source is created by data manager.
     *
     * @default null
     */
    query: Query;
    /**
     * Sets and gets the value path of the weight from the data source, based on which the treemap item is rendered.
     *
     * @default null
     */
    weightValuePath: string;
    /**
     * Sets and gets the value path from the data source, based on it color is filled in treemap.
     * This property is used when range color mapping is set in the treemap.
     *
     * @default ''
     */
    rangeColorValuePath: string;
    /**
     * Sets and gets the value path from the data source, based on it color is filled in treemap.
     * This property is used when equal color mapping is set in the treemap.
     *
     * @default ''
     */
    equalColorValuePath: string;
    /**
     * Sets and gets the value path from the data source, based on it color is filled in treemap.
     *
     * @default null
     */
    colorValuePath: string;
    /**
     * Sets and gets a set of colors to apply in the treemap items.
     *
     * @default []
     */
    palette: string[];
    /**
     * Specifies the rendering direction of layout of the treemap items.
     *
     * @default TopLeftBottomRight
     */
    renderDirection: RenderingMode;
    /**
     * Enables or disables the drill down functionality in treemap.
     *
     * @default false
     */
    enableDrillDown: boolean;
    /**
     * Enables or disables the connection text in the header of the treemap when drill down is enabled.
     *
     * @default false
     */
    enableBreadcrumb: boolean;
    /**
     * Specifies the symbol to show connection between the two words in the header of the treemap during drill down.
     *
     * @default ' - '
     */
    breadcrumbConnector: string;
    /**
     * Enables or disables the initial drill in the treemap.
     *
     * @default false
     */
    drillDownView: boolean;
    /**
     * Specifies the options for customizing the initial drill down in treemap.
     */
    initialDrillDown: InitialDrillSettingsModel;
    /**
     * Sets and gets the options for customizing the leaf item of the treemap.
     */
    leafItemSettings: LeafItemSettingsModel;
    /**
     * Sets and gets the options to configure and customize the levels of treemap items.
     */
    levels: LevelSettingsModel[];
    /**
     * Sets and gets the options to customize the highlight functionality of the treemap.
     */
    highlightSettings: HighlightSettingsModel;
    /**
     * Sets and gets the options for customizing the selection functionality of the treemap.
     */
    selectionSettings: SelectionSettingsModel;
    /**
     * Sets and gets the options for customizing the tooltip of the treemap.
     */
    tooltipSettings: TooltipSettingsModel;
    /**
     * Sets and gets the options for customizing the legend of the treemap.
     */
    legendSettings: LegendSettingsModel;
    /**
     * Enables or disables the visibility state of the separator for grouping.
     *
     * @default false
     */
    useGroupingSeparator: boolean;
    /**
     * Sets and gets the description for treemap.
     *
     * @default null
     */
    description: string;
    /**
     * Sets and gets the tab index value for treemap.
     *
     * @default 1
     */
    tabIndex: number;
    /**
     * Sets and gets format for the texts in the treemap. This property accepts any global string format like 'C', 'N1', 'P' etc.
     *
     * @default null
     */
    format: string;
    /**
     * Triggers before the treemap is rendered.
     *
     * @event load
     */
    load: EmitType<ILoadEventArgs>;
    /**
     * Triggers before the print gets started.
     *
     * @event beforePrint
     */
    beforePrint: EmitType<IPrintEventArgs>;
    /**
     * Triggers after treemap is rendered.
     *
     * @event loaded
     */
    loaded: EmitType<ILoadedEventArgs>;
    /**
     * Triggers before item rendering in the treemap.
     *
     * @event itemRendering
     */
    itemRendering: EmitType<IItemRenderingEventArgs>;
    /**
     * Triggers on performing drill down functionality in the treemap.
     *
     * @event drillStart
     */
    drillStart: EmitType<IDrillStartEventArgs>;
    /**
     * Triggers after drill down functionality gets completed in the treemap.
     *
     * @event drillEnd
     */
    drillEnd: EmitType<IDrillEndEventArgs>;
    /**
     * Triggers after selecting a treemap item.
     *
     * @event itemSelected
     */
    itemSelected: EmitType<IItemSelectedEventArgs>;
    /**
     * Triggers after highlighting on the treemap item.
     *
     * @event itemHighlight
     */
    itemHighlight: EmitType<IItemHighlightEventArgs>;
    /**
     * Triggers on rendering of the tooltip in the treemap.
     *
     * @event tooltipRendering
     */
    tooltipRendering: EmitType<ITreeMapTooltipRenderEventArgs>;
    /**
     * Triggers after clicking an item in the treemap.
     *
     * @event itemClick
     */
    itemClick: EmitType<IItemClickEventArgs>;
    /**
     * Triggers after mouse hover on the treemap item.
     *
     * @event itemMove
     */
    itemMove: EmitType<IItemMoveEventArgs>;
    /**
     * Triggers after clicking on the treemap.
     *
     * @event click
     */
    click: EmitType<IItemClickEventArgs>;
    /**
     * Triggers after double clicking on the treemap.
     *
     * @event doubleClick
     */
    doubleClick: EmitType<IDoubleClickEventArgs>;
    /**
     * Triggers after right clicking on the treemap.
     *
     * @event rightClick
     */
    rightClick: EmitType<IMouseMoveEventArgs>;
    /**
     * Triggers after mouse hover on the treemap.
     *
     * @event mouseMove
     */
    mouseMove: EmitType<IMouseMoveEventArgs>;
    /**
     * Triggers to notify the resize of the treemap when the window is resized.
     *
     * @event resize
     */
    resize: EmitType<IResizeEventArgs>;
    /**
     * Triggers before rendering each legend item in the treemap.
     *
     * @event legendItemRendering
     */
    legendItemRendering: EmitType<ILegendItemRenderingEventArgs>;
    /**
     * Triggers before rendering the legend items in the treemap.
     *
     * @event legendRendering

     */
    legendRendering: EmitType<ILegendRenderingEventArgs>;
    /**
     * resize the treemap
     */
    private isResize;
    /**
     * svg renderer object.
     *
     * @private
     */
    renderer: SvgRenderer;
    /**
     * treemap svg element object
     *
     * @private
     */
    svgObject: Element;
    /**
     * Stores the exact size of treemap.
     *
     * @private
     */
    availableSize: Size;
    /**
     * Internal use of internationalization instance.
     *
     * @private
     */
    intl: Internationalization;
    /**
     * Stores the area bounds.
     *
     * @private
     */
    areaRect: Rect;
    /**
     * Define the theme style for treemap.
     *
     * @private
     */
    themeStyle: IThemeStyle;
    /**
     * Stores the legend bounds.
     *
     * @private
     */
    totalRect: Rect;
    /** @private */
    layout: LayoutPanel;
    /** @private */
    orientation: string;
    /** @private */
    drilledItems: any[];
    /** @private */
    drilledLegendItems: any;
    /** @private */
    currentLevel: number;
    /** @private */
    isHierarchicalData: boolean;
    /** @private */
    private resizeTo;
    /** @private */
    private mouseDown;
    /** @private */
    private drillMouseMove;
    /** @private */
    doubleTapTimer: any;
    /** @private */
    levelSelection: string[];
    /** @private */
    legendId: string[];
    /** @private */
    selectionId: string;
    /** @private */
    treemapLevelData: LevelsData;
    private resizeEvent;
    /**
     * Constructor for TreeMap.
     *
     * @param {TreeMapModel} options - Specifies the treemap instance.
     * @param {string | HTMLElement} element - Specifies the treemap element.
     */
    constructor(options?: TreeMapModel, element?: string | HTMLElement);
    protected preRender(): void;
    protected render(): void;
    private renderElements;
    private processDataManager;
    private renderTreeMapElements;
    protected createSvg(): void;
    /**
     * To initilize the private varibales of treemap.
     *
     * @returns {void}
     */
    private initPrivateVariable;
    private createSecondaryElement;
    private elementChange;
    /**
     * Render the treemap border
     *
     * @private
     * @returns {void}
     */
    private renderBorder;
    private renderTitle;
    protected processingData(): void;
    private checkIsHierarchicalData;
    private processHierarchicalData;
    /**
     * This method is used to perform the print functionality in treemap.
     *
     * @param {string[] | string | Element} id - Specifies the element to print the treemap.
     * @returns {void}
     */
    print(id?: string[] | string | Element): void;
    /**
     * This method is used to perform the export functionality for the rendered treemap.
     *
     * @param {ExportType} type - Specifies the extension type of the exported document.
     * @param {string} fileName - Specifies file name for exporting the rendered TreeMap.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document.
     * @param {boolean} allowDownload - Specifies whether the exported file should be downloaded or not.
     * @returns {string} - Specifies the base64 string of the exported image which is returned when the allowDownload is set to false.
     */
    export(type: ExportType, fileName: string, orientation?: PdfPageOrientation, allowDownload?: boolean): Promise<string>;
    private processFlatJsonData;
    /**
     * This method orders the treemap level data.
     *
     * @param {number} start - Specifies the start value of the treemap level.
     * @returns {void}
     * @private
     */
    reOrderLevelData(start: number): void;
    private IsChildHierarchy;
    /**
     * This method finds the weight value of the treemap level.
     *
     * @param {any[]} processData - Specifies the treemap data.
     * @param {string} type - Specifies the type of the data.
     * @returns {void}
     * @private
     */
    findTotalWeight(processData: any[], type: string): void;
    /**
     * To unbind event handlers for treemap.
     *
     * @returns {void}
     * @private
     */
    private unWireEVents;
    /**
     * To bind event handlers for treemap.
     *
     * @returns {void}
     */
    private wireEVents;
    /**
     * Method to set culture for maps
     *
     * @returns {void}
     */
    private setCulture;
    /**
     * To add tab index for treemap element
     *
     * @returns {void}
     */
    private addTabIndex;
    /**
     * This method handles the window resize event on treemap.
     *
     * @param {Event} e - Specifies the pointer event.
     * @returns {void}
     * @private
     */
    resizeOnTreeMap(e: Event): void;
    /**
     * This method handles the click event on the treemap.
     *
     * @param {PointerEvent} e - Specifies the mouse click event in the treemap.
     * @returns {void}
     * @private
     */
    clickOnTreeMap(e: PointerEvent): void;
    /**
     * This method handles the double click event in the treemap.
     *
     * @param {PointerEvent} e - Specifies the pointer event of mouse click.
     * @returns {void}
     */
    doubleClickOnTreeMap(e: PointerEvent): void;
    /**
     * This method handles the right click event in the treemap.
     *
     * @param {PointerEvent} e - Specifies the pointer event of mouse click.
     * @returns {void}
     * @private
     */
    rightClickOnTreeMap(e: PointerEvent): void;
    /**
     * This method handles the mouse down event in the treemap.
     *
     * @param {PointerEvent} e - Specifies the pointer event of mouse click.
     * @returns {void}
     * @private
     */
    mouseDownOnTreeMap(e: PointerEvent): void;
    /**
     * This method handles the mouse move event in the treemap.
     *
     * @param {PointerEvent} e - Specifies the pointer event of mouse click.
     * @returns {void}
     * @private
     */
    mouseMoveOnTreeMap(e: PointerEvent): void;
    /**
     * This method calculates the selected treemap levels.
     *
     * @param {string} labelText - Specifies the label text.
     * @param {any} item - Specifies the treemap item.
     * @returns {any} - Returns label of the drilled level.
     * @private
     */
    calculateSelectedTextLevels(labelText: string, item: any): any;
    /**
     * This method calculates the previous level of child items in treemap.
     *
     * @param {any} drillLevelValues - Specifies the values of drill level.
     * @param {any} item - Specifies the treemap item.
     * @param {boolean} directLevel - Specifies the current level.
     * @returns {boolean} - check whether it is previous level or not.
     * @private
     */
    calculatePreviousLevelChildItems(drillLevelValues: any, item: any, directLevel: boolean): boolean;
    /**
     * This method compares the selected labels with the drill down items.
     *
     * @param {any} drillLevelValues - Specifies the values of drill level.
     * @param {any} item - Specifies the treemap item.
     * @param {number} i - Specifies the treemap item.
     * @returns {any} - return the new drill down object.
     * @private
     */
    compareSelectedLabelWithDrillDownItems(drillLevelValues: any, item: any, i: number): any;
    /**
     * This method handles mouse end event in treemap.
     *
     * @param {PointerEvent} e - Specifies the pointer event of mouse.
     * @returns {void}
     * @private
     */
    mouseEndOnTreeMap(e: PointerEvent): void;
    /**
     * This method handles mouse leave event in treemap.
     *
     * @param {PointerEvent} e - Specifies the pointer event of mouse.
     * @return {void}
     * @private
     */
    mouseLeaveOnTreeMap(e: PointerEvent): void;
    /**
     * This method is used to select or remove the selection of treemap item based on the provided selection settings.
     *
     * @param {string[]} levelOrder - Specifies the order of the level.
     * @param {boolean} isSelected - Specifies whether the treemap item should be selected or the selection should be removed.
     * @return {void}
     */
    selectItem(levelOrder: string[], isSelected?: boolean): void;
    /**
     * To provide the array of modules needed for maps rendering
     *
     * @returns {ModuleDeclaration[]} Returns the modules
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Called internally if any of the property value changed.
     *
     * @param {TreeMapModel} newProp - Specifies the new property
     * @param {TreeMapModel} oldProp - Specifies the old property
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: TreeMapModel, oldProp: TreeMapModel): void;
    /**
     * Gets component name.
     *
     * @returns {string} - return the treemap instance.
     * @private
     */
    getModuleName(): string;
    /**
     * This method destroys the treemap. This method removes the events associated with the treemap and disposes the objects created for rendering and updating the treemap.
     */
    destroy(): void;
    private removeSvg;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string value.
     * @private
     */
    getPersistData(): string;
}
/**
 * @private
 */
export declare class LevelsData {
    levelsData: any[];
    defaultLevelsData: any[];
    hierarchyData: any[];
}
