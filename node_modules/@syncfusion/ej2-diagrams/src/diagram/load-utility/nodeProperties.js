import { NodeConstraints } from "../enum/enum";
var NodeProperties = /** @class */ (function () {
    function NodeProperties(labelProperties, portProperties) {
        this.labelProperties = labelProperties;
        this.portProperties = portProperties;
    }
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Convert and render the node collection from EJ1 to EJ2
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    NodeProperties.prototype.renderNodesCollection = function (convertedData, data) {
        convertedData.nodes = [];
        var nodes = [];
        for (var i = 0; i < data.nodes.length; i++) {
            var node = data.nodes[parseInt(i.toString(), 10)];
            var processCollection = [];
            var newNode = this.convertToNode(node);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            // eslint-disable-next-line max-len
            if (newNode.shape && newNode.shape.activity && newNode.shape.activity.subProcess && newNode.shape.activity.subProcess.processes.length > 0) {
                var processName = [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                for (var k = 0; k < newNode.shape.activity.subProcess.processes.length; k++) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var processes = newNode.shape.activity.subProcess.processes[parseInt(k.toString(), 10)];
                    processes.margin.right = 0;
                    processes.margin.bottom = 0;
                    processes.processId = newNode.id;
                    processName.push(processes.id);
                    processCollection.push(processes);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                newNode.shape.activity.subProcess.processes = processName;
            }
            if (node.type === 'group' && !node.isSwimlane) {
                var childCollection = [];
                if (newNode.children && newNode.children.length > 0) {
                    for (var j = 0; j < newNode.children.length; j++) {
                        var child = newNode.children[parseInt(i.toString(), 10)];
                        nodes.push(child);
                        childCollection.push(child);
                    }
                    newNode.children = childCollection;
                }
            }
            nodes.push(newNode);
            if (processCollection && processCollection.length > 0) {
                nodes = nodes.concat(processCollection);
            }
        }
        convertedData.nodes = nodes;
        return convertedData.nodes;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Convert the node from EJ1 to EJ2 and assign all the properties
    NodeProperties.prototype.convertToNode = function (node) {
        var newNode = {};
        newNode.style = {};
        newNode.margin = {};
        if (node.name) {
            newNode.id = node.name;
        }
        if (node.fillColor) {
            newNode.style.fill = node.fillColor;
        }
        if (node.borderColor) {
            newNode.style.strokeColor = node.borderColor;
        }
        if (node.borderWidth) {
            newNode.style.strokeWidth = node.borderWidth;
        }
        if (node.borderDashArray) {
            newNode.style.strokeDashArray = node.borderDashArray;
        }
        if (node.opacity) {
            newNode.style.opacity = node.opacity;
        }
        if (node.gradient) {
            newNode.style.gradient = this.setGradient(node.gradient);
        }
        if (node.isExpanded) {
            newNode.isExpanded = node.isExpanded;
        }
        if (node.width) {
            newNode.width = node.width;
        }
        if (node.height) {
            newNode.height = node.height;
        }
        if (node.offsetX) {
            newNode.offsetX = node.offsetX;
        }
        if (node.offsetY) {
            newNode.offsetY = node.offsetY;
        }
        if (node.visible) {
            newNode.visible = node.visible;
        }
        newNode.zIndex = node.zOrder === -1 ? -1 : node.zOrder;
        if (node.excludeFromLayout) {
            newNode.excludeFromLayout = node.excludeFromLayout;
        }
        if (node.rotateAngle) {
            newNode.rotateAngle = node.rotateAngle;
        }
        if (node.pivot) {
            newNode.pivot = node.pivot;
        }
        if (node.addInfo) {
            newNode.addInfo = node.addInfo;
        }
        if (node.marginLeft) {
            newNode.margin.left = node.marginLeft;
        }
        if (node.marginRight) {
            newNode.margin.right = node.marginRight;
        }
        if (node.marginTop) {
            newNode.margin.top = node.marginTop;
        }
        if (node.marginBottom) {
            newNode.margin.bottom = node.marginBottom;
        }
        if (node.horizontalAlign) {
            newNode.horizontalAlignment = node.horizontalAlign;
        }
        if (node.verticalAlign) {
            newNode.verticalAlignment = node.verticalAlign;
        }
        if (node.constraints) {
            newNode.constraints = this.setNodeConstraints(node.constraints);
        }
        if (node.labels) {
            newNode.annotations = this.labelProperties.setLabelProperties(node.labels, undefined);
        }
        if (node.shadow) {
            newNode.shadow = {
                angle: node.shadow.angle, opacity: node.shadow.opacity, distance: node.shadow.distance
            };
        }
        if (node.tooltip) {
            newNode.tooltip = {
                // content: this.getTemplateContent(node.tooltip.templateId),
                relativeMode: node.tooltip.relativeMode
            };
        }
        if (node.expandIcon) {
            newNode.expandIcon = {
                shape: (node.expandIcon.shape),
                width: node.expandIcon.width, height: node.expandIcon.height,
                margin: {
                    left: node.expandIcon.margin ? node.expandIcon.margin.left : 0,
                    right: node.expandIcon.margin ? node.expandIcon.margin.right : 0,
                    top: node.expandIcon.margin ? node.expandIcon.margin.top : 0,
                    bottom: node.expandIcon.margin ? node.expandIcon.margin.bottom : 0
                },
                offset: {
                    x: node.expandIcon.offset ? node.expandIcon.offset.x : 0.5,
                    y: node.expandIcon.offset ? node.expandIcon.offset.y : 1
                },
                borderColor: node.expandIcon.borderColor, borderWidth: node.expandIcon.borderWidth,
                cornerRadius: node.expandIcon.cornerRadius,
                //fill: (node.expandIcon as any).fillColor,
                pathData: node.expandIcon.pathData,
            };
        }
        if (node.collapseIcon) {
            newNode.collapseIcon = {
                shape: (node.collapseIcon.shape),
                width: node.collapseIcon.width, height: node.collapseIcon.height,
                margin: {
                    left: node.collapseIcon.margin ? node.collapseIcon.margin.left : 0,
                    right: node.collapseIcon.margin ? node.collapseIcon.margin.right : 0,
                    top: node.collapseIcon.margin ? node.collapseIcon.margin.top : 0,
                    bottom: node.collapseIcon.margin ? node.collapseIcon.margin.bottom : 0
                },
                offset: {
                    x: node.collapseIcon.offset ? node.collapseIcon.offset.x : 0.5,
                    y: node.collapseIcon.offset ? node.collapseIcon.offset.y : 1
                },
                borderColor: node.collapseIcon.borderColor, borderWidth: node.collapseIcon.borderWidth,
                cornerRadius: node.collapseIcon.cornerRadius,
                // fill: (node.collapseIcon as any).fillColor,
                pathData: node.collapseIcon.pathData,
            };
        }
        if (node.ports) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            newNode.ports = this.portProperties.setPortProperties(node.ports);
        }
        if (node.children) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (node.type !== 'bpmn' && !node.isSwimlane) {
                newNode.children = this.getChildren(newNode, node);
            }
        }
        newNode.minWidth = node.minWidth;
        newNode.maxWidth = node.maxWidth;
        newNode.minHeight = node.minHeight;
        newNode.maxHeight = node.maxHeight;
        if (node.shape || node.type) {
            newNode = this.setShape(newNode, node);
        }
        return newNode;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Iterate the swimlane child nodes and assign all the node properties from the EJ1 to EJ2
    NodeProperties.prototype.getChildren = function (newNode, node) {
        if (node.children && node.children.length > 0) {
            var newChild = [];
            for (var i = 0; i < node.children.length; i++) {
                var child = this.convertToNode(node.children[parseInt(i.toString(), 10)]);
                if (child.children) {
                    this.getChildren(newNode, child);
                }
                newChild.push(child);
            }
            newNode.children = newChild;
        }
        return newNode.children;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Sets the shapes for all the node from conversion
    NodeProperties.prototype.setShape = function (newNode, node) {
        switch (node.type) {
            case 'basic':
                var basicShape = (node.shape).charAt(0).toUpperCase() + (node.shape).slice(1);
                if (node.shape === 'path') {
                    newNode.shape = { type: 'Path', data: node.pathData };
                }
                else {
                    newNode.shape = {
                        type: 'Basic', shape: basicShape, cornerRadius: node.cornerRadius, points: node.points
                    };
                }
                break;
            case 'flow':
                var flowShape = (node.shape).charAt(0).toUpperCase() + (node.shape).slice(1);
                newNode.shape = {
                    type: 'Flow', shape: flowShape
                };
                break;
            case 'umlactivity':
                newNode.shape = {
                    type: 'UmlActivity', shape: (node.shape).charAt(0).toUpperCase() + (node.shape).slice(1)
                };
                break;
            case 'image':
                newNode.shape = {
                    type: 'Image', source: node.source, align: this.getImageContentAlignment(node.contentAlignment),
                    scale: (node.scale).charAt(0).toUpperCase() + (node.scale).slice(1)
                };
                break;
            case 'html':
                newNode.shape = { type: 'HTML' };
                break;
            case 'native':
                newNode.shape = { type: 'Native' };
                break;
            case 'text':
                newNode.shape = { type: 'Text', content: node.textBlock.text };
                break;
            case 'bpmn':
                newNode.shape = this.renderBpmnShape(newNode, node);
                break;
            case 'group':
                if (node.isSwimlane) {
                    newNode.shape = this.renderSwimlaneShape(newNode, node);
                }
        }
        return newNode;
    };
    NodeProperties.prototype.getImageContentAlignment = function (option) {
        if (option) {
            switch (option) {
                case 'xminymin':
                    return 'XMinYMin';
                case 'xminymid':
                    return 'XMinYMid';
                case 'xminymax':
                    return 'XMinYMax';
                case 'xmidymin':
                    return 'XMidYMin';
                case 'xmidymid':
                    return 'XMidYMid';
                case 'xmidymax':
                    return 'XMidYMax';
                case 'xmaxymin':
                    return 'XMaxYMin';
                case 'xmaxymid':
                    return 'XMaxYMid';
                case 'xmaxymax':
                    return 'XMaxYMax';
                case 'none':
                    return 'None';
            }
        }
        return 'None';
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    // Sets the node constraints from EJ1 to EJ2
    NodeProperties.prototype.setNodeConstraints = function (constraints) {
        var nodeConstraints = NodeConstraints.None;
        if (constraints & NodeConstraints.Select) {
            nodeConstraints = nodeConstraints | NodeConstraints.Select;
        }
        if (constraints & NodeConstraints.Delete) {
            nodeConstraints = nodeConstraints | NodeConstraints.Delete;
        }
        if (constraints & NodeConstraints.Drag) {
            nodeConstraints = nodeConstraints | NodeConstraints.Drag;
        }
        if (constraints & NodeConstraints.Rotate) {
            nodeConstraints = nodeConstraints | NodeConstraints.Rotate;
        }
        if (constraints & NodeConstraints.ResizeNorthEast) {
            nodeConstraints = nodeConstraints | NodeConstraints.ResizeNorthEast;
        }
        if (constraints & NodeConstraints.ResizeEast) {
            nodeConstraints = nodeConstraints | NodeConstraints.ResizeEast;
        }
        if (constraints & NodeConstraints.OutConnect) {
            nodeConstraints = nodeConstraints | NodeConstraints.ResizeSouthEast;
        }
        if (constraints & NodeConstraints.Expandable) {
            nodeConstraints = nodeConstraints | NodeConstraints.ResizeSouth;
        }
        if (constraints & NodeConstraints.AllowDrop) {
            nodeConstraints = nodeConstraints | NodeConstraints.ResizeSouthWest;
        }
        if (constraints & NodeConstraints.ResizeNorthEast) {
            nodeConstraints = nodeConstraints | NodeConstraints.ResizeWest;
        }
        if (constraints & NodeConstraints.ResizeEast) {
            nodeConstraints = nodeConstraints | NodeConstraints.ResizeNorthWest;
        }
        if (constraints & NodeConstraints.ResizeNorth) {
            nodeConstraints = nodeConstraints | NodeConstraints.ResizeNorth;
        }
        if (constraints & NodeConstraints.Resize) {
            nodeConstraints = nodeConstraints | NodeConstraints.Resize;
        }
        if (constraints & NodeConstraints.ResizeSouthEast) {
            nodeConstraints = nodeConstraints | NodeConstraints.Shadow;
        }
        if (constraints & NodeConstraints.AspectRatio) {
            nodeConstraints = nodeConstraints | NodeConstraints.AspectRatio;
        }
        if (constraints & NodeConstraints.ResizeNorthWest) {
            nodeConstraints = nodeConstraints | NodeConstraints.AllowDrop;
        }
        if (constraints & NodeConstraints.ResizeNorth) {
            nodeConstraints = nodeConstraints | NodeConstraints.InheritTooltip;
        }
        if (constraints & NodeConstraints.PointerEvents) {
            nodeConstraints = nodeConstraints | NodeConstraints.PointerEvents;
        }
        if (constraints & NodeConstraints.Inherit) {
            nodeConstraints = nodeConstraints | NodeConstraints.Inherit;
        }
        return nodeConstraints;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Sets the gradient for the nodes
    NodeProperties.prototype.setGradient = function (gradient) {
        var newGradient = {};
        if (gradient) {
            if (gradient.type === 'linear') {
                newGradient = {
                    type: 'Linear',
                    x1: gradient.x1, x2: gradient.x2, y1: gradient.y1, y2: gradient.y2,
                    stops: this.getGradientStops(gradient.stops)
                };
            }
            else if (gradient.type === 'radial') {
                newGradient = {
                    type: 'Radial',
                    cx: gradient.cx, cy: gradient.cy, fx: gradient.fx, fy: gradient.fy,
                    stops: this.getGradientStops(gradient.stops)
                };
            }
        }
        return newGradient;
    };
    NodeProperties.prototype.getGradientStops = function (gradientStops) {
        var stopsCollection = [];
        for (var i = 0; i < gradientStops.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var newStop = {};
            var stop_1 = gradientStops[parseInt(i.toString(), 10)];
            newStop.color = stop_1.color;
            newStop.offset = stop_1.offset;
            stopsCollection.push(newStop);
        }
        return stopsCollection;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Assign the BPMN shape values from the EJ1
    NodeProperties.prototype.renderBpmnShape = function (newNode, node) {
        if (node.shape === 'event') {
            newNode.shape = {
                type: 'Bpmn',
                shape: (node.shape).charAt(0).toUpperCase() + (node.shape).slice(1),
                event: {
                    event: (node.event).charAt(0).toUpperCase() + (node.event).slice(1),
                    trigger: (node.trigger).charAt(0).toUpperCase() + (node.trigger).slice(1)
                }
            };
        }
        else if (node.shape === 'gateway') {
            newNode.shape = {
                type: 'Bpmn',
                shape: (node.shape).charAt(0).toUpperCase() + (node.shape).slice(1),
                gateway: {
                    type: (node.gateway).charAt(0).toUpperCase() + (node.gateway).slice(1)
                }
            };
        }
        else if (node.shape === 'activity') {
            newNode.shape = {
                type: 'Bpmn',
                shape: (node.shape).charAt(0).toUpperCase() + (node.shape).slice(1),
                activity: {
                    activity: (node.activity).charAt(0).toUpperCase() + (node.activity).slice(1)
                }
            };
            if (node.activity === 'task') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                newNode.shape.activity.task = {
                    type: (node.task.type).charAt(0).toUpperCase() + (node.task.type).slice(1),
                    loop: (node.task.loop).charAt(0).toUpperCase() + (node.task.loop).slice(1),
                    compensation: node.task.compensation,
                    call: node.task.call
                };
            }
            if (node.activity === 'subprocess') {
                if (node.subProcess.type === 'event') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    newNode.shape.activity.subProcess = {
                        collapsed: node.subProcess.collapsed,
                        compensation: node.subProcess.compensation,
                        adhoc: node.subProcess.adhoc,
                        loop: (node.subProcess.loop).charAt(0).toUpperCase() + (node.subprocess.loop).slice(1),
                        boundary: (node.subProcess.boundary).charAt(0).toUpperCase() + (node.subprocess.boundary).slice(1),
                        type: (node.subProcess.type).charAt(0).toUpperCase() + (node.subprocess.type).slice(1),
                        event: {
                            event: (node.event).charAt(0).toUpperCase() + (node.event).slice(1),
                            trigger: (node.trigger).charAt(0).toUpperCase() + (node.trigger).slice(1)
                        }
                    };
                }
                else if (node.subProcess.type === 'transaction') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    newNode.shape.activity.subProcess = {
                        collapsed: node.subProcess.collapsed,
                        compensation: node.subProcess.compensation,
                        adhoc: node.subProcess.adhoc,
                        loop: (node.subProcess.loop).charAt(0).toUpperCase() + (node.subprocess.loop).slice(1),
                        boundary: (node.subProcess.boundary).charAt(0).toUpperCase() + (node.subprocess.boundary).slice(1),
                        type: (node.subProcess.type).charAt(0).toUpperCase() + (node.subprocess.type).slice(1),
                        events: this.renderEventsCollection(node.subProcess.events),
                        processes: this.renderProcessesCollection(node)
                    };
                }
            }
        }
        else if (node.shape === 'dataobject') {
            newNode.shape = {
                type: 'Bpmn',
                shape: (node.shape).charAt(0).toUpperCase() + (node.shape).slice(1),
            };
            if (node.annotation) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                newNode.shape.annotation = {
                    text: node.annotation.text,
                    angle: node.annotation.angle,
                    width: node.annotation.width,
                    height: node.annotation.height,
                    length: node.annotation.length
                };
            }
        }
        else {
            newNode.shape = {
                type: 'Bpmn',
                shape: (node.shape).charAt(0).toUpperCase() + (node.shape).slice(1),
            };
        }
        return newNode.shape;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Renders the swimlane from the conversion
    NodeProperties.prototype.renderSwimlaneShape = function (newNode, node) {
        newNode.shape = {
            type: 'SwimLane', orientation: (node.orientation).charAt(0).toUpperCase() + (node.orientation).slice(1),
            header: {
                annotation: { content: node.header.text },
                height: 50, style: { fontSize: node.header.fontSize, color: node.header.fontColor, fill: node.header.fillColor },
            },
        };
        var lanes = [];
        var phases = [];
        for (var i = 0; i < node.lanes.length; i++) {
            lanes[parseInt(i.toString(), 10)] = {
                header: {
                    annotation: {
                        content: node.lanes[parseInt(i.toString(), 10)].header.text, width: node.lanes[parseInt(i.toString(), 10)].header.width,
                        style: { fontSize: node.lanes[parseInt(i.toString(), 10)].header.fontSize, color: node.lanes[parseInt(i.toString(), 10)].header.fontColor }
                    },
                },
                style: { fill: node.lanes[parseInt(i.toString(), 10)].fillColor },
                children: []
            };
            for (var j = 0; j < node.lanes[parseInt(i.toString(), 10)].children.length; j++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var childNode = this.convertToNode(node.lanes[parseInt(i.toString(), 10)].children[parseInt(j.toString(), 10)]);
                if (childNode.wrapper == null) {
                    childNode.wrapper = {
                        actualSize: { width: childNode.width, height: childNode.height },
                        offsetX: childNode.offsetX, offsetY: childNode.offsetY
                    };
                }
                lanes[parseInt(i.toString(), 10)].children.push(childNode);
            }
        }
        for (var i = 0; i < node.phases.length; i++) {
            phases[parseInt(i.toString(), 10)] = {
                header: {
                    annotation: {
                        content: node.phases[parseInt(i.toString(), 10)].label.text,
                        // eslint-disable-next-line max-len
                        style: { fill: node.phases[parseInt(i.toString(), 10)].label.fillColor, fontSize: node.phases[parseInt(i.toString(), 10)].label.fontSize, color: node.phases[parseInt(i.toString(), 10)].label.fontColor }
                    },
                },
                offset: node.phases[parseInt(i.toString(), 10)].offset,
                // eslint-disable-next-line max-len
                style: { fill: node.phases[parseInt(i.toString(), 10)].fillColor, strokeColor: node.phases[parseInt(i.toString(), 10)].lineColor, strokeDashArray: node.phases[parseInt(i.toString(), 10)].lineDashArray }
            };
        }
        newNode.shape.lanes = lanes;
        newNode.shape.phases = phases;
        return newNode.shape;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Rendered the event collections for the node properties
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    NodeProperties.prototype.renderEventsCollection = function (subProcessEvents) {
        var eventsCollection = [];
        if (subProcessEvents.length > 0) {
            for (var i = 0; i < subProcessEvents.length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var newEvent = void 0;
                var eventObject = subProcessEvents[parseInt(i.toString(), 10)];
                newEvent.event = (eventObject.event).charAt(0).toUpperCase() + (eventObject.event).slice(1);
                newEvent.trigger = (eventObject.trigger).charAt(0).toUpperCase() + (eventObject.trigger).slice(1);
                newEvent.offset = { x: eventObject.offset.x, y: eventObject.offset.y };
                eventsCollection.push(newEvent);
            }
        }
        return eventsCollection;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Rendered the process collections for the node properties
    NodeProperties.prototype.renderProcessesCollection = function (node) {
        var processesCollection = [];
        if (node.subProcess && node.subProcess.processes.length > 0) {
            for (var i = 0; i < node.subProcess.processes.length; i++) {
                var processObject = node.subProcess.processes[parseInt(i.toString(), 10)];
                var data = this.convertToNode(processObject);
                processesCollection.push(data);
            }
        }
        return processesCollection;
    };
    /**
*To destroy the ruler
*
* @returns {void} To destroy the ruler
*/
    NodeProperties.prototype.destroy = function () {
        /**
         * Destroys the Node properties module
         */
    };
    /**
 * Get module name.
 */
    NodeProperties.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'NodeProperties';
    };
    return NodeProperties;
}());
export { NodeProperties };
