import { ChildProperty } from '@syncfusion/ej2-base';
import { TextAlignmentType } from '../utils/enum';
import { BorderModel, FontModel } from './progress-base-model';
/**
 * progress bar complex interface
 */
export declare class Margin extends ChildProperty<Margin> {
    /**
     * To customize top margin value
     *
     * @default 10
     */
    top: number;
    /**
     * To customize top bottom value
     *
     * @default 10
     */
    bottom: number;
    /**
     * To customize top left value
     *
     * @default 10
     */
    left: number;
    /**
     * To customize top right value
     *
     * @default 10
     */
    right: number;
}
/**
 * Configures the fonts in progressbar
 */
export declare class Font extends ChildProperty<Font> {
    /**
     * FontStyle for the text.
     *
     * @default 'Normal'
     */
    fontStyle: string;
    /**
     * Font size for the text.
     *
     * @default '16px'
     */
    size: string;
    /**
     * FontWeight for the text.
     *
     * @default 'Normal'
     */
    fontWeight: string;
    /**
     * Color for the text.
     *
     * @default ''
     */
    color: string;
    /**
     * FontFamily for the text.
     */
    fontFamily: string;
    /**
     * Opacity for the text.
     *
     * @default null
     */
    opacity: number;
    /**
     * text alignment for label
     *
     * @default Far
     */
    textAlignment: TextAlignmentType;
    /**
     * label text
     *
     * @default ''
     */
    text: string;
}
/**
 * Animation
 */
export declare class Animation extends ChildProperty<Animation> {
    /**
     * enable
     *
     * @default false
     */
    enable: boolean;
    /**
     * duration
     *
     * @default 2000
     */
    duration: number;
    /**
     * delay
     *
     * @default 0
     */
    delay: number;
}
/**
 * Annotation
 */
export declare class ProgressAnnotationSettings extends ChildProperty<ProgressAnnotationSettings> {
    /**
     * Content of the annotation, which accepts the id of the custom element.
     *
     * @default null
     */
    content: string;
    /**
     * to move annotation
     *
     * @default 0
     */
    annotationAngle: number;
    /**
     * to move annotation
     *
     * @default '0%'
     */
    annotationRadius: string;
}
/**
 * Configures the borders .
 */
export declare class Border extends ChildProperty<Border> {
    /**
     * The color of the border that accepts value in hex as a valid CSS color string.
     *
     * @default ''
     */
    color: string;
    /**
     * The width of the border in pixels.
     *
     * @default 1
     */
    width: number;
}
/**
 *  Options to customize the tooltip for the progress bar.
 *
 *  @default {}
 */
export declare class TooltipSettings extends ChildProperty<TooltipSettings> {
    /**
     * If set to true, tooltip will be displayed for the progress bar.
     *
     * @default false.
     */
    enable: boolean;
    /**
     * The fill color of the tooltip that accepts value in hex as a valid CSS color string.
     *
     * @default null.
     */
    fill: string;
    /**
     * Format the tooltip content. Use ${value} as the placeholder text to display the corresponding progress value.
     *
     * @default null.
     */
    format: string;
    /**
     * If set to true, tooltip will be displayed for the progress bar on mouse hover.
     *
     * @default false.
     */
    showTooltipOnHover: boolean;
    /**
     * Options to customize the tooltip text.
     *
     */
    textStyle: FontModel;
    /**
     * Options to customize tooltip borders.
     *
     * @default {}
     */
    border: BorderModel;
}
/**
 * RangeColor
 */
export declare class RangeColor extends ChildProperty<RangeColor> {
    /**
     * color
     *
     * @default null
     */
    color: string;
    /**
     * start
     *
     * @default null
     */
    start: number;
    /**
     * end
     *
     * @default null
     */
    end: number;
}
