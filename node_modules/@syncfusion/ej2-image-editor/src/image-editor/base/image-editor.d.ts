import { Component, INotifyPropertyChanged, ModuleDeclaration, BlazorDotnetObject } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { ItemModel, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ChildProperty } from '@syncfusion/ej2-base';
import { ImageEditorModel, FinetuneSettingsModel, ZoomSettingsModel, SelectionSettingsModel } from './image-editor-model';
import { SelectionChangeEventArgs, Transition, ArrowheadType } from './../index';
import { ZoomEventArgs, PanEventArgs, CropEventArgs, RotateEventArgs, FlipEventArgs, ShapeChangeEventArgs } from './../index';
import { ToolbarEventArgs, OpenEventArgs, SaveEventArgs, BeforeSaveEventArgs, Point, ShapeSettings, ImageFilterEventArgs } from './../index';
import { FinetuneEventArgs, QuickAccessToolbarEventArgs, CurrentObject, ImageDimension, TransformValue, PanPoint } from './../index';
import { Interaction, SelectionPoint, ImageFinetuneValue, Dimension, ActivePoint, ImageEditorClickEventArgs } from './../index';
import { Direction, ZoomTrigger, Theme, ImageEditorCommand, ImageFilterOption, ImageFinetuneOption } from './../index';
import { ItemModel as DropDownButtonItemModel } from '@syncfusion/ej2-splitbuttons';
/**
 * This interface is used to specify settings for finetuning operations on images, including brightness, contrast, hue, saturation, exposure, opacity, and blur. It includes properties for setting minimum and maximum values for each of these options, as well as a default value.
 */
export declare class FinetuneSettings extends ChildProperty<FinetuneSettings> {
    /**
     * Represents a finetune setting for adjusting the brightness of an image.
     *
     * @type {ImageFinetuneValue}
     *
     * @property {number} value - The brightness level of the image, from -100 to 100.
     * @property {number} min - The minimum brightness value allowed, typically -100.
     * @property {number} max - The maximum brightness value allowed, typically 100.
     * @default null
     */
    brightness: ImageFinetuneValue;
    /**
     * Represents a finetune setting for adjusting the contrast of an image.
     *
     * @type {ImageFinetuneValue}
     *
     * @property {number} value - The contrast level of the image, from -100 to 100.
     * @property {number} min - The minimum contrast value allowed, typically -100.
     * @property {number} max - The maximum contrast value allowed, typically 100.
     * @default null
     */
    contrast: ImageFinetuneValue;
    /**
     * Represents a finetune setting for adjusting the hue of an image.
     *
     * @type {ImageFinetuneValue}
     *
     * @property {number} value - The hue level of the image, from 0 to 100.
     * @property {number} min - The minimum hue value allowed, typically 0.
     * @property {number} max - The maximum hue value allowed, typically 100.
     * @default null
     */
    hue: ImageFinetuneValue;
    /**
     * Represents a finetune setting for adjusting the saturation of an image.
     *
     * @type {ImageFinetuneValue}
     *
     * @property {number} value - The saturation level of the image, from -100 to 100.
     * @property {number} min - The minimum saturation value allowed, typically -100.
     * @property {number} max - The maximum saturation value allowed, typically 100.
     * @default null
     */
    saturation: ImageFinetuneValue;
    /**
     * Represents a finetune setting for adjusting the exposure of an image.
     *
     * @type {ImageFinetuneValue}
     *
     * @property {number} value - The exposure level of the image, from -100 to 100.
     * @property {number} min - The minimum exposure value allowed, typically -100.
     * @property {number} max - The maximum exposure value allowed, typically 100.
     * @default null
     */
    exposure: ImageFinetuneValue;
    /**
     * Represents a finetune setting for adjusting the opacity of an image.
     *
     * @type {ImageFinetuneValue}
     *
     * @property {number} value - The opacity level of the image, from 0 to 100.
     * @property {number} min - The minimum opacity value allowed, typically 0.
     * @property {number} max - The maximum opacity value allowed, typically 100.
     * @default null
     */
    opacity: ImageFinetuneValue;
    /**
     * Represents a finetune setting for adjusting the blur of an image.
     *
     * @type {ImageFinetuneValue}
     *
     * @property {number} value - The blur level of the image, from 0 to 100.
     * @property {number} min - The minimum blur value allowed, typically 0.
     * @property {number} max - The maximum blur value allowed, typically 100.
     * @default null
     */
    blur: ImageFinetuneValue;
}
/**
 * An interface used to define the settings such as minimum, maximum, and default zoom factors, and the type of zooming which are available in the image editor control.
 */
export declare class ZoomSettings extends ChildProperty<ZoomSettings> {
    /**
     * Specifies the available options for zooming in an image editor control.
     *
     * @remarks
     * Use this property to enable or disable specific types of zooming in the image editor. The following zooming options are available:
     * MouseWheel: Zooming is performed by scrolling the mouse wheel up and down.
     * Pinch: Zooming is performed using pinch gestures on touch-enabled devices.
     * Commands: Zooming is performed by clicking the CTRL key and either the plus (+) or minus (-) buttons on the keyboard.
     * Toolbar: Zooming is performed using toolbar buttons.
     *
     * By default, this property is set to `null`, which enables all types of zooming.
     *
     * @default null
     * @aspNumberEnum
     */
    zoomTrigger: ZoomTrigger;
    /**
     * Specifies the minimum zooming level to limit the zooming.
     * An integer value that specifies the minimum zooming level. And the default value is 1 (100%).
     *
     * @remarks
     * The given value is considered as percentage.
     *
     */
    minZoomFactor: number;
    /**
     * Specifies the maximum zooming level to limit the zooming.
     * An integer value that specifies the maximum zooming level. And the default value is 10 (1000 percent).
     *
     * @remarks
     * The given value is considered as percentage.
     *
     */
    maxZoomFactor: number;
    /**
     * Specifies the default zoom factor to be applied on initial loading of image.
     * An integer value that specifies the current zooming level. And the default value is 1 (100 percent).
     *
     * @remarks
     * The given value is considered as percentage.
     *
     */
    zoomFactor: number;
    /**
     * Specifies the point in which the zooming  has been performed in the image editor.
     * A point value that specifies the current zooming point.
     * And the default value is null, and it can be considered as center point of the image editor.
     *
     * @remarks
     * The given value is a point object which has x and y coordinates.
     *
     */
    zoomPoint: Point;
}
/**
 * This interface is used to specify settings for selection operations on images, including visibility, stroke color and fill color.
 */
export declare class SelectionSettings extends ChildProperty<SelectionSettings> {
    /**
     * Specifies a boolean value whether to show circle on selection in the image editor.
     *
     * @type {boolean}
     *
     * @default true
     */
    showCircle: boolean;
    /**
     * Represents stroke color of circle selection in the image editor.
     *
     * @type {string}
     *
     * @default null
     */
    strokeColor: string;
    /**
     * Represents fill color of circle selection in the image editor.
     *
     * @type {string}
     *
     * @default null
     */
    fillColor: string;
}
/**
 * The Image Editor is a graphical user interface for editing images.
 *
 * {% codeBlock src='image-editor/default/index.md' %}{% endcodeBlock %}
 *
 * @remarks
 * The Image Editor component provides various image editing features such as zooming, cropping, rotating, inserting text and shapes (rectangles, ellipses, and lines), drawing freehand on top of an image, undo/redo, and more.
 *
 */
export declare class ImageEditor extends Component<HTMLDivElement> implements INotifyPropertyChanged {
    /**
     *
     * Image Editor Private Properties
     */
    /** @hidden */
    isImageLoaded: boolean;
    /** @hidden */
    baseImg: HTMLImageElement;
    /** @hidden */
    lowerCanvas: HTMLCanvasElement;
    /** @hidden */
    upperCanvas: HTMLCanvasElement;
    /** @hidden */
    inMemoryCanvas: HTMLCanvasElement;
    /** @hidden */
    textArea: HTMLInputElement;
    /** @hidden */
    activeObj: SelectionPoint;
    /** @hidden */
    currObjType: Interaction;
    /** @hidden */
    objColl: SelectionPoint[];
    /** @hidden */
    pointColl: any;
    /** @hidden */
    freehandCounter: number;
    /** @hidden */
    points: Point[];
    /** @hidden */
    togglePen: boolean;
    /** @hidden */
    togglePan: boolean;
    /** @hidden */
    img: ImageDimension;
    /** @hidden */
    themeColl: Object;
    /** @hidden */
    rotateFlipColl: any;
    /** @hidden */
    cropObj: CurrentObject;
    /** @hidden */
    afterCropActions: string[];
    /** @hidden */
    currSelectionPoint: SelectionPoint;
    /** @hidden */
    transform: TransformValue;
    /** @hidden */
    panPoint: PanPoint;
    /** @hidden */
    isUndoRedo: boolean;
    /** @hidden */
    isCropTab: boolean;
    /** @hidden */
    isCircleCrop: boolean;
    /** @hidden */
    fontSizeColl: DropDownButtonItemModel[];
    /** @hidden */
    initialAdjustmentValue: string;
    /** @hidden */
    currentFilter: string;
    /** @hidden */
    canvasFilter: string;
    /** @hidden */
    dotNetRef: BlazorDotnetObject;
    /** @hidden */
    toolbarHeight: number;
    /** @hidden */
    events: any;
    /** @hidden */
    isPublicMethod: boolean;
    /** @hidden */
    cancelCropSelection: Transition;
    /** @hidden */
    isCropToolbar: boolean;
    /** @hidden */
    prevCurrSelectionPoint: SelectionPoint;
    /** @hidden */
    cursor: string;
    /** @hidden */
    eventType: string;
    /** @hidden */
    panEventArgs: PanEventArgs;
    private lowerContext;
    private upperContext;
    private inMemoryContext;
    private toolbarFn;
    private qatFn;
    /**
     * Defines one or more CSS classes that can be used to customize the appearance of an Image Editor component.
     *
     * @remarks
     * One or more CSS classes to customize the appearance of the Image Editor component, such as by changing its toolbar appearance, borders, sizes, or other visual aspects.
     *
     * @default ''
     *
     */
    cssClass: string;
    /**
     * Defines whether an Image Editor component is enabled or disabled.
     *
     * @remarks
     * A disabled Image Editor component may have a different visual appearance than an enabled one. When set to “true”, the Image Editor component will be disabled, and the user will not be able to interact with it.
     *
     * @default false
     */
    disabled: boolean;
    /**
     * Specifies the height of the Image Editor.
     *
     * @remarks
     * The value of height is specified either as a percentage (e.g. '100%') or as a fixed pixel value (e.g. '100px').
     *
     * @default '100%'
     */
    height: string;
    /**
     * Specifies the theme of the Image Editor. The appearance of the shape selection in Image Editor is determined by this property.
     *
     * @remarks
     * The `theme` property supports all the built-in themes of Syncfusion, including:
     * - `Bootstrap5`
     * - `Fluent`
     * - `Tailwind`
     * - `Bootstrap4`
     * - `Material`
     * - `Fabric`
     * - `HighContrast`
     * - `Bootstrap5Dark`
     * - `Bootstrap4Dark`
     * - `MaterialDark`
     * - `FabricDark`
     * - `HighContrastDark`
     *
     * The default value is set to `Theme.Bootstrap5`.
     *
     * @isenumeration true
     * @default Theme.Bootstrap5
     * @asptype Theme
     *
     */
    theme: string | Theme;
    /**
     * Specifies the toolbar items to perform UI interactions.
     * It accepts both string[] and ItemModel[] to configure its toolbar items. The default value is null.
     * If the property is not defined in the control, the default toolbar will be rendered with preconfigured toolbar commands.
     * If the property is defined as empty collection, the toolbar will not be rendered.
     * The preconfigured toolbar commands are
     * - Crop: helps to crop an image as ellipse, square, various ratio aspects, custom selection with resize, drag and drop.
     * - Annotate: help to insert a shape on image that supports rectangle, ellipse, line, arrow, path, text and freehand drawing with resize, drag and drop, and customize its appearance.
     * - Transform: helps to rotate and flip an image.
     * - Finetunes: helps to perform adjustments on an image.
     * - Filters: helps to perform predefined color filters.
     * - ZoomIn: performs zoom-in an image.
     * - ZoomOut: performs zoom-out an image.
     * - Save: save the modified image.
     * - Open: open an image to perform editing.
     * - Reset: reset the modification and restore the original image.
     *
     * {% codeBlock src='image-editor/toolbar/index.md' %}{% endcodeBlock %}
     *
     * @remarks
     * If the toolbarTemplate property is defined in the control, the toolbar will be rendered based on the toolbarTemplate property.
     * @default null
     *
     */
    toolbar: (string | ImageEditorCommand | ItemModel)[];
    /**
     * Specifies a custom template for the toolbar of an image editor control.
     * A string that specifies a custom template for the toolbar of the image editor. If this property is defined, the 'toolbar' property will not have any effect.
     *
     * {% codeBlock src='image-editor/toolbarTemplate/index.md' %}{% endcodeBlock %}
     *
     * @remarks
     * Use this property if you want to customize the entire toolbar in your own way. The template should be a string that contains the HTML markup for the custom toolbar.
     *
     * @default null
     * @aspType string
     *
     *
     */
    toolbarTemplate: string | Function;
    /**
     * Specifies the width of an Image Editor.
     *
     * @remarks
     * The value of width is specified either as a percentage (e.g. '100%') or as a fixed pixel value (e.g. '100px').
     *
     * @default '100%'
     */
    width: string;
    /**
     * Specifies a boolean value whether enable undo/redo operations in the image editor.
     *
     * @remarks
     * If this property is true, the undo redo options will be enabled in toolbar and can also be accessed via keyboard shortcuts.
     * If set to false, both options will be disabled.
     * The undo redo history is limited to 16. Once the maximum limit is reached, the oldest history item will be removed to make space for the new item.
     *
     * @default true
     *
     */
    allowUndoRedo: boolean;
    /**
     * Specifies whether to show/hide the quick access toolbar.
     *
     * @default true
     *
     * @remarks
     * Set this property to true to show the quick access toolbar, and false to hide it.
     * ```html
     * <div id='imageeditor'></div>
     * ```
     * ```typescript
     * <script>
     * var imageObj = new ImageEditor({
     *     showQuickAccessToolbar : true
     * });
     * imageObj.appendTo("#imageeditor");
     * </script>
     * ```
     */
    showQuickAccessToolbar: boolean;
    /**
     * Specifies a template for the quick access toolbar.
     * Use this property to customize the quick access toolbar.
     *
     * @default null
     * @aspType string
     *
     * @remarks
     * This property only works if the "showQuickToolbar" property is set to true.
     * ```html
     * <div id='imageeditor'></div>
     * ```
     * ```typescript
     * <script>
     * var imageObj = new ImageEditor({
     *     showQuickAccessToolbar : true,
     *     quickAccessToolbarTemplate: '#toolbarTemplate'
     * });
     * imageObj.appendTo("#imageeditor");
     * </script>
     * <script id="toolbarTemplate" type="text/x-template">
     *    <div class = 'e-toolbar'>
     *      <button id= 'dltbtn'></button>
     *    </div>
     *  </script>
     * ```
     */
    quickAccessToolbarTemplate: string | Function;
    /**
     * Specifies whether to prevent user interaction with the image editor control.
     * A boolean that specifies whether to prevent the interaction in image editor control. The default value is false.
     *
     * @remarks
     * If the property is true, the image editor control becomes read-only, and the user interaction will be prevented.
     *
     * @default false
     * @private
     */
    isReadOnly: boolean;
    /**
     * Specifies whether to enable RTL mode in image editor control that displays the content in the right-to-left direction.
     * A boolean that specifies whether to enable RTL mode in image editor control. The default value is false.
     *
     * @default false
     * @private
     */
    enableRtl: boolean;
    /**
     * Specifies a bool value whether enable or disable persist component's state between page reloads. The default value is false.
     *
     * @remarks
     * If this property is true, the controls's state persistence will be enabled.
     * Control's property will be stored in browser local storage to persist control's state when page reloads.
     *
     * @default false
     * @private
     */
    enablePersistence: boolean;
    /**
     * Specifies the finetune settings option which can be used to perform color adjustments in the image editor control.
     *
     * {% codeBlock src='image-editor/finetuneSettings/index.md' %}{% endcodeBlock %}
     *
     * @remarks
     * A 'FinetuneSettingsModel' value that specifies the the finetune options which are enabled in image editor control.
     * If the property is not specified, then the default values will be applied for minimum, maximum, and value properties for all finetune options.
     *
     * The possible values are:
     * - Brightness: The intensity of the primary colors grows with increased brightness, but the color itself does not change. It can be done by changing brightness and opacity property.
     * - Contrast: The contrast of an image refers to the difference between the light pixels and dark pixels. Low contrast images contain either a narrow range of colors while high contrast images have bright highlights and dark shadows. It can be done by changing contrast property.
     * - Hue: Hue distinguishes one color from another and is described using common color names such as green, blue, red, yellow, etc. Value refers to the lightness or darkness of a color. It can be controlled by hue-rotate property.
     * - Saturation: If saturation increases, colors appear sharper or purer. As saturation decreases, colors appear more washed-out or faded. It can be controlled by saturation and brightness property.
     * - Exposure: If exposure increases, intensity of light appears brighter. As exposure decreases, intensity of light decreases. Exposure can be controlled by brightness property.
     * - Opacity: The state or quality of being opaque or transparent, not allowing light to pass through the image. Opacity can be controlled by opacity property.
     * - Blur : Adjusting the blur can make an image unfocused or unclear. Blur can be controlled by blur property.
     *
     */
    finetuneSettings: FinetuneSettingsModel;
    /**
     * Specifies the zoom settings to perform zooming action.
     * A 'ZoomSettingsModel' value that specifies the the zoom related options which are enabled in image editor control. The default value is null.
     *
     * {% codeBlock src='image-editor/zoomSettings/index.md' %}{% endcodeBlock %}
     *
     * @remarks
     * If the property is not specified, then the default settings will be applied for all the properties available in zoom settings.
     *
     * The following options are available in `zoomSettings`.
     * - minZoomFactor: Specifies the minimum zoom factor level to control the zoom.
     * - maxZoomFactor: Specifies the maximum zoom factor level to control the zoom.
     * - zoomFactor: Specifies the zoom factor to be applied to the image.
     * - zoomTrigger: Specifies the types of zooming to be supported in the image editor.
     * - zoomPoint: Specifies the x and y coordinates in which the zooming performed on initial load.
     *
     */
    zoomSettings: ZoomSettingsModel;
    /**
     * Specifies the selection settings to customize selection.
     * A 'SelectionSettingsModel' value that specifies the the customization related options which are enabled in image editor control. The default value is null.
     *
     * @remarks
     * If the property is not specified, then the default settings will be applied for all the properties available in selection settings.
     *
     * The following options are available in `selectionSettings`.
     * - showCircle: Specifies whether to show / hide circles on selection.
     * - strokeColor: Specifies the stroke color of circle selection.
     * - fillColor: Specifies the fill color of circle selection.
     *
     */
    selectionSettings: SelectionSettingsModel;
    /**
     * Event callback that is raised before an image is saved.
     *
     * @event beforeSave
     */
    beforeSave: EmitType<BeforeSaveEventArgs>;
    /**
     * Event callback that is raised after rendering the Image Editor component.
     *
     * @event created
     */
    created: EmitType<Event>;
    /**
     * Event callback that is raised once the component is destroyed with its elements and bound events.
     *
     * @event destroyed
     */
    destroyed: EmitType<Event>;
    /**
     * Event callback that is raised while zooming an image.
     *
     * @event zooming
     */
    zooming: EmitType<ZoomEventArgs>;
    /**
     * Event callback that is raised while panning an image.
     *
     * @event panning
     */
    panning: EmitType<PanEventArgs>;
    /**
     * Event callback that is raised while cropping an image.
     *
     * @event cropping
     */
    cropping: EmitType<CropEventArgs>;
    /**
     * Event callback that is raised while rotating an image.
     *
     * @event rotating
     */
    rotating: EmitType<RotateEventArgs>;
    /**
     * Event callback that is raised while flipping an image.
     *
     * @event flipping
     */
    flipping: EmitType<FlipEventArgs>;
    /**
     * Event callback that is raised while changing shapes in an Image Editor.
     *
     * @event shapeChanging
     */
    shapeChanging: EmitType<ShapeChangeEventArgs>;
    /**
     * Event callback that is raised while changing selection in an Image Editor.
     *
     * @event selectionChanging
     */
    selectionChanging: EmitType<SelectionChangeEventArgs>;
    /**
     * Event callback that is raised once an image is opened in an Image Editor.
     *
     * @event fileOpened
     */
    fileOpened: EmitType<OpenEventArgs>;
    /**
     * Event callback that is raised once an image is saved.
     *
     * @event saved
     */
    saved: EmitType<SaveEventArgs>;
    /**
     * Event callback that is raised once the toolbar is created.
     *
     * @event toolbarCreated
     */
    toolbarCreated: EmitType<ToolbarEventArgs>;
    /**
     * Event callback that is raised while updating/refreshing the toolbar
     *
     * {% codeBlock src='image-editor/toolbarUpdating/index.md' %}{% endcodeBlock %}
     *
     * @event toolbarUpdating
     *
     */
    toolbarUpdating: EmitType<ToolbarEventArgs>;
    /**
     * Event callback that is raised once the toolbar item is clicked.
     *
     * @event toolbarItemClicked
     */
    toolbarItemClicked: EmitType<ClickEventArgs>;
    /**
     * Event callback that is raised when applying filter to an image.
     *
     * @event imageFiltering
     */
    imageFiltering: EmitType<ImageFilterEventArgs>;
    /**
     * Event callback that is raised when applying fine tune to an image.
     *
     * @event finetuneValueChanging
     */
    finetuneValueChanging: EmitType<FinetuneEventArgs>;
    /**
     * Event callback that is raised while clicking on an image in the Image Editor.
     *
     * @event click
     */
    click: EmitType<ImageEditorClickEventArgs>;
    /**
     * Event callback that is raised when opening the quick access toolbar.
     *
     * @event quickAccessToolbarOpen
     *
     * @remarks
     * Use this event to customize the toolbar items that appear in the quick access toolbar.
     * To customize the toolbar items, modify the "toolbarItems" collection property of the event arguments.
     * The "toolbarItems" collection contains string and ItemModel values.
     * The string values representing the names of the built-in toolbar items to display.
     * The ItemModel values representing the ItemModel of custom toolbar items to display.
     *
     * ```html
     * <div id='imageeditor'></div>
     * ```
     * ```typescript
     * <script>
     * var imageObj = new ImageEditor({
     *     showQuickAccessToolbar : true,
     *     quickAccessToolbarOpen: (args: QuickAccessToolbarEventArgs)=> {
     *         args.toolbarItems = [“Delete”, {text: “custom”}];
     *     }
     *
     * });
     * imageObj.appendTo("#imageeditor");
     * </script>
     */
    quickAccessToolbarOpen: EmitType<QuickAccessToolbarEventArgs>;
    /**
     * Event callback that is raised once the quick access toolbar item is clicked.
     *
     * @event quickAccessToolbarItemClick
     *
     */
    quickAccessToolbarItemClick: EmitType<ClickEventArgs>;
    /**
     *
     * Constructor for creating the widget
     *
     * @param  {ImageEditorModel} options - Specifies the image editor model
     * @param  {string|HTMLDivElement} element - Specifies the target element
     */
    constructor(options?: ImageEditorModel, element?: string | HTMLDivElement);
    /**
     * To provide the array of modules needed for component rendering.
     *
     * @returns {ModuleDeclaration[]} - To provide the array of modules needed for component rendering.
     * @hidden
     */
    requiredModules(): ModuleDeclaration[];
    protected preRender(): void;
    /**
     *
     * To Initialize the component rendering
     *
     * @private
     * @returns {void}
     */
    protected render(): void;
    /**
     * To get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    getModuleName(): string;
    /**
     *
     * To get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     * @private
     */
    getPersistData(): string;
    /**
     *
     * Called internally if any of the property value changed.
     *
     * @param {ImageEditorModel} newProperties - Specifies new properties
     * @param {ImageEditorModel} oldProperties - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProperties: ImageEditorModel, oldProperties?: ImageEditorModel): void;
    destroy(): void;
    initialize(): void;
    /**
     *
     * This Method will add events to component (element, event, method, current reference)
     *
     * @returns {void}.
     */
    private wireEvent;
    /**
     *
     * This Method will remove events from component
     *
     * @returns {void}.
     */
    private unwireEvent;
    private createCanvas;
    private touchStartHandler;
    private mouseDownEventHandler;
    private mouseMoveEventHandler;
    private mouseUpEventHandler;
    private keyDownEventHandler;
    private keyUpEventHandler;
    private canvasMouseDownHandler;
    private canvasMouseMoveHandler;
    private canvasMouseUpHandler;
    private handleScroll;
    private adjustToScreen;
    private screenOrientation;
    private windowResizeHandler;
    private notifyResetForAllModules;
    private allowShape;
    /**
     * Clears the current selection performed in the image editor.
     *
     * @returns {void}.
     */
    clearSelection(): void;
    /**
     * Crops an image based on the selection done in the image editor.
     *
     * {% codeBlock src='image-editor/crop/index.md' %}{% endcodeBlock %}
     *
     * @remarks
     * The selection can be done through programmatically using the 'select' method or through UI interactions.
     *
     * @returns {boolean}.
     *
     */
    crop(): boolean;
    /**
     * Flips an image by horizontally or vertically in the image editor.
     *
     * {% codeBlock src='image-editor/zoom/index.md' %}{% endcodeBlock %}
     *
     * @param { Direction } direction - Specifies the direction to flip the image.
     * A horizontal direction for horizontal flipping and vertical direction for vertical flipping.
     *
     * @remarks
     * It flips the shapes including rectangle, circle, line, text, and freehand drawings.
     *
     * @returns {void}.
     *
     */
    flip(direction: Direction): void;
    /**
     * Returns an image as ImageData to load it in to a canvas.
     *
     * @remarks
     * The data returned from this method is directly drawn in a canvas using 'putImageData' method.
     * And then the user can get the base64 string from the canvas using toDataURL method.
     *
     * @returns {ImageData}.
     */
    getImageData(): ImageData;
    /**
     *  Opens an image as URL or ImageData for editing in an image editor.
     *
     * @param {string | ImageData } data - Specifies url of the image or image data.
     *
     * @remarks
     * The supported file types are JPG, JPEG, PNG, and SVG.
     *
     * @returns {void}.
     */
    open(data: string | ImageData): void;
    /**
     * Reset all the changes done in an image editor and revert to original image.
     *
     * @remarks
     * The undo redo collection also cleared while resetting the image editor.
     *
     * @returns {void}.
     */
    reset(): void;
    /**
     * Rotate an image to clockwise and anti-clockwise.
     *
     * {% codeBlock src='image-editor/rotate/index.md' %}{% endcodeBlock %}
     *
     * @param {number} degree - Specifies a degree to rotate an image.
     * A positive integer value for clockwise and negative integer value for anti-clockwise rotation.
     *
     * @remarks
     * It rotated the shapes including rectangle, circle, line, text, and freehand drawings.
     *
     * @returns {boolean}.
     *
     */
    rotate(degree: number): boolean;
    /**
     * Export an image using the specified file name and the extension.
     *
     * @param {string} type - Specifies a format of image to be saved.
     * @param {string} fileName – Specifies a file name to be saved
     *
     * @remarks
     * The supported file types are JPG, JPEG, PNG, and SVG.
     *
     * @returns {void}.
     */
    export(type?: string, fileName?: string): void;
    /**
     * Perform selection in an image editor. The selection helps to crop an image.
     *
     * {% codeBlock src='image-editor/select/index.md' %}{% endcodeBlock %}
     *
     * @param {string} type - Specifies the shape - circle / square / custom selection / pre-defined ratios.
     * @param {number} startX – Specifies the start x-coordinate point of the selection.
     * @param {number} startY – Specifies the start y-coordinate point of the selection.
     * @param {number} width - Specifies the width of the selection area.
     * @param {number} height - Specifies the height of the selection area.
     *
     * @remarks
     * The selection UI is based on the 'theme' property.
     *
     * @returns {void}.
     *
     */
    select(type: string, startX?: number, startY?: number, width?: number, height?: number): void;
    /**
     * Enable or disable a freehand drawing option in an Image Editor.
     *
     * @param {boolean} value - Specifies a value whether to enable or disable freehand drawing.
     *
     * @returns {void}.
     * @private
     */
    freeHandDraw(value: boolean): void;
    /**
     * Enable or disable a freehand drawing in an Image Editor.
     *
     * @param {boolean} value - Specifies a value whether to enable or disable freehand drawing.
     *
     * @remarks
     * User can directly drawing on a canvas after enabling this option.
     *
     * @returns {void}.
     */
    freehandDraw(value: boolean): void;
    /**
     * Enable or disable a panning on the Image Editor.
     *
     * @param {boolean} value - Specifies a value whether enable or disable panning.
     *
     * @remarks
     * This option will take into effect once the image's visibility is hidden when zooming an image or selection has been performed.
     *
     * @returns {void}.
     */
    pan(value: boolean): void;
    /**
     * Zoom in or out on a point in the image editor.
     *
     * @param {number} zoomFactor - The percentage-based zoom factor to use (e.g. 20 for 2x zoom).
     * @param {Point} zoomPoint - The point in the image editor to zoom in/out on.
     *
     * @remarks
     * Zooming directly enables the panning option when the image's visibility is hidden.
     * User can disable it by using 'Pan' method.
     * @returns {void}
     *
     */
    zoom(zoomFactor: number, zoomPoint?: Point): void;
    /**
     * Draw ellipse on an image.
     *
     * {% codeBlock src='image-editor/ellipse/index.md' %}{% endcodeBlock %}
     *
     * @param {number} x - Specifies x-coordinate of ellipse.
     * @param {number} y - Specifies y-coordinate of ellipse.
     * @param {number} radiusX - Specifies the radius x point for the ellipse.
     * @param {number} radiusY - Specifies the radius y point for the ellipse.
     * @param {number} strokeWidth - Specifies the stroke width of ellipse.
     * @param {string} strokeColor - Specifies the stroke color of ellipse.
     * @param {string} fillColor - Specifies the fill color of the ellipse.
     * @returns {boolean}.
     *
     */
    drawEllipse(x?: number, y?: number, radiusX?: number, radiusY?: number, strokeWidth?: number, strokeColor?: string, fillColor?: string): boolean;
    /**
     * Draw line on an image.
     *
     * @param {number} startX – Specifies start point x-coordinate of line.
     * @param {number} startY – Specifies start point y-coordinate of line.
     * @param {number} endX - Specifies end point x-coordinates of line.
     * @param {number} endY - Specifies end point y-coordinates of the line.
     * @param {number} strokeWidth - Specifies the stroke width of line.
     * @param {string} strokeColor - Specifies the stroke color of line.
     * @returns {boolean}.
     */
    drawLine(startX?: number, startY?: number, endX?: number, endY?: number, strokeWidth?: number, strokeColor?: string): boolean;
    /**
     * Draw arrow on an image.
     *
     * @param {number} startX – Specifies start point x-coordinate of arrow.
     * @param {number} startY – Specifies start point y-coordinate of arrow.
     * @param {number} endX - Specifies end point x-coordinates of arrow.
     * @param {number} endY - Specifies end point y-coordinates of the arrow.
     * @param {number} strokeWidth - Specifies the stroke width of arrow.
     * @param {string} strokeColor - Specifies the stroke color of arrow.
     * @param {ArrowheadType} arrowStart – Specifies the type of arrowhead for start position. The default value is ‘None’.
     * @param {ArrowheadType} arrowEnd – Specifies the type of arrowhead for end position. The default value is ‘SolidArrow’.
     * @returns {boolean}.
     */
    drawArrow(startX?: number, startY?: number, endX?: number, endY?: number, strokeWidth?: number, strokeColor?: string, arrowStart?: ArrowheadType, arrowEnd?: ArrowheadType): boolean;
    /**
     * Draw path on an image.
     *
     * @param {Point[]} pointColl – Specifies collection of start and end x, y-coordinates of path.
     * @param {number} strokeWidth - Specifies the stroke width of path.
     * @param {string} strokeColor - Specifies the stroke color of path.
     * @returns {boolean}.
     */
    drawPath(pointColl: Point[], strokeWidth?: number, strokeColor?: string): boolean;
    /**
     * Draw a rectangle on an image.
     *
     * @param {number} x - Specifies x-coordinate of rectangle.
     * @param {number} y - Specifies y-coordinate of rectangle.
     * @param {number} width - Specifies the width of the rectangle.
     * @param {number} height - Specifies the height of the rectangle.
     * @param {number} strokeWidth - Specifies the stroke width of rectangle.
     * @param {string} strokeColor - Specifies the stroke color of rectangle.
     * @param {string} fillColor - Specifies the fill color of the rectangle.
     * @returns {boolean}.
     */
    drawRectangle(x?: number, y?: number, width?: number, height?: number, strokeWidth?: number, strokeColor?: string, fillColor?: string): boolean;
    /**
     * Draw a text on an image.
     *
     * {% codeBlock src='image-editor/text/index.md' %}{% endcodeBlock %}
     *
     * @param {number} x - Specifies x-coordinate of text.
     * @param {number} y - Specifies y-coordinate of text.
     * @param {string} text - Specifies the text to add on an image.
     * @param {string} fontFamily - Specifies the font family of the text.
     * @param {number} fontSize - Specifies the font size of the text.
     * @param {boolean} bold - Specifies whether the text is bold or not.
     * @param {boolean} italic - Specifies whether the text is italic or not.
     * @param {string} color - Specifies font color of the text.
     * @returns {boolean}.
     *
     */
    drawText(x?: number, y?: number, text?: string, fontFamily?: string, fontSize?: number, bold?: boolean, italic?: boolean, color?: string): boolean;
    /**
     * Select a shape based on the given shape id.
     * Use 'getShapeSettings' method to get the shape id which is then passed to perform selection.
     *
     * {% codeBlock src='image-editor/selectShape/index.md' %}{% endcodeBlock %}
     *
     * @param {string} id - Specifies the shape id to select a shape on an image.
     * @returns {boolean}.
     *
     */
    selectShape(id: string): boolean;
    /**
     * Deletes a shape based on the given shape id.
     * Use 'getShapeSettings' method to get the shape id which is then passed to perform selection.
     *
     * {% codeBlock src='image-editor/deleteShape/index.md' %}{% endcodeBlock %}
     *
     * @param {string} id - Specifies the shape id to delete the shape on an image.
     * @returns {void}.
     *
     */
    deleteShape(id: string): void;
    /**
     * Get particular shapes details based on id of the shape which is drawn on an image editor.
     *
     * {% codeBlock src='image-editor/getShapeSetting/index.md' %}{% endcodeBlock %}
     *
     * @param {string} id - Specifies the shape id on an image.
     * @returns {ShapeSettings}.
     *
     */
    getShapeSetting(id: string): ShapeSettings;
    /**
     * Get all the shapes details which is drawn on an image editor.
     *
     * @returns {ShapeSettings[]}.
     */
    getShapeSettings(): ShapeSettings[];
    /**
     * To refresh the Canvas Wrapper.
     *
     * @returns {void}.
     */
    update(): void;
    /**
     * Finetuning an image with the given type of finetune and its value in the image editor.
     *
     * @param {ImageFinetuneOption } finetuneOption - Specifies the finetune options to be performed in the image.
     * @param {number } value - Specifies the value for finetuning the image.
     *
     * @remarks
     * The finetuning will not affect the shapes background and border color.
     *
     * @returns {void}.
     *
     */
    finetuneImage(finetuneOption: ImageFinetuneOption, value: number): void;
    /**
     * Filtering an image with the given type of filters.
     *
     * @param {ImageFilterOption } filterOption - Specifies the filter options to the image.
     *
     * @remarks
     * The filtering will not affect the shape's background and border color.
     * @returns {void}.
     */
    applyImageFilter(filterOption: ImageFilterOption): void;
    /**
     * Reverse the last action which performed by the user in the Image Editor.
     *
     * @remarks
     * This method will take into effect once the 'allowUndoRedo' property is enabled.
     *
     * @returns {void}.
     */
    undo(): void;
    /**
     * Redo the last user action that was undone by the user or `undo` method.
     *
     * @remarks
     * This method will take into effect once the 'allowUndoRedo' property is enabled.
     * @returns {void}.
     */
    redo(): void;
    /**
     * Get the dimension of an image in the image editor such as x, y, width, and height.
     * The method helps to get dimension after cropped an image.
     *
     * @returns {Dimension}.
     * A Dimension object containing the x, y, width, and height of an image.
     */
    getImageDimension(): Dimension;
    private toolbarTemplateFn;
    private quickAccessToolbarTemplateFn;
    private templateParser;
    private getTextFromId;
    private getFinetuneOption;
    private setPenStroke;
    private updateFreehandDrawColorChange;
    private setInitialZoomState;
    /**
     * Set the old item Transform item state.
     *
     * @hidden
     * @returns {void}.
     */
    updateCropTransformItems(): void;
    /**
     * Get the pascal case.
     *
     * @param { string } str - Specifies the string to convert to pascal case.
     * @param { Object } obj - Specifies the string to convert to pascal case.
     * @hidden
     * @returns {string}.
     * A pascal case string.
     */
    toPascalCase(str: string, obj?: Object): string;
    /**
     * Get the font sizes.
     *
     * @hidden
     * @returns {DropDownButtonItemModel[]}.
     * A font size collections.
     */
    getFontSizes(): DropDownButtonItemModel[];
    /**
     * Handles the OK button operation
     *
     * @param { boolean } isMouseDown - Specifies whether it is a mouse down.
     * @hidden
     * @returns {void}.
     */
    okBtn(isMouseDown?: boolean): void;
    /**
     * Set the temporary filter properties.
     *
     * @hidden
     * @returns {void}.
     */
    setTempFilterProperties(): void;
    /**
     * To crop the selection.
     *
     * @hidden
     * @returns {void}.
     */
    cropSelectedState(): void;
    /**
     * Get the current canvas data.
     *
     * @hidden
     * @returns {ImageData}.
     * An ImageData returns the current canvas image data object.
     */
    getCurrentCanvasData(): ImageData;
    /**
     * To set current adjustment value
     *
     * @param { string } type - Specifies the type of adjustment.
     * @param { number } value - Specifies the value to adjust.
     * @hidden
     * @returns {void}.
     */
    setCurrAdjustmentValue(type: string, value: number): void;
    /**
     * Get the square point for path.
     *
     * @param { SelectionPoint } obj - Specifies the points of path.
     * @hidden
     * @returns {ActivePoint}.
     * An ActivePoint object which returns the square point.
     */
    getSquarePointForPath(obj: SelectionPoint): ActivePoint;
    /**
     * Get the SelectionType.
     *
     * @param { string } type - Specifies the SelectionType.
     * @hidden
     * @returns {string}.
     * An string which returns the SelectionType.
     */
    getSelectionType(type: string): string;
    /** Clears the context.
     *
     * @param { CanvasRenderingContext2D } ctx - Specifies the canvas context.
     * @hidden
     * @returns {void}.
     */
    clearContext(ctx: CanvasRenderingContext2D): void;
    /**
     * Apply Arrow for start and end.
     *
     * @param { string } type - Specifies the start arrow or end arrow.
     * @param { string } id - Specifies the start arrow or end arrow item id.
     * @hidden
     * @returns {void}.
     */
    updateArrow(type: string, id: string): void;
    /**
     * Apply Font style for text.
     *
     * @param { string } id - Specifies the selected item id.
     * @hidden
     * @returns {void}.
     */
    updateFontFamily(id: string): void;
    /**
     * Apply Font size for text.
     *
     * @param { string } text - Specifies the selected item text.
     * @hidden
     * @returns {void}.
     */
    updateFontSize(text: string): void;
    /**
     * Apply Font color for text.
     *
     * @param { string } value - Specifies the selected color item value.
     * @hidden
     * @returns {void}.
     */
    updateFontColor(value: string): void;
    /**
     * Apply Pen stroke width.
     *
     * @param { string } id - Specifies the selected item id.
     * @hidden
     * @returns {void}.
     */
    updatePenStrokeWidth(id: string): void;
    /**
     * Apply Pen stroke color.
     *
     * @param { string } value - Specifies the selected color item value.
     * @hidden
     * @returns {void}.
     */
    updatePenStrokeColor(value: string): void;
    /**
     * Apply Shape stroke width.
     *
     * @param { string } id - Specifies the selected item id.
     * @hidden
     * @returns {void}.
     */
    updateStrokeWidth(id: string): void;
    /**
     * Apply Shape stroke color.
     *
     * @param { string } value - Specifies the selected color item value.
     * @hidden
     * @returns {void}.
     */
    updateStrokeColor(value: string): void;
    /**
     * Apply Shape fill color.
     *
     * @param { string } value - Specifies the selected color item value.
     * @hidden
     * @returns {void}.
     */
    updateFillColor(value: string): void;
    /**
     * Get pascalToSplitWords from string.
     *
     * @param { string } str - Specifies the word.
     * @hidden
     * @returns {string}.
     */
    pascalToSplitWords(str: string): string;
    /**
     * Get Slider Value.
     *
     * @param { string } type - Finetune type.
     * @hidden
     * @returns {number}.
     */
    getCurrAdjustmentValue(type: string): number;
    /**
     * Apply transformSelect.
     *
     * @param { string } type - Specifies the selected item text.
     * @hidden
     * @returns {void}.
     */
    transformSelect(type: string): void;
    /**
     * Returns default filter.
     *
     * @hidden
     * @returns {string}.
     */
    getDefaultFilter(): string;
    /**
     * To Initialize the component rendering
     *
     * @private
     * @param {HTMLCanvasElement} element - Specifies the canvas element.
     * @param {BlazorDotnetObject} dotnetRef - Specifies for blazor client to server communication.
     * @returns {void}
     */
    initializeImageEditor(element: HTMLDivElement, dotnetRef?: BlazorDotnetObject): void;
    private prerender;
    private initializeZoomSettings;
    private initializeThemeColl;
    /**
     * Get the square point for path.
     *
     * @param { HTMLDivElement } element - Specifies element.
     * @param { string } type - Specifies the type.
     * @param { string } value - Specifies the value.
     * @hidden
     * @private
     * @returns {void}.
     */
    updateToolbar(element: HTMLDivElement, type: string, value?: string): void;
}
