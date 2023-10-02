import { EventHandler, extend, isBlazor, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ShapeType } from '../index';
var Shape = /** @class */ (function () {
    function Shape(parent) {
        this.textSettings = { text: 'Enter Text', fontFamily: 'Arial', fontSize: null, fontRatio: null, bold: false, italic: false, underline: false };
        this.strokeSettings = { strokeColor: '#fff', fillColor: '', strokeWidth: null };
        this.keyHistory = ''; // text history
        this.parent = parent;
        this.addEventListener();
    }
    Shape.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    Shape.prototype.addEventListener = function () {
        this.parent.on('shape', this.shape, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    Shape.prototype.removeEventListener = function () {
        this.parent.off('shape', this.shape);
        this.parent.off('destroyed', this.destroy);
    };
    Shape.prototype.shape = function (args) {
        this.initShapePvtProps();
        switch (args.prop) {
            case 'drawEllipse':
                this.drawEllipse(args.value['x'], args.value['y'], args.value['radiusX'], args.value['radiusY'], args.value['strokeWidth'], args.value['strokeColor'], args.value['fillColor']);
                break;
            case 'drawLine':
                this.drawLine(args.value['startX'], args.value['startY'], args.value['endX'], args.value['endY'], args.value['strokeWidth'], args.value['strokeColor']);
                break;
            case 'drawArrow':
                this.drawArrow(args.value['startX'], args.value['startY'], args.value['endX'], args.value['endY'], args.value['strokeWidth'], args.value['strokeColor'], args.value['arrowStart'], args.value['arrowEnd']);
                break;
            case 'drawPath':
                this.drawPath(args.value['pointColl'], args.value['strokeWidth'], args.value['strokeColor']);
                break;
            case 'drawRectangle':
                this.drawRectangle(args.value['x'], args.value['y'], args.value['width'], args.value['height'], args.value['strokeWidth'], args.value['strokeColor'], args.value['fillColor']);
                break;
            case 'drawText':
                this.drawText(args.value['x'], args.value['y'], args.value['text'], args.value['fontFamily'], args.value['fontSize'], args.value['bold'], args.value['italic'], args.value['color']);
                break;
            case 'redrawActObj':
                this.redrawActObj(args.value['x'], args.value['y'], args.value['isMouseDown']);
                break;
            case 'apply':
                this.apply(args.value['shape'], args.value['obj'], args.value['canvas']);
                break;
            case 'updateShapeChangeEventArgs':
                this.updateShapeChangeEventArgs(args.value['shapeSettings']);
                break;
            case 'updSelChangeEventArgs':
                this.updSelChangeEventArgs(args.value['selectionSettings']);
                break;
            case 'iterateObjColl':
                this.iterateObjColl();
                break;
            case 'updImgRatioForActObj':
                this.updImgRatioForActObj();
                break;
            case 'zoomObjColl':
                this.zoomObjColl(args.value['isPreventApply']);
                break;
            case 'redrawObj':
                this.redrawObj(args.value['degree']);
                break;
            case 'rotateObjColl':
                this.rotateObjColl();
                break;
            case 'draw-shape-text':
                this.drawShapeText();
                break;
            case 'redraw-text':
                this.redrawText();
                break;
            case 'draw-shape':
                this.drawShape(args.value['obj'], args.value['strokeWidth'], args.value['strokeColor'], args.value['fillColor'], args.value['start'], args.value['width'], args.value['height']);
                break;
            case 'renderTextArea':
                this.renderTextArea(args.value['x'], args.value['y'], args.value['actObj']);
                break;
            case 'setTextBoxWidth':
                this.setTextBoxWidth(args.value['e']);
                break;
            case 'findTextTarget':
                this.findTextTarget(args.value['e']);
                break;
            case 'panObjColl':
                this.panObjColl(args.value['xDiff'], args.value['yDiff'], args.value['panRegion']);
                break;
            case 'updateFontStyles':
                this.updateFontStyles(args.value['isTextBox']);
                break;
            case 'applyFontStyle':
                this.applyFontStyle(args.value['item']);
                break;
            case 'updateFontRatio':
                this.updateFontRatio(args.value['obj'], args.value['isTextArea']);
                break;
            case 'updateFontSize':
                this.updateFontSize(args.value['obj']);
                break;
            case 'updateObjColl':
                this.updateObjColl(args.value['item'], args.value['objColl']);
                break;
            case 'pushActItemIntoObj':
                this.pushActItemIntoObj();
                break;
            case 'clearActObj':
                this.clearActObj();
                break;
            case 'refreshActiveObj':
                this.refreshActiveObj();
                break;
            case 'applyActObj':
                this.applyActObj(args.value['isMouseDown']);
                break;
            case 'wireEvent':
                EventHandler.add(this.parent.upperCanvas, 'dblclick', this.findTextTarget, this);
                EventHandler.add(this.parent.textArea, 'mousedown', this.findTextTarget, this);
                break;
            case 'unWireEvent':
                EventHandler.remove(this.parent.upperCanvas, 'dblclick', this.findTextTarget);
                EventHandler.remove(this.parent.textArea, 'mousedown', this.findTextTarget);
                break;
            case 'getShapeSetting':
                this.getShapeSetting(args.value['id'], args.value['obj']);
                break;
            case 'getShapeSettings':
                this.getShapeSettings(args.value['obj']);
                break;
            case 'isPointsInRange':
                this.isPointsInRange(args.value['x'], args.value['y'], args.value['obj']);
                break;
            case 'alignRotateFlipColl':
                this.alignRotateFlipColl(args.value['collection'], args.value['isRotateFlipCollection'], args.value['obj']);
                break;
            case 'selectShape':
                this.selectShape(args.value['id'], args.value['obj']);
                break;
            case 'deleteShape':
                this.deleteShape(args.value['id']);
                break;
            case 'getMaxText':
                this.getMaxText(args.value['isTextBox'], args.value['text'], args.value['obj']);
                break;
            case 'setPointCollForLineArrow':
                args.value['obj'].pointColl = this.getLinePoints(args.value['obj'].activePoint.startX, args.value['obj'].activePoint.startY, args.value['obj'].activePoint.endX, args.value['obj'].activePoint.endY);
                break;
            case 'setPointCollForShapeRotation':
                this.setPointCollForShapeRotation(args.value['obj']);
                break;
            case 'setTextSettings':
                if (args.value['textSettings']) {
                    this.textSettings = args.value['textSettings'];
                }
                else if (args.value['fontFamily']) {
                    this.textSettings.fontFamily = args.value['fontFamily'];
                }
                else if (args.value['fontSize']) {
                    this.textSettings.fontSize = args.value['fontSize'];
                }
                break;
            case 'setStrokeSettings':
                if (args.value['strokeSettings']) {
                    this.strokeSettings = args.value['strokeSettings'];
                }
                else if (args.value['strokeColor']) {
                    this.strokeSettings.strokeColor = args.value['strokeColor'];
                }
                else if (args.value['fillColor']) {
                    this.strokeSettings.fillColor = args.value['fillColor'];
                }
                else if (args.value['strokeWidth']) {
                    this.strokeSettings.strokeWidth = args.value['strokeWidth'];
                }
                break;
            case 'getStrokeSettings':
                args.value['obj']['strokeSettings'] = this.strokeSettings;
                break;
            case 'setKeyHistory':
                this.keyHistory = args.value['keyHistory'];
                break;
            case 'getKeyHistory':
                args.value['obj']['keyHistory'] = this.keyHistory;
                break;
            case 'setTextBoxPos':
                this.setTextBoxPos(args.value['actObj'], args.value['degree'], args.value['flip'], args.value['x'], args.value['y']);
                break;
            case 'setTextBoxPoints':
                this.setTextBoxPoints(args.value['actObj'], args.value['degree'], args.value['flip'], args.value['x'], args.value['y']);
                break;
            case 'alignTextAreaIntoCanvas':
                this.alignTextAreaIntoCanvas();
                break;
            case 'initializeTextShape':
                this.initializeTextShape(args.value['text'], args.value['fontFamily'], args.value['fontSize'], args.value['bold'], args.value['italic'], args.value['strokeColor']);
                break;
            case 'stopPathDrawing':
                this.stopPathDrawing(args.value['e']);
                break;
            case 'updateArrowRatio':
                this.updateArrowRatio(args.value['obj']);
                break;
            case 'getSquarePointForRotatedShape':
                this.getSquarePointForRotatedShape(args.value['obj'], args.value['object']);
                break;
            case 'reset':
                this.reset();
                break;
        }
    };
    Shape.prototype.getModuleName = function () {
        return 'shape';
    };
    Shape.prototype.initShapePvtProps = function () {
        if (this.parent.lowerCanvas) {
            this.lowerContext = this.parent.lowerCanvas.getContext('2d');
        }
        if (this.parent.upperCanvas) {
            this.upperContext = this.parent.upperCanvas.getContext('2d');
        }
    };
    Shape.prototype.reset = function () {
        this.textSettings =
            { text: 'Enter Text', fontFamily: 'Arial', fontSize: null, fontRatio: null, bold: false, italic: false, underline: false };
        this.strokeSettings = { strokeColor: '#fff', fillColor: '', strokeWidth: null };
    };
    Shape.prototype.drawEllipse = function (x, y, radiusX, radiusY, strokeWidth, strokeColor, fillColor, degree) {
        this.initializeShape('ellipse');
        var start = x && y ? { x: x, y: y } : null;
        this.drawShape('ellipse', strokeWidth, strokeColor, fillColor, start, radiusX, radiusY, null, null, null, degree);
    };
    Shape.prototype.drawLine = function (startX, startY, endX, endY, strokeWidth, strokeColor) {
        this.initializeShape('line');
        var start = startX && startY ? { x: startX, y: startY } : null;
        var width = endX - startX;
        var height = endY - startY;
        this.drawShape('line', strokeWidth, strokeColor, null, start, width, height);
    };
    Shape.prototype.drawPath = function (pointColl, strokeWidth, strokeColor) {
        this.initializeShape('path');
        if (pointColl) {
            this.drawShape('path', strokeWidth, strokeColor, null, null, null, null, pointColl);
        }
        else {
            this.drawShape('line', strokeWidth, strokeColor, null, null, null, null);
            var obj = extend({}, this.parent.objColl[this.parent.objColl.length - 1], null, true);
            obj.shape = 'path';
            obj.lineDraw = null;
            obj.pointColl = [{ x: obj.activePoint.startX, y: obj.activePoint.startY },
                { x: obj.activePoint.endX, y: obj.activePoint.endY }];
            this.parent.objColl[this.parent.objColl.length - 1] = obj;
        }
    };
    Shape.prototype.drawArrow = function (startX, startY, endX, endY, strokeWidth, strokeColor, arrowStart, arrowEnd) {
        this.initializeShape('arrow');
        var start = startX && startY ? { x: startX, y: startY } : null;
        var width = endX - startX;
        var height = endY - startY;
        this.drawShape('arrow', strokeWidth, strokeColor, null, start, width, height, null, arrowStart, arrowEnd);
    };
    Shape.prototype.drawRectangle = function (x, y, width, height, strokeWidth, strokeColor, fillColor, degree) {
        this.initializeShape('rectangle');
        var start = x && y ? { x: x, y: y } : null;
        this.drawShape('rectangle', strokeWidth, strokeColor, fillColor, start, width, height, null, null, null, degree);
    };
    Shape.prototype.drawText = function (x, y, text, fontFamily, fontSize, bold, italic, color) {
        this.drawShapeText(text, fontFamily, fontSize, bold, italic, color, x, y);
    };
    Shape.prototype.initializeShape = function (type) {
        this.redrawActObj();
        this.parent.activeObj.shape = type;
        if (this.parent.currObjType.shape === 'freehanddraw') {
            this.apply();
            this.parent.upperCanvas.style.cursor = this.parent.cursor = 'default';
            this.parent.currObjType.shape = '';
        }
        this.parent.currObjType.isCustomCrop = false;
    };
    Shape.prototype.updateWidthHeight = function (obj) {
        obj.activePoint.width = obj.activePoint.endX - obj.activePoint.startX;
        obj.activePoint.height = obj.activePoint.endY - obj.activePoint.startY;
        return obj;
    };
    Shape.prototype.setDimension = function (width, height) {
        if (width && height) {
            this.parent.activeObj.activePoint.width = width;
            this.parent.activeObj.activePoint.height = height;
            if (this.parent.currObjType.shape.toLowerCase() === 'ellipse') {
                this.parent.activeObj.activePoint.width = 2 * width;
                this.parent.activeObj.activePoint.height = 2 * height;
            }
        }
    };
    Shape.prototype.getArrowType = function (type) {
        var arrowType = type;
        if (type) {
            var typeToArrowType = { 'None': 'none', 'Arrow': 'arrow', 'SolidArrow': 'arrowSolid',
                'Circle': 'circle', 'SolidCircle': 'circleSolid', 'Square': 'square', 'SolidSquare': 'squareSolid', 'Bar': 'bar' };
            arrowType = typeToArrowType["" + type];
        }
        return arrowType;
    };
    Shape.prototype.drawShape = function (type, strokeWidth, strokeColor, fillColor, start, width, height, pointColl, arrowStart, arrowEnd, degree) {
        var _this = this;
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
            this.redrawActObj();
            var objColl_1 = extend([], parent.objColl, [], true);
            parent.togglePen = false;
            this.keyHistory = '';
            this.parent.upperCanvas.style.display = 'block';
            this.refreshActiveObj();
            parent.currObjType.shape = type;
            if (parent.currObjType.shape.toLowerCase() === 'path' && isNullOrUndefined(pointColl)) {
                parent.activeObj.shape = parent.currObjType.shape.toLowerCase();
                parent.activeObj.pointColl = [];
                parent.upperCanvas.style.cursor = this.parent.cursor = 'crosshair';
                parent.notify('selection', { prop: 'setCurrentDrawingShape', onPropertyChange: false, value: { value: 'path' } });
                if (!isBlazor()) {
                    parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'shapes',
                            isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
                }
            }
            else {
                if (parent.currObjType.shape.toLowerCase() !== 'freehanddraw' && parent.currObjType.shape.toLowerCase() !== '') {
                    parent.activeObj.shape = parent.currObjType.shape.toLowerCase();
                    this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                    if (isNullOrUndefined(parent.activeObj.strokeSettings)) {
                        parent.activeObj.strokeSettings = this.strokeSettings;
                    }
                    if (parent.currObjType.shape.toLowerCase() === 'path' && pointColl) {
                        parent.activeObj.pointColl = pointColl;
                    }
                    parent.activeObj.strokeSettings.strokeWidth = strokeWidth ? strokeWidth : parent.activeObj.strokeSettings.strokeWidth;
                    parent.activeObj.strokeSettings.strokeColor = strokeColor ? strokeColor : parent.activeObj.strokeSettings.strokeColor;
                    parent.activeObj.strokeSettings.fillColor = fillColor ? fillColor : parent.activeObj.strokeSettings.fillColor;
                    var tempWidth = parent.img.destWidth > 100 ? 100 : parent.img.destWidth / 2;
                    var tempHeight = parent.img.destHeight > 100 ? 100 : parent.img.destHeight / 2;
                    parent.activeObj.activePoint.width = tempWidth;
                    parent.activeObj.activePoint.height = tempHeight;
                    if (parent.currObjType.shape.toLowerCase() === 'line' || parent.currObjType.shape.toLowerCase() === 'arrow') {
                        parent.activeObj.lineDraw = 'horizontal';
                        parent.activeObj.activePoint.height = 0;
                        if (parent.currObjType.shape.toLowerCase() === 'arrow') {
                            parent.activeObj.activePoint.width += 50;
                            parent.activeObj.start = this.getArrowType(arrowStart);
                            parent.activeObj.end = this.getArrowType(arrowEnd);
                        }
                    }
                    else if (parent.currObjType.shape.toLowerCase() === 'rectangle') {
                        parent.activeObj.activePoint.width += parent.activeObj.activePoint.width / 2;
                    }
                    this.setDimension(width, height);
                    if (start) {
                        parent.activeObj.activePoint.startX = start.x;
                        parent.activeObj.activePoint.startY = start.y;
                        parent.activeObj.activePoint.endX = parent.activeObj.activePoint.startX +
                            parent.activeObj.activePoint.width;
                        parent.activeObj.activePoint.endY = parent.activeObj.activePoint.startY +
                            parent.activeObj.activePoint.height;
                    }
                    else {
                        this.setCenterPoints();
                    }
                    this.setPointCollForLineAndArrow();
                    if (parent.currObjType.shape.toLowerCase() === 'arrow') {
                        parent.activeObj.triangleDirection = 'right';
                    }
                    parent.currObjType.isDragging = parent.currObjType.isCustomCrop = false;
                    this.initShapeProps();
                    var obj = { shapeSettingsObj: {} };
                    parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj } });
                    var shapeSettings = obj['shapeSettingsObj'];
                    var shapeChangingArgs = { action: 'insert', previousShapeSettings: shapeSettings,
                        currentShapeSettings: shapeSettings };
                    if (isBlazor() && parent.events && parent.events.shapeChanging.hasDelegate === true) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        this.parent.dotNetRef.invokeMethodAsync('ShapeEventAsync', 'OnShape', shapeChangingArgs).then(function (shapeChangingArgs) {
                            _this.updateShapeChangeEventArgs(shapeChangingArgs.currentShapeSettings);
                            _this.setDimension(width, height);
                            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate' } });
                            if (degree) {
                                parent.activeObj.rotatedAngle = degree * (Math.PI / 180);
                                parent.notify('selection', { prop: 'updPtCollForShpRot', onPropertyChange: false, value: { obj: parent.activeObj } });
                            }
                            parent.updateToolbar(parent.element, 'quickAccessToolbar', 'shape');
                            parent.notify('selection', { prop: 'isShapeInserted', onPropertyChange: false, value: { bool: true } });
                            parent.notify('undo-redo', { prop: 'updateUrObj', onPropertyChange: false, value: { objColl: objColl_1 } });
                            if (parent.isPublicMethod) {
                                parent.notify('undo-redo', { prop: 'updateUndoRedo', onPropertyChange: false });
                            }
                            parent.isPublicMethod = false;
                        });
                    }
                    else {
                        parent.trigger('shapeChanging', shapeChangingArgs);
                        this.updateShapeChangeEventArgs(shapeChangingArgs.currentShapeSettings);
                        this.setDimension(width, height);
                        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate' } });
                        if (degree) {
                            parent.activeObj.rotatedAngle = degree * (Math.PI / 180);
                            parent.notify('selection', { prop: 'updPtCollForShpRot', onPropertyChange: false, value: { obj: parent.activeObj } });
                        }
                        if (!isBlazor()) {
                            parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
                        }
                        else {
                            parent.updateToolbar(parent.element, 'quickAccessToolbar', 'shape');
                        }
                        parent.notify('selection', { prop: 'isShapeInserted', onPropertyChange: false, value: { bool: true } });
                        parent.notify('undo-redo', { prop: 'updateUrObj', onPropertyChange: false, value: { objColl: objColl_1 } });
                        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'shapes',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                        parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
                        if (parent.isPublicMethod) {
                            parent.notify('undo-redo', { prop: 'updateUndoRedo', onPropertyChange: false });
                        }
                        parent.isPublicMethod = false;
                    }
                }
            }
        }
    };
    Shape.prototype.initShapeProps = function () {
        var parent = this.parent;
        parent.activeObj.shapeDegree = parent.transform.degree;
        parent.activeObj.shapeFlip = parent.transform.currFlipState;
        parent.activeObj.textFlip = parent.transform.currFlipState;
        parent.activeObj.flipObjColl = [];
    };
    Shape.prototype.setPointCollForLineAndArrow = function () {
        var parent = this.parent;
        if (parent.activeObj.shape === 'line' || parent.activeObj.shape === 'arrow') {
            parent.activeObj.pointColl = this.getLinePoints(parent.activeObj.activePoint.startX, parent.activeObj.activePoint.startY, parent.activeObj.activePoint.endX, parent.activeObj.activePoint.endY);
            if (parent.activeObj.pointColl) {
                for (var i = 0, len = parent.activeObj.pointColl.length; i < len; i++) {
                    parent.activeObj.pointColl[i].ratioX = (parent.activeObj.pointColl[i].x -
                        parent.img.destLeft) / parent.img.destWidth;
                    parent.activeObj.pointColl[i].ratioY = (parent.activeObj.pointColl[i].y -
                        parent.img.destTop) / parent.img.destHeight;
                }
            }
        }
    };
    Shape.prototype.prevObjColl = function () {
        var parent = this.parent;
        var object = { currObj: {} };
        parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        this.prevObj = object['currObj'];
        this.prevObj.objColl = extend([], parent.objColl, [], true);
        this.prevObj.pointColl = extend([], parent.pointColl, [], true);
        this.prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        this.prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
    };
    Shape.prototype.drawShapeText = function (text, fontFamily, fontSize, bold, italic, strokeColor, x, y) {
        var _this = this;
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            if (parent.currObjType.shape === 'freehanddraw') {
                this.apply();
                parent.upperCanvas.style.cursor = parent.cursor = 'default';
                parent.currObjType.shape = '';
            }
            parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
            parent.togglePen = false;
            this.redrawActObj();
            this.prevObjColl();
            this.refreshActiveObj();
            parent.activeObj.shape = parent.currObjType.shape = 'text';
            parent.currObjType.isCustomCrop = false;
            this.initializeTextShape(text, fontFamily, fontSize, bold, italic, strokeColor);
            parent.currObjType.isText = parent.currObjType.isInitialText = true;
            if (isNullOrUndefined(parent.activeObj.textSettings.fontSize)) {
                if (parent.img.destWidth > parent.img.destHeight) {
                    parent.activeObj.textSettings.fontSize = (parent.img.destWidth / 15);
                }
                else {
                    parent.activeObj.textSettings.fontSize = (parent.img.destHeight / 15);
                }
                if (parent.activeObj.textSettings.fontSize < 20) {
                    parent.activeObj.textSettings.fontSize = 20;
                }
            }
            if (parent.img.destWidth < 100) {
                parent.activeObj.textSettings.fontSize = Math.floor((parent.img.destWidth / 20));
            }
            else if (parent.img.destHeight < 100) {
                parent.activeObj.textSettings.fontSize = Math.floor((parent.img.destHeight / 20));
            }
            parent.activeObj.shapeDegree = parent.transform.degree;
            parent.activeObj.shapeFlip = parent.transform.currFlipState;
            parent.activeObj.flipObjColl = [];
            this.updateFontStyles();
            var width = this.upperContext.measureText(parent.activeObj.textSettings.text).width +
                parent.activeObj.textSettings.fontSize * 0.5;
            var height = parent.activeObj.textSettings.fontSize + parent.activeObj.textSettings.fontSize * 0.25;
            if (!isNullOrUndefined(x) && !isNullOrUndefined(y)) {
                parent.activeObj.activePoint.startX = x;
                parent.activeObj.activePoint.startY = y;
                parent.activeObj.activePoint.endX = parent.activeObj.activePoint.startX + width;
                parent.activeObj.activePoint.endY = parent.activeObj.activePoint.startY + height;
            }
            else {
                this.setCenterPoints(true, width, height);
            }
            var obj = { shapeSettingsObj: {} };
            parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj } });
            var shapeSettings = obj['shapeSettingsObj'];
            var shapeChangingArgs = { action: 'insert', previousShapeSettings: shapeSettings,
                currentShapeSettings: shapeSettings };
            if (isBlazor() && parent.events && parent.events.shapeChanging.hasDelegate === true) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                parent.dotNetRef.invokeMethodAsync('ShapeEventAsync', 'OnShape', shapeChangingArgs).then(function (shapeChangingArgs) {
                    _this.drawShapeTextEvent(shapeChangingArgs);
                    if (parent.isPublicMethod) {
                        parent.notify('undo-redo', { prop: 'updateUndoRedo', onPropertyChange: false });
                    }
                    parent.isPublicMethod = false;
                });
            }
            else {
                parent.trigger('shapeChanging', shapeChangingArgs);
                this.drawShapeTextEvent(shapeChangingArgs);
                if (parent.isPublicMethod) {
                    parent.notify('undo-redo', { prop: 'updateUndoRedo', onPropertyChange: false });
                }
                parent.isPublicMethod = false;
            }
        }
    };
    Shape.prototype.drawShapeTextEvent = function (shapeChangingArgs) {
        var parent = this.parent;
        this.updateShapeChangeEventArgs(shapeChangingArgs.currentShapeSettings);
        this.addLetter(parent.activeObj.textSettings.text);
        parent.activeObj.textFlip = parent.transform.currFlipState;
        this.updateFontRatio(parent.activeObj);
        parent.objColl.push(parent.activeObj);
        var prevCropObj = extend({}, parent.cropObj, {}, true);
        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
            value: { operation: 'shapeTransform', previousObj: this.prevObj, previousObjColl: this.prevObj.objColl,
                previousPointColl: this.prevObj.pointColl, previousSelPointColl: this.prevObj.selPointColl,
                previousCropObj: prevCropObj, previousText: null,
                currentText: null, previousFilter: null, isCircleCrop: null } });
        parent.notify('selection', { prop: 'redrawShape', onPropertyChange: false,
            value: { obj: parent.objColl[parent.objColl.length - 1] } });
        if (!isBlazor()) {
            parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
        }
        else {
            parent.updateToolbar(parent.element, 'quickAccessToolbar', 'text');
        }
        parent.notify('selection', { prop: 'isShapeInserted', onPropertyChange: false, value: { bool: true } });
        if (!isBlazor()) {
            parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'text',
                    isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
            parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
        }
        else {
            parent.updateToolbar(parent.element, 'text');
        }
    };
    Shape.prototype.initializeTextShape = function (text, fontFamily, fontSize, bold, italic, strokeColor) {
        var parent = this.parent;
        this.keyHistory = '';
        parent.upperCanvas.style.display = 'block';
        if (isNullOrUndefined(parent.activeObj.textSettings)) {
            parent.activeObj.textSettings = this.textSettings;
        }
        if (isNullOrUndefined(parent.activeObj.strokeSettings)) {
            parent.activeObj.strokeSettings = this.strokeSettings;
        }
        parent.activeObj.strokeSettings.strokeColor = strokeColor || parent.activeObj.strokeSettings.strokeColor;
        parent.activeObj.textSettings.text = text || parent.activeObj.textSettings.text;
        parent.activeObj.textSettings.fontFamily = fontFamily || parent.activeObj.textSettings.fontFamily;
        parent.activeObj.textSettings.fontSize = fontSize || parent.activeObj.textSettings.fontSize;
        parent.activeObj.textSettings.bold = bold || parent.activeObj.textSettings.bold;
        parent.activeObj.textSettings.italic = italic || parent.activeObj.textSettings.italic;
    };
    Shape.prototype.redrawActObj = function (x, y, isMouseDown) {
        var splitWords;
        var parent = this.parent;
        if (parent.activeObj.shape) {
            splitWords = parent.activeObj.shape.split('-');
        }
        if (parent.activeObj.horTopLine && (parent.activeObj.shape && splitWords[0] !== 'crop')) {
            if (parent.textArea.style.display === 'block') {
                parent.notify('selection', { prop: 'setTextBoxStylesToActObj', onPropertyChange: false });
                this.updateFontRatio(parent.activeObj, true);
                if (x && y) {
                    if ((x !== parent.activeObj.activePoint.startX) && (y !== parent.activeObj.activePoint.startY)) {
                        this.updateTextFromTextArea();
                    }
                }
                else {
                    this.updateTextFromTextArea();
                    parent.textArea.style.transform = '';
                    parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
                }
                this.refreshActiveObj();
            }
            else {
                this.applyActObj(isMouseDown);
            }
        }
    };
    Shape.prototype.apply = function (shape, obj, canvas) {
        var parent = this.parent;
        if (!parent.disabled) {
            if (parent.togglePen && !parent.currObjType.isCustomCrop) {
                var destLeft = parent.img.destLeft;
                var destTop = parent.img.destTop;
                var destWidth = parent.img.destWidth;
                var destHeight = parent.img.destHeight;
                parent.notify('draw', { prop: 'callUpdateCurrTransState', onPropertyChange: false });
                var temp = this.lowerContext.filter;
                this.lowerContext.filter = 'none';
                parent.togglePen = false;
                this.iterateObjColl();
                parent.notify('freehandDraw', { prop: 'freehandRedraw', onPropertyChange: false,
                    value: { context: this.lowerContext, points: null } });
                parent.togglePen = false;
                if (parent.isCircleCrop || (parent.currSelectionPoint &&
                    parent.currSelectionPoint.shape === 'crop-circle')) {
                    parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                        value: { context: this.lowerContext, isSave: null, isFlip: null } });
                }
                parent.img.destLeft = destLeft;
                parent.img.destTop = destTop;
                parent.img.destWidth = destWidth;
                parent.img.destHeight = destHeight;
                this.lowerContext.filter = temp;
            }
            else {
                canvas = canvas ? canvas : 'original';
                if (isNullOrUndefined(parent.activeObj.shape) && isNullOrUndefined(shape)) {
                    parent.currObjType.shape = '';
                }
                else {
                    parent.currObjType.shape = shape || parent.currObjType.shape;
                }
                if (parent.currObjType.shape !== '') {
                    this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                    if (parent.activeObj.shape === 'text') {
                        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: canvas, obj: obj, isCropRatio: null,
                                points: null, isPreventDrag: true, saveContext: null, isPreventSelection: null } });
                        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
                    }
                    else {
                        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: canvas, obj: obj } });
                    }
                    parent.activeObj.shape = parent.currObjType.shape.toLowerCase();
                    if (!shape && parent.currObjType.shape !== '' && !parent.currObjType.isCustomCrop) {
                        parent.objColl.push(extend({}, parent.activeObj, {}, true));
                    }
                    this.keyHistory = '';
                }
            }
        }
    };
    Shape.prototype.setCenterPoints = function (text, width, height) {
        var parent = this.parent;
        var renderWidth;
        var renderHeight;
        if (text && width && height) {
            renderWidth = width;
            renderHeight = height;
        }
        else {
            renderWidth = parent.activeObj.activePoint.width;
            renderHeight = parent.activeObj.activePoint.height;
        }
        parent.activeObj.activePoint.startX = (parent.lowerCanvas.width / 2) - renderWidth / 2;
        parent.activeObj.activePoint.startY = (parent.lowerCanvas.height / 2) - renderHeight / 2;
        parent.activeObj.activePoint.endX = (parent.lowerCanvas.width / 2) + renderWidth / 2;
        parent.activeObj.activePoint.endY = (parent.lowerCanvas.height / 2) + renderHeight / 2;
    };
    Shape.prototype.updSelChangeEventArgs = function (selectionSettings) {
        var parent = this.parent;
        parent.activeObj.activePoint.startX = selectionSettings.startX;
        parent.activeObj.activePoint.startY = selectionSettings.startY;
        parent.activeObj.activePoint.width = selectionSettings.width;
        parent.activeObj.activePoint.height = selectionSettings.height;
        parent.activeObj.activePoint.endX = parent.activeObj.activePoint.startX + parent.activeObj.activePoint.width;
        parent.activeObj.activePoint.endY = parent.activeObj.activePoint.startY + parent.activeObj.activePoint.height;
    };
    Shape.prototype.updateShapeChangeEventArgs = function (shapeSettings) {
        var parent = this.parent;
        parent.activeObj.currIndex = shapeSettings.id;
        parent.activeObj.activePoint.startX = shapeSettings.startX;
        parent.activeObj.activePoint.startY = shapeSettings.startY;
        parent.activeObj.activePoint.width = shapeSettings.width;
        parent.activeObj.activePoint.height = shapeSettings.height;
        parent.activeObj.activePoint.endX = parent.activeObj.activePoint.startX + parent.activeObj.activePoint.width;
        parent.activeObj.activePoint.endY = parent.activeObj.activePoint.startY + parent.activeObj.activePoint.height;
        parent.activeObj.strokeSettings.strokeColor = shapeSettings.strokeColor;
        parent.activeObj.strokeSettings.fillColor = shapeSettings.fillColor;
        switch (parent.activeObj.shape) {
            case 'ellipse':
                parent.activeObj.activePoint.width = shapeSettings.radius * 2;
                break;
            case 'line':
            case 'arrow':
                parent.activeObj.activePoint.width = shapeSettings.length;
                break;
            case 'text':
                parent.activeObj.keyHistory = parent.activeObj.textSettings.text = shapeSettings.text;
                parent.activeObj.textSettings.fontSize = shapeSettings.fontSize;
                parent.activeObj.strokeSettings.strokeColor = shapeSettings.color;
                parent.activeObj.textSettings.fontFamily = shapeSettings.fontFamily;
                break;
            case 'rectangle':
                break;
        }
        if (parent.activeObj.shape === 'text' && parent.activeObj.textSettings) {
            for (var i = 0; i < shapeSettings.fontStyle.length; i++) {
                switch (shapeSettings.fontStyle[i]) {
                    case 'bold':
                        parent.activeObj.textSettings.bold = true;
                        break;
                    case 'italic':
                        parent.activeObj.textSettings.italic = true;
                        break;
                    case 'underline':
                        parent.activeObj.textSettings.underline = true;
                        break;
                }
            }
        }
    };
    Shape.prototype.addLetter = function (letter) {
        var parent = this.parent;
        if (parent.textArea.style.display === 'none' && (parent.currObjType.isText || parent.activeObj.shape === 'text')) {
            if (letter === 'Backspace') {
                this.keyHistory = this.keyHistory.slice(0, -1);
            }
            else {
                this.keyHistory += letter;
            }
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            this.updateFontStyles();
            var width = this.upperContext.measureText(this.keyHistory).width
                + parent.activeObj.textSettings.fontSize * 0.5;
            var height = parent.activeObj.textSettings.fontSize + parent.activeObj.textSettings.fontSize * 0.25;
            this.upperContext.fillText(this.keyHistory, parent.activeObj.activePoint.startX, parent.activeObj.activePoint.startY +
                parent.activeObj.textSettings.fontSize);
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            parent.currObjType.isText = true;
            parent.notify('selection', { prop: 'setActivePoint', onPropertyChange: false,
                value: { startX: width, startY: height } });
        }
    };
    Shape.prototype.redrawText = function () {
        var parent = this.parent;
        var fontStyle = '';
        if (parent.activeObj.textSettings.bold) {
            fontStyle += 'bold ';
        }
        if (parent.activeObj.textSettings.italic) {
            fontStyle += 'italic ';
        }
        this.upperContext.font = fontStyle + parent.activeObj.textSettings.fontSize + 'px ' + parent.activeObj.textSettings.fontFamily;
        var rows = parent.activeObj.keyHistory.split('\n');
        var text = parent.textArea.style.display === 'block' ? this.getMaxText(true) : this.getMaxText();
        var width = this.upperContext.measureText(text).width + parent.activeObj.textSettings.fontSize * 0.5;
        var height = rows.length * (parent.activeObj.textSettings.fontSize + parent.activeObj.textSettings.fontSize * 0.25);
        parent.notify('selection', { prop: 'setTextSelection', onPropertyChange: false,
            value: { width: width, height: height } });
        parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: parent.activeObj.activePoint, obj: parent.activeObj,
                isMouseMove: null, x: null, y: null } });
        parent.notify('selection', { prop: 'redrawShape', onPropertyChange: false,
            value: { obj: parent.activeObj } });
    };
    Shape.prototype.updateTextFromTextArea = function () {
        var parent = this.parent;
        var allowUndoRedo = false;
        var prevCropObj = extend({}, parent.cropObj, {}, true);
        var object = { currObj: {} };
        parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], parent.objColl, [], true);
        prevObj.pointColl = extend([], parent.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.parent.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        if (parent.activeObj.keyHistory !== parent.textArea.value) {
            allowUndoRedo = true;
        }
        parent.activeObj.keyHistory = parent.textArea.value;
        parent.textArea.style.display = 'none';
        parent.textArea.value = '';
        this.updateFontStyles();
        var width = this.upperContext.measureText(parent.activeObj.keyHistory).width +
            parent.activeObj.textSettings.fontSize * 0.5;
        var height = parent.activeObj.textSettings.fontSize + this.parent.activeObj.textSettings.fontSize * 0.25;
        var rows = parent.activeObj.keyHistory.split('\n');
        if (rows.length > 1) {
            height *= rows.length;
            var widthColl = [];
            for (var i = 0, len = rows.length; i < len; i++) {
                widthColl.push(this.upperContext.measureText(rows[i]).width +
                    parent.activeObj.textSettings.fontSize * 0.5);
            }
            width = Math.max.apply(Math, widthColl);
        }
        parent.notify('selection', { prop: 'setTextSelection', onPropertyChange: false,
            value: { width: width, height: height } });
        parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: parent.activeObj.activePoint, obj: parent.activeObj,
                isMouseMove: null, x: null, y: null } });
        this.updImgRatioForActObj();
        if (allowUndoRedo) {
            this.apply(parent.activeObj.shape, parent.activeObj);
            parent.objColl.push(extend({}, parent.activeObj, {}, true));
            parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'text', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: parent.activeObj.keyHistory,
                    currentText: parent.textArea.value, previousFilter: null, isCircleCrop: null } });
        }
        else {
            this.apply(parent.activeObj.shape, parent.activeObj);
            parent.objColl.push(extend({}, parent.activeObj, {}, true));
        }
    };
    Shape.prototype.iterateObjColl = function () {
        var parent = this.parent;
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            this.apply(parent.objColl[i].shape, parent.objColl[i]);
            this.refreshActiveObj();
        }
    };
    Shape.prototype.updImgRatioForActObj = function () {
        var parent = this.parent;
        parent.activeObj.imageRatio = { startX: ((parent.activeObj.activePoint.startX - parent.img.destLeft) /
                parent.img.destWidth),
            startY: ((parent.activeObj.activePoint.startY - parent.img.destTop) / parent.img.destHeight),
            endX: ((parent.activeObj.activePoint.endX - parent.img.destLeft) / parent.img.destWidth),
            endY: ((parent.activeObj.activePoint.endY - parent.img.destTop) / parent.img.destHeight),
            width: parent.img.destWidth / parent.activeObj.activePoint.width, height: parent.img.destHeight /
                parent.activeObj.activePoint.height };
        if (parent.activeObj.rotationCirclePointColl) {
            parent.activeObj.rotationCirclePointColl.ratioX = (parent.activeObj.rotationCirclePointColl.x -
                parent.img.destLeft) / parent.img.destWidth;
            parent.activeObj.rotationCirclePointColl.ratioY = (parent.activeObj.rotationCirclePointColl.y -
                parent.img.destTop) / parent.img.destHeight;
        }
        if (parent.activeObj.shape === 'path') {
            this.updatePathRatio(parent.activeObj);
        }
        else if (parent.activeObj.shape === 'arrow') {
            this.updateArrowRatio(parent.activeObj);
        }
    };
    Shape.prototype.zoomObjColl = function (preventApply) {
        var parent = this.parent;
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            var currObj = parent.objColl[i];
            currObj.activePoint.startX = (currObj.imageRatio.startX * parent.img.destWidth) + parent.img.destLeft;
            currObj.activePoint.startY = (currObj.imageRatio.startY * parent.img.destHeight) + parent.img.destTop;
            currObj.activePoint.endX = (currObj.imageRatio.endX * parent.img.destWidth) + parent.img.destLeft;
            currObj.activePoint.endY = (currObj.imageRatio.endY * parent.img.destHeight) + parent.img.destTop;
            currObj = this.updateWidthHeight(currObj);
            if (currObj.shape === 'text') {
                this.updateFontSize(currObj);
            }
            else if (currObj.shape === 'line' || currObj.shape === 'arrow') {
                currObj.pointColl = this.getLinePoints(currObj.activePoint.startX, currObj.activePoint.startY, currObj.activePoint.endX, currObj.activePoint.endY);
                for (var n = 0, len_1 = currObj.pointColl.length; n < len_1; n++) {
                    currObj.pointColl[n].ratioX =
                        (currObj.pointColl[n].x - parent.img.destLeft) / parent.img.destWidth;
                    currObj.pointColl[n].ratioY =
                        (currObj.pointColl[n].y - parent.img.destTop) / parent.img.destHeight;
                }
                if (currObj.shape === 'arrow') {
                    this.updateArrowSize(currObj);
                }
            }
            else if (currObj.shape === 'path') {
                for (var l = 0, len_2 = currObj.pointColl.length; l < len_2; l++) {
                    currObj.pointColl[l].x = (currObj.pointColl[l].ratioX * parent.img.destWidth)
                        + parent.img.destLeft;
                    currObj.pointColl[l].y = (currObj.pointColl[l].ratioY * parent.img.destHeight) +
                        parent.img.destTop;
                }
                this.updatePathRatio(currObj);
            }
            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint,
                    obj: currObj } });
            if (isNullOrUndefined(preventApply)) {
                var temp = this.lowerContext.filter;
                this.lowerContext.filter = 'none';
                this.apply(currObj.shape, currObj);
                this.refreshActiveObj();
                this.lowerContext.filter = temp;
            }
            if (currObj.shape !== 'line' && currObj.shape !== 'arrow' && currObj.shape !== 'path' && currObj.rotatedAngle !== 0) {
                this.setPointCollForShapeRotation(currObj);
                currObj.rotationCirclePoint.x =
                    (currObj.rotationCirclePoint.ratioX * parent.img.destWidth) + parent.img.destLeft;
                currObj.rotationCirclePoint.y =
                    (currObj.rotationCirclePoint.ratioY * parent.img.destHeight) + parent.img.destTop;
                currObj.rotationCirclePointColl.x =
                    (currObj.rotationCirclePointColl.ratioX * parent.img.destWidth) +
                        parent.img.destLeft;
                currObj.rotationCirclePointColl.y =
                    (currObj.rotationCirclePointColl.ratioY * parent.img.destHeight) +
                        parent.img.destTop;
            }
        }
    };
    Shape.prototype.redrawObj = function (degree) {
        var parent = this.parent;
        if (this.parent.objColl.length > 0) {
            if (degree === 'horizontal' || degree === 'vertical' || degree === 'Horizontal' || degree === 'Vertical' ||
                degree === 'horizontalVertical' || degree === 'verticalHorizontal') {
                this.updateCurrentActiveObjPoint(degree.toLowerCase());
            }
            else if (typeof (degree) === 'number') {
                this.updateCurrentActiveObjPoint(degree);
                var tempFilter = this.lowerContext.filter;
                this.lowerContext.filter = 'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
                    'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' + 'grayscale(0%) ' + 'invert(0%)';
                for (var i = 0, len = parent.objColl.length; i < len; i++) {
                    var splitWords = parent.objColl[i].shape.split('-');
                    if (splitWords[0] !== 'crop') {
                        this.apply(parent.objColl[i].shape, parent.objColl[i]);
                    }
                }
                this.lowerContext.filter = tempFilter;
            }
        }
    };
    Shape.prototype.updateCurrentActiveObjPoint = function (degree) {
        var parent = this.parent;
        var currActObjIndex;
        for (var index = 0, len = parent.objColl.length; index < len; index++) {
            var currObj = parent.objColl[index];
            if (parent.activeObj.shape === currObj.shape &&
                parent.activeObj.activePoint.startX === currObj.activePoint.startX &&
                parent.activeObj.activePoint.startY === currObj.activePoint.startY &&
                parent.activeObj.activePoint.endX === currObj.activePoint.endX &&
                parent.activeObj.activePoint.endY === currObj.activePoint.endY &&
                parent.activeObj.currIndex === currObj.currIndex) {
                currActObjIndex = index;
                break;
            }
        }
        if (degree === 'horizontal' || degree === 'vertical' || degree === 'Horizontal' || degree === 'Vertical' ||
            degree === 'horizontalvertical' || degree === 'verticalhorizontal') {
            if (degree === 'horizontal' || degree === 'Horizontal') {
                for (var i = 0, len = parent.objColl.length; i < len; i++) {
                    var currObj = parent.objColl[i];
                    if (currObj.shapeFlip !== parent.transform.currFlipState) {
                        if (currObj.activePoint.startX <= parent.img.destLeft + (parent.img.destWidth / 2)) {
                            currObj.activePoint.endX = (parent.img.destLeft + parent.img.destWidth) - (currObj.activePoint.startX -
                                parent.img.destLeft);
                            currObj.activePoint.startX = currObj.activePoint.endX - currObj.activePoint.width;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint, obj: currObj } });
                        }
                        else if (currObj.activePoint.startX >= parent.img.destLeft + (parent.img.destWidth / 2)) {
                            currObj.activePoint.startX = parent.img.destLeft + (parent.img.destLeft + parent.img.destWidth -
                                currObj.activePoint.endX);
                            currObj.activePoint.endX = currObj.activePoint.startX + currObj.activePoint.width;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint,
                                    obj: currObj } });
                        }
                        if (currObj.shape === 'line' || currObj.shape === 'arrow' || currObj.shape === 'path') {
                            this.flipLineArrowObj(currObj, 'horizontal');
                        }
                        else if (currObj.rotatedAngle !== 0) {
                            currObj.rotatedAngle = currObj.rotatedAngle + (Math.PI - currObj.rotatedAngle) * 2;
                            if (currObj.rotationCirclePointColl.x <= parent.img.destLeft + (parent.img.destWidth / 2)) {
                                currObj.rotationCirclePointColl.x = (parent.img.destLeft + parent.img.destWidth) -
                                    (currObj.rotationCirclePointColl.x - parent.img.destLeft);
                            }
                            else if (currObj.rotationCirclePointColl.x >= parent.img.destLeft + (parent.img.destWidth / 2)) {
                                currObj.rotationCirclePointColl.x = parent.img.destLeft +
                                    (parent.img.destLeft + parent.img.destWidth - currObj.rotationCirclePointColl.x);
                            }
                            currObj.rotationCirclePointColl.ratioX =
                                (currObj.rotationCirclePointColl.x - parent.img.destLeft) / parent.img.destWidth;
                        }
                        currObj.shapeFlip = parent.transform.currFlipState;
                        currObj.imageRatio = { startX: ((currObj.activePoint.startX - parent.img.destLeft) / parent.img.destWidth),
                            startY: ((currObj.activePoint.startY - parent.img.destTop) / parent.img.destHeight),
                            endX: ((currObj.activePoint.endX - parent.img.destLeft) / parent.img.destWidth),
                            endY: ((currObj.activePoint.endY - parent.img.destTop) / parent.img.destHeight),
                            width: parent.img.destWidth / currObj.activePoint.width,
                            height: parent.img.destHeight / currObj.activePoint.height };
                    }
                }
            }
            else if (degree === 'vertical' || degree === 'Vertical') {
                for (var i = 0; i < parent.objColl.length; i++) {
                    var currObj = parent.objColl[i];
                    if (currObj.shapeFlip !== parent.transform.currFlipState) {
                        if (currObj.activePoint.startY <= parent.img.destTop + (parent.img.destHeight / 2)) {
                            currObj.activePoint.endY = (parent.img.destTop + parent.img.destHeight) -
                                (currObj.activePoint.startY - parent.img.destTop);
                            currObj.activePoint.startY = currObj.activePoint.endY - currObj.activePoint.height;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint,
                                    obj: currObj } });
                        }
                        else if (currObj.activePoint.startY >= this.parent.lowerCanvas.height / 2) {
                            currObj.activePoint.startY = parent.img.destTop + (parent.img.destTop +
                                parent.img.destHeight - currObj.activePoint.endY);
                            currObj.activePoint.endY = currObj.activePoint.startY +
                                currObj.activePoint.height;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint,
                                    obj: currObj } });
                        }
                        if (currObj.shape === 'line' || currObj.shape === 'arrow' ||
                            currObj.shape === 'path') {
                            this.flipLineArrowObj(currObj, 'vertical');
                        }
                        else if (currObj.rotatedAngle !== 0) {
                            currObj.rotatedAngle = -currObj.rotatedAngle;
                            if (currObj.rotationCirclePointColl.y <= parent.img.destTop + (parent.img.destHeight / 2)) {
                                currObj.rotationCirclePointColl.y = (parent.img.destTop + parent.img.destHeight) -
                                    (currObj.rotationCirclePointColl.y - parent.img.destTop);
                            }
                            else if (currObj.rotationCirclePointColl.y >= parent.img.destTop +
                                (parent.img.destHeight / 2)) {
                                currObj.rotationCirclePointColl.y = parent.img.destTop + (parent.img.destTop +
                                    parent.img.destHeight - currObj.rotationCirclePointColl.y);
                            }
                            currObj.rotationCirclePointColl.ratioY =
                                (currObj.rotationCirclePointColl.y - parent.img.destTop) / parent.img.destHeight;
                        }
                        currObj.shapeFlip = parent.transform.currFlipState;
                        currObj.imageRatio = { startX: ((currObj.activePoint.startX - parent.img.destLeft) / parent.img.destWidth),
                            startY: ((currObj.activePoint.startY - parent.img.destTop) / parent.img.destHeight),
                            endX: ((currObj.activePoint.endX - parent.img.destLeft) / parent.img.destWidth),
                            endY: ((currObj.activePoint.endY - parent.img.destTop) / parent.img.destHeight),
                            width: parent.img.destWidth / currObj.activePoint.width,
                            height: parent.img.destHeight / currObj.activePoint.height };
                    }
                }
            }
            else if (degree === 'verticalhorizontal' || degree === 'horizontalvertical') {
                for (var i = 0, len = parent.objColl.length; i < len; i++) {
                    var currObj = parent.objColl[i];
                    if (currObj.shapeFlip !== parent.transform.currFlipState) {
                        if (currObj.activePoint.startX <= parent.img.destLeft + (parent.img.destWidth / 2)) {
                            currObj.activePoint.endX = (parent.img.destLeft + parent.img.destWidth) - (currObj.activePoint.startX -
                                parent.img.destLeft);
                            currObj.activePoint.startX = currObj.activePoint.endX - currObj.activePoint.width;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint, obj: currObj } });
                        }
                        else if (currObj.activePoint.startX >= parent.img.destLeft + (parent.img.destWidth / 2)) {
                            currObj.activePoint.startX = parent.img.destLeft + (parent.img.destLeft +
                                parent.img.destWidth - currObj.activePoint.endX);
                            currObj.activePoint.endX = currObj.activePoint.startX + currObj.activePoint.width;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint, obj: currObj } });
                        }
                        if (currObj.activePoint.startY <= parent.img.destTop + (parent.img.destHeight / 2)) {
                            currObj.activePoint.endY = (parent.img.destTop + parent.img.destHeight) -
                                (currObj.activePoint.startY - parent.img.destTop);
                            currObj.activePoint.startY = currObj.activePoint.endY -
                                currObj.activePoint.height;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint, obj: currObj } });
                        }
                        else if (currObj.activePoint.startY >= this.parent.lowerCanvas.height / 2) {
                            currObj.activePoint.startY = parent.img.destTop + (parent.img.destTop +
                                parent.img.destHeight - currObj.activePoint.endY);
                            currObj.activePoint.endY = currObj.activePoint.startY +
                                currObj.activePoint.height;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint, obj: currObj } });
                        }
                        if (currObj.shape === 'line' || currObj.shape === 'arrow' || currObj.shape === 'path') {
                            this.flipLineArrowObj(currObj, degree);
                        }
                        currObj.shapeFlip = parent.transform.currFlipState;
                        currObj.imageRatio = { startX: ((currObj.activePoint.startX - parent.img.destLeft) / parent.img.destWidth),
                            startY: ((currObj.activePoint.startY - parent.img.destTop) / parent.img.destHeight),
                            endX: ((currObj.activePoint.endX - parent.img.destLeft) / parent.img.destWidth),
                            endY: ((currObj.activePoint.endY - parent.img.destTop) / parent.img.destHeight),
                            width: parent.img.destWidth / currObj.activePoint.width,
                            height: parent.img.destHeight / currObj.activePoint.height };
                    }
                }
            }
            if (currActObjIndex !== undefined) {
                parent.activeObj = extend({}, parent.objColl[currActObjIndex], {}, true);
            }
        }
        else if (degree === 90) {
            this.rotateObjColl();
        }
        else if (degree === -90) {
            for (var i = 0; i < 3; i++) {
                this.rotateObjColl();
            }
        }
        else if (typeof (degree) === 'number') {
            if (degree > 0) {
                this.rotateObjColl();
            }
            else {
                for (var i = 0; i < 3; i++) {
                    this.rotateObjColl();
                }
            }
        }
    };
    Shape.prototype.rotateObjColl = function () {
        var parent = this.parent;
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            var currObj = parent.objColl[i];
            currObj.activePoint.startY = parent.img.destTop + (parent.img.destHeight * currObj.imageRatio.startX);
            currObj.activePoint.endY = parent.img.destTop + (parent.img.destHeight * currObj.imageRatio.endX);
            currObj.activePoint.startX = (parent.img.destLeft + parent.img.destWidth) -
                (parent.img.destWidth * currObj.imageRatio.endY);
            currObj.activePoint.endX = (parent.img.destLeft + parent.img.destWidth) -
                (parent.img.destWidth * currObj.imageRatio.startY);
            currObj = this.updateWidthHeight(parent.objColl[i]);
            this.updateFontSize(currObj);
            if (currObj.shape === 'line' || currObj.shape === 'arrow' ||
                currObj.shape === 'path') {
                this.rotateLineArrowObj(currObj);
                if (currObj.shape === 'arrow') {
                    this.updateArrowSize(currObj);
                }
            }
            else if (currObj.rotatedAngle !== 0) {
                currObj.rotationCirclePointColl.y = parent.img.destTop + (parent.img.destHeight * currObj.rotationCirclePointColl.ratioX);
                currObj.rotationCirclePointColl.x = (parent.img.destLeft + parent.img.destWidth) -
                    (parent.img.destWidth * currObj.rotationCirclePointColl.ratioY);
                currObj.rotationCirclePointColl.ratioX = (currObj.rotationCirclePointColl.x
                    - parent.img.destLeft) / parent.img.destWidth;
                currObj.rotationCirclePointColl.ratioY = (currObj.rotationCirclePointColl.y
                    - parent.img.destTop) / parent.img.destHeight;
            }
        }
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: parent.objColl[i].activePoint, obj: parent.objColl[i] } });
        }
        // Update current image ratio for all objects
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            var currObj = parent.objColl[i];
            currObj.imageRatio = { startX: ((currObj.activePoint.startX - parent.img.destLeft) / parent.img.destWidth),
                startY: ((currObj.activePoint.startY - parent.img.destTop) / parent.img.destHeight),
                endX: ((currObj.activePoint.endX - parent.img.destLeft) / parent.img.destWidth),
                endY: ((currObj.activePoint.endY - parent.img.destTop) / parent.img.destHeight),
                width: parent.img.destWidth / currObj.activePoint.width,
                height: parent.img.destHeight / currObj.activePoint.height };
        }
    };
    Shape.prototype.rotateLineArrowObj = function (obj) {
        if (isNullOrUndefined(obj.pointColl)) {
            return;
        }
        var parent = this.parent;
        if (obj.pointColl.length > 0) {
            for (var n = 0; n < obj.pointColl.length; n++) {
                obj.pointColl[n].y = parent.img.destTop + (parent.img.destHeight * obj.pointColl[n].ratioX);
                obj.pointColl[n].x = (parent.img.destLeft + parent.img.destWidth) - (parent.img.destWidth *
                    obj.pointColl[n].ratioY);
            }
            for (var n = 0; n < obj.pointColl.length; n++) {
                obj.pointColl[n].ratioX = (obj.pointColl[n].x - parent.img.destLeft) / parent.img.destWidth;
                obj.pointColl[n].ratioY = (obj.pointColl[n].y - parent.img.destTop) / parent.img.destHeight;
            }
            var prevPoint = void 0;
            if (isNullOrUndefined(obj.pointColl[obj.pointColl.length - 2])) {
                prevPoint = { x: 0, y: 0 };
            }
            else {
                prevPoint = { x: obj.pointColl[obj.pointColl.length - 2].x, y: obj.pointColl[obj.pointColl.length - 2].y };
            }
            var diffX = obj.pointColl[obj.pointColl.length - 1].x - prevPoint.x;
            var diffY = obj.pointColl[obj.pointColl.length - 1].y - prevPoint.y;
            obj.activePoint.startX = obj.pointColl[0].x;
            obj.activePoint.startY = obj.pointColl[0].y;
            obj.activePoint.endX = obj.pointColl[obj.pointColl.length - 1].x + (diffX / 2);
            obj.activePoint.endY = obj.pointColl[obj.pointColl.length - 1].y + (diffY / 2);
            obj = this.updateWidthHeight(obj);
        }
    };
    Shape.prototype.flipLineArrowObj = function (obj, value) {
        if (isNullOrUndefined(obj.pointColl)) {
            return;
        }
        if (value.toLowerCase() === 'horizontal') {
            this.lineArrowHorizontalFlip(obj);
        }
        else if (value.toLowerCase() === 'vertical') {
            this.lineArrowVerticalFlip(obj);
        }
        else {
            this.lineArrowHorizontalFlip(obj);
            obj.shapeFlip = '';
            this.lineArrowVerticalFlip(obj);
        }
        obj.activePoint.startX = obj.pointColl[0].x;
        obj.activePoint.startY = obj.pointColl[0].y;
        obj.activePoint.endX = obj.pointColl[obj.pointColl.length - 1].x;
        obj.activePoint.endY = obj.pointColl[obj.pointColl.length - 1].y;
        if (obj.activePoint.startX > obj.activePoint.endX) {
            var temp = obj.activePoint.startX;
            obj.activePoint.startX = obj.activePoint.endX;
            obj.activePoint.endX = temp;
            temp = obj.activePoint.startY;
            obj.activePoint.startY = obj.activePoint.endY;
            obj.activePoint.endY = temp;
        }
    };
    Shape.prototype.lineArrowHorizontalFlip = function (obj) {
        var parent = this.parent;
        // Update flip value for point collection
        if (obj.shapeFlip !== parent.transform.currFlipState) {
            for (var l = 0, len = obj.pointColl.length; l < len; l++) {
                var currPoint = obj.pointColl[l];
                if (currPoint.x <= parent.img.destLeft + (parent.img.destWidth / 2)) {
                    currPoint.x = (parent.img.destLeft + parent.img.destWidth) - (currPoint.x
                        - parent.img.destLeft);
                }
                else if (currPoint.x >= parent.img.destLeft + (parent.img.destWidth / 2)) {
                    currPoint.x = parent.img.destLeft + (parent.img.destLeft + parent.img.destWidth -
                        currPoint.x);
                }
                currPoint.ratioX = (currPoint.x - parent.img.destLeft) / parent.img.destWidth;
                currPoint.ratioY = (currPoint.y - parent.img.destTop) / parent.img.destHeight;
            }
            if (obj.shape === 'arrow') {
                var value = obj.start;
                obj.start = obj.end;
                obj.end = value;
            }
            obj.shapeFlip = parent.transform.currFlipState;
        }
    };
    Shape.prototype.lineArrowVerticalFlip = function (obj) {
        var parent = this.parent;
        // Update flip value for point collection
        if (obj.shapeFlip !== parent.transform.currFlipState) {
            for (var l = 0, len = obj.pointColl.length; l < len; l++) {
                var currPoint = obj.pointColl[l];
                if (currPoint.y <= parent.img.destTop + (parent.img.destHeight / 2)) {
                    currPoint.y = (parent.img.destTop + parent.img.destHeight) -
                        (currPoint.y - parent.img.destTop);
                }
                else if (currPoint.y >= parent.img.destTop + (parent.img.destHeight / 2)) {
                    currPoint.y = parent.img.destTop + (parent.img.destTop + parent.img.destHeight -
                        currPoint.y);
                }
                currPoint.ratioX = (currPoint.x - parent.img.destLeft) / parent.img.destWidth;
                currPoint.ratioY = (currPoint.y - parent.img.destTop) / parent.img.destHeight;
            }
            obj.shapeFlip = parent.transform.currFlipState;
        }
    };
    Shape.prototype.getRotDegOfShape = function (obj) {
        var degree;
        if (obj.shapeDegree === 0) {
            degree = this.parent.transform.degree;
        }
        else {
            degree = this.parent.transform.degree - obj.shapeDegree;
        }
        if (degree < 0) {
            degree = 360 + degree;
        }
        return degree;
    };
    Shape.prototype.renderTextArea = function (x, y, actObj) {
        var parent = this.parent;
        var degree = this.getRotDegOfShape(parent.activeObj);
        this.transformTextArea();
        if (!isBlazor()) {
            parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
        }
        else {
            parent.updateToolbar(parent.element, 'destroyQuickAccessToolbar');
        }
        if (parent.element.querySelector('#' + parent.element.id + '_duplicate')) {
            parent.element.querySelector('#' + parent.element.id + '_duplicate').classList.add('e-disabled');
        }
        if (parent.element.querySelector('#' + parent.element.id + '_remove')) {
            parent.element.querySelector('#' + parent.element.id + '_remove').classList.add('e-disabled');
        }
        if (parent.element.querySelector('#' + parent.element.id + '_editText')) {
            parent.element.querySelector('#' + parent.element.id + '_editText').classList.add('e-disabled');
        }
        parent.textArea.style.display = 'block';
        parent.textArea.style.left = x + 'px';
        parent.textArea.style.top = y + 'px';
        parent.textArea.style.fontFamily = actObj.textSettings.fontFamily;
        parent.textArea.style.fontSize = actObj.textSettings.fontSize + 'px';
        parent.textArea.style.color = actObj.strokeSettings.strokeColor;
        parent.textArea.style.fontWeight = actObj.textSettings.bold ? 'bold' : 'normal';
        parent.textArea.style.fontStyle = actObj.textSettings.italic ? 'italic' : 'normal';
        parent.textArea.style.border = '2px solid ' + parent.themeColl[parent.theme]['primaryColor'];
        parent.textArea.value = actObj.keyHistory;
        parent.textArea.style.overflow = 'hidden';
        parent.textArea.style.width = 'auto';
        parent.textArea.style.height = 'auto';
        parent.textArea.focus();
        var zoomFactor = parent.transform.zoomFactor;
        var _a = actObj.activePoint, width = _a.width, height = _a.height;
        if (degree % 90 === 0 && degree % 180 !== 0 && degree !== 0) {
            parent.textArea.style.width = (zoomFactor === 0 ? height : height) + 'px';
            parent.textArea.style.height = (zoomFactor === 0 ? width : width) + 'px';
        }
        else {
            parent.textArea.style.width = (zoomFactor === 0 ? width : width) + 'px';
            parent.textArea.style.height = (zoomFactor === 0 ? height : height) + 'px';
        }
        this.setTextBoxWidth();
        var obj = { flipColl: null };
        parent.notify('transform', { prop: 'getFlipColl', onPropertyChange: false, value: { obj: obj } });
        if (obj['flipColl'].length <= 1) {
            this.setTextBoxHeight();
        }
        if (degree % 90 === 0 && degree % 180 !== 0) {
            if (parseFloat(parent.textArea.style.left) + parseFloat(parent.textArea.style.width) > parent.img.destTop +
                parent.img.destHeight) {
                this.alignTextAreaIntoCanvas();
            }
        }
        else {
            if (parseFloat(parent.textArea.style.left) + parseFloat(parent.textArea.style.width) > parent.img.destLeft +
                parent.img.destWidth) {
                this.alignTextAreaIntoCanvas();
            }
        }
        parent.notify('selection', { prop: 'clearUpperCanvas', onPropertyChange: false });
    };
    Shape.prototype.setTextBoxWidth = function (e) {
        var parent = this.parent;
        var text = this.getMaxText(true);
        if (parent.textArea.style.display === 'block') {
            this.updateFontStyles(true);
        }
        else {
            this.updateFontStyles();
        }
        var textAreaWidth = (this.upperContext.measureText(text).width + (parseFloat(parent.textArea.style.fontSize) / 2));
        var letterWidth = e ? this.upperContext.measureText(String.fromCharCode(e.which)).width : 0;
        var actObj = extend({}, parent.activeObj, {}, true);
        var flip = '';
        var degree = this.getRotDegOfShape(actObj);
        if (actObj.shapeFlip !== parent.transform.currFlipState) {
            flip = '';
        }
        else {
            flip = parent.transform.currFlipState;
        }
        if ((e && parseFloat(parent.textArea.style.width) < (textAreaWidth + letterWidth)) || isNullOrUndefined(e)) {
            if (degree === 0) {
                if (flip.toLowerCase() === 'horizontal') {
                    if ((parseFloat(parent.textArea.style.left) - parent.img.destLeft) - textAreaWidth - letterWidth > 0) {
                        parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                    }
                }
                else if ((parent.img.destWidth - (parseFloat(parent.textArea.style.left) -
                    parent.img.destLeft)) > (textAreaWidth + letterWidth)) {
                    parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                }
            }
            else if (degree === 90) {
                if (flip.toLowerCase() === 'vertical') {
                    if ((parseFloat(parent.textArea.style.top) - parent.img.destTop) - textAreaWidth - letterWidth > 0) {
                        parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                    }
                }
                else if ((parent.img.destHeight - (parseFloat(parent.textArea.style.top) -
                    parent.img.destTop)) > (textAreaWidth + letterWidth)) {
                    parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                }
            }
            else if (degree === 180) {
                var textAreaLeft = parseFloat(parent.textArea.style.left);
                var destLeft = parent.img.destLeft;
                if (flip.toLowerCase() === 'horizontal') {
                    var remainingWidth = parent.img.destWidth - (textAreaLeft - destLeft);
                    if (remainingWidth > textAreaWidth + letterWidth) {
                        parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                    }
                }
                else {
                    var distanceToLeft = textAreaLeft - destLeft;
                    if (distanceToLeft - textAreaWidth - letterWidth > 0) {
                        parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                    }
                }
            }
            else if (degree === 270) {
                var textAreaTop = parseFloat(parent.textArea.style.top);
                var destTop = parent.img.destTop;
                if (flip.toLowerCase() === 'vertical') {
                    var remainingHeight = parent.img.destHeight - (textAreaTop - destTop);
                    if (remainingHeight > textAreaWidth + letterWidth) {
                        parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                    }
                }
                else {
                    var distanceToTop = textAreaTop - destTop;
                    if (distanceToTop - textAreaWidth - letterWidth > 0) {
                        parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                    }
                }
            }
        }
    };
    Shape.prototype.setTextBoxHeight = function () {
        var parent = this.parent;
        var textAreaTop;
        var actObj = extend({}, parent.activeObj, {}, true);
        var flip = '';
        var degree = this.getRotDegOfShape(actObj);
        if (actObj.textFlip === parent.transform.currFlipState) {
            flip = '';
        }
        else if (actObj.textFlip === '') {
            flip = parent.transform.currFlipState;
        }
        else {
            flip = actObj.textFlip;
        }
        switch (degree) {
            case 0:
                if (flip.toLowerCase() === 'vertical') {
                    parent.textArea.style.maxHeight = (parent.img.destHeight - (parent.img.destHeight -
                        parseFloat(parent.textArea.style.top))) + 'px';
                }
                else {
                    textAreaTop = parseFloat(parent.textArea.style.top) - parent.img.destTop;
                    parent.textArea.style.maxHeight = (parent.img.destHeight - textAreaTop) + 'px';
                }
                break;
            case 90:
                if (flip.toLowerCase() === 'horizontal') {
                    parent.textArea.style.maxHeight = (parent.img.destWidth - (parseFloat(parent.textArea.style.left) -
                        parent.img.destLeft)) + 'px';
                }
                else {
                    parent.textArea.style.maxHeight = (parseFloat(parent.textArea.style.left) - parent.img.destLeft) + 'px';
                }
                break;
            case 180:
                if (flip.toLowerCase() === 'vertical') {
                    textAreaTop = parseFloat(parent.textArea.style.top) - parent.img.destTop;
                    parent.textArea.style.maxHeight = (parent.img.destHeight - textAreaTop) + 'px';
                }
                else {
                    parent.textArea.style.maxHeight = (parseFloat(parent.textArea.style.top) - parent.img.destTop) + 'px';
                }
                break;
            case 270:
                if (flip.toLowerCase() === 'horizontal') {
                    parent.textArea.style.maxHeight = (parseFloat(parent.textArea.style.left) - parent.img.destLeft) + 'px';
                }
                else {
                    parent.textArea.style.maxHeight = parent.img.destWidth - (parseFloat(parent.textArea.style.left)
                        - parent.img.destLeft) + 'px';
                }
                break;
        }
    };
    Shape.prototype.updatePathRatio = function (obj) {
        var parent = this.parent;
        for (var i = 0, len = obj.pointColl.length; i < len; i++) {
            var currPoint = obj.pointColl[i];
            currPoint.ratioX = (currPoint.x - parent.img.destLeft) / parent.img.destWidth;
            currPoint.ratioY = (currPoint.y - parent.img.destTop) / parent.img.destHeight;
        }
    };
    Shape.prototype.stopPathDrawing = function (e) {
        var parent = this.parent;
        if (parent.activeObj.shape === 'path') {
            var obj = { shape: null };
            parent.notify('selection', { prop: 'getCurrentDrawingShape', value: { obj: obj } });
            if (obj['shape'] === 'path') {
                var prevCropObj = extend({}, this.parent.cropObj, {}, true);
                var object = { currObj: {} };
                this.parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                var prevObj = object['currObj'];
                prevObj.objColl = extend([], this.parent.objColl, [], true);
                prevObj.pointColl = extend([], this.parent.pointColl, [], true);
                prevObj.afterCropActions = extend([], this.parent.afterCropActions, [], true);
                var selPointCollObj = { selPointColl: null };
                this.parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                    value: { obj: selPointCollObj } });
                prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
                parent.notify('selection', { prop: 'setCurrentDrawingShape', value: { value: '' } });
                parent.currObjType.isDragging = false;
                if (e.type !== 'touchstart') {
                    parent.activeObj.pointColl.pop();
                }
                this.updatePathRatio(parent.activeObj);
                parent.objColl.push(parent.activeObj);
                parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                    value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                        previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                        previousCropObj: prevCropObj, previousText: null,
                        currentText: null, previousFilter: null, isCircleCrop: null } });
                parent.objColl.pop();
                parent.notify('selection', { prop: 'mouseUpEventHandler', value: { e: e } });
                parent.notify('draw', { prop: 'setNewPath', value: { bool: true } });
                if (parent.objColl[parent.objColl.length - 1]) {
                    parent.selectShape(parent.objColl[parent.objColl.length - 1].currIndex);
                }
                if (!isBlazor()) {
                    parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
                }
                else {
                    parent.updateToolbar(parent.element, 'quickAccessToolbar', parent.activeObj.shape);
                }
            }
        }
    };
    Shape.prototype.findTextTarget = function (e) {
        var parent = this.parent;
        if (parent.activeObj.shape !== 'text') {
            this.stopPathDrawing(e);
            return;
        }
        var x;
        var y;
        if (e.type === 'dblclick') {
            x = e.clientX;
            y = e.clientY;
        }
        else if (e.type === 'touchstart') {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
            parent.notify('selection', { prop: 'setTouchEndPoint', onPropertyChange: false,
                value: { x: e.touches[0].clientX, y: e.touches[0].clientY } });
        }
        parent.notify('toolbar', { prop: 'setPreventZoomBtn', onPropertyChange: false, value: { isPrevent: true } });
        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'text',
                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
        parent.notify('toolbar', { prop: 'setPreventZoomBtn', onPropertyChange: false, value: { isPrevent: false } });
        parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
        if (!isNullOrUndefined(x) && !isNullOrUndefined(y)) {
            var bbox = this.parent.lowerCanvas.getBoundingClientRect();
            x -= bbox.left;
            y -= bbox.top;
            var flip = '';
            var degree = this.getRotDegOfShape(parent.activeObj);
            if (parent.activeObj.textFlip === '') {
                if (parent.activeObj.textFlip === parent.transform.currFlipState) {
                    flip = '';
                }
                else {
                    flip = parent.transform.currFlipState;
                }
            }
            else {
                if (parent.activeObj.textFlip === parent.transform.currFlipState) {
                    flip = '';
                }
                else if (parent.transform.currFlipState === '') {
                    flip = parent.activeObj.textFlip;
                }
                else {
                    flip = parent.transform.currFlipState;
                }
            }
            var temp = void 0;
            if (parent.textArea.style.display === 'none') {
                temp = extend({}, parent.activeObj, {}, true);
                for (var i = 0; i < parent.objColl.length; i++) {
                    if (JSON.stringify(parent.activeObj) === JSON.stringify(parent.objColl[i])) {
                        parent.objColl.splice(i, 1);
                    }
                }
                this.refreshActiveObj();
                this.upperContext.clearRect(0, 0, this.parent.upperCanvas.width, this.parent.upperCanvas.height);
                this.lowerContext.clearRect(0, 0, this.parent.upperCanvas.width, this.parent.upperCanvas.height);
                parent.notify('draw', { prop: 'redrawImgWithObj', onPropertyChange: false });
                if ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop) {
                    parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                        value: { context: this.lowerContext, isSave: null, isFlip: null } });
                }
                parent.activeObj = temp;
                this.updateFontStyles();
                var actObj = extend({}, parent.activeObj, {}, true);
                if (x >= (actObj.activePoint.startX - (actObj.topLeftCircle.radius * 2)) &&
                    x <= (actObj.activePoint.endX + (actObj.topLeftCircle.radius * 2)) &&
                    y >= (actObj.activePoint.startY - (actObj.topLeftCircle.radius * 2)) &&
                    y <= (actObj.activePoint.endY + (actObj.topLeftCircle.radius * 2))) {
                    this.upperContext.clearRect(0, 0, this.parent.upperCanvas.width, this.parent.upperCanvas.height);
                    if (actObj.flipObjColl.length === 4) {
                        actObj.flipObjColl = [];
                        flip = '';
                        actObj.shapeFlip = '';
                    }
                    if (flip === '' && actObj.flipObjColl.length > 1) {
                        flip = actObj.flipObjColl[actObj.flipObjColl.length - 1];
                    }
                    if (actObj.flipObjColl.length <= 1) {
                        var points = this.setTextBoxPos(actObj, degree, flip, x, y);
                        x = points.x;
                        y = points.y;
                    }
                    else {
                        var points = this.setTextBoxPoints(actObj, degree, flip, x, y);
                        x = points.x;
                        y = points.y;
                    }
                    if (parent.activeObj.rotatedAngle !== 0) {
                        x = parent.activeObj.horTopLinePointColl[0].x;
                        y = parent.activeObj.horTopLinePointColl[0].y;
                    }
                    this.renderTextArea(x, y, actObj);
                }
                else {
                    this.applyActObj();
                }
            }
        }
        else if (parent.textArea.style.display === 'block' && this.selectedText() !== '' && e.type === 'mousedown') {
            var temp = parent.textArea.value;
            parent.textArea.value += 'a';
            parent.textArea.value = temp;
        }
        else if (parent.textArea.style.display === 'none') {
            parent.textArea.style.display = 'block';
        }
    };
    Shape.prototype.setTextBoxPos = function (actObj, degree, flip, x, y) {
        var point = { x: x, y: y };
        switch (degree) {
            case 0:
                if (flip.toLowerCase() === 'horizontal') {
                    point.x = actObj.activePoint.endX;
                    point.y = actObj.activePoint.startY;
                }
                else if (flip.toLowerCase() === 'vertical') {
                    point.x = actObj.activePoint.startX;
                    point.y = actObj.activePoint.endY;
                }
                else {
                    point.x = actObj.activePoint.startX;
                    point.y = actObj.activePoint.startY;
                }
                break;
            case 90:
                if (flip.toLowerCase() === 'horizontal') {
                    point.x = actObj.activePoint.startX;
                    point.y = actObj.activePoint.startY;
                }
                else if (flip.toLowerCase() === 'vertical') {
                    point.x = actObj.activePoint.endX;
                    point.y = actObj.activePoint.endY;
                }
                else {
                    point.x = actObj.activePoint.endX;
                    point.y = actObj.activePoint.startY;
                }
                break;
            case 180:
                if (flip.toLowerCase() === 'horizontal') {
                    point.x = actObj.activePoint.startX;
                    point.y = actObj.activePoint.endY;
                }
                else if (flip.toLowerCase() === 'vertical') {
                    point.x = actObj.activePoint.endX;
                    point.y = actObj.activePoint.startY;
                }
                else {
                    point.x = actObj.activePoint.endX;
                    point.y = actObj.activePoint.endY;
                }
                break;
            case 270:
                if (flip.toLowerCase() === 'horizontal') {
                    point.x = actObj.activePoint.endX;
                    point.y = actObj.activePoint.endY;
                }
                else if (flip.toLowerCase() === 'vertical') {
                    point.x = actObj.activePoint.startX;
                    point.y = actObj.activePoint.startY;
                }
                else {
                    point.x = actObj.activePoint.startX;
                    point.y = actObj.activePoint.endY;
                }
                break;
        }
        return point;
    };
    Shape.prototype.setTextBoxPoints = function (actObj, degree, flip, x, y) {
        var point = { x: x, y: y };
        switch (degree) {
            case 0:
                if (actObj.flipObjColl[0] && actObj.flipObjColl[0].toLowerCase() === 'horizontal') {
                    if (flip.toLowerCase() === 'horizontal') {
                        point.x = (actObj.activePoint.startX);
                        point.y = (actObj.activePoint.startY);
                    }
                    else if (flip.toLowerCase() === 'vertical') {
                        point.x = (actObj.activePoint.endX);
                        point.y = (actObj.activePoint.endY);
                    }
                }
                else {
                    if (flip.toLowerCase() === 'horizontal') {
                        point.x = (actObj.activePoint.endX);
                        point.y = (actObj.activePoint.endY);
                    }
                    else if (flip.toLowerCase() === 'vertical') {
                        point.x = (actObj.activePoint.endX);
                        point.y = (actObj.activePoint.startY);
                    }
                }
                break;
            case 90:
                if (actObj.flipObjColl[0] && actObj.flipObjColl[0].toLowerCase() === 'horizontal') {
                    if (flip.toLowerCase() === 'horizontal') {
                        point.x = (actObj.activePoint.endX);
                        point.y = (actObj.activePoint.endY);
                    }
                    else if (flip.toLowerCase() === 'vertical') {
                        point.x = (actObj.activePoint.startX);
                        point.y = (actObj.activePoint.endY);
                    }
                }
                else {
                    if (flip.toLowerCase() === 'horizontal') {
                        point.x = (actObj.activePoint.startX);
                        point.y = (actObj.activePoint.endY);
                    }
                    else if (flip.toLowerCase() === 'vertical') {
                        point.x = (actObj.activePoint.startX);
                        point.y = (actObj.activePoint.startY);
                    }
                }
                break;
            case 180:
                if (actObj.flipObjColl[0] && actObj.flipObjColl[0].toLowerCase() === 'horizontal') {
                    if (flip.toLowerCase() === 'horizontal') {
                        point.x = (actObj.activePoint.startX);
                        point.y = (actObj.activePoint.startY);
                    }
                    else if (flip.toLowerCase() === 'vertical') {
                        point.x = (actObj.activePoint.startX);
                        point.y = (actObj.activePoint.startY);
                    }
                }
                else {
                    if (flip.toLowerCase() === 'horizontal') {
                        point.x = (actObj.activePoint.startX);
                        point.y = (actObj.activePoint.startY);
                    }
                    else if (flip.toLowerCase() === 'vertical') {
                        point.x = (actObj.activePoint.startX);
                        point.y = (actObj.activePoint.endY);
                    }
                }
                break;
            case 270:
                if (actObj.flipObjColl[0] && actObj.flipObjColl[0].toLowerCase() === 'horizontal') {
                    if (flip.toLowerCase() === 'horizontal') {
                        point.x = (actObj.activePoint.startX);
                        point.y = (actObj.activePoint.startY);
                    }
                    else if (flip.toLowerCase() === 'vertical') {
                        point.x = (actObj.activePoint.endX);
                        point.y = (actObj.activePoint.startY);
                    }
                }
                else {
                    if (flip.toLowerCase() === 'horizontal') {
                        point.x = (actObj.activePoint.endX);
                        point.y = (actObj.activePoint.startY);
                    }
                    else if (flip.toLowerCase() === 'vertical') {
                        point.x = (actObj.activePoint.endX);
                        point.y = (actObj.activePoint.endY);
                    }
                }
                break;
        }
        return point;
    };
    Shape.prototype.selectedText = function () {
        var start = this.parent.textArea.selectionStart;
        var finish = this.parent.textArea.selectionEnd;
        return this.parent.textArea.value.substring(start, finish);
    };
    Shape.prototype.panObjColl = function (xDiff, yDiff, panRegion) {
        var parent = this.parent;
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            var currObj = parent.objColl[i];
            if (panRegion === '' || panRegion === 'vertical') {
                currObj.activePoint.startX += xDiff;
                currObj.activePoint.endX += xDiff;
                if (currObj.rotationCirclePointColl) {
                    currObj.rotationCirclePointColl.x += xDiff;
                }
                if (currObj.shape === 'path') {
                    for (var l = 0, len_3 = currObj.pointColl.length; l < len_3; l++) {
                        currObj.pointColl[l].x += xDiff;
                    }
                }
            }
            else {
                currObj.activePoint.startX -= xDiff;
                currObj.activePoint.endX -= xDiff;
                if (currObj.rotationCirclePointColl) {
                    currObj.rotationCirclePointColl.x -= xDiff;
                }
                if (currObj.shape === 'path') {
                    for (var l = 0, len_4 = currObj.pointColl.length; l < len_4; l++) {
                        currObj.pointColl[l].x -= xDiff;
                    }
                }
            }
            if (panRegion === '' || panRegion === 'horizontal') {
                currObj.activePoint.startY += yDiff;
                currObj.activePoint.endY += yDiff;
                if (currObj.rotationCirclePointColl) {
                    currObj.rotationCirclePointColl.y += yDiff;
                }
                if (currObj.shape === 'path') {
                    for (var l = 0; l < currObj.pointColl.length; l++) {
                        currObj.pointColl[l].y += yDiff;
                    }
                }
            }
            else {
                currObj.activePoint.startY -= yDiff;
                currObj.activePoint.endY -= yDiff;
                if (currObj.rotationCirclePointColl) {
                    currObj.rotationCirclePointColl.y -= yDiff;
                }
                if (currObj.shape === 'path') {
                    for (var l = 0; l < currObj.pointColl.length; l++) {
                        currObj.pointColl[l].y -= yDiff;
                    }
                }
            }
            currObj = this.updateWidthHeight(currObj);
            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint,
                    obj: currObj } });
            if (currObj.shape === 'line' || currObj.shape === 'arrow') {
                currObj.pointColl = this.getLinePoints(currObj.activePoint.startX, currObj.activePoint.startY, currObj.activePoint.endX, currObj.activePoint.endY);
                for (var j = 0, len_5 = currObj.pointColl.length; j < len_5; j++) {
                    currObj.pointColl[j].ratioX =
                        (currObj.pointColl[j].x - parent.img.destLeft) / parent.img.destWidth;
                    currObj.pointColl[j].ratioY =
                        (currObj.pointColl[j].y - parent.img.destTop) / parent.img.destHeight;
                }
            }
            var temp = this.lowerContext.filter;
            this.lowerContext.filter = 'none';
            this.apply(currObj.shape, currObj);
            this.lowerContext.filter = temp;
            this.refreshActiveObj();
        }
    };
    Shape.prototype.updateFontStyles = function (isTextBox) {
        var parent = this.parent;
        this.upperContext.strokeStyle = parent.activeObj.strokeSettings.strokeColor;
        this.upperContext.fillStyle = parent.activeObj.strokeSettings.strokeColor;
        var textStyle = '';
        if (parent.activeObj.textSettings.bold) {
            textStyle = 'bold ';
        }
        if (parent.activeObj.textSettings.italic) {
            textStyle = 'italic ';
        }
        if (parent.activeObj.textSettings.bold && parent.activeObj.textSettings.italic) {
            textStyle = 'italic bold ';
        }
        var fontSize = isTextBox ? parseFloat(parent.textArea.style.fontSize) : parent.activeObj.textSettings.fontSize;
        var fontFamily = parent.textArea.style.display === 'block' ? parent.textArea.style.fontFamily : parent.activeObj.textSettings.fontFamily;
        this.upperContext.font = textStyle + fontSize + 'px' + ' ' + fontFamily;
    };
    Shape.prototype.applyFontStyle = function (item) {
        var parent = this.parent;
        this.pushActItemIntoObj();
        var objColl = extend([], parent.objColl, [], true);
        parent.objColl.pop();
        if (parent.textArea.style.display === 'none') {
            this.updateFontRatio(parent.activeObj);
        }
        else {
            this.updateFontRatio(parent.activeObj, true);
        }
        switch (item) {
            case 'default':
                this.updateFontStyle(item, objColl, 'normal', 'normal');
                break;
            case 'bold':
                this.updateFontStyle(item, objColl, 'bold', 'normal');
                break;
            case 'italic':
                this.updateFontStyle(item, objColl, 'normal', 'italic');
                break;
            case 'bolditalic':
                this.updateFontStyle(item, objColl, 'bold', 'italic');
                break;
        }
    };
    Shape.prototype.updateFontStyle = function (item, objColl, fontWeight, fontStyle) {
        var parent = this.parent;
        if (parent.textArea.style.display === 'block') {
            var width = this.getTextAreaWidth(item);
            parent.textArea.style.width = width + 'px';
            parent.textArea.style.fontWeight = fontWeight;
            parent.textArea.style.fontStyle = fontStyle;
            this.updateObjColl(item, objColl);
        }
        else {
            this.textSettings.bold = parent.activeObj.textSettings.bold = fontWeight === 'normal' ? false : true;
            this.textSettings.italic = parent.activeObj.textSettings.italic = fontStyle === 'normal' ? false : true;
            this.redrawText();
            parent.notify('undo-redo', { prop: 'updateUrObj', onPropertyChange: false, value: { objColl: objColl } });
        }
    };
    Shape.prototype.updateArrowRatio = function (obj) {
        var parent = this.parent;
        var object = { arrowDimension: null };
        parent.notify('draw', { prop: 'getArrowDimension', onPropertyChange: false, value: { obj: object } });
        var length;
        if (Math.abs(obj.activePoint.width) > Math.abs(obj.activePoint.height)) {
            length = Math.abs(obj.activePoint.width);
        }
        else {
            length = Math.abs(obj.activePoint.height);
        }
        var dimension;
        var dimensions = ['bar', 'arrow', 'arrowSolid', 'circle', 'square'];
        for (var _i = 0, dimensions_1 = dimensions; _i < dimensions_1.length; _i++) {
            dimension = dimensions_1[_i];
            var ratioX = length / object['arrowDimension'][dimension]['width'];
            var ratioY = length / object['arrowDimension'][dimension]['height'];
            object['arrowDimension'][dimension]['ratioX'] = ratioX;
            object['arrowDimension'][dimension]['ratioY'] = ratioY;
        }
    };
    Shape.prototype.updateArrowSize = function (obj) {
        var object = { arrowDimension: null };
        this.parent.notify('draw', { prop: 'getArrowDimension', onPropertyChange: false, value: { obj: object } });
        var length;
        if (Math.abs(obj.activePoint.width) > Math.abs(obj.activePoint.height)) {
            length = Math.abs(obj.activePoint.width);
        }
        else {
            length = Math.abs(obj.activePoint.height);
        }
        var dimension;
        var dimensions = ['bar', 'arrow', 'arrowSolid', 'circle', 'square'];
        for (var _i = 0, dimensions_2 = dimensions; _i < dimensions_2.length; _i++) {
            dimension = dimensions_2[_i];
            var ratioX = object['arrowDimension'][dimension]['ratioX'];
            var ratioY = object['arrowDimension'][dimension]['ratioY'];
            object['arrowDimension'][dimension]['width'] = length / ratioX;
            object['arrowDimension'][dimension]['height'] = length / ratioY;
        }
    };
    Shape.prototype.updateFontRatio = function (obj, isTextArea) {
        var parent = this.parent;
        var text = this.getMaxText(isTextArea);
        var width = this.upperContext.measureText(text).width +
            parent.activeObj.textSettings.fontSize * 0.5;
        var height = (parent.activeObj.textSettings.fontSize + parent.activeObj.textSettings.fontSize * 0.25);
        var degree = this.getRotDegOfShape(obj);
        if (isNullOrUndefined(isTextArea)) {
            if (degree === 0 || Math.abs(degree) === 180) {
                obj.textSettings.fontRatio = width / obj.textSettings.fontSize;
            }
            else {
                obj.textSettings.fontRatio = height / obj.textSettings.fontSize;
            }
        }
        else if (isTextArea) {
            obj.textSettings.fontRatio = width / parseFloat(parent.textArea.style.fontSize);
        }
    };
    Shape.prototype.updateFontSize = function (obj) {
        var degree = this.getRotDegOfShape(obj);
        if (degree === 0 || Math.abs(degree) === 180) {
            obj.textSettings.fontSize = (obj.activePoint.width / obj.textSettings.fontRatio);
        }
        else {
            obj.textSettings.fontSize = (obj.activePoint.height / obj.textSettings.fontRatio);
        }
    };
    Shape.prototype.updateObjColl = function (item, objColl) {
        var parent = this.parent;
        var prevCropObj = extend({}, parent.cropObj, {}, true);
        var object = { currObj: {} };
        parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = objColl;
        prevObj.pointColl = extend([], parent.pointColl, [], true);
        prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        var tempBold = parent.activeObj.textSettings.bold;
        var tempItalic = parent.activeObj.textSettings.italic;
        switch (item) {
            case 'default':
                parent.activeObj.textSettings.bold = false;
                parent.activeObj.textSettings.italic = false;
                break;
            case 'bold':
                parent.activeObj.textSettings.bold = true;
                parent.activeObj.textSettings.italic = false;
                break;
            case 'italic':
                parent.activeObj.textSettings.bold = false;
                parent.activeObj.textSettings.italic = true;
                break;
            case 'bolditalic':
                parent.activeObj.textSettings.bold = true;
                parent.activeObj.textSettings.italic = true;
                break;
        }
        parent.objColl.push(parent.activeObj);
        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
            value: { operation: 'textAreaCustomization', previousObj: prevObj, previousObjColl: prevObj.objColl,
                previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                previousCropObj: prevCropObj, previousText: null,
                currentText: null, previousFilter: null, isCircleCrop: null } });
        parent.objColl.pop();
        parent.activeObj.textSettings.bold = tempBold;
        parent.activeObj.textSettings.italic = tempItalic;
    };
    Shape.prototype.pushActItemIntoObj = function () {
        if (this.parent.textArea.style.display === 'none') {
            this.parent.objColl.push(this.parent.activeObj);
        }
        else {
            var temp = extend({}, this.parent.activeObj, {}, true);
            this.parent.notify('selection', { prop: 'setTextBoxStylesToActObj', onPropertyChange: false });
            this.parent.objColl.push(this.parent.activeObj);
            this.parent.activeObj = temp;
        }
    };
    Shape.prototype.clearActObj = function () {
        if (this.parent.textArea.style.display === 'none') {
            this.refreshActiveObj();
            this.applyActObj();
            this.refreshActiveObj();
            this.parent.currObjType.isCustomCrop = false;
        }
    };
    Shape.prototype.refreshActiveObj = function () {
        this.parent.activeObj = {};
        this.parent.activeObj.activePoint = { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 };
        this.parent.activeObj.triangle = [];
        this.parent.activeObj.triangleRatio = [];
        this.parent.activeObj.flipObjColl = [];
        this.parent.activeObj.strokeSettings = this.strokeSettings;
        this.parent.activeObj.textSettings = this.textSettings;
        this.parent.activeObj.rotatedAngle = 0;
    };
    Shape.prototype.applyActObj = function (isMouseDown) {
        var isActObj = false;
        if (this.parent.activeObj.shape !== undefined && this.parent.activeObj.shape === 'text' && this.parent.activeObj.keyHistory === '') {
            this.refreshActiveObj();
            this.upperContext.clearRect(0, 0, this.parent.upperCanvas.width, this.parent.upperCanvas.height);
        }
        else {
            var splitWords = void 0;
            var isCropSelection = false;
            if (this.parent.activeObj.shape !== undefined) {
                splitWords = this.parent.activeObj.shape.split('-');
            }
            if (splitWords === undefined && this.parent.currObjType.isCustomCrop) {
                isCropSelection = true;
            }
            else if (splitWords !== undefined && splitWords[0] === 'crop') {
                isCropSelection = true;
            }
            if (this.parent.activeObj.shape && !isCropSelection && this.parent.activeObj.shape !== 'shape') {
                for (var i = 0; i < this.parent.objColl.length; i++) {
                    if (JSON.stringify(this.parent.activeObj) === JSON.stringify(this.parent.objColl[i])) {
                        isActObj = true;
                        break;
                    }
                }
                if (!isActObj) {
                    if (isNullOrUndefined(this.parent.activeObj.currIndex)) {
                        this.parent.activeObj.currIndex = 'shape_' + (this.parent.objColl.length + 1);
                    }
                    this.updImgRatioForActObj();
                    var splitWords_1 = this.parent.activeObj.currIndex.split('_');
                    var tempObjColl = this.parent.objColl.splice(0, parseInt(splitWords_1[1], 10) - 1);
                    tempObjColl.push(extend({}, this.parent.activeObj, {}, true));
                    for (var i = 0; i < this.parent.objColl.length; i++) {
                        tempObjColl.push(this.parent.objColl[i]);
                    }
                    this.parent.objColl = tempObjColl;
                    tempObjColl = [];
                    this.refreshActiveObj();
                    this.lowerContext.clearRect(0, 0, this.parent.lowerCanvas.width, this.parent.lowerCanvas.height);
                    this.parent.notify('draw', { prop: 'redrawImgWithObj', onPropertyChange: false });
                    this.parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
                    this.parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
                    this.parent.currObjType.shape = '';
                    this.refreshActiveObj();
                    if (this.parent.isCircleCrop) {
                        this.parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                            value: { context: this.lowerContext, isSave: null, isFlip: null } });
                    }
                    if (!isBlazor()) {
                        this.parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
                    }
                    else {
                        this.parent.updateToolbar(this.parent.element, 'destroyQuickAccessToolbar');
                    }
                    if (isNullOrUndefined(isMouseDown)) {
                        this.parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
                        this.parent.notify('draw', { prop: 'setPrevActObj', onPropertyChange: false, value: { prevActObj: null } });
                    }
                }
            }
        }
    };
    Shape.prototype.alignTextAreaIntoCanvas = function () {
        var parent = this.parent;
        var letters = parent.textArea.value;
        parent.textArea.value = '';
        for (var i = 0, len = letters.length; i < len; i++) {
            parent.textArea.value += letters[i];
            parent.textArea.style.height = 'auto';
            parent.textArea.style.height = parent.textArea.scrollHeight + 'px';
            this.setTextBoxWidth();
        }
    };
    Shape.prototype.transformTextArea = function () {
        var parent = this.parent;
        if (parent.activeObj.shape === 'text') {
            parent.textArea.style.transformOrigin = '0 0';
            var rotatedDegree = parent.activeObj.rotatedAngle * (180 / Math.PI);
            var scale = '';
            var degree = this.getRotDegOfShape(parent.activeObj);
            if (parent.activeObj.flipObjColl.length > 0) {
                // need to add scale value according to length.
                for (var i = 0; i < parent.activeObj.flipObjColl.length; i++) {
                    if (degree !== 0 && degree % 90 === 0 && degree !== 180) {
                        scale += parent.activeObj.flipObjColl[i].toLowerCase() === 'horizontal' ? 'scale(1, -1)' :
                            'scale(-1, 1)';
                    }
                    else {
                        scale += parent.activeObj.flipObjColl[i].toLowerCase() === 'horizontal' ? 'scale(-1, 1)' :
                            'scale(1, -1)';
                    }
                    degree += rotatedDegree;
                    if (parent.activeObj.flipObjColl[i].toLowerCase() === 'horizontal') {
                        parent.textArea.style.transform = 'rotate(' + degree + 'deg)' + scale;
                    }
                    else if (parent.activeObj.flipObjColl[i].toLowerCase() === 'vertical') {
                        parent.textArea.style.transform = 'rotate(' + degree + 'deg)' + scale;
                    }
                }
            }
            else {
                degree += rotatedDegree;
                parent.textArea.style.transform = 'rotate(' + degree + 'deg)';
            }
        }
    };
    Shape.prototype.getTextAreaWidth = function (item) {
        var parent = this.parent;
        var tempBold = parent.activeObj.textSettings.bold;
        var tempItalic = parent.activeObj.textSettings.italic;
        switch (item) {
            case 'default':
                parent.activeObj.textSettings.bold = false;
                parent.activeObj.textSettings.italic = false;
                break;
            case 'bold':
                parent.activeObj.textSettings.bold = true;
                parent.activeObj.textSettings.italic = false;
                break;
            case 'italic':
                parent.activeObj.textSettings.bold = false;
                parent.activeObj.textSettings.italic = true;
                break;
            case 'bolditalic':
                parent.activeObj.textSettings.bold = true;
                parent.activeObj.textSettings.italic = true;
                break;
        }
        this.updateFontStyles();
        var width;
        if (parent.textArea.style.display === 'none') {
            width = this.upperContext.measureText(parent.activeObj.keyHistory).width +
                parent.activeObj.textSettings.fontSize * 0.5;
        }
        else {
            width = this.upperContext.measureText(parent.textArea.value).width +
                parent.activeObj.textSettings.fontSize * 0.5;
        }
        parent.activeObj.textSettings.bold = tempBold;
        parent.activeObj.textSettings.italic = tempItalic;
        return width;
    };
    Shape.prototype.getObjDetails = function (obj) {
        var parent = this.parent;
        var shapeDetails = {};
        shapeDetails.id = obj.currIndex;
        shapeDetails.type = parent.toPascalCase(obj.shape);
        shapeDetails.startX = obj.activePoint.startX;
        shapeDetails.startY = obj.activePoint.startY;
        switch (obj.shape) {
            case 'rectangle':
                shapeDetails.width = obj.activePoint.width;
                shapeDetails.height = obj.activePoint.height;
                shapeDetails.strokeColor = obj.strokeSettings.strokeColor;
                shapeDetails.fillColor = obj.strokeSettings.fillColor;
                shapeDetails.strokeWidth = obj.strokeSettings.strokeWidth;
                break;
            case 'ellipse':
                shapeDetails.radius = obj.activePoint.width / 2;
                shapeDetails.strokeColor = obj.strokeSettings.strokeColor;
                shapeDetails.fillColor = obj.strokeSettings.fillColor;
                shapeDetails.strokeWidth = obj.strokeSettings.strokeWidth;
                break;
            case 'line':
            case 'arrow':
                shapeDetails.length = obj.activePoint.width;
                shapeDetails.strokeColor = obj.strokeSettings.strokeColor;
                shapeDetails.strokeWidth = obj.strokeSettings.strokeWidth;
                break;
            case 'text':
                shapeDetails.text = obj.keyHistory;
                shapeDetails.fontSize = obj.textSettings.fontSize;
                shapeDetails.color = obj.strokeSettings.strokeColor;
                shapeDetails.fontStyle = [];
                if (obj.textSettings.bold) {
                    shapeDetails.fontStyle.push('bold');
                }
                if (obj.textSettings.italic) {
                    shapeDetails.fontStyle.push('italic');
                }
                break;
            case 'path':
                shapeDetails.strokeColor = obj.strokeSettings.strokeColor;
                shapeDetails.strokeWidth = obj.strokeSettings.strokeWidth;
                break;
        }
        return shapeDetails;
    };
    Shape.prototype.getFreehandDrawDetails = function (index) {
        var parent = this.parent;
        var shapeDetails = {};
        shapeDetails.id = parent.pointColl[index].id;
        shapeDetails.type = ShapeType.FreehandDraw;
        shapeDetails.points = extend([], parent.pointColl[index].points);
        shapeDetails.strokeColor = parent.pointColl[index].strokeColor;
        shapeDetails.strokeWidth = parent.pointColl[index].strokeWidth;
        return shapeDetails;
    };
    Shape.prototype.getShapeSetting = function (id, obj) {
        var parent = this.parent;
        var shapeDetails;
        if (!parent.disabled && parent.isImageLoaded) {
            this.applyActObj();
            if (id.split('_')[0] === 'shape') {
                var obj_1;
                for (var i = 0, len = parent.objColl.length; i < len; i++) {
                    if (parent.objColl[i].currIndex === id) {
                        obj_1 = extend({}, parent.objColl[i], {}, true);
                        break;
                    }
                }
                shapeDetails = this.getObjDetails(obj_1);
            }
            else if (id.split('_')[0] === 'pen') {
                shapeDetails = this.getFreehandDrawDetails(parseInt(id.split('_')[1], 10) - 1);
            }
        }
        obj['shapeDetails'] = shapeDetails;
    };
    Shape.prototype.getShapeSettings = function (obj) {
        var parent = this.parent;
        var shapeDetailsColl = [];
        if (!parent.disabled && parent.isImageLoaded) {
            this.applyActObj();
            for (var i = 0, len = parent.objColl.length; i < len; i++) {
                var shapeDetails = this.getObjDetails(parent.objColl[i]);
                shapeDetailsColl.push(shapeDetails);
            }
            for (var i = 0; i < parent.freehandCounter; i++) {
                var shapeDetails = this.getFreehandDrawDetails(i);
                shapeDetailsColl.push(shapeDetails);
            }
        }
        obj['shapeDetailsColl'] = shapeDetailsColl;
    };
    Shape.prototype.isPointsInRange = function (x, y, obj) {
        var inRange = false;
        if (!isNullOrUndefined(x) && !isNullOrUndefined(y) && x >= this.parent.img.destLeft && y >= this.parent.img.destTop &&
            x <= this.parent.img.destLeft + this.parent.img.destWidth && y <= this.parent.img.destTop + this.parent.img.destHeight) {
            inRange = true;
        }
        obj['inRange'] = inRange;
    };
    Shape.prototype.alignRotateFlipColl = function (collection, isRotateFlipCollection, obj) {
        collection = this.popForDefaultTransformedState(collection);
        collection = this.popForDefaultFlipState(collection);
        collection = this.popForDefaultRotateState(collection);
        if (collection.length === 0 && isRotateFlipCollection) {
            this.parent.transform.degree = 0;
            this.parent.transform.currFlipState = '';
        }
        obj['collection'] = collection;
        return collection;
    };
    Shape.prototype.popForDefaultTransformedState = function (collection) {
        var rotateRight = 0;
        var rotateleft = 0;
        var horizontal = 0;
        var vertical = 0;
        for (var i = 0; i < collection.length; i++) {
            if (collection[i] === 90 || collection[i] === 'rotateRight') {
                rotateRight++;
                rotateleft = 0;
                horizontal = 0;
                vertical = 0;
                if (rotateRight === 4) {
                    collection.pop();
                    collection.pop();
                    collection.pop();
                    collection.pop();
                }
            }
            else if (collection[i] === -90 || collection[i] === 'rotateLeft') {
                rotateleft++;
                rotateRight = 0;
                horizontal = 0;
                vertical = 0;
                if (rotateleft === 4) {
                    collection.pop();
                    collection.pop();
                    collection.pop();
                    collection.pop();
                }
            }
            else if (collection[i] === 'horizontal' || collection[i] === 'Horizontal'
                || collection[i] === 'horizontalflip') {
                horizontal++;
                rotateleft = 0;
                rotateRight = 0;
                vertical = 0;
                if (horizontal === 2) {
                    collection.pop();
                    collection.pop();
                }
            }
            else if (collection[i] === 'vertical' || collection[i] === 'Vertical'
                || collection[i] === 'verticalflip') {
                vertical++;
                horizontal = 0;
                rotateleft = 0;
                rotateRight = 0;
                if (vertical === 2) {
                    collection.pop();
                    collection.pop();
                }
            }
        }
        return collection;
    };
    Shape.prototype.popForDefaultFlipState = function (collection) {
        for (var i = 0; i < collection.length; i++) {
            if (!isNullOrUndefined(collection[i + 3])) {
                if ((collection[i] === 'horizontal' || collection[i] === 'Horizontal'
                    || collection[i] === 'horizontalFlip')
                    && (collection[i + 1] === 'vertical' || collection[i + 1] === 'Vertical'
                        || collection[i] === 'verticalFlip') &&
                    (collection[i + 2] === 'horizontal' || collection[i + 2] === 'Horizontal'
                        || collection[i] === 'horizontalFlip') &&
                    (collection[i + 3] === 'vertical' || collection[i + 3] === 'Vertical'
                        || collection[i] === 'verticalFlip')) {
                    collection.pop();
                    collection.pop();
                    collection.pop();
                    collection.pop();
                }
                else if ((collection[i] === 'vertical' || collection[i] === 'Vertical'
                    || collection[i] === 'verticalFlip')
                    && (collection[i + 1] === 'horizontal' || collection[i + 1] === 'Horizontal'
                        || collection[i + 1] === 'horizontalFlip') &&
                    (collection[i + 2] === 'vertical' || collection[i + 2] === 'Vertical' || collection[i] === 'verticalFlip') &&
                    (collection[i + 3] === 'horizontal' || collection[i + 3] === 'Horizontal' || collection[i] === 'horizontalFlip')) {
                    collection.pop();
                    collection.pop();
                    collection.pop();
                    collection.pop();
                }
            }
        }
        return collection;
    };
    Shape.prototype.popForDefaultRotateState = function (collection) {
        for (var i = 0; i < collection.length; i++) {
            if (!isNullOrUndefined(collection[i + 1])) {
                if ((collection[i] === 90 || collection[i] === 'rotateRight') &&
                    (collection[i + 1] === -90 || collection[i] === 'rotateLeft')) {
                    collection.pop();
                    collection.pop();
                }
                else if ((collection[i] === -90 || collection[i] === 'rotateLeft') &&
                    (collection[i + 1] === 90 || collection[i] === 'rotateRight')) {
                    collection.pop();
                    collection.pop();
                }
            }
        }
        return collection;
    };
    Shape.prototype.selectShape = function (id, obj) {
        var parent = this.parent;
        var isSelected = false;
        if (!parent.disabled && parent.isImageLoaded) {
            this.applyActObj();
            if (id.split('_')[0] === 'shape') {
                var obj_2;
                for (var i = 0, len = parent.objColl.length; i < len; i++) {
                    if (parent.objColl[i].currIndex === id) {
                        obj_2 = extend({}, parent.objColl[i], {}, true);
                        break;
                    }
                }
                if (isNullOrUndefined(obj_2)) {
                    isSelected = false;
                }
                else {
                    isSelected = true;
                    parent.activeObj = obj_2;
                    var object = { canvasFilter: null };
                    parent.notify('toolbar', { prop: 'getCanvasFilter', onPropertyChange: false, value: { obj: object } });
                    this.lowerContext.filter = object['canvasFilter'];
                    parent.notify('selection', { prop: 'redrawShape', onPropertyChange: false,
                        value: { obj: parent.activeObj } });
                    if (!isBlazor()) {
                        if (parent.activeObj.shape === 'text') {
                            parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'text',
                                    isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                        }
                        else if (parent.activeObj.shape === 'pen') {
                            parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'pen',
                                    isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                        }
                        else {
                            parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'shapes',
                                    isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                        }
                        parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
                        parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
                    }
                    else {
                        parent.updateToolbar(parent.element, parent.activeObj.shape);
                        if (parent.activeObj.shape === 'path') {
                            parent.updateToolbar(this.parent.element, 'path', 'pathQuickAccessToolbar');
                        }
                        else {
                            parent.updateToolbar(parent.element, 'quickAccessToolbar', parent.activeObj.shape);
                        }
                    }
                }
            }
            else if (id.split('_')[0] === 'pen') {
                var object = { bool: false };
                parent.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: object } });
                if (object['bool']) {
                    parent.okBtn();
                }
                var obj_3 = { isIndex: false };
                parent.notify('freehand-draw', { prop: 'isFHDIdx', value: { index: parseInt(id.split('_')[1], 10) - 1, obj: obj_3 } });
                if (obj_3['isIndex']) {
                    isSelected = true;
                    parent.notify('freehand-draw', { prop: 'selectFhd', value: { id: id } });
                    if (!isBlazor()) {
                        parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: true } });
                        parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
                    }
                    else {
                        parent.updateToolbar(parent.element, 'pen');
                        parent.updateToolbar(parent.element, 'quickAccessToolbar', 'pen');
                    }
                }
                else {
                    isSelected = false;
                }
            }
        }
        obj['isSelected'] = isSelected;
    };
    Shape.prototype.deleteShape = function (id) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            this.applyActObj();
            if (id.split('_')[0] === 'shape') {
                for (var i = 0, len = parent.objColl.length; i < len; i++) {
                    if (parent.objColl[i].currIndex === id) {
                        parent.objColl.splice(i, 1);
                        break;
                    }
                }
            }
            else if (id.split('_')[0] === 'pen') {
                parent.notify('freehand-draw', { prop: 'handle-freehand-draw', value: { id: id } });
            }
            var object = { canvasFilter: null };
            parent.notify('toolbar', { prop: 'getCanvasFilter', onPropertyChange: false, value: { obj: object } });
            this.lowerContext.filter = object['canvasFilter'];
            this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
            parent.notify('draw', { prop: 'redrawImgWithObj', onPropertyChange: false });
            if (!isBlazor()) {
                parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
            }
            else {
                parent.updateToolbar(parent.element, 'imageLoaded');
            }
        }
    };
    Shape.prototype.getMaxText = function (isTextBox, text, obj) {
        if (isNullOrUndefined(text)) {
            text = isTextBox ? this.parent.textArea.value : this.parent.activeObj.keyHistory;
        }
        var maxi;
        var rows = text.split('\n');
        var maxStr = rows[0].length;
        var maxText = rows[0];
        for (var i = 1; i < rows.length; i++) {
            maxi = rows[i].length;
            if (maxi > maxStr) {
                maxText = rows[i];
                maxStr = maxi;
            }
        }
        if (obj) {
            obj['maxText'] = maxText;
        }
        return maxText;
    };
    Shape.prototype.getLinePoints = function (x1, y1, x2, y2) {
        var points = [];
        var i;
        var j;
        if (x1 === x2) {
            if (y1 < y2) {
                i = [x1, y1];
                j = [x2, y2];
            }
            else {
                j = [x1, y1];
                i = [x2, y2];
            }
            var m = this.getSlope(i, j, true);
            var b = this.getIntercept(i, m);
            for (var y = i[1]; y <= j[1]; y++) {
                var x = m * y + b;
                points.push({ x: x, y: y });
            }
        }
        else {
            if (x1 < x2) {
                i = [x1, y1];
                j = [x2, y2];
            }
            else {
                j = [x1, y1];
                i = [x2, y2];
            }
            var m = this.getSlope(i, j, false);
            var b = this.getIntercept(i, m);
            for (var x = i[0]; x <= j[0]; x++) {
                var y = m * x + b;
                points.push({ x: x, y: y });
            }
        }
        if (Math.floor(x1) === Math.floor(x2) || (points.length < 10 && (y2 - y1 > 10 || y1 - y2 > 10))) {
            points = [];
            var lesserY = Math.min(y1, y2);
            for (var i_1 = 0; i_1 < Math.abs(Math.floor(y2) - Math.floor(y1)); i_1++) {
                points.push({ x: x1, y: lesserY + i_1 });
            }
            if (points.length > 1) {
                var prev = void 0;
                if (isNullOrUndefined(points[points.length - 2])) {
                    prev = { x: 0, y: 0 };
                }
                else {
                    prev = points[points.length - 2];
                }
                var diffX = points[points.length - 1]['x'] - prev.x;
                var diffY = points[points.length - 1]['y'] - prev.y;
                points.push({ x: points[points.length - 1]['x'] + (diffX / 2), y: points[points.length - 1]['y'] + (diffY / 2) });
            }
        }
        else if (Math.floor(y1) === Math.floor(y2) || (points.length < 10 && (x2 - x1 > 10 || x1 - x2 > 10))) {
            points = [];
            var lesserX = Math.min(x1, x2);
            for (var i_2 = 0; i_2 < Math.abs(Math.floor(x2) - Math.floor(x1)); i_2++) {
                points.push({ x: lesserX + i_2, y: y1 });
            }
            if (points.length > 1) {
                var prev = void 0;
                if (isNullOrUndefined(points[points.length - 2])) {
                    prev = { x: 0, y: 0 };
                }
                else {
                    prev = points[points.length - 2];
                }
                var diffX = points[points.length - 1]['x'] - prev.x;
                var diffY = points[points.length - 1]['y'] - prev.y;
                points.push({ x: points[points.length - 1]['x'] + (diffX / 2), y: points[points.length - 1]['y'] + (diffY / 2) });
            }
        }
        return points;
    };
    Shape.prototype.getSlope = function (a, b, isSameAxis) {
        var slope;
        if (isSameAxis) {
            if (a[1] === b[1]) {
                return null;
            }
            slope = (b[0] - a[0]) / (b[1] - a[1]);
        }
        else {
            if (a[0] === b[0]) {
                return null;
            }
            slope = (b[1] - a[1]) / (b[0] - a[0]);
        }
        return slope;
    };
    Shape.prototype.getIntercept = function (point, getSlope) {
        if (getSlope === null) {
            return point[0];
        }
        return point[1] - getSlope * point[0];
    };
    Shape.prototype.setPointCollForShapeRotation = function (obj) {
        var center = { x: obj.activePoint.startX + (obj.activePoint.width / 2), y: obj.activePoint.startY +
                (obj.activePoint.height / 2) };
        var p1 = { x: Math.cos(obj.rotatedAngle) * (obj.activePoint.startX - center.x) - Math.sin(obj.rotatedAngle) *
                (obj.activePoint.startY - center.y) + center.x,
            y: Math.sin(obj.rotatedAngle) * (obj.activePoint.startX - center.x) + Math.cos(obj.rotatedAngle) *
                (obj.activePoint.startY - center.y) + center.y };
        var p2 = { x: Math.cos(obj.rotatedAngle) * (obj.activePoint.endX - center.x) - Math.sin(obj.rotatedAngle) *
                (obj.activePoint.startY - center.y) + center.x,
            y: Math.sin(obj.rotatedAngle) * (obj.activePoint.endX - center.x) + Math.cos(obj.rotatedAngle) * (obj.activePoint.startY
                - center.y) + center.y };
        var p3 = { x: Math.cos(obj.rotatedAngle) * (obj.activePoint.startX - center.x) - Math.sin(obj.rotatedAngle) *
                (obj.activePoint.endY - center.y) + center.x,
            y: Math.sin(obj.rotatedAngle) * (obj.activePoint.startX - center.x) + Math.cos(obj.rotatedAngle) * (obj.activePoint.endY
                - center.y) + center.y };
        var p4 = { x: Math.cos(obj.rotatedAngle) * (obj.activePoint.endX - center.x) - Math.sin(obj.rotatedAngle) *
                (obj.activePoint.endY - center.y) + center.x,
            y: Math.sin(obj.rotatedAngle) * (obj.activePoint.endX - center.x) + Math.cos(obj.rotatedAngle) * (obj.activePoint.endY
                - center.y) + center.y };
        obj.horTopLinePointColl = this.getLinePoints(p1.x, p1.y, p2.x, p2.y);
        obj.horBottomLinePointColl = this.getLinePoints(p3.x, p3.y, p4.x, p4.y);
        obj.verLeftLinePointColl = this.getLinePoints(p1.x, p1.y, p3.x, p3.y);
        obj.verRightLinePointColl = this.getLinePoints(p2.x, p2.y, p4.x, p4.y);
        obj.verLeftLinePointColl.reverse();
        obj.verRightLinePointColl.reverse();
        // Updating ratio for point collection
        for (var i = 0; i < obj.horTopLinePointColl.length; i++) {
            obj.horTopLinePointColl[i].ratioX = (obj.horTopLinePointColl[i].x -
                this.parent.img.destLeft) / this.parent.img.destWidth;
            obj.horTopLinePointColl[i].ratioY = (obj.horTopLinePointColl[i].y -
                this.parent.img.destTop) / this.parent.img.destHeight;
        }
        for (var i = 0; i < obj.horBottomLinePointColl.length; i++) {
            obj.horBottomLinePointColl[i].ratioX = (obj.horBottomLinePointColl[i].x -
                this.parent.img.destLeft) / this.parent.img.destWidth;
            obj.horBottomLinePointColl[i].ratioY = (obj.horBottomLinePointColl[i].y -
                this.parent.img.destTop) / this.parent.img.destHeight;
        }
        for (var i = 0; i < obj.verLeftLinePointColl.length; i++) {
            obj.verLeftLinePointColl[i].ratioX = (obj.verLeftLinePointColl[i].x -
                this.parent.img.destLeft) / this.parent.img.destWidth;
            obj.verLeftLinePointColl[i].ratioY = (obj.verLeftLinePointColl[i].y -
                this.parent.img.destTop) / this.parent.img.destHeight;
        }
        for (var i = 0; i < obj.verRightLinePointColl.length; i++) {
            obj.verRightLinePointColl[i].ratioX = (obj.verRightLinePointColl[i].x -
                this.parent.img.destLeft) / this.parent.img.destWidth;
            obj.verRightLinePointColl[i].ratioY = (obj.verRightLinePointColl[i].y -
                this.parent.img.destTop) / this.parent.img.destHeight;
        }
        if (this.parent.upperCanvas.style.cursor !== 'move') {
            var object = { rotationCirclePoint: null };
            this.parent.notify('selection', { prop: 'getTransRotationPoint', value: { obj: obj, object: object } });
            var rotationCirclePoint = object['rotationCirclePoint'];
            if (rotationCirclePoint) {
                obj.rotationCirclePointColl = { x: Math.cos(obj.rotatedAngle) * (rotationCirclePoint.x - center.x) -
                        Math.sin(obj.rotatedAngle) * (rotationCirclePoint.y - center.y) + center.x,
                    y: Math.sin(obj.rotatedAngle) * (rotationCirclePoint.x - center.x) + Math.cos(obj.rotatedAngle)
                        * (rotationCirclePoint.y - center.y) + center.y };
                obj.rotationCirclePointColl.ratioX = (obj.rotationCirclePointColl.x - this.parent.img.destLeft) /
                    this.parent.img.destWidth;
                obj.rotationCirclePointColl.ratioY = (obj.rotationCirclePointColl.y - this.parent.img.destTop) /
                    this.parent.img.destHeight;
            }
        }
    };
    Shape.prototype.getSquarePointForRotatedShape = function (obj, object) {
        var point = { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 };
        var center = { x: obj.activePoint.startX + (obj.activePoint.width / 2), y: obj.activePoint.startY +
                (obj.activePoint.height / 2) };
        var p1 = { x: Math.cos(obj.rotatedAngle) * (obj.activePoint.startX - center.x) - Math.sin(obj.rotatedAngle)
                * (obj.activePoint.startY - center.y) + center.x,
            y: Math.sin(obj.rotatedAngle) * (obj.activePoint.startX - center.x) + Math.cos(obj.rotatedAngle) * (obj.activePoint.startY
                - center.y) + center.y };
        var p2 = { x: Math.cos(obj.rotatedAngle) * (obj.activePoint.endX - center.x) - Math.sin(obj.rotatedAngle) *
                (obj.activePoint.startY - center.y) + center.x,
            y: Math.sin(obj.rotatedAngle) * (obj.activePoint.endX - center.x) + Math.cos(obj.rotatedAngle) * (obj.activePoint.startY
                - center.y) + center.y };
        var p3 = { x: Math.cos(obj.rotatedAngle) * (obj.activePoint.startX - center.x) - Math.sin(obj.rotatedAngle) *
                (obj.activePoint.endY - center.y) + center.x,
            y: Math.sin(obj.rotatedAngle) * (obj.activePoint.startX - center.x) + Math.cos(obj.rotatedAngle) * (obj.activePoint.endY
                - center.y) + center.y };
        var p4 = { x: Math.cos(obj.rotatedAngle) * (obj.activePoint.endX - center.x) - Math.sin(obj.rotatedAngle) *
                (obj.activePoint.endY - center.y) + center.x,
            y: Math.sin(obj.rotatedAngle) * (obj.activePoint.endX - center.x) + Math.cos(obj.rotatedAngle) *
                (obj.activePoint.endY - center.y) + center.y };
        point.startX = p1.x;
        point.startY = p1.y;
        point.endX = p1.x;
        point.endY = p1.y;
        if (point.startX > p2.x) {
            point.startX = p2.x;
        }
        if (point.startX > p3.x) {
            point.startX = p3.x;
        }
        if (point.startX > p4.x) {
            point.startX = p4.x;
        }
        if (point.startY > p2.y) {
            point.startY = p2.y;
        }
        if (point.startY > p3.y) {
            point.startY = p3.y;
        }
        if (point.startY > p4.y) {
            point.startY = p4.y;
        }
        if (point.endX < p2.x) {
            point.endX = p2.x;
        }
        if (point.endX < p3.x) {
            point.endX = p3.x;
        }
        if (point.endX < p4.x) {
            point.endX = p4.x;
        }
        if (point.endY < p2.y) {
            point.endY = p2.y;
        }
        if (point.endY < p3.y) {
            point.endY = p3.y;
        }
        if (point.endY < p4.y) {
            point.endY = p4.y;
        }
        point.width = point.endX - point.startX;
        point.height = point.endY - point.startY;
        if (object) {
            object['activePoint'] = point;
        }
        return point;
    };
    return Shape;
}());
export { Shape };
