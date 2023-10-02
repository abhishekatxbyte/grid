import { ImageEditor } from '../index';
export declare class Export {
    private parent;
    private lowerContext;
    constructor(parent: ImageEditor);
    destroy(): void;
    private addEventListener;
    private removeEventListener;
    private export;
    getModuleName(): string;
    private updatePvtVar;
    private exportImg;
    private beforeSaveEvent;
    private toSVGImg;
    private toBlobFn;
    private exportToCanvas;
    private downloadImg;
    private exportTransformedImage;
    private exportRotate;
    private exportFlip;
    private updateSaveContext;
    private setMaxDim;
}
