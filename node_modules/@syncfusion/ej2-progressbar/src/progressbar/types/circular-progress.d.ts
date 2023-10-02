import { ProgressBar } from '../../progressbar';
import { ProgressLocation } from '../utils/helper';
/**
 * Progressbar of type circular
 */
export declare class Circular {
    private progress;
    delay: number;
    private segment;
    private animation;
    private isRange;
    private centerX;
    private centerY;
    private maxThickness;
    private availableSize;
    private trackEndAngle;
    endPosition: ProgressLocation;
    bufferEndPosition: ProgressLocation;
    constructor(progress: ProgressBar);
    /** To render the circular track */
    renderCircularTrack(): void;
    /** To render the circular progress */
    renderCircularProgress(previousEnd?: number, previousTotalEnd?: number, refresh?: boolean): void;
    /** To render the circular buffer */
    private renderCircularBuffer;
    /** To render the circular Label */
    renderCircularLabel(isProgressRefresh?: boolean): void;
    /** To render a progressbar active state */
    private renderActiveState;
    /** Checking the segment size */
    private validateSegmentSize;
    /** checking progress color */
    private checkingCircularProgressColor;
}
