import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
var Filter = /** @class */ (function () {
    function Filter(parent) {
        this.adjustmentLevel = { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0, blur: 0,
            exposure: 0, sharpen: false, bw: false }; // for toolbar slider value
        this.tempAdjustmentLevel = { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0, blur: 0,
            exposure: 0, sharpen: false, bw: false }; // for temp toolbar slider value
        this.adjustmentValue = ''; // for internal slider value
        this.isBrightnessAdjusted = false;
        this.appliedFilter = '';
        this.parent = parent;
        this.addEventListener();
    }
    Filter.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    Filter.prototype.addEventListener = function () {
        this.parent.on('filter', this.filter, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    Filter.prototype.removeEventListener = function () {
        this.parent.off('filter', this.filter);
        this.parent.off('destroyed', this.destroy);
    };
    Filter.prototype.filter = function (args) {
        this.updatePrivateVariables();
        switch (args.prop) {
            case 'finetuneImage':
                this.finetuneImage(args.value['option'], args.value['value']);
                break;
            case 'applyImageFilter':
                this.setFilter(args.value['option']);
                break;
            case 'update-finetunes':
                this.updateFinetunes();
                break;
            case 'updateBrightFilter':
                this.updateBrightFilter();
                break;
            case 'set-adjustment':
                this.setAdjustment(args.value['operation']);
                break;
            case 'update-filter':
                this.updateFilter(args.value['operation'], args.value['filter']);
                break;
            case 'initFilter':
                this.initFilter();
                break;
            case 'setCurrAdjValue':
                this.setCurrAdjValue(args.value['type'], args.value['value']);
                break;
            case 'updateAdj':
                this.updateAdj(args.value['type'], args.value['value'], args.value['isPreview'], args.value['ctx']);
                break;
            case 'getCurrentObj':
                this.getCurrentObj(args.value['object']);
                break;
            case 'getAdjustmentLevel':
                args.value['obj']['adjustmentLevel'] = this.adjustmentLevel;
                break;
            case 'setAdjustmentLevel':
                this.adjustmentLevel = args.value['adjustmentLevel'];
                break;
            case 'getTempAdjustmentLevel':
                args.value['obj']['tempAdjustmentLevel'] = this.tempAdjustmentLevel;
                break;
            case 'setTempAdjustmentLevel':
                this.tempAdjustmentLevel = args.value['tempAdjustmentLevel'];
                break;
            case 'setAdjustmentValue':
                this.adjustmentValue = args.value['adjustmentValue'];
                break;
            case 'getBrightnessAdjusted':
                args.value['obj']['isBrightnessAdjusted'] = this.isBrightnessAdjusted;
                break;
            case 'setBrightnessAdjusted':
                this.isBrightnessAdjusted = args.value['isBrightnessAdjusted'];
                if (this.parent.currentFilter.split('_') && this.parent.currentFilter.split('_')[1] === 'cold') {
                    this.isBrightnessAdjusted = false;
                }
                break;
            case 'reset':
                this.reset();
                break;
        }
    };
    Filter.prototype.updatePrivateVariables = function () {
        var parent = this.parent;
        if (parent.lowerCanvas) {
            this.lowerContext = parent.lowerCanvas.getContext('2d');
        }
    };
    Filter.prototype.getModuleName = function () {
        return 'filter';
    };
    Filter.prototype.updateBrightFilter = function () {
        var splitWords = this.lowerContext.filter.split(' ');
        if (this.isBrightnessAdjusted && splitWords.length > 0 && !isNullOrUndefined(splitWords[4])) {
            var opacityValue = parseFloat(splitWords[4].split('(')[1]);
            splitWords[4] = 'opacity(' + (opacityValue - 0.3) + ')';
            this.lowerContext.filter = splitWords.join(' ');
        }
    };
    Filter.prototype.reset = function () {
        this.adjustmentLevel = { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0,
            blur: 0, exposure: 0, sharpen: false, bw: false };
        this.tempAdjustmentLevel = { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0,
            blur: 0, exposure: 0, sharpen: false, bw: false };
        this.adjustmentValue = this.parent.getDefaultFilter();
        this.isBrightnessAdjusted = false;
        this.appliedFilter = '';
    };
    Filter.prototype.updateFinetunes = function () {
        var parent = this.parent;
        var fs = parent.finetuneSettings;
        if (fs) {
            if (fs.brightness) {
                this.adjustmentLevel.brightness = fs.brightness.defaultValue;
                this.tempAdjustmentLevel.brightness = fs.brightness.defaultValue;
            }
            if (fs.contrast) {
                this.adjustmentLevel.contrast = fs.contrast.defaultValue;
                this.tempAdjustmentLevel.contrast = fs.contrast.defaultValue;
            }
            if (fs.hue) {
                this.adjustmentLevel.hue = fs.hue.defaultValue;
                this.tempAdjustmentLevel.hue = fs.hue.defaultValue;
            }
            if (fs.saturation) {
                this.adjustmentLevel.saturation = fs.saturation.defaultValue;
                this.tempAdjustmentLevel.saturation = fs.saturation.defaultValue;
            }
            if (fs.exposure) {
                this.adjustmentLevel.exposure = fs.exposure.defaultValue;
                this.tempAdjustmentLevel.exposure = fs.exposure.defaultValue;
            }
            if (fs.opacity) {
                this.adjustmentLevel.opacity = fs.opacity.defaultValue;
                this.tempAdjustmentLevel.opacity = fs.opacity.defaultValue;
            }
            if (fs.blur) {
                this.adjustmentLevel.blur = fs.blur.defaultValue;
                this.tempAdjustmentLevel.blur = fs.blur.defaultValue;
            }
            parent.notify('draw', { prop: 'isInitialLoading', onPropertyChange: false, value: { isInitialLoading: true } });
        }
    };
    Filter.prototype.initFilter = function () {
        this.setFilterAdj('brightness', this.adjustmentLevel.brightness);
        this.setFilterAdj('contrast', this.adjustmentLevel.contrast);
        this.setFilterAdj('hue', this.adjustmentLevel.hue);
        this.setFilterAdj('saturation', this.adjustmentLevel.saturation);
        this.setFilterAdj('exposure', this.adjustmentLevel.exposure);
        this.setFilterAdj('opacity', this.adjustmentLevel.opacity);
        this.setFilterAdj('blur', this.adjustmentLevel.blur);
    };
    Filter.prototype.updateAdj = function (type, value, isPreview, ctx) {
        var parent = this.parent;
        this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        var splitWords = this.lowerContext.filter.split(' ');
        var values = [];
        var opacityValue;
        var brightnessValue;
        if (splitWords[4]) {
            opacityValue = parseFloat(splitWords[4].split('(')[1]);
        }
        if (splitWords[0]) {
            brightnessValue = parseFloat(splitWords[0].split('(')[1]);
        }
        var brightness = this.getFilterValue(this.adjustmentLevel.brightness);
        var saturation = this.getFilterValue(this.adjustmentLevel.saturation);
        var excludedTypes = ['brightness', 'contrast', 'hue', 'saturation', 'exposure', 'opacity', 'blur'];
        if (excludedTypes.indexOf(type) === -1) {
            if (isNullOrUndefined(isPreview) && (this.adjustmentLevel.sharpen || this.adjustmentLevel.bw)) {
                parent.isUndoRedo = true;
                var temp = this.lowerContext.filter;
                this.lowerContext.filter = 'none';
                parent.notify('shape', { prop: 'iterateObjColl', onPropertyChange: false });
                parent.notify('freehand-draw', { prop: 'freehandRedraw', onPropertyChange: false,
                    value: { context: this.lowerContext, points: null } });
                this.lowerContext.filter = temp;
                parent.isUndoRedo = false;
            }
        }
        if (brightness !== 1) {
            splitWords[4] = 'opacity(' + (opacityValue - 0.3) + ')';
        }
        var saturate;
        var bright;
        var saturatePercent;
        var contrast;
        var saturatePercentage;
        switch (type) {
            case 'brightness':
                if (parseFloat(splitWords[3].split('(')[1]) !== 100) {
                    value += 0.1;
                }
                splitWords[0] = 'brightness(' + value + ')';
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'contrast':
                splitWords[1] = 'contrast(' + value + '%)';
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'hue':
                splitWords[2] = 'hue-rotate(' + value + 'deg)';
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'saturation':
                splitWords[3] = 'saturate(' + value + '%)';
                if (saturation !== 1) {
                    splitWords[0] = 'brightness(' + (brightnessValue + 0.09) + ')';
                }
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'opacity':
                if (parseFloat(splitWords[0].split('(')[1]) !== 1) {
                    value -= 0.2;
                }
                splitWords[4] = 'opacity(' + value + ')';
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'blur':
                splitWords[5] = 'blur(' + value + 'px)';
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'exposure':
                if (brightness !== 1) {
                    splitWords[4] = 'opacity(' + (opacityValue - 0.3) + ')';
                }
                if (value > 1) {
                    value -= 1;
                    value += brightness;
                }
                else if (value < 1) {
                    value = 1 - value;
                    value = brightness - value;
                }
                splitWords[0] = 'brightness(' + value + ')';
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'chrome':
                saturate = this.getSaturationFilterValue(this.adjustmentLevel.saturation);
                saturate *= 100;
                value = saturate + (saturate * 0.4);
                splitWords[3] = 'saturate(' + value + '%)';
                values = this.adjustmentValue.split(' ');
                splitWords[0] = values[0];
                splitWords[1] = values[1];
                splitWords[2] = values[2];
                splitWords[4] = values[4];
                splitWords[5] = values[5];
                splitWords[6] = 'sepia(0%)';
                splitWords[7] = 'grayscale(0%)';
                splitWords[8] = 'invert(0%)';
                break;
            case 'cold':
                // Adjusting Brightness
                bright = this.getFilterValue(this.adjustmentLevel.brightness);
                bright *= 100;
                value = bright * 0.9;
                value *= 0.01;
                splitWords[0] = 'brightness(' + value + ')';
                // Adjusting Contrast
                contrast = this.getFilterValue(this.adjustmentLevel.contrast);
                contrast *= 100;
                value = contrast + (contrast * 0.5);
                splitWords[1] = 'contrast(' + value + '%)';
                // Adjusting Saturation
                saturatePercentage = this.getSaturationFilterValue(this.adjustmentLevel.saturation);
                saturatePercentage *= 100;
                value = saturatePercentage;
                splitWords[3] = 'saturate(' + value + '%)';
                values = this.adjustmentValue.split(' ');
                splitWords[2] = values[2];
                splitWords[4] = values[4];
                splitWords[5] = values[5];
                splitWords[6] = 'sepia(0%)';
                splitWords[7] = 'grayscale(0%)';
                splitWords[8] = 'invert(0%)';
                break;
            case 'warm':
                saturatePercent = this.getSaturationFilterValue(this.adjustmentLevel.saturation);
                saturatePercent *= 100;
                value = saturatePercent + (saturatePercent * 0.4);
                splitWords[3] = 'saturate(' + value + '%)';
                splitWords[6] = 'sepia(25%)';
                values = this.adjustmentValue.split(' ');
                splitWords[0] = values[0];
                splitWords[1] = values[1];
                splitWords[2] = values[2];
                splitWords[4] = values[4];
                splitWords[5] = values[5];
                splitWords[7] = 'grayscale(0%)';
                splitWords[8] = 'invert(0%)';
                break;
            case 'grayscale':
                splitWords[7] = 'grayscale(100%)';
                values = this.adjustmentValue.split(' ');
                splitWords[0] = values[0];
                splitWords[1] = values[1];
                splitWords[2] = values[2];
                splitWords[3] = values[3];
                splitWords[4] = values[4];
                splitWords[5] = values[5];
                splitWords[6] = 'sepia(0%)';
                splitWords[8] = 'invert(0%)';
                break;
            case 'sepia':
                splitWords[6] = 'sepia(100%)';
                values = this.adjustmentValue.split(' ');
                splitWords[0] = values[0];
                splitWords[1] = values[1];
                splitWords[2] = values[2];
                splitWords[3] = values[3];
                splitWords[4] = values[4];
                splitWords[5] = values[5];
                splitWords[7] = 'grayscale(0%)';
                splitWords[8] = 'invert(0%)';
                break;
            case 'invert':
                splitWords[8] = 'invert(100%)';
                values = this.adjustmentValue.split(' ');
                splitWords[0] = values[0];
                splitWords[1] = values[1];
                splitWords[2] = values[2];
                splitWords[3] = values[3];
                splitWords[4] = values[4];
                splitWords[5] = values[5];
                splitWords[6] = 'sepia(0%)';
                splitWords[7] = 'grayscale(0%)';
                break;
        }
        if (type !== 'sharpen' && type !== 'blackandwhite') {
            if (isNullOrUndefined(isPreview)) {
                if (type === 'default') {
                    splitWords = this.getDefaultCurrentFilter(splitWords);
                }
                this.lowerContext.filter = splitWords.join(' ');
            }
            splitWords = this.setTempFilterValue(brightness, isPreview, splitWords, type);
            parent.notify('draw', { prop: 'setRotateZoom', onPropertyChange: false, value: { isRotateZoom: true } });
            parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
            this.appliedFilter = this.lowerContext.filter;
            this.lowerContext.drawImage(parent.baseImg, parent.img.srcLeft, parent.img.srcTop, parent.img.srcWidth, parent.img.srcHeight, parent.img.destLeft, parent.img.destTop, parent.img.destWidth, parent.img.destHeight);
            parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                value: { type: 'reverse', isPreventDestination: null, isRotatePan: null } });
            parent.notify('draw', { prop: 'setRotateZoom', onPropertyChange: false, value: { isRotateZoom: false } });
            if (brightness !== 1) {
                splitWords[4] = 'opacity(' + opacityValue + ')';
            }
            else if (saturation !== 1) {
                splitWords[0] = 'brightness(' + brightnessValue + ')';
            }
            if ((type === 'exposure' && brightness !== 1) || (type === 'saturation' && saturation !== 1)) {
                splitWords[0] = 'brightness(' + brightnessValue + ')';
            }
            splitWords = this.setTempFilterValue(brightness, isPreview, splitWords, type);
            if (isNullOrUndefined(isPreview)) {
                this.lowerContext.filter = splitWords.join(' ');
            }
            parent.initialAdjustmentValue = splitWords.join(' ');
            var tempFilter = this.lowerContext.filter;
            this.lowerContext.filter = 'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
                'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' + 'grayscale(0%) ' + 'invert(0%)';
            parent.notify('shape', { prop: 'iterateObjColl', onPropertyChange: false });
            parent.notify('freehand-draw', { prop: 'freehandRedraw', onPropertyChange: false,
                value: { context: this.lowerContext, points: null } });
            this.lowerContext.filter = tempFilter;
            parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
            if ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop) {
                parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                    value: { context: this.lowerContext, isSave: null, isFlip: null } });
            }
            this.isBrightnessAdjusted = brightness !== 1;
        }
        var filter = splitWords.join(' ');
        if (ctx) {
            ctx.filter = filter;
        }
    };
    Filter.prototype.setTempFilterValue = function (brightness, isPreview, splitWords, type) {
        if (isPreview) {
            if (type === 'default') {
                splitWords = this.getDefaultCurrentFilter(splitWords);
            }
            else if (brightness !== 1) {
                var tempSplitWords = this.lowerContext.filter.split(' ');
                tempSplitWords[4] = splitWords[4];
                this.lowerContext.filter = tempSplitWords.join(' ');
            }
        }
        return splitWords;
    };
    Filter.prototype.getDefaultCurrentFilter = function (splitWords) {
        var values = this.adjustmentValue.split(' ');
        splitWords = [
            values[0],
            values[1],
            values[2],
            values[3],
            values[4],
            values[5],
            'sepia(0%)',
            'grayscale(0%)',
            'invert(0%)'
        ];
        return splitWords;
    };
    Filter.prototype.getFilterValue = function (value) {
        return (value === 0) ? 1 : 1 + ((value * 0.5) / 100);
    };
    Filter.prototype.getSaturationFilterValue = function (value) {
        return value === 0 ? 1 : 1 + (value / 100);
    };
    Filter.prototype.setFilterAdj = function (type, value) {
        var parent = this.parent;
        parent.notify('freehand-draw', { prop: 'apply-pen-draw', onPropertyChange: false });
        this.adjustmentLevel["" + type] = value;
        switch (type) {
            case 'brightness':
            case 'contrast':
            case 'exposure':
                value = this.getFilterValue(value);
                if (type === 'contrast') {
                    value *= 100;
                }
                break;
            case 'hue':
                value *= 3;
                break;
            case 'saturation':
                value = this.getSaturationFilterValue(value) * 100;
                break;
            case 'opacity':
                if (value >= 50) {
                    value /= 100;
                }
                else if (value === 40) {
                    value = 0.45;
                }
                else if (value === 30) {
                    value = 0.40;
                }
                else if (value === 20) {
                    value = 0.35;
                }
                else if (value === 10) {
                    value = 0.30;
                }
                else if (value === 0) {
                    value = 0.25;
                }
                break;
            case 'blur':
                if (value !== 0) {
                    value /= 20;
                    // Since 0.5 is not working in blur we consider from 1
                    value += 0.5;
                }
                break;
        }
        var prevCropObj = extend({}, parent.cropObj, {}, true);
        var prevObj = this.getCurrentObj();
        prevObj.objColl = extend([], parent.objColl, [], true);
        prevObj.pointColl = extend([], parent.pointColl, [], true);
        prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false, value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.updateAdj(type, value);
        parent.notify('undo-redo', {
            prop: 'updateUndoRedoColl',
            onPropertyChange: false,
            value: {
                operation: type,
                previousObj: prevObj,
                previousObjColl: prevObj.objColl,
                previousPointColl: prevObj.pointColl,
                previousSelPointColl: prevObj.selPointColl,
                previousCropObj: prevCropObj,
                previousText: null,
                currentText: null,
                previousFilter: null,
                isCircleCrop: null
            }
        });
    };
    Filter.prototype.setFilter = function (type) {
        var parent = this.parent;
        type = type.toLowerCase();
        parent.notify('freehand-draw', { prop: 'apply-pen-draw', onPropertyChange: false });
        var obj = { currentFilter: this.parent.currentFilter };
        var prevFilter = obj['currentFilter'];
        var prevCropObj = extend({}, parent.cropObj, {}, true);
        var prevObj = this.getCurrentObj();
        prevObj.objColl = extend([], parent.objColl, [], true);
        prevObj.pointColl = extend([], parent.pointColl, [], true);
        prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.updateAdj(type, null);
        parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
            value: { operation: type, previousObj: prevObj, previousObjColl: prevObj.objColl,
                previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                previousCropObj: prevCropObj, previousText: null,
                currentText: null, previousFilter: prevFilter, isCircleCrop: null } });
    };
    Filter.prototype.setAdjustment = function (type) {
        var splitWords = this.lowerContext.filter.split(' ');
        var value;
        var valueArr;
        switch (type) {
            case 'brightness':
                valueArr = splitWords[0].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                this.adjustmentLevel.brightness = this.setFilterValue(value);
                break;
            case 'contrast':
                valueArr = splitWords[1].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                value /= 100;
                this.adjustmentLevel.contrast = this.setFilterValue(value);
                break;
            case 'hue':
                valueArr = splitWords[2].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                value /= 3;
                this.adjustmentLevel.hue = value;
                break;
            case 'saturation':
                valueArr = splitWords[3].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                value /= 100;
                this.adjustmentLevel.saturation = this.setSaturationFilterValue(value);
                break;
            case 'opacity':
                valueArr = splitWords[4].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                if (value === 0.45) {
                    value = 40;
                }
                else if (value === 0.40) {
                    value = 30;
                }
                else if (value === 0.35) {
                    value = 20;
                }
                else if (value === 0.30) {
                    value = 10;
                }
                else if (value === 0.25) {
                    value = 0;
                }
                else {
                    value *= 100;
                }
                this.adjustmentLevel.opacity = value;
                break;
            case 'blur':
                valueArr = splitWords[5].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                value *= 20;
                this.adjustmentLevel.blur = value;
                break;
            case 'exposure':
                valueArr = splitWords[0].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                this.adjustmentLevel.exposure = this.setFilterValue(value);
                break;
        }
    };
    Filter.prototype.setFilterValue = function (value) {
        return Math.round((value === 1) ? 0 : ((value - 1) * 100) / 0.5);
    };
    Filter.prototype.setSaturationFilterValue = function (value) {
        return Math.round((value === 1) ? 0 : (value - 1) * 100);
    };
    Filter.prototype.updateFilter = function (type, previousFilter) {
        var parent = this.parent;
        var validTypes = ['default', 'chrome', 'cold', 'warm', 'grayscale', 'blackandwhite', 'sepia', 'invert', 'sharpen'];
        if (validTypes.indexOf(type) !== -1) {
            var selEle = parent.element.querySelector('.e-contextual-toolbar-wrapper .e-toolbar-item.e-selected');
            if (selEle) {
                selEle.classList.remove('e-selected');
            }
            var filterCanvas = document.getElementById(parent.element.id + '_' + type + 'Canvas');
            if (filterCanvas) {
                filterCanvas.parentElement.classList.add('e-selected');
            }
            this.parent.currentFilter = previousFilter ? previousFilter : parent.element.id + '_' + type;
        }
    };
    Filter.prototype.finetuneImage = function (finetuneOption, value) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            switch (finetuneOption.toLowerCase()) {
                case 'brightness':
                    this.setFilterAdj('brightness', value);
                    break;
                case 'contrast':
                    this.setFilterAdj('contrast', value);
                    break;
                case 'hue':
                    this.setFilterAdj('hue', value);
                    break;
                case 'saturation':
                    this.setFilterAdj('saturation', value);
                    break;
                case 'opacity':
                    this.setFilterAdj('opacity', value);
                    break;
                case 'blur':
                    this.setFilterAdj('blur', value);
                    break;
                case 'exposure':
                    this.setFilterAdj('exposure', value);
                    break;
            }
            this.parent.canvasFilter = this.lowerContext.filter;
            parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
        }
    };
    Filter.prototype.setCurrAdjValue = function (type, value) {
        this.parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
        switch (type) {
            case 'brightness':
                this.setFilterAdj('brightness', value);
                break;
            case 'contrast':
                this.setFilterAdj('contrast', value);
                break;
            case 'hue':
                this.setFilterAdj('hue', value);
                break;
            case 'saturation':
                this.setFilterAdj('saturation', value);
                break;
            case 'opacity':
                this.setFilterAdj('opacity', value);
                break;
            case 'blur':
                this.setFilterAdj('blur', value);
                break;
            case 'exposure':
                this.setFilterAdj('exposure', value);
                break;
        }
    };
    Filter.prototype.getCurrentObj = function (dummyObj) {
        var parent = this.parent;
        var tempFlipPanPointObj = { point: null };
        parent.notify('crop', { prop: 'getTempFlipPanPoint', value: { obj: tempFlipPanPointObj } });
        var zoomObj = { previousZoomValue: null };
        parent.notify('transform', { prop: 'getPreviousZoomValue', value: { obj: zoomObj } });
        var obj = { cropZoom: 0, defaultZoom: 0, totalPannedPoint: { x: 0, y: 0 }, totalPannedClientPoint: { x: 0, y: 0 },
            totalPannedInternalPoint: { x: 0, y: 0 }, tempFlipPanPoint: { x: 0, y: 0 }, activeObj: {},
            rotateFlipColl: [], degree: 0, currFlipState: '', zoomFactor: 0, previousZoomValue: 0,
            destPoints: { startX: 0, startY: 0, width: 0, height: 0 },
            srcPoints: { startX: 0, startY: 0, width: 0, height: 0 }, filter: '', isBrightAdjust: this.isBrightnessAdjusted };
        obj.cropZoom = parent.transform.cropZoomFactor;
        obj.defaultZoom = parent.transform.defaultZoomFactor;
        obj.zoomFactor = parent.zoomSettings.zoomFactor;
        obj.previousZoomValue = zoomObj['previousZoomValue'];
        obj.totalPannedPoint = extend({}, parent.panPoint.totalPannedPoint, {}, true);
        obj.totalPannedClientPoint = extend({}, parent.panPoint.totalPannedClientPoint, {}, true);
        obj.totalPannedInternalPoint = extend({}, parent.panPoint.totalPannedInternalPoint, {}, true);
        obj.tempFlipPanPoint = extend({}, tempFlipPanPointObj['point'], {}, true);
        obj.activeObj = extend({}, parent.activeObj, {}, true);
        obj.rotateFlipColl = extend([], parent.rotateFlipColl, [], true);
        obj.degree = parent.transform.degree;
        obj.currFlipState = parent.transform.currFlipState;
        obj.destPoints = { startX: parent.img.destLeft, startY: parent.img.destTop, endX: 0, endY: 0,
            width: parent.img.destWidth, height: parent.img.destHeight };
        obj.srcPoints = { startX: parent.img.srcLeft, startY: parent.img.srcTop, endX: 0, endY: 0,
            width: parent.img.srcWidth, height: parent.img.srcHeight };
        obj.filter = this.lowerContext.filter;
        if (dummyObj) {
            dummyObj['currObj'] = obj;
        }
        return obj;
    };
    return Filter;
}());
export { Filter };
