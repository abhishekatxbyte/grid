import { Browser, extend, getComponent, isBlazor, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Direction } from '../index';
import { hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
var Transform = /** @class */ (function () {
    function Transform(parent) {
        this.isReverseFlip = false; // True when rotate method is called from iteration
        this.disablePan = false; // auto enable / disable pan while zooming
        this.isReverseRotate = false; // True when rotate method is called from iteration
        this.flipColl = []; // To store flip order
        this.prevZoomValue = 1;
        this.cropDimension = { width: 0, height: 0 };
        this.isPreventSelect = false;
        this.parent = parent;
        this.addEventListener();
    }
    Transform.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    Transform.prototype.addEventListener = function () {
        this.parent.on('transform', this.transform, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    Transform.prototype.removeEventListener = function () {
        this.parent.off('transform', this.transform);
        this.parent.off('destroyed', this.destroy);
    };
    Transform.prototype.transform = function (args) {
        this.initTransformPvtVar();
        switch (args.prop) {
            case 'rotateImage':
                this.rotateImage(args.value['degree']);
                break;
            case 'flipImage':
                this.flipImage(args.value['direction']);
                break;
            case 'setDestPointsForFlipState':
                this.setDestPointsForFlipState();
                break;
            case 'zoomAction':
                this.zoomAction(args.value['zoomFactor'], args.value['zoomPoint']);
                break;
            case 'disableZoomOutBtn':
                this.disableZoomOutBtn(args.value['isZoomOut']);
                break;
            case 'rotatedFlip':
                this.rotatedFlip();
                break;
            case 'drawPannedImage':
                this.drawPannedImage(args.value['xDiff'], args.value['yDiff']);
                break;
            case 'drawPannImage':
                this.drawPannImage(args.value['point']);
                break;
            case 'performTransformation':
                this.performTransformation(args.value['text']);
                break;
            case 'updateTransform':
                this.updateTransform(args.value['text']);
                break;
            case 'rotatePan':
                this.rotatePan(args.value['isCropSelection'], args.value['isDefaultZoom']);
                break;
            case 'drawRotatedImage':
                this.drawRotatedImage(args.value['degree']);
                break;
            case 'limitPan':
                this.limitPan();
                break;
            case 'updateFlipActiveObj':
                this.updateFlipActiveObj(args.value['panRegion']);
                break;
            case 'resetZoom':
                this.resetZoom();
                break;
            case 'pan':
                this.pan(args.value['value']);
                break;
            case 'zoom':
                this.zoom(args.value['zoomFactor'], args.value['zoomPoint']);
                break;
            case 'setCurrPanRegion':
                this.setCurrPanRegion(args.value['region'], args.value['type'], args.value['obj']);
                break;
            case 'rotate':
                this.rotate(args.value['degree'], args.value['obj']);
                break;
            case 'flip':
                this.flip(args.value['direction']);
                break;
            case 'update':
                this.update();
                break;
            case 'calcMaxDimension':
                this.calcMaxDimension(args.value['width'], args.value['height'], args.value['obj']);
                break;
            case 'updatePanPoints':
                this.updatePanPoints(args.value['panRegion'], args.value['obj']);
                break;
            case 'getPanMove':
                args.value['obj']['panMove'] = this.panMove;
                break;
            case 'setPanMove':
                this.panMove = args.value['point'];
                break;
            case 'getTempPanMove':
                args.value['obj']['tempPanMove'] = this.tempPanMove;
                break;
            case 'setTempPanMove':
                this.tempPanMove = args.value['point'];
                break;
            case 'setReverseFlip':
                this.isReverseFlip = args.value['isReverseFlip'];
                break;
            case 'setDisablePan':
                this.disablePan = args.value['bool'];
                break;
            case 'setCurrDestinationPoint':
                this.currDestPoint = args.value['point'];
                this.currDestPoint.startX -= this.parent.cropObj.totalPannedPoint.x;
                this.currDestPoint.startY -= this.parent.cropObj.totalPannedPoint.y;
                break;
            case 'setReverseRotate':
                this.isReverseRotate = args.value['bool'];
                break;
            case 'getFlipColl':
                args.value['obj']['flipColl'] = this.flipColl;
                break;
            case 'setFlipColl':
                this.flipColl = args.value['flipColl'];
                break;
            case 'getPreviousZoomValue':
                args.value['obj']['previousZoomValue'] = this.prevZoomValue;
                break;
            case 'setPreviousZoomValue':
                this.prevZoomValue = args.value['previousZoomValue'];
                break;
            case 'getCropDimension':
                args.value['obj']['cropDimension'] = this.cropDimension;
                break;
            case 'setCropDimension':
                this.cropDimension.width = args.value['width'];
                this.cropDimension.height = args.value['height'];
                break;
            case 'getPreventSelect':
                args.value['obj']['bool'] = this.isPreventSelect;
                break;
            case 'setPreventSelect':
                this.isPreventSelect = args.value['bool'];
                break;
            case 'reset':
                this.reset();
                break;
        }
    };
    Transform.prototype.getModuleName = function () {
        return 'transform';
    };
    Transform.prototype.initTransformPvtVar = function () {
        if (this.parent.lowerCanvas) {
            this.lowerContext = this.parent.lowerCanvas.getContext('2d');
        }
        if (this.parent.upperCanvas) {
            this.upperContext = this.parent.upperCanvas.getContext('2d');
        }
    };
    Transform.prototype.reset = function () {
        this.zoomBtnHold = null;
        this.tempPanMove = null;
        this.panMove = null;
        this.disablePan = false;
        this.currDestPoint = null;
        this.isReverseRotate = false;
        this.flipColl = [];
        this.transCurrObj = null;
        this.prevZoomValue = 1;
        this.isPreventSelect = false;
    };
    Transform.prototype.rotateImage = function (degree) {
        var _this = this;
        var parent = this.parent;
        var transitionArgs = { cancel: false, previousDegree: parent.transform.degree,
            currentDegree: Math.abs(parent.transform.degree + degree) === 360 ? 0 : parent.transform.degree + degree };
        if (!this.isPreventSelect && isBlazor() && parent.events && parent.events.rotating.hasDelegate === true) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            parent.dotNetRef.invokeMethodAsync('RotateEventAsync', 'OnRotate', transitionArgs).then(function (args) {
                _this.rotateEvent(args, degree);
            });
        }
        else {
            if (!this.isPreventSelect) {
                parent.trigger('rotating', transitionArgs);
            }
            this.rotateEvent(transitionArgs, degree);
        }
    };
    Transform.prototype.rotateEvent = function (transitionArgs, degree) {
        var parent = this.parent;
        if (!transitionArgs.cancel) {
            var prevObj = void 0;
            if (isNullOrUndefined(this.transCurrObj)) {
                var object = { currObj: {} };
                parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                prevObj = object['currObj'];
                prevObj.objColl = extend([], parent.objColl, null, true);
                prevObj.pointColl = extend({}, parent.pointColl, null, true);
                prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
                var selPointCollObj = { selPointColl: null };
                parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                    value: { obj: selPointCollObj } });
                prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            }
            parent.afterCropActions.push(degree === 90 ? 'rotateRight' : 'rotateLeft');
            var splitWords = [];
            var activeObjShape = void 0;
            if (parent.activeObj.activePoint && parent.activeObj.shape) {
                if (parent.activeObj.shape !== undefined) {
                    splitWords = parent.activeObj.shape.split('-');
                }
                if (parent.currObjType.isCustomCrop || splitWords[0] === 'crop') {
                    activeObjShape = parent.currObjType.isCustomCrop ? 'custom' : splitWords[1];
                    parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
                    parent.objColl.push(parent.activeObj);
                    parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                }
            }
            parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                value: { x: null, y: null, isMouseDown: true } });
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            this.drawRotatedImage(degree);
            parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
            parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
            parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
            if (parent.isCircleCrop) {
                parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                    value: { context: this.lowerContext, isSave: null, isFlip: null } });
            }
            if (activeObjShape) {
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                parent.activeObj = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
                parent.objColl.pop();
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
            }
            parent.isUndoRedo = false;
            var obj = { collection: parent.rotateFlipColl };
            parent.notify('shape', { prop: 'alignRotateFlipColl', onPropertyChange: false,
                value: { collection: parent.rotateFlipColl, isRotateFlipCollection: true, obj: obj } });
            parent.rotateFlipColl = obj['collection'];
            if (parent.cropObj.activeObj.shape && !this.isPreventSelect) {
                this.isPreventSelect = true;
                parent.select('custom');
                this.isPreventSelect = false;
                parent.setProperties({ zoomSettings: { zoomFactor: 1 } }, true);
                this.prevZoomValue = parent.zoomSettings.zoomFactor;
            }
        }
    };
    Transform.prototype.drawRotatedImage = function (degree) {
        var parent = this.parent;
        if (degree === 0) {
            parent.transform.degree = 0;
        }
        else {
            parent.transform.degree += degree;
        }
        if (Math.abs(parent.transform.degree) === 360) {
            parent.transform.degree = 0;
        }
        parent.notify('draw', { prop: 'setDestPoints', onPropertyChange: false });
        var tempObjColl = extend([], parent.objColl, [], true);
        var tempActiveObj = extend({}, parent.activeObj, {}, true);
        parent.objColl = [];
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        if (!this.isReverseRotate) {
            parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
        }
        this.rotateDegree(degree);
        if (!this.isReverseRotate) {
            parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                value: { type: 'reverse', isPreventDestination: null, isRotatePan: null } });
            parent.rotateFlipColl.push(degree);
        }
        parent.objColl = extend([], tempObjColl, [], true);
        parent.activeObj = extend({}, tempActiveObj, {}, true);
        if (parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: null } });
        }
        parent.notify('shape', { prop: 'redrawObj', onPropertyChange: false, value: { degree: degree } });
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        if (degree > 0) {
            parent.notify('freehand-draw', { prop: 'rotateFhdColl', onPropertyChange: false });
        }
        else {
            for (var i = 0; i < 3; i++) {
                parent.notify('freehand-draw', { prop: 'rotateFhdColl', onPropertyChange: false });
            }
        }
        parent.notify('freehand-draw', { prop: 'freehandRedraw', onPropertyChange: false,
            value: { context: this.lowerContext, points: null } });
        this.updateCurrSelectionPoint(degree);
    };
    Transform.prototype.rotateDegree = function (degree) {
        var parent = this.parent;
        this.lowerContext.save();
        this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        this.lowerContext.translate(parent.lowerCanvas.width / 2, parent.lowerCanvas.height / 2);
        this.lowerContext.rotate(Math.PI / 180 * degree);
        this.lowerContext.translate(-parent.lowerCanvas.width / 2, -parent.lowerCanvas.height / 2);
        var temp = this.lowerContext.filter;
        this.parent.notify('filter', { prop: 'updateBrightFilter', onPropertyChange: false });
        this.lowerContext.drawImage(this.parent.baseImg, this.parent.img.srcLeft, this.parent.img.srcTop, this.parent.img.srcWidth, this.parent.img.srcHeight, this.parent.img.destLeft, this.parent.img.destTop, this.parent.img.destWidth, this.parent.img.destHeight);
        this.lowerContext.filter = temp;
        this.lowerContext.translate(parent.lowerCanvas.width / 2, parent.lowerCanvas.height / 2);
        this.lowerContext.rotate(Math.PI / 180 * -degree);
        this.lowerContext.translate(-parent.lowerCanvas.width / 2, -parent.lowerCanvas.height / 2);
        this.lowerContext.restore();
    };
    Transform.prototype.updateCurrSelectionPoint = function (degree) {
        var parent = this.parent;
        if (parent.currSelectionPoint && this.currDestPoint) {
            var activeObj = extend({}, parent.activeObj, {}, true);
            var objColl = extend([], parent.objColl, [], true);
            var srcPoints = { startX: parent.img.srcLeft, startY: parent.img.srcTop, width: parent.img.srcWidth,
                height: parent.img.srcHeight };
            var destPoints = { startX: parent.img.destLeft, startY: parent.img.destTop, width: parent.img.destWidth,
                height: parent.img.destHeight };
            parent.objColl = [];
            parent.objColl.push(extend({}, parent.currSelectionPoint, {}, true));
            if (isNullOrUndefined(parent.objColl[0].imageRatio)) {
                parent.activeObj = parent.objColl[0];
                parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
                parent.objColl[0] = parent.activeObj;
            }
            parent.img.srcLeft = 0;
            parent.img.srcTop = 0;
            parent.img.srcWidth = parent.baseImg.width;
            parent.img.srcHeight = parent.baseImg.height;
            parent.img.destLeft = this.currDestPoint.startX;
            parent.img.destTop = this.currDestPoint.startY;
            parent.img.destWidth = this.currDestPoint.width;
            parent.img.destHeight = this.currDestPoint.height;
            if (typeof (degree) === 'number') {
                parent.notify('draw', { prop: 'setDestPoints', onPropertyChange: false });
                parent.notify('draw', { prop: 'setClientTransDim', onPropertyChange: false,
                    value: { isPreventDimension: null } });
            }
            parent.notify('shape', { prop: 'redrawObj', onPropertyChange: false, value: { degree: degree } });
            parent.currSelectionPoint = extend({}, parent.objColl[0], {}, true);
            this.currDestPoint = { startX: parent.img.destLeft, startY: parent.img.destTop, width: parent.img.destWidth,
                height: parent.img.destHeight };
            parent.objColl = objColl;
            parent.activeObj = activeObj;
            parent.img.srcLeft = srcPoints.startX;
            parent.img.srcTop = srcPoints.startY;
            parent.img.srcWidth = srcPoints.width;
            parent.img.srcHeight = srcPoints.height;
            parent.img.destLeft = destPoints.startX;
            parent.img.destTop = destPoints.startY;
            parent.img.destWidth = destPoints.width;
            parent.img.destHeight = destPoints.height;
        }
    };
    Transform.prototype.flipImage = function (direction) {
        var _this = this;
        var parent = this.parent;
        var transitionArgs = { direction: direction, cancel: false,
            previousDirection: parent.toPascalCase(parent.transform.currFlipState) };
        if (!this.isPreventSelect && isBlazor() && parent.events && parent.events.flipping.hasDelegate === true) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            parent.dotNetRef.invokeMethodAsync('FlipEventAsync', 'OnFlip', transitionArgs).then(function (args) {
                _this.flipEvent(args, direction);
            });
        }
        else {
            if (!this.isPreventSelect) {
                parent.trigger('flipping', transitionArgs);
            }
            this.flipEvent(transitionArgs, direction);
        }
    };
    Transform.prototype.flipEvent = function (transitionArgs, direction) {
        var parent = this.parent;
        if (transitionArgs.cancel) {
            return;
        }
        var prevObj;
        if (isNullOrUndefined(this.transCurrObj)) {
            var object = { currObj: {} };
            parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
            prevObj = object['currObj'];
            prevObj.objColl = extend([], parent.objColl, null, true);
            prevObj.pointColl = extend({}, parent.pointColl, null, true);
            prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
            var selPointCollObj = { selPointColl: null };
            parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                value: { obj: selPointCollObj } });
            prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        }
        parent.afterCropActions.push(direction.toLowerCase() === 'horizontal' ? 'horizontalflip' : 'verticalflip');
        var splitWords = [];
        var activeObjShape;
        if (parent.activeObj.activePoint) {
            if (parent.activeObj.shape !== undefined) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (parent.currObjType.isCustomCrop || splitWords[0] === 'crop') {
                activeObjShape = parent.currObjType.isCustomCrop ? 'custom' : splitWords[1];
                parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
                parent.objColl.push(parent.activeObj);
                parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            }
        }
        parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
            value: { x: null, y: null, isMouseDown: true } });
        parent.clearContext(this.lowerContext);
        parent.clearContext(this.upperContext);
        var tempObjColl = extend([], parent.objColl, [], true);
        var tempActiveObj = extend({}, parent.activeObj, {}, true);
        parent.objColl = [];
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        if (!this.isReverseFlip) {
            parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
        }
        var lowercaseDirection = direction.toLowerCase();
        this.updateFlipState(lowercaseDirection);
        if (lowercaseDirection === 'horizontal') {
            parent.transform.currFlipState = (parent.transform.currFlipState.toLowerCase() === 'horizontal') ? '' : 'horizontal';
        }
        else {
            parent.transform.currFlipState = (parent.transform.currFlipState.toLowerCase() === 'vertical') ? '' : 'vertical';
        }
        var selObj = { isSelected: null };
        parent.notify('draw', { prop: 'getRotatedFlipCropSelection', onPropertyChange: false, value: { bool: selObj } });
        if (selObj['isSelected']) {
            parent.img.destLeft += parent.panPoint.totalPannedInternalPoint.x;
            parent.img.destTop += parent.panPoint.totalPannedInternalPoint.y;
        }
        var temp = this.lowerContext.filter;
        parent.notify('filter', { prop: 'updateBrightFilter', onPropertyChange: false });
        this.lowerContext.drawImage(parent.baseImg, parent.img.srcLeft, parent.img.srcTop, parent.img.srcWidth, parent.img.srcHeight, parent.img.destLeft, parent.img.destTop, parent.img.destWidth, parent.img.destHeight);
        this.lowerContext.filter = temp;
        parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
        this.updateFlipState(direction.toLowerCase());
        if (!this.isReverseFlip) {
            parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                value: { type: 'reverse', isPreventDestination: null, isRotatePan: null } });
            this.updateFlipColl(direction.toLocaleLowerCase());
            parent.rotateFlipColl.push(direction.toLowerCase());
        }
        if (parent.rotateFlipColl.length === 1) {
            var panObj = { panRegion: '' };
            parent.notify('crop', { prop: 'getCurrFlipState', onPropertyChange: false,
                value: { panObj: panObj } });
            if (panObj['panRegion'] === '') {
                parent.notify('draw', { prop: 'setClientTransDim', onPropertyChange: false,
                    value: { isPreventDimension: null } });
            }
            else {
                this.setDestPointsForFlipState();
            }
        }
        if (parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: null } });
        }
        parent.objColl = extend([], tempObjColl, [], true);
        parent.activeObj = extend({}, tempActiveObj, {}, true);
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            var flipObjColl = parent.objColl[i].flipObjColl;
            if (flipObjColl.length === 0) {
                flipObjColl.push(direction);
            }
            else if (flipObjColl[flipObjColl.length - 1] === direction) {
                flipObjColl.pop();
            }
            else {
                flipObjColl.push(direction);
            }
        }
        parent.notify('shape', { prop: 'redrawObj', onPropertyChange: false, value: { degree: direction.toLowerCase() } });
        var tempFilter = this.lowerContext.filter;
        this.lowerContext.filter = 'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
            'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' + 'grayscale(0%) ' + 'invert(0%)';
        parent.notify('shape', { prop: 'iterateObjColl', onPropertyChange: false });
        if (direction.toLowerCase() === 'horizontal' || direction.toLowerCase() === 'vertical') {
            parent.notify('freehand-draw', { prop: 'flipFHDColl', onPropertyChange: false,
                value: { value: direction.toLowerCase() } });
            parent.notify('freehand-draw', { prop: 'freehandRedraw', onPropertyChange: false,
                value: { context: this.lowerContext, points: null } });
        }
        else {
            parent.notify('freehand-draw', { prop: 'freehandRedraw', onPropertyChange: false,
                value: { context: this.lowerContext, points: null } });
        }
        this.lowerContext.filter = tempFilter;
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        this.updateCurrSelectionPoint(direction.toLowerCase());
        parent.isUndoRedo = false;
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
        if (parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: null } });
        }
        if (activeObjShape) {
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            parent.activeObj = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
            parent.objColl.pop();
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
        }
        var obj = { collection: parent.rotateFlipColl };
        parent.notify('shape', { prop: 'alignRotateFlipColl', onPropertyChange: false,
            value: { collection: parent.rotateFlipColl, isRotateFlipCollection: true, obj: obj } });
        parent.rotateFlipColl = obj['collection'];
        if (parent.cropObj.activeObj.shape && !this.isPreventSelect) {
            this.isPreventSelect = true;
            parent.select('custom');
            this.isPreventSelect = false;
            parent.setProperties({ zoomSettings: { zoomFactor: 1 } }, true);
            this.prevZoomValue = parent.zoomSettings.zoomFactor;
        }
    };
    Transform.prototype.updateFlipState = function (direction) {
        var degree = this.parent.transform.degree;
        if (direction === 'horizontal') {
            if (degree % 90 === 0 && degree % 180 !== 0) {
                this.verticalFlip();
            }
            else {
                this.horizontalFlip();
            }
        }
        else if (direction === 'vertical') {
            if (degree % 90 === 0 && degree % 180 !== 0) {
                this.horizontalFlip();
            }
            else {
                this.verticalFlip();
            }
        }
    };
    Transform.prototype.horizontalFlip = function () {
        this.lowerContext.translate(this.lowerContext.canvas.width, 0);
        this.lowerContext.scale(-1, 1);
        this.upperContext.translate(this.upperContext.canvas.width, 0);
        this.upperContext.scale(-1, 1);
    };
    Transform.prototype.verticalFlip = function () {
        this.lowerContext.translate(0, this.lowerContext.canvas.height);
        this.lowerContext.scale(1, -1);
        this.upperContext.translate(0, this.upperContext.canvas.height);
        this.upperContext.scale(1, -1);
    };
    Transform.prototype.updateFlipColl = function (direction) {
        if (this.isPreventSelect) {
            return;
        }
        if (this.flipColl.length === 0 || this.flipColl[this.flipColl.length - 1] !== direction) {
            this.flipColl.push(direction);
        }
        else {
            this.flipColl.pop();
        }
        if (this.flipColl.length >= 4) {
            var lastFourItems = this.flipColl.slice(-4);
            if ((lastFourItems[0] === 'horizontal' && lastFourItems[1] === 'vertical' &&
                lastFourItems[2] === 'horizontal' && lastFourItems[3] === 'vertical') ||
                (lastFourItems[0] === 'vertical' && lastFourItems[1] === 'horizontal' &&
                    lastFourItems[2] === 'vertical' && lastFourItems[3] === 'horizontal')) {
                this.flipColl.splice(-4);
            }
        }
    };
    Transform.prototype.setDestPointsForFlipState = function () {
        var parent = this.parent;
        var panObj = { panRegion: '' };
        parent.notify('crop', { prop: 'getCurrFlipState', onPropertyChange: false,
            value: { panObj: panObj } });
        if (panObj['panRegion'] !== '') {
            if (panObj['panRegion'] === 'horizontal') {
                parent.img.destLeft = parent.lowerCanvas.clientWidth - (parent.img.destWidth + parent.img.destLeft);
            }
            else if (panObj['panRegion'] === 'vertical') {
                parent.img.destTop = parent.lowerCanvas.clientHeight - (parent.img.destHeight + parent.img.destTop);
            }
            else {
                parent.img.destLeft = parent.lowerCanvas.clientWidth - (parent.img.destWidth + parent.img.destLeft);
                parent.img.destTop = parent.lowerCanvas.clientHeight - (parent.img.destHeight + parent.img.destTop);
            }
        }
    };
    Transform.prototype.zoomAction = function (zoomFactor, zoomPoint) {
        var _this = this;
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            if (parent.zoomSettings.zoomFactor >= parent.zoomSettings.maxZoomFactor && zoomFactor > 0 ||
                (parent.zoomSettings.zoomFactor > parent.zoomSettings.minZoomFactor && zoomFactor < 0 && this.disableZoomOutBtn(true)) ||
                (parent.zoomSettings.zoomFactor <= parent.zoomSettings.minZoomFactor && zoomFactor < 0)) {
                if (!isBlazor()) {
                    parent.notify('toolbar', { prop: 'zoom-up-handler', onPropertyChange: false });
                }
                return;
            }
            parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
            var tempZoomFactor = zoomFactor;
            zoomFactor = tempZoomFactor > 0 ? 0.1 : -0.1;
            for (var i = 0; i < Math.abs(tempZoomFactor / 0.1); i++) {
                if (this.prevZoomValue === 1) {
                    this.prevZoomValue += zoomFactor > 0 ? zoomFactor * 10 : (zoomFactor * 10) / 10;
                }
                else if (this.prevZoomValue > 1) {
                    this.prevZoomValue += (zoomFactor * 10);
                }
                else if (this.prevZoomValue < 1) {
                    this.prevZoomValue += (zoomFactor * 10) / 10;
                    var powerOften = Math.pow(10, 1);
                    this.prevZoomValue = (Math.round(this.prevZoomValue * powerOften) / powerOften);
                }
            }
            zoomFactor = tempZoomFactor;
            parent.setProperties({ zoomSettings: { zoomFactor: this.prevZoomValue } }, true);
            var splitWords = void 0;
            this.tempActiveObj = null;
            this.isShape = false;
            if (parent.activeObj.shape !== undefined) {
                if (parent.activeObj.shape === 'shape') {
                    parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                }
                else {
                    splitWords = parent.activeObj.shape.split('-');
                }
            }
            if (splitWords !== undefined && splitWords[0] === 'crop') {
                this.tempActiveObj = extend({}, parent.activeObj, {}, true);
                parent.isCropTab = true;
            }
            else if (parent.activeObj.shape && splitWords[0] !== 'crop') {
                this.isShape = true;
            }
            var obj = { zoomType: null };
            parent.notify('selection', { prop: 'getZoomType', onPropertyChange: false, value: { obj: obj } });
            if (isNullOrUndefined(zoomPoint)) {
                if (parent.isCropTab && this.tempActiveObj) {
                    zoomPoint = { x: parent.activeObj.activePoint.startX + (parent.activeObj.activePoint.width / 2),
                        y: parent.activeObj.activePoint.startY + (parent.activeObj.activePoint.height / 2) };
                }
                else {
                    zoomPoint = { x: parent.lowerCanvas.clientWidth / 2, y: parent.lowerCanvas.clientHeight / 2 };
                }
                if (obj['zoomType'] === 'MouseWheel' || obj['zoomType'] === 'Pinch') {
                    zoomPoint = { x: parent.zoomSettings.zoomPoint.x, y: parent.zoomSettings.zoomPoint.y };
                }
            }
            var previousZoomFactor = parent.zoomSettings.zoomFactor - (zoomFactor * 10);
            var zoomEventArgs = { zoomPoint: zoomPoint, cancel: false, previousZoomFactor: previousZoomFactor,
                currentZoomFactor: parent.zoomSettings.zoomFactor, zoomTrigger: obj['zoomType'] };
            if (!parent.isCropToolbar && isBlazor() && parent.events && parent.events.zooming.hasDelegate === true) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                parent.dotNetRef.invokeMethodAsync('ZoomEventAsync', 'OnZoom', zoomEventArgs).then(function (args) {
                    _this.zoomEvent(args, zoomFactor);
                });
            }
            else {
                if (!parent.isCropToolbar) {
                    parent.trigger('zooming', zoomEventArgs);
                }
                this.zoomEvent(zoomEventArgs, zoomFactor);
            }
        }
    };
    Transform.prototype.zoomEvent = function (zoomEventArgs, zoomFactor) {
        var parent = this.parent;
        if (zoomEventArgs.cancel) {
            return;
        }
        if (!isBlazor()) {
            parent.notify('toolbar', { prop: 'close-contextual-toolbar', onPropertyChange: false });
        }
        else if (parent.element.querySelector('.e-contextual-toolbar-wrapper') && !parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.contains('e-hidden')) {
            parent.updateToolbar(parent.element, 'closeContextualToolbar');
        }
        parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
            value: { x: null, y: null, isMouseDown: true } });
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        this.upperContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        var object = { canvasFilter: this.parent.canvasFilter };
        this.lowerContext.filter = object['canvasFilter'];
        parent.upperCanvas.style.cursor = parent.cursor = 'default';
        var objColl = extend([], parent.objColl, [], true);
        if (!parent.isCropTab) {
            if (parent.transform.degree !== 0) {
                parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                    value: { x: null, y: null, isMouseDown: null } });
                parent.panPoint.currentPannedPoint = { x: 0, y: 0 };
                this.rotatePan(true, true);
            }
            else if (parent.transform.currFlipState !== '') {
                parent.panPoint.totalPannedPoint = { x: 0, y: 0 };
            }
            parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false });
        }
        if (parent.transform.degree === 0) {
            this.drawZoomImgToCanvas(zoomFactor, this.tempActiveObj);
            var panObj_1 = { panRegion: '' };
            parent.notify('crop', { prop: 'getCurrFlipState', onPropertyChange: false,
                value: { panObj: panObj_1 } });
            if (panObj_1['panRegion'] !== '') {
                parent.notify('crop', { prop: 'setTempFlipPanPoint', onPropertyChange: false, value: { point: parent.panPoint.totalPannedPoint, isAdd: true } });
                objColl = extend([], parent.objColl, [], true);
                parent.objColl = [];
                var destLeft = parent.img.destLeft;
                var destTop = parent.img.destTop;
                this.setDestPointsForFlipState();
                this.rotatedFlip();
                parent.img.destLeft = destLeft;
                parent.img.destTop = destTop;
                parent.objColl = objColl;
                parent.notify('shape', { prop: 'zoomObjColl', onPropertyChange: false, value: { isPreventApply: null } });
                parent.notify('freehand-draw', { prop: 'zoomFHDColl', onPropertyChange: false, value: { isPreventApply: null } });
                parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false });
            }
            if (parent.zoomSettings.zoomFactor <= parent.zoomSettings.minZoomFactor && !parent.isCropTab) {
                parent.panPoint.totalPannedPoint = { x: 0, y: 0 };
            }
        }
        else {
            parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false });
            parent.panPoint.totalPannedClientPoint = { x: 0, y: 0 };
            parent.panPoint.totalPannedInternalPoint = { x: 0, y: 0 };
            this.rotateZoom(zoomFactor);
            var panObj_2 = { panRegion: '' };
            parent.notify('crop', { prop: 'getCurrFlipState', onPropertyChange: false,
                value: { panObj: panObj_2 } });
            if (panObj_2['panRegion'] !== '') {
                var temp = this.lowerContext.filter;
                this.lowerContext.filter = 'none';
                parent.notify('shape', { prop: 'zoomObjColl', onPropertyChange: false, value: { isPreventApply: null } });
                parent.notify('freehand-draw', { prop: 'zoomFHDColl', onPropertyChange: false, value: { isPreventApply: null } });
                this.lowerContext.filter = temp;
            }
        }
        var powerOften = Math.pow(10, 1);
        if (parent.zoomSettings.zoomFactor <= parent.zoomSettings.minZoomFactor ||
            (Math.round(parent.transform.zoomFactor * powerOften) / powerOften) === 2) {
            clearInterval(this.zoomBtnHold);
            this.zoomBtnHold = 0;
        }
        var panObj = { panRegion: '' };
        parent.notify('crop', { prop: 'getCurrFlipState', onPropertyChange: false,
            value: { panObj: panObj } });
        if (panObj['panRegion'] === '') {
            var temp = this.lowerContext.filter;
            this.lowerContext.filter = 'none';
            parent.notify('shape', { prop: 'zoomObjColl', onPropertyChange: false, value: { isPreventApply: null } });
            parent.notify('freehand-draw', { prop: 'zoomFHDColl', onPropertyChange: false, value: { isPreventApply: null } });
            this.lowerContext.filter = temp;
        }
        if ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: null } });
        }
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        if (this.tempActiveObj) {
            parent.activeObj = extend({}, this.tempActiveObj, {}, true);
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
            if (parent.zoomSettings.zoomFactor <= parent.zoomSettings.minZoomFactor) {
                parent.currSelectionPoint = null;
            }
        }
        parent.isUndoRedo = false;
        var zoomOut;
        if (!isBlazor()) {
            zoomOut = document.querySelector('#' + parent.element.id + '_zoomOut');
            if (zoomOut && parent.zoomSettings.zoomFactor <= parent.zoomSettings.minZoomFactor) {
                zoomOut.classList.add('e-disabled');
                zoomOut.parentElement.classList.add('e-overlay');
            }
            else if (zoomOut) {
                zoomOut.classList.remove('e-disabled');
                zoomOut.parentElement.classList.remove('e-overlay');
            }
        }
        else {
            zoomOut = parent.element.querySelector('#zoomout');
            if (zoomOut && parent.zoomSettings.zoomFactor <= parent.zoomSettings.minZoomFactor) {
                zoomOut.classList.add('e-overlay');
            }
            else if (zoomOut) {
                zoomOut.classList.remove('e-overlay');
            }
        }
        this.autoEnablePan();
        if (this.tempActiveObj) {
            parent.activeObj = extend({}, this.tempActiveObj, {}, true);
        }
        if (parent.activeObj.shape === 'crop-custom') {
            parent.currObjType.isCustomCrop = true;
        }
        var panBtn = parent.element.querySelector('.e-img-pan .e-btn');
        if (panBtn && parent.togglePan) {
            panBtn.classList.add('e-selected-btn');
        }
        else if (panBtn) {
            panBtn.classList.remove('e-selected-btn');
        }
        if (this.isShape) {
            parent.activeObj = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
            parent.objColl.pop();
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj, isCropRatio: null,
                    points: null, isPreventDrag: true, saveContext: null, isPreventSelection: null } });
            if (!isBlazor()) {
                parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
                parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
            }
        }
        if (!isBlazor()) {
            parent.notify('toolbar', { prop: 'enable-disable-btns', onPropertyChange: false });
        }
        else {
            parent.updateToolbar(parent.element, 'enableDisableToolbarBtn');
        }
        parent.notify('selection', { prop: 'setZoomType', onPropertyChange: false, value: { zoomType: 'Toolbar' } });
    };
    Transform.prototype.disableZoomOutBtn = function (isZoomOut) {
        var parent = this.parent;
        var isDisabled = false;
        var zoomOut;
        if (!isNullOrUndefined(isZoomOut)) {
            parent.transform.zoomFactor -= 0.1;
        }
        if (!isBlazor()) {
            zoomOut = document.querySelector('#' + parent.element.id + '_zoomOut');
        }
        else {
            zoomOut = this.parent.element.querySelector('#zoomout');
        }
        var destLeft = parent.img.destLeft;
        var destTop = parent.img.destTop;
        var destWidth = parent.img.destWidth;
        var destHeight = parent.img.destHeight;
        if (parent.activeObj.shape) {
            this.setZoomDimension(-0.1, parent.activeObj);
            if (!isNullOrUndefined(zoomOut)) {
                if (parent.img.destLeft > parent.activeObj.activePoint.startX || parent.img.destTop > parent.activeObj.activePoint.startY
                    || parent.img.destLeft + parent.img.destWidth < parent.activeObj.activePoint.endX || parent.img.destTop +
                    parent.img.destHeight < parent.activeObj.activePoint.endY || parent.zoomSettings.zoomFactor ===
                    parent.zoomSettings.minZoomFactor) {
                    if (!isBlazor()) {
                        zoomOut.classList.add('e-disabled');
                        zoomOut.parentElement.classList.add('e-overlay');
                    }
                    else {
                        zoomOut.classList.add('e-overlay');
                    }
                    isDisabled = true;
                }
                else {
                    if (!isBlazor()) {
                        zoomOut.classList.remove('e-disabled');
                        zoomOut.parentElement.classList.remove('e-overlay');
                    }
                    else {
                        zoomOut.classList.remove('e-overlay');
                    }
                    isDisabled = false;
                }
            }
        }
        else {
            this.setZoomDimension(-0.1, null);
        }
        if (!isNullOrUndefined(isZoomOut)) {
            parent.transform.zoomFactor += 0.1;
        }
        parent.img.destLeft = destLeft;
        parent.img.destTop = destTop;
        parent.img.destWidth = destWidth;
        parent.img.destHeight = destHeight;
        return isDisabled;
    };
    Transform.prototype.drawZoomImgToCanvas = function (value, selectionObj) {
        var parent = this.parent;
        var powerOften = Math.pow(10, 1);
        if ((Math.round(parent.transform.zoomFactor * powerOften) / powerOften) === 0.1 && value === -0.1) {
            parent.transform.zoomFactor = 0;
        }
        else {
            parent.transform.zoomFactor += value;
        }
        parent.transform[parent.isCropTab ? 'cropZoomFactor' : 'defaultZoomFactor'] = parent.transform.zoomFactor;
        var maxDimension = { width: 0, height: 0 };
        if (parent.isCropTab) {
            maxDimension = this.cropZoom(value, selectionObj);
        }
        else {
            maxDimension = this.calcMaxDimension(parent.img.srcWidth, parent.img.srcHeight);
            maxDimension.width += (maxDimension.width * parent.transform.zoomFactor);
            maxDimension.height += (maxDimension.height * parent.transform.zoomFactor);
            parent.img.destLeft = (parent.lowerCanvas.clientWidth - maxDimension.width) / 2;
            parent.img.destTop = (parent.lowerCanvas.clientHeight - maxDimension.height) / 2;
        }
        parent.notify('draw', { prop: 'draw-image-to-canvas', value: { dimension: maxDimension } });
        maxDimension.width = this.cropDimension.width;
        maxDimension.height = this.cropDimension.height;
        maxDimension.width += (maxDimension.width * parent.transform.zoomFactor);
        maxDimension.height += (maxDimension.height * parent.transform.zoomFactor);
        parent.notify('draw', { prop: 'setZoomCropWidth', value: { width: maxDimension.width, height: maxDimension.height } });
    };
    Transform.prototype.rotatedFlip = function () {
        var parent = this.parent;
        this.isReverseFlip = true;
        var tempCurrFlipState = parent.transform.currFlipState;
        var tempFlipColl = this.flipColl;
        var tempObjColl = extend([], parent.objColl, [], true);
        var tempActiveObj = extend({}, parent.activeObj, {}, true);
        this.flipColl = [];
        parent.objColl = [];
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        parent.notify('draw', { prop: 'currTransState', onPropertyChange: false,
            value: { type: 'initial', isPreventDestination: null, context: null, isPreventCircleCrop: null } });
        var temp = this.lowerContext.filter;
        parent.notify('filter', { prop: 'updateBrightFilter', onPropertyChange: false });
        this.lowerContext.drawImage(parent.baseImg, parent.img.srcLeft, parent.img.srcTop, parent.img.srcWidth, parent.img.srcHeight, parent.img.destLeft, parent.img.destTop, parent.img.destWidth, parent.img.destHeight);
        this.lowerContext.filter = temp;
        parent.notify('draw', { prop: 'currTransState', onPropertyChange: false,
            value: { type: 'reverse', isPreventDestination: true, context: null, isPreventCircleCrop: null } });
        if (tempCurrFlipState === '' && parent.transform.currFlipState !== '') {
            tempCurrFlipState = parent.transform.currFlipState;
        }
        parent.transform.currFlipState = tempCurrFlipState;
        this.flipColl = tempFlipColl;
        parent.objColl = extend([], tempObjColl, [], true);
        this.lowerContext.filter = 'none';
        parent.notify('shape', { prop: 'iterateObjColl', onPropertyChange: false });
        this.lowerContext.filter = temp;
        if (tempActiveObj.activePoint.width !== 0) {
            parent.activeObj = extend({}, tempActiveObj, {}, true);
        }
        this.isReverseFlip = false;
    };
    Transform.prototype.rotateZoom = function (value) {
        var parent = this.parent;
        var powerOften = Math.pow(10, 1);
        if ((Math.round(parent.transform.zoomFactor * powerOften) / powerOften) === 0.1 && value === -0.1) {
            parent.transform.zoomFactor = 0;
        }
        else {
            parent.transform.zoomFactor += value;
        }
        if (parent.isCropTab) {
            parent.transform.cropZoomFactor = parent.transform.zoomFactor;
        }
        else {
            parent.transform.defaultZoomFactor = parent.transform.zoomFactor;
        }
        var tempObjColl = extend([], parent.objColl, [], true);
        var tempActiveObj = extend({}, parent.activeObj, {}, true);
        parent.objColl = [];
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
            value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
        parent.notify('draw', { prop: 'setRotateZoom', onPropertyChange: false, value: { isRotateZoom: true } });
        parent.notify('draw', { prop: 'setDestPoints', onPropertyChange: false });
        var temp = this.lowerContext.filter;
        parent.notify('filter', { prop: 'updateBrightFilter', onPropertyChange: false });
        this.lowerContext.drawImage(parent.baseImg, parent.img.srcLeft, parent.img.srcTop, parent.img.srcWidth, parent.img.srcHeight, parent.img.destLeft, parent.img.destTop, parent.img.destWidth, parent.img.destHeight);
        this.lowerContext.filter = temp;
        parent.notify('draw', { prop: 'setRotateZoom', onPropertyChange: false, value: { isRotateZoom: false } });
        parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
            value: { type: 'reverse', isPreventDestination: null, isRotatePan: null } });
        parent.objColl = tempObjColl;
        parent.activeObj = tempActiveObj;
        var maxDimension = { width: this.cropDimension.width, height: this.cropDimension.height };
        maxDimension.width += (maxDimension.width * parent.transform.zoomFactor);
        maxDimension.height += (maxDimension.height * parent.transform.zoomFactor);
        parent.notify('draw', { prop: 'setZoomCropWidth', value: { width: maxDimension.width, height: maxDimension.height } });
    };
    Transform.prototype.autoEnablePan = function () {
        if (this.parent.transform.zoomFactor <= 0) {
            this.parent.togglePan = false;
            this.parent.notify('selection', { prop: 'setDragCanvas', value: { bool: false } });
            this.parent.pan(false);
            this.disablePan = false;
        }
        else {
            this.parent.pan(!this.disablePan);
        }
    };
    Transform.prototype.cropZoom = function (value, selectionObj) {
        var parent = this.parent;
        var destLeft = parent.img.destLeft;
        var destTop = parent.img.destTop;
        var maxDimension = { width: 0, height: 0 };
        if (parent.img.srcLeft === 0 || parent.img.srcTop === 0) {
            if (isNullOrUndefined(selectionObj)) {
                maxDimension = this.setZoomDimension(value, null);
            }
            else {
                maxDimension = this.setZoomDimension(value, selectionObj);
            }
        }
        else {
            if (parent.transform.degree % 90 === 0 && parent.transform.degree % 180 !== 0) {
                maxDimension = this.calcMaxDimension(parent.img.srcHeight, parent.img.srcWidth);
            }
            else {
                maxDimension = this.calcMaxDimension(parent.img.srcWidth, parent.img.srcHeight);
            }
            maxDimension.width += (maxDimension.width * parent.transform.zoomFactor);
            maxDimension.height += (maxDimension.height * parent.transform.zoomFactor);
        }
        parent.img.destLeft = destLeft - ((maxDimension.width - parent.img.destWidth) / 2);
        parent.img.destTop = destTop - ((maxDimension.height - parent.img.destHeight) / 2);
        destLeft = parent.img.destLeft;
        destTop = parent.img.destTop;
        if (selectionObj) {
            if (parent.img.destLeft > selectionObj.activePoint.startX) {
                parent.img.destLeft = selectionObj.activePoint.startX;
                if (parent.transform.degree === 0) {
                    parent.panPoint.totalPannedPoint.x -= (destLeft - parent.img.destLeft);
                }
            }
            if (parent.img.destTop > selectionObj.activePoint.startY) {
                parent.img.destTop = selectionObj.activePoint.startY;
                if (parent.transform.degree === 0) {
                    parent.panPoint.totalPannedPoint.y -= (destTop - parent.img.destTop);
                }
            }
            if (parent.img.destLeft + maxDimension.width < selectionObj.activePoint.endX) {
                parent.img.destLeft = selectionObj.activePoint.endX - maxDimension.width;
                if (parent.transform.degree === 0) {
                    parent.panPoint.totalPannedPoint.x -= (destLeft - parent.img.destLeft);
                }
            }
            if (parent.img.destTop + maxDimension.height < selectionObj.activePoint.endY) {
                parent.img.destTop = selectionObj.activePoint.endY - maxDimension.height;
                if (parent.transform.degree === 0) {
                    parent.panPoint.totalPannedPoint.y -= (destTop - parent.img.destTop);
                }
            }
        }
        return maxDimension;
    };
    Transform.prototype.setZoomDimension = function (value, selectionObj) {
        var parent = this.parent;
        var maxDimension = { width: 0, height: 0 };
        if (parent.transform.degree % 90 === 0 && parent.transform.degree % 180 !== 0) {
            maxDimension = this.calcMaxDimension(parent.img.srcHeight, parent.img.srcWidth);
        }
        else {
            maxDimension = this.calcMaxDimension(parent.img.srcWidth, parent.img.srcHeight);
        }
        maxDimension.width += (maxDimension.width * parent.transform.zoomFactor);
        maxDimension.height += (maxDimension.height * parent.transform.zoomFactor);
        parent.img.destLeft += ((parent.img.destWidth - maxDimension.width) / 2);
        parent.img.destTop += ((parent.img.destHeight - maxDimension.height) / 2);
        // While zoom out limit image to draw inside the selection range
        if (value < 0 && selectionObj) {
            var startX = selectionObj.activePoint.startX;
            var startY = selectionObj.activePoint.startY;
            var width = selectionObj.activePoint.width;
            var height = selectionObj.activePoint.height;
            var maxDestLeft = parent.img.destLeft + maxDimension.width;
            var maxDestTop = parent.img.destTop + maxDimension.height;
            if (parent.img.destLeft > startX) {
                parent.img.destLeft = startX;
            }
            if (parent.img.destTop > startY) {
                parent.img.destTop = startY;
            }
            if (maxDestLeft < startX + width) {
                parent.img.destLeft = startX + width - maxDimension.width;
            }
            if (maxDestTop < startY + height) {
                parent.img.destTop = startY + height - maxDimension.height;
            }
        }
        else if (value < 0 && isNullOrUndefined(selectionObj)) {
            if (parent.img.destLeft > 0) {
                parent.img.destLeft = 0;
            }
            if (parent.img.destTop > 0) {
                parent.img.destTop = 0;
            }
            if (parent.img.destLeft + maxDimension.width < parent.lowerCanvas.width) {
                parent.img.destLeft = parent.lowerCanvas.width - parent.img.destWidth;
            }
            if (parent.img.destTop + maxDimension.height < parent.lowerCanvas.height) {
                parent.img.destTop = parent.lowerCanvas.height - parent.img.destHeight;
            }
        }
        return maxDimension;
    };
    Transform.prototype.drawPannedImage = function (xDiff, yDiff) {
        var _this = this;
        var parent = this.parent;
        var obj = { panDown: null };
        parent.notify('selection', { prop: 'getPanDown', onPropertyChange: false, value: { obj: obj } });
        var panEventArgs = { startPoint: obj['panDown'], endPoint: this.panMove, cancel: false };
        if (isBlazor() && isNullOrUndefined(this.parent.eventType) && parent.events && parent.events.onPanStart.hasDelegate === true) {
            this.parent.eventType = 'pan';
            this.parent.panEventArgs = panEventArgs;
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            parent.dotNetRef.invokeMethodAsync('PanEventAsync', 'OnPanStart', panEventArgs).then(function (args) {
                _this.panEvent(args, xDiff, yDiff);
            });
        }
        else {
            parent.trigger('panning', panEventArgs);
            this.panEvent(panEventArgs, xDiff, yDiff);
        }
    };
    Transform.prototype.panEvent = function (panEventArgs, xDiff, yDiff) {
        if (panEventArgs.cancel) {
            return;
        }
        var parent = this.parent;
        var isObjCreated = false;
        if (parent.activeObj.shape && parent.activeObj.shape === 'shape') {
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        }
        if (isNullOrUndefined(parent.activeObj.shape)) {
            isObjCreated = true;
            parent.activeObj.activePoint = { startX: parent.img.destLeft, startY: parent.img.destTop,
                endX: parent.img.destLeft + parent.img.destWidth, endY: parent.img.destTop + parent.img.destHeight };
            var startX = parent.activeObj.activePoint.startX;
            var startY = parent.activeObj.activePoint.startY;
            var endX = parent.activeObj.activePoint.endX;
            var endY = parent.activeObj.activePoint.endY;
            if (startX < 0) {
                parent.activeObj.activePoint.startX = 0;
            }
            if (startY < 0) {
                parent.activeObj.activePoint.startY = 0;
            }
            if (endX > parent.lowerCanvas.width) {
                parent.activeObj.activePoint.endX =
                    parent.lowerCanvas.width;
            }
            if (endY > parent.lowerCanvas.height) {
                parent.activeObj.activePoint.endY =
                    parent.lowerCanvas.height;
            }
            parent.activeObj.activePoint.width = parent.activeObj.activePoint.endX - parent.activeObj.activePoint.startX;
            parent.activeObj.activePoint.height = parent.activeObj.activePoint.endY - parent.activeObj.activePoint.startY;
            parent.activeObj.shape = 'crop-custom';
            var obj = { strokeSettings: {} };
            parent.notify('shape', { prop: 'getStrokeSettings', onPropertyChange: false,
                value: { obj: obj } });
            parent.activeObj.strokeSettings = obj['strokeSettings'];
            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: parent.activeObj.activePoint, obj: parent.activeObj,
                    isMouseMove: null, x: null, y: null } });
            parent.isCropTab = true;
        }
        if (parent.transform.degree === 0) {
            var point = void 0;
            if (isNullOrUndefined(xDiff) && isNullOrUndefined(yDiff)) {
                point = this.updatePanPoints('');
            }
            else {
                point = { x: xDiff, y: yDiff };
            }
            parent.panPoint.totalPannedPoint.x += point.x;
            parent.panPoint.totalPannedPoint.y += point.y;
            var tempSelectionObj = extend({}, parent.activeObj, {}, true);
            var temp = this.lowerContext.filter;
            this.drawPannImage(point);
            this.lowerContext.filter = temp;
            this.tempPanMove = extend({}, this.panMove, {}, true);
            parent.activeObj = extend({}, tempSelectionObj, {}, true);
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            if (parent.activeObj.shape) {
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
            }
        }
        else {
            var tempFlipState = parent.transform.currFlipState;
            parent.isCropTab = true;
            if (isNullOrUndefined(xDiff) && isNullOrUndefined(yDiff)) {
                parent.panPoint.currentPannedPoint = this.updatePanPoints('');
            }
            else {
                parent.panPoint.currentPannedPoint = { x: xDiff, y: yDiff };
            }
            parent.transform.currFlipState = tempFlipState;
            this.rotatePan();
            parent.isCropTab = false;
            this.tempPanMove = extend({}, this.panMove, {}, true);
        }
        if (isObjCreated) {
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            parent.isCropTab = false;
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        }
    };
    Transform.prototype.drawPannImage = function (point) {
        var parent = this.parent;
        var filter = this.lowerContext.filter;
        var destPoints = { startX: parent.img.destLeft, startY: parent.img.destTop, width: parent.img.destWidth,
            height: parent.img.destHeight };
        this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
            value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
        parent.img.destLeft = destPoints.startX;
        parent.img.destTop = destPoints.startY;
        parent.img.destWidth = destPoints.width;
        parent.img.destHeight = destPoints.height;
        this.setDestPointsForFlipState();
        parent.notify('filter', { prop: 'updateBrightFilter', onPropertyChange: false });
        this.lowerContext.drawImage(parent.baseImg, parent.img.srcLeft, parent.img.srcTop, parent.img.srcWidth, parent.img.srcHeight, parent.img.destLeft, parent.img.destTop, parent.img.destWidth, parent.img.destHeight);
        if ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: true } });
        }
        this.lowerContext.filter = filter;
        parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
            value: { type: 'reverse', isPreventDestination: null, isRotatePan: null } });
        parent.img.destLeft = destPoints.startX;
        parent.img.destTop = destPoints.startY;
        parent.img.destWidth = destPoints.width;
        parent.img.destHeight = destPoints.height;
        var temp = this.lowerContext.filter;
        this.lowerContext.filter = 'none';
        parent.notify('shape', { prop: 'panObjColl', onPropertyChange: false,
            value: { xDiff: point.x, yDiff: point.y, panRegion: '' } });
        parent.notify('freehand-draw', { prop: 'panFHDColl', onPropertyChange: false,
            value: { xDiff: point.x, yDiff: point.y, panRegion: '' } });
        this.lowerContext.filter = temp;
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
        if (parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: true } });
        }
    };
    Transform.prototype.resetZoom = function () {
        var parent = this.parent;
        if (parent.transform.defaultZoomFactor !== 0) {
            var isUndoRedo = parent.isUndoRedo;
            var object = { currObj: {} };
            parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
            this.transCurrObj = object['currObj'];
            this.transCurrObj.objColl = extend([], parent.objColl, null, true);
            this.transCurrObj.pointColl = extend({}, parent.pointColl, null, true);
            this.transCurrObj.afterCropActions = extend([], parent.afterCropActions, [], true);
            var selPointCollObj = { selPointColl: null };
            parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                value: { obj: selPointCollObj } });
            this.transCurrObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            parent.isUndoRedo = parent.isCropToolbar = true;
            if (parent.transform.defaultZoomFactor > 0) {
                this.zoomAction(-parent.transform.defaultZoomFactor);
            }
            else {
                this.zoomAction(Math.abs(parent.transform.defaultZoomFactor));
            }
            parent.isCropToolbar = false;
            parent.isUndoRedo = isUndoRedo;
        }
    };
    Transform.prototype.performTransformation = function (text) {
        var parent = this.parent;
        var tempZoomFactor = parent.transform.defaultZoomFactor;
        var isUndoRedo = parent.isUndoRedo;
        var prevCropObj = extend({}, parent.cropObj, {}, true);
        this.resetZoom();
        this.updateTransform(text);
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            if (parent.objColl[i].flipObjColl.length > 0) {
                var flipObjColl = { collection: parent.objColl[i].flipObjColl };
                parent.notify('shape', { prop: 'alignRotateFlipColl', onPropertyChange: false,
                    value: { collection: parent.objColl[i].flipObjColl, isRotateFlipCollection: null, obj: flipObjColl } });
                parent.objColl[i].flipObjColl = flipObjColl['collection'];
                if (parent.objColl[i].flipObjColl.length === 0) {
                    parent.objColl[i].shapeFlip = '';
                }
            }
        }
        if (tempZoomFactor !== 0) {
            parent.isUndoRedo = true;
            this.zoomAction(tempZoomFactor);
            parent.isUndoRedo = isUndoRedo;
            var state = '';
            if (text === 'rotateleft' || text === 'rotateright') {
                state = 'rotate';
            }
            else if (text === 'horizontalflip' || text === 'verticalflip') {
                state = 'flip';
            }
            parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: state, previousObj: this.transCurrObj, previousObjColl: this.transCurrObj.objColl,
                    previousPointColl: this.transCurrObj.pointColl, previousSelPointColl: this.transCurrObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
            this.transCurrObj = null;
        }
    };
    Transform.prototype.updateTransform = function (text) {
        switch (text.toLowerCase()) {
            case 'rotateleft':
                this.rotateImage(-90);
                break;
            case 'rotateright':
                this.rotateImage(90);
                break;
            case 'horizontalflip':
                this.flipImage(Direction.Horizontal);
                break;
            case 'verticalflip':
                this.flipImage(Direction.Vertical);
                break;
        }
    };
    Transform.prototype.rotatePan = function (isCropSelection, isDefaultZoom) {
        var parent = this.parent;
        this.isReverseRotate = true;
        var tempDegree = parent.transform.degree;
        var rotatePanActiveObj;
        var object = { selPointColl: null };
        if (parent.activeObj.activePoint && parent.activeObj.shape) {
            rotatePanActiveObj = extend({}, parent.activeObj, {}, true);
        }
        var tempObjColl = extend([], parent.objColl, [], true);
        var tempPointColl = extend([], parent.pointColl, [], true);
        parent.objColl = [];
        parent.pointColl = [];
        parent.freehandCounter = 0;
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: object } });
        var cropSelPointColl = object['selPointColl'];
        parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false,
            value: { obj: { selPointColl: [] } } });
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        parent.notify('draw', { prop: 'setRotateZoom', onPropertyChange: false, value: { isRotateZoom: true } });
        parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
            value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
        var initialDestLeft = parent.img.destLeft;
        var initialDestTop = parent.img.destTop;
        if (parent.isCropTab) {
            parent.img.destLeft += parent.panPoint.totalPannedInternalPoint.x;
            parent.img.destTop += parent.panPoint.totalPannedInternalPoint.y;
        }
        parent.notify('crop', { prop: 'updateRotatePan', onPropertyChange: false });
        if (parent.isCropTab) {
            parent.panPoint.totalPannedInternalPoint.x = parent.img.destLeft - initialDestLeft;
            parent.panPoint.totalPannedInternalPoint.y = parent.img.destTop - initialDestTop;
        }
        var temp = this.lowerContext.filter;
        parent.notify('filter', { prop: 'updateBrightFilter', onPropertyChange: false });
        this.lowerContext.drawImage(parent.baseImg, parent.img.srcLeft, parent.img.srcTop, parent.img.srcWidth, parent.img.srcHeight, parent.img.destLeft, parent.img.destTop, parent.img.destWidth, parent.img.destHeight);
        parent.notify('draw', { prop: 'setRotateZoom', onPropertyChange: false, value: { isRotateZoom: false } });
        parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
            value: { type: 'reverse', isPreventDestination: true, isRotatePan: true } });
        var destLeft = parent.img.destLeft;
        var destTop = parent.img.destTop;
        parent.img.destLeft += parent.panPoint.totalPannedClientPoint.x;
        parent.img.destTop += parent.panPoint.totalPannedClientPoint.y;
        parent.img.destLeft += parent.panPoint.currentPannedPoint.x;
        parent.img.destTop += parent.panPoint.currentPannedPoint.y;
        parent.panPoint.totalPannedClientPoint.x = parent.img.destLeft - destLeft;
        parent.panPoint.totalPannedClientPoint.y =
            parent.img.destTop - destTop;
        parent.objColl = tempObjColl;
        parent.pointColl = tempPointColl;
        parent.freehandCounter = parent.pointColl.length;
        parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false,
            value: { obj: { selPointColl: cropSelPointColl } } });
        parent.transform.degree = tempDegree;
        this.lowerContext.filter = 'none';
        if (isCropSelection) {
            if (isDefaultZoom) {
                parent.panPoint.totalPannedClientPoint.x = -parent.panPoint.totalPannedClientPoint.x;
                parent.panPoint.totalPannedClientPoint.y = -parent.panPoint.totalPannedClientPoint.y;
                parent.panPoint.currentPannedPoint = extend({}, parent.panPoint.totalPannedClientPoint, {}, true);
                parent.panPoint.totalPannedClientPoint = { x: 0, y: 0 };
                parent.img.destLeft += parent.panPoint.currentPannedPoint.x;
                parent.img.destTop += parent.panPoint.currentPannedPoint.y;
            }
            else {
                parent.panPoint.currentPannedPoint = extend({}, parent.panPoint.totalPannedClientPoint, {}, true);
            }
        }
        parent.notify('shape', { prop: 'panObjColl', onPropertyChange: false,
            value: { xDiff: parent.panPoint.currentPannedPoint.x, yDiff: parent.panPoint.currentPannedPoint.y, panRegion: '' } });
        parent.notify('freehand-draw', { prop: 'panFHDColl', onPropertyChange: false,
            value: { xDiff: parent.panPoint.currentPannedPoint.x, yDiff: parent.panPoint.currentPannedPoint.y, panRegion: '' } });
        this.lowerContext.filter = temp;
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        parent.activeObj = extend({}, rotatePanActiveObj, {}, true);
        if (parent.activeObj.activePoint) {
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj, isCropRatio: null,
                    points: null, isPreventDrag: true, saveContext: null, isPreventSelection: null } });
        }
        this.isReverseRotate = false;
    };
    Transform.prototype.limitPan = function () {
        var parent = this.parent;
        if (parent.activeObj.activePoint) {
            if (parent.img.destLeft > parent.activeObj.activePoint.startX) {
                parent.img.destLeft = parent.activeObj.activePoint.startX;
            }
            if (parent.img.destTop > parent.activeObj.activePoint.startY) {
                parent.img.destTop = parent.activeObj.activePoint.startY;
            }
            if (parent.img.destLeft + parent.img.destWidth < parent.activeObj.activePoint.endX) {
                parent.img.destLeft = parent.activeObj.activePoint.endX - parent.img.destWidth;
            }
            if (parent.img.destTop + parent.img.destHeight < parent.activeObj.activePoint.endY) {
                parent.img.destTop = parent.activeObj.activePoint.endY - parent.img.destHeight;
            }
        }
    };
    Transform.prototype.updateFlipActiveObj = function (panRegion) {
        var parent = this.parent;
        if (panRegion === 'horizontal') {
            if (parent.activeObj.activePoint.startX > parent.lowerCanvas.width / 2) {
                parent.activeObj.activePoint.endX = (parent.lowerCanvas.width / 2) -
                    (parent.activeObj.activePoint.startX - (parent.lowerCanvas.width / 2));
            }
            else {
                parent.activeObj.activePoint.endX = (parent.lowerCanvas.width / 2) + ((parent.lowerCanvas.width / 2) -
                    parent.activeObj.activePoint.startX);
            }
            parent.activeObj.activePoint.startX = parent.activeObj.activePoint.endX - parent.activeObj.activePoint.width;
        }
        else if (panRegion === 'vertical') {
            if (parent.activeObj.activePoint.startX > parent.lowerCanvas.width / 2) {
                parent.activeObj.activePoint.endY = (parent.lowerCanvas.height / 2) -
                    (parent.activeObj.activePoint.startY - (parent.lowerCanvas.height / 2));
            }
            else {
                parent.activeObj.activePoint.endY = (parent.lowerCanvas.height / 2) +
                    ((parent.lowerCanvas.height / 2) - parent.activeObj.activePoint.startY);
            }
            parent.activeObj.activePoint.startY = parent.activeObj.activePoint.endY - parent.activeObj.activePoint.height;
        }
        else if (panRegion === 'verticalHorizontal' || panRegion === 'horizontalVertical') {
            if (parent.activeObj.activePoint.startX > parent.lowerCanvas.width / 2) {
                parent.activeObj.activePoint.endX = (parent.lowerCanvas.width / 2) -
                    (parent.activeObj.activePoint.startX - (parent.lowerCanvas.width / 2));
                parent.activeObj.activePoint.endY = (parent.lowerCanvas.height / 2) -
                    (parent.activeObj.activePoint.startY - (parent.lowerCanvas.height / 2));
            }
            else {
                parent.activeObj.activePoint.endX = (parent.lowerCanvas.width / 2) + ((parent.lowerCanvas.width / 2) -
                    parent.activeObj.activePoint.startX);
                parent.activeObj.activePoint.endY = (parent.lowerCanvas.height / 2) +
                    ((parent.lowerCanvas.height / 2) - parent.activeObj.activePoint.startY);
            }
            parent.activeObj.activePoint.startX = parent.activeObj.activePoint.endX - parent.activeObj.activePoint.width;
            parent.activeObj.activePoint.startY = parent.activeObj.activePoint.endY - parent.activeObj.activePoint.height;
        }
        parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: parent.activeObj.activePoint, obj: parent.activeObj,
                isMouseMove: null, x: null, y: null } });
    };
    Transform.prototype.pan = function (value) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            if (value) {
                parent.togglePan = true;
                parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                    value: { x: null, y: null, isMouseDown: null } });
                parent.notify('selection', { prop: 'setDragCanvas', value: { bool: true } });
                parent.lowerCanvas.style.cursor = parent.upperCanvas.style.cursor = parent.cursor = 'grab';
                parent.notify('selection', { prop: 'setPanDown', onPropertyChange: false, value: { panDown: null } });
            }
            else {
                parent.togglePan = parent.currObjType.isCustomCrop = false;
                parent.notify('selection', { prop: 'setDragCanvas', value: { bool: false } });
                parent.lowerCanvas.style.cursor = parent.upperCanvas.style.cursor = parent.cursor = 'default';
            }
        }
    };
    Transform.prototype.zoom = function (zoomFactor, zoomPoint) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            var value = this.getCurrentZoomFactor(zoomFactor);
            if (isNullOrUndefined(zoomPoint)) {
                this.zoomAction(value, zoomPoint);
            }
            else {
                var type = value > 0 ? 'zoomIn' : 'zoomOut';
                for (var i = 0; i < (Math.abs(value) * 10); i++) {
                    parent.notify('draw', { prop: 'performPointZoom', onPropertyChange: false,
                        value: { x: zoomPoint.x, y: zoomPoint.y, type: type } });
                }
            }
        }
    };
    Transform.prototype.getCurrentZoomFactor = function (zoomFactor) {
        return (zoomFactor - this.prevZoomValue) * 0.1;
    };
    Transform.prototype.setCurrPanRegion = function (region, type, obj) {
        var panRegion = region;
        if (region === '') {
            if (type === 'horizontal') {
                panRegion = 'horizontal';
            }
            else if (type === 'vertical') {
                panRegion = 'vertical';
            }
        }
        else if (region === 'horizontal') {
            if (type === 'horizontal') {
                panRegion = 'horizontalVertical';
            }
            else if (type === 'vertical') {
                panRegion = 'verticalHorizontal';
            }
            else if (type === 90) {
                panRegion = 'vertical';
            }
            else if (type === -90) {
                panRegion = 'horizontal';
            }
        }
        else if (region === 'vertical') {
            if (type === 'horizontal') {
                panRegion = 'horizontalVertical';
            }
            else if (type === 'vertical') {
                panRegion = 'verticalHorizontal';
            }
            else if (type === 90) {
                panRegion = 'horizontal';
            }
            else if (type === -90) {
                panRegion = 'vertical';
            }
        }
        else {
            if (type === 'horizontal') {
                panRegion = 'vertical';
            }
            else if (type === 'vertical') {
                panRegion = 'horizontal';
            }
        }
        obj['panRegion'] = panRegion;
    };
    Transform.prototype.rotate = function (degree, obj) {
        var parent = this.parent;
        var isRotate = false;
        if (!parent.disabled && parent.isImageLoaded && (degree % 90 === 0)) {
            this.rotateImage(degree);
        }
        obj['isRotate'] = isRotate;
    };
    Transform.prototype.flip = function (direction) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            this.flipImage(direction);
        }
    };
    Transform.prototype.update = function () {
        var parent = this.parent;
        var toolbarHeight = 0;
        var isActiveObj = false;
        var freehandObj = { bool: false };
        if (parent.isImageLoaded) {
            if ((parent.element.querySelector('#' + parent.element.id + '_contextualToolbar') &&
                !parent.element.querySelector('#' + parent.element.id + '_contextualToolbar').parentElement.classList.contains('e-hide')) ||
                (parent.element.querySelector('#' + parent.element.id + '_headWrapper')
                    && !parent.element.querySelector('#' + parent.element.id + '_headWrapper').parentElement.classList.contains('e-hide'))) {
                parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.add('e-hide');
                parent.okBtn();
                if (!isBlazor()) {
                    parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
                    parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
                }
                else {
                    parent.updateToolbar(parent.element, 'imageLoaded');
                }
            }
            parent.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: freehandObj } });
            if (freehandObj['bool']) {
                if (!isBlazor()) {
                    parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
                }
                else {
                    parent.updateToolbar(parent.element, 'destroyQuickAccessToolbar');
                }
            }
            if (parent.activeObj.shape !== undefined) {
                isActiveObj = true;
                if (parent.textArea.style.display === 'block') {
                    parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                        value: { x: null, y: null, isMouseDown: null } });
                    if (!isBlazor()) {
                        parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
                    }
                    else {
                        parent.updateToolbar(parent.element, 'destroyQuickAccessToolbar');
                    }
                }
                else {
                    parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
                    parent.objColl.push(parent.activeObj);
                }
                parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            }
        }
        var tempFilter = this.lowerContext.filter;
        var canvasWrapper = document.querySelector('#' + parent.element.id + '_canvasWrapper');
        if (canvasWrapper) {
            canvasWrapper.style.width = parent.element.offsetWidth - 2 + 'px';
        }
        parent.lowerCanvas.width = parent.upperCanvas.width = parent.element.offsetWidth - 2;
        if (parent.toolbarTemplate) {
            toolbarHeight = parent.element.querySelector('#' + parent.element.id + '_toolbarArea').clientHeight;
        }
        else if (parent.element.querySelector('#' + parent.element.id + '_toolbar')) {
            toolbarHeight = parent.element.querySelector('#' + parent.element.id + '_toolbar').clientHeight;
        }
        parent.notify('toolbar', { prop: 'setToolbarHeight', value: { height: toolbarHeight } });
        if (Browser.isDevice) {
            if (canvasWrapper) {
                canvasWrapper.style.height = parent.element.offsetHeight - (2 * toolbarHeight) - 5 + 'px';
            }
            parent.lowerCanvas.height = parent.upperCanvas.height = parent.element.offsetHeight - (2 * toolbarHeight) - 5;
        }
        else {
            if (canvasWrapper) {
                canvasWrapper.style.height = parent.element.offsetHeight - toolbarHeight - 3 + 'px';
            }
            parent.lowerCanvas.height = parent.upperCanvas.height = parent.element.offsetHeight - toolbarHeight - 3;
        }
        this.lowerContext.filter =
            'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
                'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' + 'grayscale(0%) ' + 'invert(0%)';
        parent.notify('filter', { prop: 'setAdjustmentValue', onPropertyChange: false, value: { adjustmentValue: this.lowerContext.filter } });
        parent.canvasFilter = this.lowerContext.filter;
        this.parent.initialAdjustmentValue = this.lowerContext.filter;
        parent.clearContext(this.lowerContext);
        this.parent.clearContext(this.upperContext);
        if (parent.isImageLoaded) {
            parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: null } });
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            this.lowerContext.filter = tempFilter;
            parent.initialAdjustmentValue = tempFilter;
            parent.canvasFilter = this.lowerContext.filter;
            if (parent.isImageLoaded) {
                showSpinner(parent.element);
                parent.element.style.opacity = '0.5';
            }
            this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            if (canvasWrapper) {
                canvasWrapper.style.width = parent.element.offsetWidth - 2 + 'px';
                canvasWrapper.style.height = parent.element.offsetHeight + 'px';
                var obj_1 = { toolbarHeight: !isBlazor() ? 0 : parent.toolbarHeight };
                if (!isBlazor()) {
                    parent.notify('toolbar', { prop: 'getToolbarHeight', value: { obj: obj_1 } });
                }
                if (Browser.isDevice) {
                    canvasWrapper.style.height = (parseFloat(canvasWrapper.style.height) - (2 * obj_1['toolbarHeight'])) - 3 + 'px';
                }
                else {
                    canvasWrapper.style.height = (parseFloat(canvasWrapper.style.height) - obj_1['toolbarHeight']) - 3 + 'px';
                }
            }
            var obj = { width: 0, height: 0 };
            parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
                value: { width: parent.img.srcWidth, height: parent.img.srcHeight, obj: obj } });
            var maxDimension = obj;
            if (parent.transform.defaultZoomFactor > 0) {
                maxDimension.width += (maxDimension.width * parent.transform.defaultZoomFactor);
                maxDimension.height += (maxDimension.height * parent.transform.defaultZoomFactor);
            }
            parent.img.destLeft = (parent.lowerCanvas.clientWidth - maxDimension.width) / 2;
            parent.img.destTop = (parent.lowerCanvas.clientHeight - maxDimension.height) / 2;
            if (parent.transform.degree === 0 && parent.transform.currFlipState === '') {
                if (parent.transform.defaultZoomFactor > 0) {
                    parent.img.destLeft += parent.panPoint.totalPannedPoint.x;
                    parent.img.destTop += parent.panPoint.totalPannedPoint.y;
                }
                parent.notify('draw', { prop: 'draw-image-to-canvas', value: { dimension: maxDimension } });
            }
            else {
                parent.notify('draw', { prop: 'draw-image-to-canvas', value: { dimension: maxDimension } });
                parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                    value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
                var temp = this.lowerContext.filter;
                parent.notify('filter', { prop: 'updateBrightFilter', onPropertyChange: false });
                this.lowerContext.drawImage(parent.baseImg, parent.img.srcLeft, parent.img.srcTop, parent.img.srcWidth, parent.img.srcHeight, parent.img.destLeft, parent.img.destTop, parent.img.destWidth, parent.img.destHeight);
                this.lowerContext.filter = temp;
                parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                    value: { type: 'reverse', isPreventDestination: null, isRotatePan: null } });
            }
            parent.notify('shape', { prop: 'zoomObjColl', onPropertyChange: false, value: { isPreventApply: null } });
            parent.notify('freehand-draw', { prop: 'zoomFHDColl', onPropertyChange: false, value: { isPreventApply: null } });
            if (parent.isCircleCrop) {
                parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                    value: { context: this.lowerContext, isSave: null, isFlip: null } });
            }
            hideSpinner(parent.element);
            parent.element.style.opacity = '1';
            var obj1 = { defToolbarItems: null };
            if (!isBlazor()) {
                parent.notify('toolbar', { prop: 'getDefToolbarItems', value: { obj: obj1 } });
                if (obj1['defToolbarItems'] && obj1['defToolbarItems'].length > 0 && document.getElementById(parent.element.id + '_toolbar')) {
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    var toolbar_1 = getComponent(parent.element.id + '_toolbar', 'toolbar');
                    toolbar_1.refreshOverflow();
                    if (parent.element.querySelector('.e-contextual-toolbar-wrapper')) {
                        parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.add('e-hide');
                    }
                }
            }
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            if (isActiveObj) {
                parent.activeObj = extend({}, parent.objColl[parent.objColl.length - 1], null, true);
                parent.objColl.pop();
                if (parent.activeObj.activePoint.width !== 0 && parent.activeObj.activePoint.height !== 0) {
                    parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
                    if (parent.activeObj.shape === 'rectangle' || parent.activeObj.shape === 'ellipse' || parent.activeObj.shape === 'text' ||
                        parent.activeObj.shape === 'line' || parent.activeObj.shape === 'arrow' || parent.activeObj.shape === 'path') {
                        if (!isBlazor()) {
                            parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
                        }
                        else {
                            parent.updateToolbar(parent.element, 'quickAccessToolbar', parent.activeObj.shape);
                        }
                    }
                }
            }
            if (freehandObj['bool']) {
                if (!isBlazor()) {
                    parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: true } });
                }
                else {
                    parent.updateToolbar(parent.element, 'quickAccessToolbar', 'pen');
                }
            }
            if ((parent.transform.degree !== 0 || parent.transform.currFlipState !== '') && parent.transform.defaultZoomFactor > 0) {
                var totalPannedPoint = extend({}, parent.panPoint.totalPannedPoint, null, true);
                var totalPannedInternalPoint = extend({}, parent.panPoint.totalPannedInternalPoint, null, true);
                var totalPannedClientPoint = extend({}, parent.panPoint.totalPannedClientPoint, null, true);
                parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                    value: { zoomFactor: .1, zoomPoint: null } });
                parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                    value: { zoomFactor: -.1, zoomPoint: null } });
                if (parent.transform.degree === 0) {
                    parent.img.destLeft += totalPannedPoint.x;
                    parent.img.destTop += totalPannedPoint.y;
                    parent.panPoint.totalPannedPoint = totalPannedPoint;
                    parent.notify('draw', { prop: 'updateFlipPan', value: { tempSelectionObj: null } });
                }
                else {
                    parent.panPoint.totalPannedInternalPoint = totalPannedInternalPoint;
                    parent.panPoint.totalPannedClientPoint = totalPannedClientPoint;
                    parent.panPoint.currentPannedPoint = { x: 0, y: 0 };
                    parent.isCropTab = true;
                    parent.notify('transform', { prop: 'rotatePan', onPropertyChange: false,
                        value: { isCropSelection: null, isDefaultZoom: null } });
                    parent.isCropTab = false;
                }
            }
            else if (parent.transform.degree !== 0 && parent.transform.cropZoomFactor > 0) {
                parent.transform.zoomFactor = 0;
                parent.transform.cropZoomFactor = null;
                if (!isBlazor()) {
                    parent.notify('toolbar', { prop: 'enable-disable-btns', onPropertyChange: false });
                }
                else {
                    parent.updateToolbar(parent.element, 'enableDisableToolbarBtn');
                }
            }
        }
    };
    Transform.prototype.calcMaxDimension = function (width, height, obj) {
        var object = { toolbarHeight: 0 };
        if (!isBlazor()) {
            this.parent.notify('toolbar', { prop: 'getToolbarHeight', value: { obj: object } });
        }
        else {
            object['toolbarHeight'] = this.parent.toolbarHeight;
        }
        var canvasMaxWidth = this.parent.element.clientWidth;
        var canvasMaxHeight = this.parent.element.clientHeight - object['toolbarHeight'];
        canvasMaxHeight = Browser.isDevice ? canvasMaxHeight - object['toolbarHeight'] : canvasMaxHeight;
        if (canvasMaxWidth > 30) {
            canvasMaxWidth -= 30;
        }
        if (canvasMaxHeight > 30) {
            canvasMaxHeight -= 30;
        }
        var widthScale = canvasMaxWidth / width;
        var heightScale = canvasMaxHeight / height;
        var cssMaxWidth = Math.min(width, canvasMaxWidth);
        var cssMaxHeight = Math.min(height, canvasMaxHeight);
        if (widthScale < 1 && widthScale < heightScale) {
            cssMaxWidth = width * widthScale;
            cssMaxHeight = height * widthScale;
        }
        else if (heightScale < 1 && heightScale < widthScale) {
            cssMaxWidth = width * heightScale;
            cssMaxHeight = height * heightScale;
        }
        var cropObj = { bool: null };
        this.parent.notify('crop', { prop: 'getPreventScaling', onPropertyChange: false,
            value: { obj: cropObj } });
        if (cropObj['bool'] && this.parent.cropObj.activeObj.activePoint &&
            this.parent.cropObj.activeObj.activePoint.width !== 0 && this.parent.cropObj.activeObj.activePoint.height !== 0) {
            cssMaxWidth = this.parent.cropObj.activeObj.activePoint.width;
            cssMaxHeight = this.parent.cropObj.activeObj.activePoint.height;
        }
        if (obj) {
            obj['width'] = cssMaxWidth;
            obj['height'] = cssMaxHeight;
        }
        return { width: cssMaxWidth, height: cssMaxHeight };
    };
    Transform.prototype.updatePanPoints = function (panRegion, obj) {
        var parent = this.parent;
        var tempActObj = extend({}, parent.activeObj, {}, true);
        var tempDestLeft = parent.img.destLeft;
        var tempDestTop = parent.img.destTop;
        if (isNullOrUndefined(this.tempPanMove)) {
            this.tempPanMove = { x: this.panMove.x, y: this.panMove.y };
        }
        var xDiff = this.panMove.x - this.tempPanMove.x;
        var yDiff = this.panMove.y - this.tempPanMove.y;
        switch (panRegion) {
            case '':
                parent.img.destLeft += xDiff;
                parent.img.destTop += yDiff;
                break;
            case 'horizontal':
                this.updateFlipActiveObj(panRegion);
                xDiff = this.tempPanMove.x - this.panMove.x;
                parent.img.destLeft += xDiff;
                parent.img.destTop += yDiff;
                break;
            case 'vertical':
                this.updateFlipActiveObj(panRegion);
                yDiff = this.tempPanMove.y - this.panMove.y;
                parent.img.destLeft += xDiff;
                parent.img.destTop += yDiff;
                break;
            case 'horizontalVertical':
                this.updateFlipActiveObj(panRegion);
                xDiff = this.tempPanMove.x - this.panMove.x;
                parent.img.destLeft += xDiff;
                parent.img.destTop -= yDiff;
                break;
            case 'verticalHorizontal':
                this.updateFlipActiveObj(panRegion);
                yDiff = this.tempPanMove.y - this.panMove.y;
                parent.img.destLeft -= xDiff;
                parent.img.destTop += yDiff;
                break;
        }
        this.limitPan();
        parent.activeObj = tempActObj;
        if (obj) {
            obj['x'] = parent.img.destLeft - tempDestLeft;
            obj['y'] = parent.img.destTop - tempDestTop;
        }
        return { x: parent.img.destLeft - tempDestLeft, y: parent.img.destTop - tempDestTop };
    };
    return Transform;
}());
export { Transform };
