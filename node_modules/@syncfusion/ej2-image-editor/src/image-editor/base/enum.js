/**
 * An enum representing the file types supported by the image editor.
 *
 * @enum {string}
 */
export var FileType;
(function (FileType) {
    /** The PNG file type. */
    FileType["Png"] = "Png";
    /** The JPEG file type. */
    FileType["Jpeg"] = "Jpeg";
    /** The SVG file type. */
    FileType["Svg"] = "Svg";
})(FileType || (FileType = {}));
/**
 * An enumeration representing the direction of an image editor operation.
 *
 * @enum {string}
 */
export var Direction;
(function (Direction) {
    /** The horizontal direction. */
    Direction["Horizontal"] = "Horizontal";
    /** The vertical direction. */
    Direction["Vertical"] = "Vertical";
})(Direction || (Direction = {}));
/**
 * An enumeration representing the type of shape to be added in the image editor.
 *
 * @enum {string}
 */
export var ShapeType;
(function (ShapeType) {
    /** A rectangle shape. */
    ShapeType["Rectangle"] = "Rectangle";
    /** An ellipse shape. */
    ShapeType["Ellipse"] = "Ellipse";
    /** A line shape. */
    ShapeType["Line"] = "Line";
    /** An arrow shape. */
    ShapeType["Arrow"] = "Arrow";
    /** A path shape. */
    ShapeType["Path"] = "Path";
    /** A text shape. */
    ShapeType["Text"] = "Text";
    /** A freehand drawing shape. */
    ShapeType["FreehandDraw"] = "FreehandDraw";
})(ShapeType || (ShapeType = {}));
/**
 * An enumeration representing the different ways to trigger zooming in the image editor.
 *
 * @aspNumberEnum
 */
export var ZoomTrigger;
(function (ZoomTrigger) {
    /** Zooming triggered by mouse wheel. */
    ZoomTrigger[ZoomTrigger["MouseWheel"] = 1] = "MouseWheel";
    /** Zooming triggered by pinch gesture. */
    ZoomTrigger[ZoomTrigger["Pinch"] = 2] = "Pinch";
    /** Zooming triggered by command keys. */
    ZoomTrigger[ZoomTrigger["Commands"] = 4] = "Commands";
    /** Zooming triggered by toolbar button click. */
    ZoomTrigger[ZoomTrigger["Toolbar"] = 8] = "Toolbar";
})(ZoomTrigger || (ZoomTrigger = {}));
/**
 * * An enum representing the available themes in the image editor.
 */
export var Theme;
(function (Theme) {
    /** The Bootstrap 5 theme. */
    Theme["Bootstrap5"] = "Bootstrap5";
    /** The dark variant of the Bootstrap 5 theme. */
    Theme["Bootstrap5Dark"] = "Bootstrap5Dark";
    /** The Tailwind CSS theme. */
    Theme["Tailwind"] = "Tailwind";
    /** The dark variant of the Tailwind CSS theme. */
    Theme["TailwindDark"] = "TailwindDark";
    /** The Fluent UI theme. */
    Theme["Fluent"] = "Fluent";
    /** The dark variant of the Fluent UI theme. */
    Theme["FluentDark"] = "FluentDark";
    /** The Bootstrap 4 theme. */
    Theme["Bootstrap4"] = "Bootstrap4";
    /** The Bootstrap theme. */
    Theme["Bootstrap"] = "Bootstrap";
    /** The dark variant of the Bootstrap theme. */
    Theme["BootstrapDark"] = "BootstrapDark";
    /** The Material Design theme. */
    Theme["Material"] = "Material";
    /** The dark variant of the Material Design theme. */
    Theme["MaterialDark"] = "MaterialDark";
    /** The Fabric theme. */
    Theme["Fabric"] = "Fabric";
    /** The dark variant of the Fabric theme. */
    Theme["FabricDark"] = "FabricDark";
    /** The high contrast theme. */
    Theme["Highcontrast"] = "Highcontrast";
})(Theme || (Theme = {}));
/**
 * An enum representing the available toolbar commands in the image editor.
 */
export var ImageEditorCommand;
(function (ImageEditorCommand) {
    ImageEditorCommand["Crop"] = "Crop";
    ImageEditorCommand["Transform"] = "Transform";
    ImageEditorCommand["Annotate"] = "Annotate";
    ImageEditorCommand["ZoomIn"] = "ZoomIn";
    ImageEditorCommand["ZoomOut"] = "ZoomOut";
    ImageEditorCommand["Open"] = "Open";
    ImageEditorCommand["Reset"] = "Reset";
    ImageEditorCommand["Save"] = "Save";
    ImageEditorCommand["Pan"] = "Pan";
    ImageEditorCommand["Move"] = "Move";
    ImageEditorCommand["Pen"] = "Pen";
    ImageEditorCommand["Line"] = "Line";
    ImageEditorCommand["Arrow"] = "Arrow";
    ImageEditorCommand["Path"] = "Path";
    ImageEditorCommand["Rectangle"] = "Rectangle";
    ImageEditorCommand["Ellipse"] = "Ellipse";
    ImageEditorCommand["Text"] = "Text";
    ImageEditorCommand["CustomSelection"] = "CustomSelection";
    ImageEditorCommand["CircleSelection"] = "CircleSelection";
    ImageEditorCommand["SquareSelection"] = "SquareSelection";
    ImageEditorCommand["RatioSelection"] = "RatioSelection";
    ImageEditorCommand["RotateLeft"] = "RotateLeft";
    ImageEditorCommand["RotateRight"] = "RotateRight";
    ImageEditorCommand["FlipHorizontal"] = "FlipHorizontal";
    ImageEditorCommand["FlipVertical"] = "FlipVertical";
})(ImageEditorCommand || (ImageEditorCommand = {}));
/**
 * An enumeration of available image filter options.
 *
 * @remarks
 * These options can be used with the `applyImageFilter` method of the image editor control to apply filters to an image.
 */
export var ImageFilterOption;
(function (ImageFilterOption) {
    /** Default filter */
    ImageFilterOption["Default"] = "Default";
    /** Chrome filter */
    ImageFilterOption["Chrome"] = "Chrome";
    /** Cold filter */
    ImageFilterOption["Cold"] = "Cold";
    /** Warm filter */
    ImageFilterOption["Warm"] = "Warm";
    /** Grayscale filter */
    ImageFilterOption["Grayscale"] = "Grayscale";
    /** Sepia filter */
    ImageFilterOption["Sepia"] = "Sepia";
    /** Invert filter */
    ImageFilterOption["Invert"] = "Invert";
})(ImageFilterOption || (ImageFilterOption = {}));
/**
 * An enumeration of available image finetune options.
 *
 * @remarks
 * These options can be used with the `finetuneImage` method of the image editor control to apply finetuning to an image.
 */
export var ImageFinetuneOption;
(function (ImageFinetuneOption) {
    /** Adjust the brightness of the image */
    ImageFinetuneOption["Brightness"] = "Brightness";
    /** Adjust the contrast of the image */
    ImageFinetuneOption["Contrast"] = "Contrast";
    /** Adjust the hue of the image */
    ImageFinetuneOption["Hue"] = "Hue";
    /** Adjust the saturation of the image */
    ImageFinetuneOption["Saturation"] = "Saturation";
    /** Adjust the exposure of the image */
    ImageFinetuneOption["Exposure"] = "Exposure";
    /** Adjust the opacity of the image */
    ImageFinetuneOption["Opacity"] = "Opacity";
    /** Adjust the blur of the image */
    ImageFinetuneOption["Blur"] = "Blur";
})(ImageFinetuneOption || (ImageFinetuneOption = {}));
/**
 * Specifies the type of arrowhead should be drawn.
 *
 */
export var ArrowheadType;
(function (ArrowheadType) {
    /** Indicates no arrowhead should be drawn. */
    ArrowheadType["None"] = "None";
    /** Indicates a normal triangle-shaped arrowhead should be drawn. */
    ArrowheadType["Arrow"] = "Arrow";
    /** Indicates a solid triangle-shaped arrowhead should be drawn. */
    ArrowheadType["SolidArrow"] = "SolidArrow";
    /** Indicates a circular-shaped arrowhead should be drawn. */
    ArrowheadType["Circle"] = "Circle";
    /** Indicates a solid circular-shaped arrowhead should be drawn. */
    ArrowheadType["SolidCircle"] = "SolidCircle";
    /** Indicates a square-shaped arrowhead should be drawn. */
    ArrowheadType["Square"] = "Square";
    /** Indicates a solid square-shaped arrowhead should be drawn. */
    ArrowheadType["SolidSquare"] = "SolidSquare";
    /** Indicates a bar shaped arrowhead should be drawn. */
    ArrowheadType["Bar"] = "Bar";
})(ArrowheadType || (ArrowheadType = {}));
