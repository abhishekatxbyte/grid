import { extend, isBlazor, isNullOrUndefined } from '@syncfusion/ej2-base';
import { hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
var Export = /** @class */ (function () {
    function Export(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    Export.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    Export.prototype.addEventListener = function () {
        this.parent.on('export', this.export, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    Export.prototype.removeEventListener = function () {
        this.parent.off('export', this.export);
        this.parent.off('destroyed', this.destroy);
    };
    Export.prototype.export = function (args) {
        if (isBlazor()) {
            var obj = { shape: '' };
            this.parent.notify('selection', { prop: 'getCurrentDrawingShape', onPropertyChange: false, value: { obj: obj } });
            if (obj['shape'] !== '') {
                this.parent.notify('selection', { prop: 'setCurrentDrawingShape', onPropertyChange: false, value: { value: '' } });
                this.parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            }
        }
        else {
            this.parent.notify('toolbar', { prop: 'refreshShapeDrawing', onPropertyChange: false });
        }
        this.updatePvtVar();
        switch (args.prop) {
            case 'export':
                this.exportImg(args.value['type'], args.value['fileName']);
                break;
            case 'exportToCanvas':
                this.exportToCanvas(args.value['object']);
                break;
        }
    };
    Export.prototype.getModuleName = function () {
        return 'export';
    };
    Export.prototype.updatePvtVar = function () {
        var parent = this.parent;
        if (parent.lowerCanvas) {
            this.lowerContext = parent.lowerCanvas.getContext('2d');
        }
    };
    Export.prototype.exportImg = function (type, fileName) {
        var _this = this;
        var parent = this.parent;
        var obj = { fileName: '' };
        parent.notify('draw', { prop: 'getFileName', onPropertyChange: false, value: { obj: obj } });
        var imageName = obj['fileName'];
        if (!parent.disabled && parent.isImageLoaded) {
            var dummyObj = { bool: false };
            parent.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: dummyObj } });
            if (dummyObj['bool']) {
                parent.notify('freehand-draw', { prop: 'applyFhd', onPropertyChange: false });
            }
            if (parent.togglePen) {
                parent.currObjType.isZoomed = true;
                parent.notify('shape', { prop: 'apply', onPropertyChange: false, value: { shape: null, obj: null, canvas: null } });
            }
            if (parent.textArea.style.display === 'block') {
                parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                    value: { x: null, y: null, isMouseDown: null } });
            }
            parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: null } });
            var obj_1 = { canvasFilter: this.parent.canvasFilter };
            this.lowerContext.filter = obj_1['canvasFilter'];
            type = type ? type : 'Png';
            parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                value: { x: null, y: null, isMouseDown: null } });
            var beforeSave = { cancel: false, fileName: fileName ? fileName : imageName,
                fileType: type };
            if (isBlazor() && parent.events && parent.events.saving.hasDelegate === true) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                parent.dotNetRef.invokeMethodAsync('BeforeSaveEventAsync', 'BeforeSave', beforeSave).then(function (beforeSave) {
                    _this.beforeSaveEvent(beforeSave, type, fileName, imageName);
                });
            }
            else {
                parent.trigger('beforeSave', beforeSave);
                this.beforeSaveEvent(beforeSave, type, fileName, imageName);
            }
        }
    };
    Export.prototype.beforeSaveEvent = function (observableSaveArgs, type, fileName, imageName) {
        var parent = this.parent;
        if (!observableSaveArgs.cancel) {
            parent.currObjType.isSave = true;
            fileName = observableSaveArgs.fileName ? observableSaveArgs.fileName : fileName;
            var lowerCaseType = type.toLowerCase();
            fileName = fileName || imageName;
            if (lowerCaseType === 'svg') {
                this.toSVGImg(fileName);
            }
            else {
                this.toBlobFn(fileName, lowerCaseType);
            }
            var saved = { fileName: fileName ? fileName : imageName, fileType: type };
            parent.trigger('saved', saved);
            if (!isBlazor()) {
                parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
            }
            parent.lowerCanvas.style.left = parent.upperCanvas.style.left = '';
            parent.lowerCanvas.style.top = parent.upperCanvas.style.top = '';
            parent.lowerCanvas.style.maxWidth = parent.upperCanvas.style.maxWidth = '';
            parent.lowerCanvas.style.maxHeight = parent.upperCanvas.style.maxHeight = '';
        }
    };
    Export.prototype.toSVGImg = function (fileName) {
        var parent = this.parent;
        showSpinner(parent.element);
        parent.element.style.opacity = '0.5';
        var tempCanvas = this.exportToCanvas();
        var dataUrl = tempCanvas.toDataURL();
        hideSpinner(parent.element);
        parent.element.style.opacity = '1';
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', tempCanvas.style.maxWidth);
        svg.setAttribute('height', tempCanvas.style.maxHeight);
        var XLinkNS = 'http://www.w3.org/1999/xlink';
        var img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        img.setAttributeNS(null, 'height', tempCanvas.height.toString());
        img.setAttributeNS(null, 'width', tempCanvas.width.toString());
        img.setAttributeNS(XLinkNS, 'xlink:href', dataUrl);
        svg.appendChild(img);
        var prefix = 'data:image/svg+xml;base64,';
        var header = '<svg' + ' xmlns="http://www.w3.org/2000/svg"' + ' xmlns:xlink="http://www.w3.org/1999/xlink"'
            + (" width=\"" + tempCanvas.width + "\"") + (" height=\"" + tempCanvas.height + "\"") + '>';
        var footer = '</svg>';
        var body = svg.innerHTML;
        var data = header + body + footer;
        var svgDataUrl = prefix + btoa(data);
        if (fileName === null) {
            return svgDataUrl;
        }
        else {
            this.downloadImg(svgDataUrl, fileName + '.' + 'svg');
            return null;
        }
    };
    Export.prototype.toBlobFn = function (fileName, type) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var parent = this.parent;
        showSpinner(parent.element);
        parent.element.style.opacity = '0.5';
        var tempCanvas = this.exportToCanvas();
        // eslint-disable-next-line @typescript-eslint/tslint/config
        tempCanvas.toBlob(function (blob) {
            var blobUrl = URL.createObjectURL(blob);
            proxy.downloadImg(blobUrl, fileName + '.' + type);
            hideSpinner(parent.element);
            parent.element.style.opacity = '1';
        }, 'image/png');
    };
    Export.prototype.exportToCanvas = function (object) {
        var parent = this.parent;
        var width;
        var height;
        if (parent.currSelectionPoint) {
            width = parent.img.srcWidth;
            height = parent.img.srcHeight;
        }
        else {
            width = parent.baseImg.width;
            height = parent.baseImg.height;
        }
        var obj = { width: 0, height: 0 };
        parent.notify('crop', { prop: 'calcRatio', onPropertyChange: false,
            value: { obj: obj, dimension: { width: width, height: height } } });
        var ratio = obj;
        var tempContextFilter = this.lowerContext.filter;
        // Manipulating blur value
        if (this.lowerContext.filter !== 'none') {
            var splitWords = this.lowerContext.filter.split(' ');
            var value = parseFloat(splitWords[5].split('(')[1]);
            value *= ((ratio.width + ratio.height) / 2);
            splitWords[5] = 'blur(' + value + 'px)';
            this.lowerContext.filter = splitWords.join(' ');
        }
        var tempCanvas = parent.createElement('canvas', {
            id: parent.element.id + '_tempCanvas', attrs: { name: 'canvasImage' }
        });
        var tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = width;
        tempCanvas.height = height;
        var dimObj = { width: 0, height: 0 };
        parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
            value: { width: width, height: height, obj: dimObj } });
        var maxDimension = dimObj;
        tempCanvas.style.maxWidth = maxDimension.width + 'px';
        tempCanvas.style.maxHeight = maxDimension.height + 'px';
        var temp = this.lowerContext.filter;
        parent.notify('filter', { prop: 'updateBrightFilter', onPropertyChange: false });
        tempContext.filter = this.lowerContext.filter;
        tempContext.drawImage(parent.baseImg, parent.img.srcLeft, parent.img.srcTop, parent.img.srcWidth, parent.img.srcHeight, 0, 0, width, height);
        this.lowerContext.filter = temp;
        if (parent.transform.degree !== 0 || parent.transform.currFlipState !== '') {
            this.updateSaveContext(tempContext);
            this.exportTransformedImage(tempContext);
        }
        if (parent.objColl.length > 0) {
            var temp_1 = tempContext.filter;
            tempContext.filter = 'none';
            var tempObjColl = extend([], parent.objColl, [], true);
            for (var i = 0, len = parent.objColl.length; i < len; i++) {
                var activePoint = parent.objColl[i].activePoint;
                // Subtracting destination left and top points
                activePoint.startX -= parent.img.destLeft;
                activePoint.startY -= parent.img.destTop;
                activePoint.endX -= parent.img.destLeft;
                activePoint.endY -= parent.img.destTop;
                activePoint.width = activePoint.endX - activePoint.startX;
                activePoint.height = activePoint.endY - activePoint.startY;
                // Manipulating points
                activePoint.startX *= ratio.width;
                activePoint.startY *= ratio.height;
                activePoint.endX *= ratio.width;
                activePoint.endY *= ratio.height;
                activePoint.width = activePoint.endX - activePoint.startX;
                activePoint.height = activePoint.endY - activePoint.startY;
                parent.objColl[i].strokeSettings.strokeWidth *= ((ratio.width + ratio.height) / 2);
                if (parent.objColl[i].shape === 'text') {
                    parent.objColl[i].textSettings.fontSize *= ((ratio.width + ratio.height) / 2);
                }
                else if (parent.objColl[i].shape === 'path') {
                    for (var l = 0; l < parent.objColl[i].pointColl.length; l++) {
                        parent.objColl[i].pointColl[l].x =
                            (parent.objColl[i].pointColl[l].x - parent.img.destLeft) * ratio.width;
                        parent.objColl[i].pointColl[l].y =
                            (parent.objColl[i].pointColl[l].y - parent.img.destTop) * ratio.height;
                    }
                }
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'saveContext', obj: parent.objColl[i], isCropRatio: null,
                        points: null, isPreventDrag: true, saveContext: tempContext, isPreventSelection: null } });
            }
            tempContext.filter = temp_1;
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            parent.objColl = tempObjColl;
        }
        if (parent.freehandCounter > 0) {
            // eslint-disable-next-line
            var tempPointColl = extend({}, parent.pointColl, {}, true);
            for (var n = 0; n < parent.freehandCounter; n++) {
                parent.points = extend([], parent.pointColl[n].points, []);
                parent.notify('freehand-draw', { prop: 'setPointCounter', onPropertyChange: false, value: { value: 0 } });
                var len = parent.points.length;
                parent.pointColl[n].strokeWidth *= ((ratio.width + ratio.height) / 2);
                for (var l = 0; l < len; l++) {
                    parent.points[l].x = (parent.points[l].x - parent.img.destLeft) * ratio.width;
                    parent.points[l].y = (parent.points[l].y - parent.img.destTop) * ratio.height;
                }
            }
            parent.notify('freehand-draw', { prop: 'freehandRedraw', onPropertyChange: false,
                value: { context: tempContext, points: null } });
            parent.pointColl = tempPointColl;
        }
        if (parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: tempContext, isSave: true, isFlip: null } });
        }
        this.lowerContext.filter = tempContextFilter;
        parent.canvasFilter = tempContextFilter;
        if (object) {
            object['canvas'] = tempCanvas;
        }
        return tempCanvas;
    };
    Export.prototype.downloadImg = function (blob, fileName) {
        var a = document.createElement('a');
        a.href = blob;
        a.target = '_parent';
        a.download = fileName;
        (document.body || document.documentElement).appendChild(a);
        a.click();
        a.parentNode.removeChild(a);
    };
    Export.prototype.exportTransformedImage = function (tempContext) {
        var parent = this.parent;
        var degree = parent.transform.degree;
        for (var i = 0, len = parent.rotateFlipColl.length; i < len; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var flip = parent.rotateFlipColl[i];
            if (typeof flip === 'number') {
                this.exportRotate(tempContext, flip);
            }
            else if (flip === 'horizontal') {
                this.exportFlip(tempContext, true, false);
            }
            else if (flip === 'vertical') {
                this.exportFlip(tempContext, false, true);
            }
        }
        parent.transform.degree = degree;
    };
    Export.prototype.exportRotate = function (tempContext, degree) {
        var parent = this.parent;
        this.setMaxDim(parent.transform.degree, tempContext.canvas);
        tempContext.translate(tempContext.canvas.width / 2, tempContext.canvas.height / 2);
        tempContext.rotate(Math.PI / 180 * degree);
        tempContext.drawImage(parent.inMemoryCanvas, -tempContext.canvas.height / 2, -tempContext.canvas.width / 2, tempContext.canvas.height, tempContext.canvas.width);
        this.updateSaveContext(tempContext);
    };
    Export.prototype.exportFlip = function (tempContext, flipHorizontal, flipVertical) {
        if (flipHorizontal) {
            tempContext.translate(tempContext.canvas.width, 0);
            tempContext.scale(-1, 1);
        }
        if (flipVertical) {
            tempContext.translate(0, tempContext.canvas.height);
            tempContext.scale(1, -1);
        }
        tempContext.drawImage(this.parent.inMemoryCanvas, 0, 0);
        this.updateSaveContext(tempContext);
    };
    Export.prototype.updateSaveContext = function (tempContext) {
        var inMemoryContext = this.parent.inMemoryCanvas.getContext('2d');
        tempContext.setTransform(1, 0, 0, 1, 0, 0);
        var imageData = tempContext.getImageData(0, 0, tempContext.canvas.width, tempContext.canvas.height);
        this.parent.inMemoryCanvas.width = imageData.width;
        this.parent.inMemoryCanvas.height = imageData.height;
        inMemoryContext.putImageData(imageData, 0, 0);
    };
    Export.prototype.setMaxDim = function (degree, tempCanvas) {
        var newWidth;
        var newHeight;
        if (degree % 90 === 0 && degree % 180 !== 0) {
            newWidth = isNullOrUndefined(this.parent.currSelectionPoint) ? this.parent.baseImg.height : this.parent.img.srcHeight;
            newHeight = isNullOrUndefined(this.parent.currSelectionPoint) ? this.parent.baseImg.width : this.parent.img.srcWidth;
        }
        else if (degree % 180 === 0 || degree === 0) {
            newWidth = isNullOrUndefined(this.parent.currSelectionPoint) ? this.parent.baseImg.width : this.parent.img.srcWidth;
            newHeight = isNullOrUndefined(this.parent.currSelectionPoint) ? this.parent.baseImg.height : this.parent.img.srcHeight;
        }
        tempCanvas.width = newWidth;
        tempCanvas.height = newHeight;
        var obj = { width: 0, height: 0 };
        this.parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
            value: { width: newWidth, height: newHeight, obj: obj } });
        var maxDimension = obj;
        tempCanvas.style.maxWidth = maxDimension.width + 'px';
        tempCanvas.style.maxHeight = maxDimension.height + 'px';
    };
    return Export;
}());
export { Export };
