import { Component, Internationalization, ModuleDeclaration } from '@syncfusion/ej2-base';
import { EmitType, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { FontModel, BorderModel, ContainerModel, MarginModel, AnnotationModel, TooltipSettingsModel } from './model/base-model';
import { AxisModel } from './axes/axis-model';
import { Axis, Pointer } from './axes/axis';
import { LinearGaugeModel } from './linear-gauge-model';
import { ILoadedEventArgs, ILoadEventArgs, IAnimationCompleteEventArgs, IAnnotationRenderEventArgs } from './model/interface';
import { ITooltipRenderEventArgs, IMouseEventArgs, IAxisLabelRenderEventArgs } from './model/interface';
import { IResizeEventArgs, IValueChangeEventArgs, IThemeStyle, IPrintEventArgs, IPointerDragEventArgs } from './model/interface';
import { Size } from './utils/helper';
import { Rect } from './utils/helper';
import { Orientation, LinearGaugeTheme, LabelPlacement } from './utils/enum';
import { AxisLayoutPanel } from './axes/axis-panel';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { AxisRenderer } from './axes/axis-renderer';
import { Annotations } from './annotations/annotations';
import { GaugeTooltip } from './user-interaction/tooltip';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import { ExportType } from '../linear-gauge/utils/enum';
import { Print } from './model/print';
import { PdfExport } from './model/pdf-export';
import { ImageExport } from './model/image-export';
import { Gradient } from './axes/gradient';
/**
 * Represents the linear gauge control. This is used to customize the properties of the linear gauge to visualize the data in linear scale.
 * ```html
 * <div id="container"/>
 * <script>
 *   var gaugeObj = new LinearGauge({ });
 *   gaugeObj.appendTo("#container");
 * </script>
 * ```
 */
export declare class LinearGauge extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Specifies the module that is used to place any text or images as annotation into the linear gauge.
     *
     * @private
     */
    annotationsModule: Annotations;
    /**
     * Specifies the module that is used to display the pointer value in tooltip.
     *
     * @private
     */
    tooltipModule: GaugeTooltip;
    /**
     * This module enables the print functionality in linear gauge.
     *
     * @private
     */
    printModule: Print;
    /**
     * This module enables the export to PDF functionality in linear gauge.
     *
     * @private
     */
    pdfExportModule: PdfExport;
    /**
     * This module enables the export to image functionality in linear gauge.
     *
     * @private
     */
    imageExportModule: ImageExport;
    /**
     * This module enables the gradient option for pointer and ranges.
     *
     * @private
     */
    gradientModule: Gradient;
    /**
     * Specifies the gradient count of the linear gauge.
     *
     * @private
     */
    gradientCount: number;
    /**
     * Specifies the width of the linear gauge as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, gauge will render to the full width of its parent element.
     *
     * @default null
     */
    width: string;
    /**
     * Enables or disables the ability of the gauge to be rendered to the complete width. The left, right, top and bottom spacing will not be considered in the gauge when this property is disabled.
     *
     * @default true
     */
    allowMargin: boolean;
    /**
     * Specifies the height of the linear gauge as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, gauge will render to the full height of its parent element.
     *
     * @default null
     */
    height: string;
    /**
     * Specifies the orientation of the rendering of the linear gauge.
     *
     * @default Vertical
     */
    orientation: Orientation;
    /**
     * Specifies the placement of the label in linear gauge.
     *
     * @default None
     */
    edgeLabelPlacement: LabelPlacement;
    /**
     * Enables or disables the print functionality in linear gauge.
     *
     * @default false
     */
    allowPrint: boolean;
    /**
     * Enables or disables the export to image functionality in linear gauge.
     *
     * @default false
     */
    allowImageExport: boolean;
    /**
     * Enables or disables the export to PDF functionality in linear gauge.
     *
     * @default false
     */
    allowPdfExport: boolean;
    /**
     * Specifies the options to customize the margins of the linear gauge.
     */
    margin: MarginModel;
    /**
     * Specifies the options for customizing the style properties of the border for linear gauge.
     */
    border: BorderModel;
    /**
     * Specifies the background color of the gauge. This property accepts value in hex code, rgba string as a valid CSS color string.
     *
     * @default 'transparent'
     */
    background: string;
    /**
     * Specifies the title for linear gauge.
     */
    title: string;
    /**
     * Specifies the options for customizing the appearance of title for linear gauge.
     */
    titleStyle: FontModel;
    /**
     * Specifies the options for customizing the container in linear gauge.
     */
    container: ContainerModel;
    /**
     * Specifies the options for customizing the axis in linear gauge.
     */
    axes: AxisModel[];
    /**
     * Specifies the options for customizing the tooltip in linear gauge.
     */
    tooltip: TooltipSettingsModel;
    /**
     * Specifies the options for customizing the annotation of linear gauge.
     */
    annotations: AnnotationModel[];
    /**
     * Specifies the color palette for axis ranges in linear gauge.
     *
     * @default []
     */
    rangePalettes: string[];
    /**
     * Enables or disables a grouping separator should be used for a number.
     *
     * @default false
     */
    useGroupingSeparator: boolean;
    /**
     * Sets and gets the information about gauge for assistive technology.
     *
     * @default null
     */
    description: string;
    /**
     * Specifies the tab index value for the linear gauge.
     *
     * @default 1
     */
    tabIndex: number;
    /**
     * Specifies the format to apply for internationalization in linear gauge.
     *
     * @default null
     */
    format: string;
    /**
     * Sets and gets the theme styles supported for linear gauge. When the theme is set, the styles associated with the theme will be set in the gauge.
     *
     * @default Material
     */
    theme: LinearGaugeTheme;
    /**
     * Triggers after the gauge gets rendered.
     *
     * @event loaded
     */
    loaded: EmitType<ILoadedEventArgs>;
    /**
     * Triggers before the gauge gets rendered.
     *
     * @event load
     */
    load: EmitType<ILoadEventArgs>;
    /**
     * Triggers after completing the animation for pointer.
     *
     * @event animationComplete
     */
    animationComplete: EmitType<IAnimationCompleteEventArgs>;
    /**
     * Triggers before each axis label gets rendered.
     *
     * @event axisLabelRender
     */
    axisLabelRender: EmitType<IAxisLabelRenderEventArgs>;
    /**
     * Triggers before the pointer is dragged.
     *
     * @event dragStart
     */
    dragStart: EmitType<IPointerDragEventArgs>;
    /**
     * Triggers while dragging the pointers.
     *
     * @event dragMove
     */
    dragMove: EmitType<IPointerDragEventArgs>;
    /**
     * Triggers after the pointer is dragged.
     *
     * @event dragEnd
     */
    dragEnd: EmitType<IPointerDragEventArgs>;
    /**
     * Triggers before each annotation gets rendered.
     *
     * @event annotationRender
     */
    annotationRender: EmitType<IAnnotationRenderEventArgs>;
    /**
     * Triggers before the tooltip get rendered.
     *
     * @event tooltipRender

     */
    tooltipRender: EmitType<ITooltipRenderEventArgs>;
    /**
     * Triggers when performing the mouse move operation on gauge area.
     *
     * @event gaugeMouseMove
     */
    gaugeMouseMove: EmitType<IMouseEventArgs>;
    /**
     * Triggers when performing the mouse leave operation from the gauge area.
     *
     * @event gaugeMouseLeave
     */
    gaugeMouseLeave: EmitType<IMouseEventArgs>;
    /**
     * Triggers when performing the mouse down operation on gauge area.
     *
     * @event gaugeMouseDown
     */
    gaugeMouseDown: EmitType<IMouseEventArgs>;
    /**
     * Triggers when performing mouse up operation on gauge area.
     *
     * @event gaugeMouseUp
     */
    gaugeMouseUp: EmitType<IMouseEventArgs>;
    /**
     * Triggers while changing the value of the pointer by UI interaction.
     *
     * @event valueChange
     */
    valueChange: EmitType<IValueChangeEventArgs>;
    /**
     * Triggers to notify the resize of the linear gauge when the window is resized.
     *
     * @event resized
     */
    resized: EmitType<IResizeEventArgs>;
    /**
     * Triggers before the print functionality gets started.
     *
     * @event beforePrint
     */
    beforePrint: EmitType<IPrintEventArgs>;
    /** @private */
    activePointer: Pointer;
    /** @private */
    activeAxis: Axis;
    /** @private */
    renderer: SvgRenderer;
    /** @private */
    svgObject: Element;
    /** @private */
    availableSize: Size;
    /** @private */
    actualRect: Rect;
    /** @private */
    intl: Internationalization;
    /** @private* */
    containerBounds: Rect;
    /** @private */
    isTouch: boolean;
    /** @private */
    isDrag: boolean;
    /** @private */
    isPropertyChange: boolean;
    private resizeEvent;
    /**
     * Calculate the axes bounds for gauge.
     *
     * @private
     * @hidden
     */
    gaugeAxisLayoutPanel: AxisLayoutPanel;
    /**
     * Render the axis elements for gauge.
     *
     * @private
     * @hidden
     */
    axisRenderer: AxisRenderer;
    /** @private */
    private resizeTo;
    /** @private */
    containerObject: Element;
    /** @private */
    pointerDrag: boolean;
    /** @private */
    isCheckPointerDrag: boolean;
    /** @private */
    mouseX: number;
    /** @private */
    mouseY: number;
    /** @private */
    mouseElement: Element;
    /** @private */
    gaugeResized: boolean;
    /** @private */
    nearSizes: number[];
    /** @private */
    farSizes: number[];
    /**
     * @private
     */
    themeStyle: IThemeStyle;
    /**
     * Constructor for creating the widget
     *
     * @private
     * @hidden
     */
    constructor(options?: LinearGaugeModel, element?: string | HTMLElement);
    /**
     * Initialize the preRender method.
     */
    protected preRender(): void;
    private setTheme;
    private initPrivateVariable;
    /**
     * Method to set culture for chart
     */
    private setCulture;
    /**
     * Methods to create svg element
     */
    private createSvg;
    /**
     * To Remove the SVG.
     *
     * @return {boolean}
     * @private
     */
    removeSvg(): void;
    /**
     * Method to calculate the size of the gauge
     */
    private calculateSize;
    private renderElements;
    /**
     * To Initialize the control rendering
     */
    protected render(): void;
    /**
     * To render the gauge elements
     *
     * @private
     */
    renderGaugeElements(): void;
    private appendSecondaryElement;
    /**
     * Render the map area border
     */
    private renderArea;
    /**
     * To calculate axes bounds
     *
     * @private
     */
    calculateBounds(): void;
    /**
     * To render axis elements
     *
     * @private
     */
    renderAxisElements(): void;
    private renderBorder;
    private renderTitle;
    private unWireEvents;
    private wireEvents;
    private setStyle;
    /**
     * Handles the gauge resize.
     *
     * @return {boolean} check whether the Linear Gauge is resized or not.
     * @private
     */
    gaugeResize(): boolean;
    /**
     * This method destroys the linear gauge. This method removes the events associated with the linear gauge and disposes the objects created for rendering and updating the linear gauge.
     */
    destroy(): void;
    /**
     * To render the gauge container
     *
     * @private
     */
    renderContainer(): void;
    /**
     * Method to set mouse x, y from events
     */
    private setMouseXY;
    /**
     * Handles the mouse down on gauge.
     *
     * @param {PointerEvent} e - Specifies the event argument.
     * @return {boolean}
     * @private
     */
    gaugeOnMouseDown(e: PointerEvent): boolean;
    /**
     * Handles the mouse move.
     *
     * @return {boolean}
     * @private
     */
    mouseMove(e: PointerEvent): boolean;
    /**
     * To find the mouse move on pointer.
     *
     * @param element
     */
    private moveOnPointer;
    /**
     * Handle the right click
     *
     * @param {PointerEvent | TouchEvent} event - Specifies the pointer event argument.
     * @returns {boolean} - Specifies whether right click is performed on the Linear Gauge.
     * @private
     *
     */
    gaugeRightClick(event: MouseEvent | PointerEvent): boolean;
    /**
     * Handles the mouse leave.
     *
     * @return {boolean}
     * @private
     */
    mouseLeave(e: PointerEvent): boolean;
    /**
     * Handles the mouse move on gauge.
     *
     * @param {PointerEvent | TouchEvent} e - Specifies the pointer event argument.
     * @return {boolean}
     * @private
     */
    gaugeOnMouseMove(): boolean;
    /**
     * Handles the mouse up.
     *
     * @return {boolean}
     * @private
     */
    mouseEnd(e: PointerEvent): boolean;
    /**
     * This method handles the print functionality for linear gauge.
     *
     * @param id - Specifies the element to print the linear gauge.
     */
    print(id?: string[] | string | Element): void;
    /**
     * This method handles the export functionality for linear gauge.
     *
     * @param {ExportType} type - Specifies the extension type of the exported document.
     * @param {string} fileName - Specifies file name for exporting the rendered Linear Gauge.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document.
     * @param {boolean} allowDownload - Specifies whether the exported file should be downloaded or not.
     * @returns {string} - Specifies the base64 string of the exported image which is returned when the allowDownload is set to false.
     */
    export(type: ExportType, fileName: string, orientation?: PdfPageOrientation, allowDownload?: boolean): Promise<string>;
    /**
     * Handles the mouse event arguments.
     *
     * @return {IMouseEventArgs}
     * @private
     */
    private getMouseArgs;
    /**
     * @private
     * @param axis
     * @param pointer
     */
    markerDrag(axis: Axis, pointer: Pointer): void;
    /**
     * @private
     * @param axis
     * @param pointer
     */
    barDrag(axis: Axis, pointer: Pointer): void;
    /**
     * Triggers when drag the pointer
     *
     * @param activeElement
     */
    private triggerDragEvent;
    /**
     * This method is used to set the pointer value in the linear gauge.
     *
     * @param {number} axisIndex - Specifies the index of the axis.
     * @param {number} pointerIndex - Specifies the index of the pointer.
     * @param {number} value - Specifies the pointer value.
     */
    setPointerValue(axisIndex: number, pointerIndex: number, value: number): void;
    /**
     * This method is used to set the annotation value in the linear gauge.
     *
     * @param {number} annotationIndex - Specifies the index value for the annotation in linear gauge.
     * @param {string | Function} content - Specifies the content for the annotation in linear gauge.
     * @param {number} axisValue - Specifies the axis value to which the annotation must be positioned.
     */
    setAnnotationValue(annotationIndex: number, content: string | Function, axisValue?: number): void;
    /**
     * To provide the array of modules needed for control rendering
     *
     * @return {ModuleDeclaration[]}
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     */
    getPersistData(): string;
    /**
     * Get component name
     * @private
     */
    getModuleName(): string;
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     */
    onPropertyChanged(newProp: LinearGaugeModel, oldProp: LinearGaugeModel): void;
}
