import { DiagramConstraints, DiagramTools, SelectorConstraints, SnapConstraints } from "../enum/enum";
import { ConnectorProperties } from "./connectorProperties";
import { LabelProperties } from "./labelProperties";
import { NodeProperties } from "./nodeProperties";
import { PortProperties } from "./portProperties";
var EJ1SerializationModule = /** @class */ (function () {
    function EJ1SerializationModule(diagram) {
        this.labelProperties = new LabelProperties(this);
        this.connectorProperties = new ConnectorProperties(this.labelProperties);
        this.portProperties = new PortProperties(this);
        this.nodeProperties = new NodeProperties(this.labelProperties, this.portProperties);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.convertedData = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.items = [];
        this.diagram = diagram;
    }
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Getting the object data from the load diagram and serialize it into from EJ1 to EJ2
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EJ1SerializationModule.prototype.getSerializedData = function (data) {
        this.convertedData.mode = 'SVG';
        this.convertedData.basicElements = [];
        this.convertedData.width = data.width;
        this.convertedData.height = data.height;
        if (data.nodes && data.nodes.length > 0) {
            this.nodeProperties.renderNodesCollection(this.convertedData, data);
        }
        else {
            this.convertedData.nodes = data.nodes;
        }
        if (data.connectors && data.connectors.length > 0) {
            this.connectorProperties.renderConnectorsCollection(this.convertedData, data);
        }
        else {
            this.convertedData.connectors = data.connectors;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (data.defaultSettings !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.convertedData.getNodeDefaults = this.getNodeDefaults(data.defaultSettings.node);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.convertedData.getConnectorDefaults = this.getConnectorDefaults(data.defaultSettings.connector);
        }
        //this.convertedData.setNodeTemplate = this.getNodeTemplate((data as Diagram).nodeTemplate);
        this.setLayers(this.convertedData, data);
        this.setDataSourceSettings(this.convertedData, data);
        this.setRulerSettings(this.convertedData, data);
        this.setSnapSettings(this.convertedData, data);
        if (data.snapSettings.enableSnapToObject) {
            this.convertedData.snapSettings.constraints = this.convertedData.snapSettings.constraints | SnapConstraints.SnapToObject;
        }
        else {
            this.convertedData.snapSettings.constraints = this.convertedData.snapSettings.constraints & ~SnapConstraints.SnapToObject;
        }
        if (data.pageSettings.backgroundImage === undefined) {
            data.pageSettings.pageBackgroundColor = 'transparent';
            data.pageSettings.backgroundImage = {
                source: '',
                scale: 'meet',
                alignment: 'xmidymid'
            };
            data.pageSettings.showPageBreak = false;
        }
        this.setScrollSettings(this.convertedData, data);
        this.setPageSettings(this.convertedData, data);
        this.setContextMenu(this.convertedData, data);
        this.setTooltip(this.convertedData, data);
        this.setModelLayout(this.convertedData, data);
        this.setSelectedItems(this.convertedData, data);
        this.convertedData.constraints = this.setDiagramConstraints(data.constraints);
        this.convertedData.tool = this.setDiagramTool(data.tool);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.convertedData.drawType = data.drawType;
        this.convertedData.commandManager = data.commandManager;
        return this.convertedData;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //declare the node default properties
    EJ1SerializationModule.prototype.getNodeDefaults = function (node) {
        if (node) {
            return this.nodeProperties.convertToNode(node);
        }
        else {
            return null;
        }
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //declare the node default properties
    EJ1SerializationModule.prototype.getConnectorDefaults = function (connector) {
        if (connector) {
            return this.connectorProperties.convertToConnector(connector);
        }
        else {
            return null;
        }
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the layers from the EJ1 JSON
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EJ1SerializationModule.prototype.setLayers = function (convertedData, data) {
        var layers = [];
        if (data.layers.length > 0) {
            for (var i = 0; i < data.layers.length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var newLayer = {};
                var layer = data.layers[parseInt(i.toString(), 10)];
                newLayer.id = layer.id;
                newLayer.visible = layer.visible;
                newLayer.lock = layer.lock;
                newLayer.objects = layer.objects;
                convertedData.layers[parseInt(i.toString(), 10)] = newLayer;
            }
        }
        convertedData.layers = layers;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the dataSourceSettings from EJ1 to EJ2
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EJ1SerializationModule.prototype.setDataSourceSettings = function (convertedData, data) {
        convertedData.dataSourceSettings = {};
        convertedData.dataSourceSettings.id = data.dataSourceSettings.id;
        convertedData.dataSourceSettings.dataManager = data.dataSourceSettings.dataSource;
        convertedData.dataSourceSettings.root = data.dataSourceSettings.root;
        convertedData.dataSourceSettings.parentId = data.dataSourceSettings.parent;
        convertedData.dataSourceSettings.crudAction = {
            read: data.dataSourceSettings.crudAction.read,
            create: data.dataSourceSettings.crudAction.create,
            update: data.dataSourceSettings.crudAction.update,
            destroy: data.dataSourceSettings.crudAction.destroy,
            customFields: data.dataSourceSettings.customFields
        };
        if (data.dataSourceSettings.connectionDataSource) {
            convertedData.dataSourceSettings.connectionDataSource = {};
            convertedData.dataSourceSettings.connectionDataSource.id = data.dataSourceSettings.connectionDataSource.id;
            convertedData.dataSourceSettings.connectionDataSource.dataManager = data.dataSourceSettings.connectionDataSource.dataSource;
            convertedData.dataSourceSettings.connectionDataSource.sourceID = data.dataSourceSettings.connectionDataSource.sourceNode;
            convertedData.dataSourceSettings.connectionDataSource.targetID = data.dataSourceSettings.connectionDataSource.targetNode;
            convertedData.dataSourceSettings.connectionDataSource.sourcePointX = data.dataSourceSettings.connectionDataSource.sourcePointX;
            convertedData.dataSourceSettings.connectionDataSource.sourcePointY = data.dataSourceSettings.connectionDataSource.sourcePointY;
            convertedData.dataSourceSettings.connectionDataSource.targetPointX = data.dataSourceSettings.connectionDataSource.targetPointX;
            convertedData.dataSourceSettings.connectionDataSource.targetPointY = data.dataSourceSettings.connectionDataSource.targetPointY;
            convertedData.dataSourceSettings.connectionDataSource.crudAction = {
                read: data.dataSourceSettings.connectionDataSource.crudAction.read,
                create: data.dataSourceSettings.connectionDataSource.crudAction.create,
                update: data.dataSourceSettings.connectionDataSource.crudAction.update,
                destroy: data.dataSourceSettings.connectionDataSource.crudAction.destroy,
                customFields: data.dataSourceSettings.connectionDataSource.customFields
            };
        }
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the ruler settings
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EJ1SerializationModule.prototype.setRulerSettings = function (convertedData, data) {
        convertedData.rulerSettings = {};
        convertedData.rulerSettings.showRulers = data.rulerSettings.showRulers;
        convertedData.rulerSettings.horizontalRuler = this.setRulerProperties(data.rulerSettings.horizontalRuler);
        convertedData.rulerSettings.verticalRuler = this.setRulerProperties(data.rulerSettings.verticalRuler);
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the orientation of the ruler
    EJ1SerializationModule.prototype.setRulerProperties = function (ruler) {
        var rulerProperties = {};
        rulerProperties.interval = ruler.interval;
        rulerProperties.segmentWidth = ruler.segmentWidth;
        // rulerProperties.tickAlignment = ruler.tickAlignment === 'rightorbottom' ? 'RightOrBottom' : 'LeftOrTop';
        rulerProperties.markerColor = ruler.markerColor;
        rulerProperties.thickness = ruler.thickness;
        rulerProperties.arrangeTick = ruler.arrangeTick;
        return rulerProperties;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the snap settings
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EJ1SerializationModule.prototype.setSnapSettings = function (convertedData, data) {
        convertedData.snapSettings = {};
        if (data.snapSettings) {
            convertedData.snapSettings.horizontalGridLines = this.setGridLines(data.snapSettings.horizontalGridLines);
            convertedData.snapSettings.verticalGridLines = this.setGridLines(data.snapSettings.verticalGridLines);
            convertedData.snapSettings.snapAngle = data.snapSettings.snapAngle;
            convertedData.snapSettings.snapObjectDistance = data.snapSettings.snapObjectDistance;
            convertedData.snapSettings.constraints = this.setSnapConstraints(data.snapSettings.snapConstraints);
        }
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the snap constraints from EJ1 to EJ2
    EJ1SerializationModule.prototype.setSnapConstraints = function (constraints) {
        var snapConstraints = SnapConstraints.None;
        if (constraints & SnapConstraints.ShowHorizontalLines) {
            snapConstraints = snapConstraints | SnapConstraints.ShowHorizontalLines;
        }
        if (constraints & SnapConstraints.ShowVerticalLines) {
            snapConstraints = snapConstraints | SnapConstraints.ShowVerticalLines;
        }
        if (constraints & SnapConstraints.ShowLines) {
            snapConstraints = snapConstraints | SnapConstraints.ShowLines;
        }
        if (constraints & SnapConstraints.SnapToHorizontalLines) {
            snapConstraints = snapConstraints | SnapConstraints.SnapToHorizontalLines;
        }
        if (constraints & SnapConstraints.SnapToVerticalLines) {
            snapConstraints = snapConstraints | SnapConstraints.SnapToVerticalLines;
        }
        if (constraints & SnapConstraints.SnapToLines) {
            snapConstraints = snapConstraints | SnapConstraints.SnapToLines;
        }
        return snapConstraints;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the gridlines
    EJ1SerializationModule.prototype.setGridLines = function (gridlines) {
        var gridLinesProperties = {};
        gridLinesProperties.lineColor = gridlines.lineColor;
        gridLinesProperties.lineDashArray = gridlines.lineDashArray;
        gridLinesProperties.lineIntervals = gridlines.lineInterval;
        gridLinesProperties.snapIntervals = gridlines.snapInterval;
        return gridLinesProperties;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the scroll-settings
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EJ1SerializationModule.prototype.setScrollSettings = function (convertedData, data) {
        convertedData.scrollSettings = {
            horizontalOffset: data.scrollSettings.horizontalOffset,
            verticalOffset: data.scrollSettings.verticalOffset,
            currentZoom: data.scrollSettings.currentZoom,
            viewPortWidth: data.scrollSettings.viewPortWidth,
            viewPortHeight: data.scrollSettings.viewPortHeight,
            minZoom: data.scrollSettings.minZoom,
            maxZoom: data.scrollSettings.maxZoom,
            scrollLimit: (data.pageSettings.scrollLimit).charAt(0).toUpperCase() + (data.pageSettings.scrollLimit).slice(1),
            scrollableArea: data.pageSettings.scrollableArea,
            canAutoScroll: data.enableAutoScroll,
            autoScrollBorder: data.pageSettings.autoScrollBorder
        };
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the page settings
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EJ1SerializationModule.prototype.setPageSettings = function (convertedData, data) {
        convertedData.pageSettings = {
            width: data.pageSettings.pageWidth,
            height: data.pageSettings.pageHeight,
            // eslint-disable-next-line max-len
            margin: { left: data.pageSettings.pageMargin, right: data.pageSettings.pageMargin, top: data.pageSettings.pageMargin, bottom: data.pageSettings.pageMargin },
            orientation: (data.pageSettings.pageOrientation).charAt(0).toUpperCase() + (data.pageSettings.pageOrientation).slice(1),
            // eslint-disable-next-line max-len
            boundaryConstraints: (data.pageSettings.boundaryConstraints).charAt(0).toUpperCase() + (data.pageSettings.boundaryConstraints).slice(1),
            // eslint-disable-next-line max-len
            background: { color: data.pageSettings.pageBackgroundColor, source: data.backgroundImage.source, scale: data.backgroundImage.scale, align: data.backgroundImage.align },
            multiplePage: data.pageSettings.multiplePage,
            showPageBreaks: data.pageSettings.showPageBreak
        };
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Sets the contextmenu settings
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EJ1SerializationModule.prototype.setContextMenu = function (convertedData, data) {
        convertedData.contextMenuSettings = {};
        convertedData.contextMenuSettings.show = data.enableContextMenu;
        if (data.contextMenu !== undefined) {
            convertedData.contextMenuSettings.showCustomMenuOnly = data.contextMenu.showCustomMenuItemsOnly;
            convertedData.contextMenuSettings.items = this.getContextMenuItems(data.contextMenu.items);
        }
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the contextmenu items
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EJ1SerializationModule.prototype.getContextMenuItems = function (contextMenuItems) {
        var menuItem = {};
        for (var i = 0; i < contextMenuItems.length; i++) {
            var oldMenuItem = contextMenuItems[parseInt(i.toString(), 10)];
            menuItem.id = oldMenuItem.name;
            menuItem.text = oldMenuItem.text;
            this.items.push(menuItem);
            if (contextMenuItems.subItems && contextMenuItems.subItems.length > 0) {
                this.getContextMenuItems(contextMenuItems.subItems);
            }
        }
        return this.items;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the tooltip items
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EJ1SerializationModule.prototype.setTooltip = function (convertedData, data) {
        convertedData.tooltip = {
            content: data.tooltip.templateId,
            relativeMode: data.tooltip.relativeMode
        };
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Sets the model layout for the converted data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EJ1SerializationModule.prototype.setModelLayout = function (convertedData, data) {
        convertedData.layout = {
            fixedNode: data.layout.fixedNode,
            horizontalSpacing: data.layout.horizontalSpacing,
            verticalSpacing: data.layout.verticalSpacing,
            maxIteration: data.layout.maxIteration,
            springFactor: data.layout.springFactor,
            springLength: data.layout.springLength,
            // eslint-disable-next-line max-len
            margin: { left: data.layout.margin.left, right: data.layout.margin.right, top: data.layout.margin.top, bottom: data.layout.margin.bottom },
            horizontalAlignment: (data.layout.horizontalAlignment).charAt(0).toUpperCase() + (data.layout.horizontalAlignment).slice(1),
            verticalAlignment: (data.layout.verticalAlignment).charAt(0).toUpperCase() + (data.layout.verticalAlignment).slice(1),
            orientation: data.layout.orientation === 'rightorbottom' ? 'RightOrBottom' : 'LeftOrTop',
            connectorSegments: data.layout.getConnectorSegments,
            type: (data.layout.type).charAt(0).toUpperCase() + (data.layout.type).slice(1),
            getLayoutInfo: data.layout.getLayoutInfo,
            bounds: data.layout.bounds,
            root: data.layout.root,
        };
        if (data.layout && data.layout.type === "hierarchicaltree") {
            convertedData.layout.type = "None";
        }
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Sets the selected items to convert the data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EJ1SerializationModule.prototype.setSelectedItems = function (convertedData, data) {
        convertedData.selectedItems = {};
        var nodes = [];
        var connectors = [];
        if (data.children && data.children.length > 0) {
            for (var i = 0; i < data.children.length; i++) {
                var selectedElement = data.children[parseInt(i.toString(), 10)];
                if (selectedElement.segments) {
                    connectors.push(selectedElement);
                }
                else {
                    nodes.push(selectedElement);
                }
            }
        }
        convertedData.selectedItems.nodes = nodes;
        convertedData.selectedItems.connectors = connectors;
        convertedData.selectedItems.offsetX = data.selectedItems.offsetX;
        convertedData.selectedItems.offsetY = data.selectedItems.offsetY;
        convertedData.selectedItems.width = data.selectedItems.width;
        convertedData.selectedItems.height = data.selectedItems.height;
        convertedData.selectedItems.rotateAngle = data.selectedItems.rotateAngle;
        convertedData.selectedItems.constraints = this.setSelectorConstraints(data.selectedItems.constraints);
        convertedData.selectedItems.userHandles = data.selectedItems.userHandles;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the selector constraints from EJ1 to EJ2
    EJ1SerializationModule.prototype.setSelectorConstraints = function (constraints) {
        var selectorConstraints = SelectorConstraints.None;
        if (constraints & SelectorConstraints.ConnectorSourceThumb) {
            selectorConstraints = selectorConstraints | SelectorConstraints.Rotate;
        }
        if (constraints & SelectorConstraints.ResizeAll) {
            selectorConstraints = selectorConstraints | SelectorConstraints.ResizeAll;
        }
        if (constraints & SelectorConstraints.ResizeSouthEast) {
            selectorConstraints = selectorConstraints | SelectorConstraints.UserHandle;
        }
        if (constraints & SelectorConstraints.ToolTip) {
            selectorConstraints = selectorConstraints | SelectorConstraints.ToolTip;
        }
        if (constraints & SelectorConstraints.All) {
            selectorConstraints = selectorConstraints | SelectorConstraints.All;
        }
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the diagram constraints from EJ1 to EJ2
    EJ1SerializationModule.prototype.setDiagramConstraints = function (constraints) {
        var diagramConstraints = DiagramConstraints.None;
        if (constraints & DiagramConstraints.UserInteraction) {
            diagramConstraints = diagramConstraints | DiagramConstraints.UserInteraction;
        }
        if (constraints & DiagramConstraints.ApiUpdate) {
            diagramConstraints = diagramConstraints | DiagramConstraints.ApiUpdate;
        }
        if (constraints & DiagramConstraints.PageEditable) {
            diagramConstraints = diagramConstraints | DiagramConstraints.PageEditable;
        }
        if (constraints & DiagramConstraints.LineRouting) {
            diagramConstraints = diagramConstraints | DiagramConstraints.Bridging;
        }
        if (constraints & DiagramConstraints.Zoom) {
            diagramConstraints = diagramConstraints | DiagramConstraints.Zoom;
        }
        if (constraints & DiagramConstraints.PanX) {
            diagramConstraints = diagramConstraints | DiagramConstraints.PanX;
        }
        if (constraints & DiagramConstraints.PanY) {
            diagramConstraints = diagramConstraints | DiagramConstraints.PanY;
        }
        if (constraints & DiagramConstraints.Pan) {
            diagramConstraints = diagramConstraints | DiagramConstraints.Pan;
        }
        if (constraints & DiagramConstraints.UndoRedo) {
            diagramConstraints = diagramConstraints | DiagramConstraints.UndoRedo;
        }
        if (constraints & DiagramConstraints.ZoomTextEdit) {
            diagramConstraints = diagramConstraints | DiagramConstraints.ZoomTextEdit;
        }
        return diagramConstraints;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the diagram tool from EJ1 to EJ2
    EJ1SerializationModule.prototype.setDiagramTool = function (tool) {
        var diagramTool = DiagramTools.None;
        if (tool & DiagramTools.MultipleSelect) {
            diagramTool = diagramTool | DiagramTools.SingleSelect;
        }
        if (tool & DiagramTools.ZoomPan) {
            diagramTool = diagramTool | DiagramTools.MultipleSelect;
        }
        if (tool & DiagramTools.DrawOnce) {
            diagramTool = diagramTool | DiagramTools.ZoomPan;
        }
        if (tool & DiagramTools.ContinuousDraw) {
            diagramTool = diagramTool | DiagramTools.DrawOnce;
        }
        if (tool & DiagramTools.ContinuousDraw) {
            diagramTool = diagramTool | DiagramTools.ContinuousDraw;
        }
        return diagramTool;
    };
    //     /* tslint:disable */
    // /**
    //  * To provide the array of modules needed for control rendering
    //  *
    //  * @returns {ModuleDeclaration[]} To provide the array of modules needed for control rendering .\
    //  * @private
    //  */
    //  public requiredModules(): ModuleDeclaration[] {
    //     const modules: ModuleDeclaration[] = [];
    //     modules.push({
    //         member: 'NodeProperties',
    //         args: []
    //     });
    //  return modules;
    //  }
    /**
 *To destroy the ruler
 *
 * @returns {void} To destroy the ruler
 */
    EJ1SerializationModule.prototype.destroy = function () {
        /**
         * Destroys the Print and Export module
         */
    };
    /**
 * Get module name.
 */
    EJ1SerializationModule.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'EJ1SerializationModule';
    };
    return EJ1SerializationModule;
}());
export { EJ1SerializationModule };
