import { ConnectorConstraints } from "../enum/enum";
var ConnectorProperties = /** @class */ (function () {
    function ConnectorProperties(labelProperties) {
        this.labelProperties = labelProperties;
    }
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Convert and render the connector collection from EJ1 to EJ2
    ConnectorProperties.prototype.renderConnectorsCollection = function (convertedData, data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        convertedData.connectors = [];
        var connectors = [];
        for (var i = 0; i < data.connectors.length; i++) {
            var connector = data.connectors[parseInt(i.toString(), 10)];
            var newConnector = this.convertToConnector(connector);
            connectors.push(newConnector);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        convertedData.connectors = connectors;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Convert and render the connector properties from EJ1 to EJ2
    ConnectorProperties.prototype.convertToConnector = function (connector) {
        var newConnector = {};
        newConnector.style = {};
        if (connector.name) {
            newConnector.id = connector.name;
        }
        if (connector.addInfo) {
            newConnector.addInfo = connector.addInfo;
        }
        if (connector.bridgeSpace) {
            newConnector.bridgeSpace = connector.bridgeSpace;
        }
        if (connector.constraints) {
            newConnector.constraints = this.setConnectorConstraints(connector.constraints);
        }
        if (connector.cornerRadius) {
            newConnector.cornerRadius = connector.cornerRadius;
        }
        if (connector.labels) {
            newConnector.annotations = this.labelProperties.setLabelProperties(connector.labels, connector);
        }
        if (connector.lineColor) {
            newConnector.style.fill = connector.lineColor;
        }
        if (connector.lineWidth) {
            newConnector.style.strokeWidth = connector.lineWidth;
        }
        if (connector.lineDashArray) {
            newConnector.style.strokeDashArray = connector.lineDashArray;
        }
        if (connector.opacity) {
            newConnector.style.opacity = connector.opacity;
        }
        if (connector.lineHitPadding) {
            newConnector.hitPadding = connector.lineHitPadding;
        }
        if (connector.margin) {
            // eslint-disable-next-line max-len
            newConnector.margin = { left: connector.margin.left, right: connector.margin.right, top: connector.margin.top, bottom: connector.margin.bottom };
        }
        if (connector.segments) {
            newConnector.type = connector.segments[0].type;
            newConnector.segments = this.setConnectorSegments(connector.segments);
        }
        if (connector.shape) {
            newConnector.shape = this.getConnectorShape(connector.shape);
        }
        if (connector.sourceDecorator) {
            newConnector.sourceDecorator = {
                height: connector.sourceDecorator.height,
                width: connector.sourceDecorator.width,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                shape: (this.getDecoratorShape(connector.sourceDecorator.shape)),
                pathData: connector.sourceDecorator.pathData,
                style: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    fill: connector.sourceDecorator.fillColor,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    strokeColor: connector.sourceDecorator.lineColor,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    strokeWidth: connector.sourceDecorator.lineWidth
                },
            };
        }
        if (connector.targetDecorator) {
            newConnector.targetDecorator = {
                height: connector.targetDecorator.height,
                width: connector.targetDecorator.width,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                shape: this.getDecoratorShape(connector.targetDecorator.shape),
                pathData: connector.targetDecorator.pathData,
                style: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    fill: connector.targetDecorator.fillColor,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    strokeColor: connector.targetDecorator.lineColor,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    strokeWidth: connector.targetDecorator.lineWidth
                },
            };
        }
        if (connector.sourceID) {
            newConnector.sourceID = connector.sourceID;
        }
        if (connector.targetID) {
            newConnector.targetID = connector.targetID;
        }
        if (connector.sourcePoint) {
            newConnector.sourcePoint = { x: connector.sourcePoint.x, y: connector.sourcePoint.y };
        }
        if (connector.targetPoint) {
            newConnector.targetPoint = { x: connector.targetPoint.x, y: connector.targetPoint.y };
        }
        if (connector.sourcePortID) {
            newConnector.sourcePortID = connector.sourcePortID;
        }
        if (connector.targetPortID) {
            newConnector.targetPortID = connector.targetPortID;
        }
        if (connector.tooltip) {
            newConnector.tooltip = {
                content: connector.tooltip.content,
                relativeMode: connector.tooltip.relativeMode
            };
        }
        if (connector.visible) {
            newConnector.visible = connector.visible;
        }
        if (connector.zIndex) {
            newConnector.zIndex = connector.zIndex;
        }
        return newConnector;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Convert and assign the connector shapes from EJ1 to EJ2
    ConnectorProperties.prototype.getConnectorShape = function (shape) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var connectorShape = null;
        if (shape) {
            if (shape.type === 'bpmn') {
                connectorShape = {
                    type: 'Bpmn',
                    flow: (shape.flow).charAt(0).toUpperCase() + (shape.flow).slice(1),
                };
                if (shape.flow === 'sequence') {
                    connectorShape.sequence = (shape.sequence).charAt(0).toUpperCase() + (shape.sequence).slice(1);
                }
                else if (shape.flow === 'association') {
                    connectorShape.association = (shape.association).charAt(0).toUpperCase() + (shape.association).slice(1);
                }
                else {
                    connectorShape.message = (shape.message).charAt(0).toUpperCase() + (shape.message).slice(1);
                }
            }
            if (shape.type === 'umlclassifier') {
                connectorShape = {
                    type: 'UmlClassifier',
                    relationship: (shape.relationship).charAt(0).toUpperCase() + (shape.relationship).slice(1),
                    multiplicity: {
                        type: (shape.multiplicity.type).charAt(0).toUpperCase() + (shape.multiplicity.type).slice(1),
                        source: {
                            upperBounds: shape.multiplicity.source.upperBounds,
                            optional: shape.multiplicity.source.optional,
                            lowerBounds: shape.multiplicity.source.lowerBounds
                        },
                        target: {
                            upperBounds: shape.multiplicity.target.upperBounds,
                            optional: shape.multiplicity.target.optional,
                            lowerBounds: shape.multiplicity.target.lowerBounds
                        }
                    }
                };
            }
            if (shape.type === 'umlactivity') {
                connectorShape = {
                    type: 'UmlActivity',
                    flow: (shape.flow).charAt(0).toUpperCase() + (shape.flow).slice(1)
                };
            }
        }
        return connectorShape;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Sets the connector decorator shapes from EJ1 to EJ2
    ConnectorProperties.prototype.getDecoratorShape = function (shape) {
        var decoratorShape = 'None';
        if (shape === 'path') {
            decoratorShape = 'Custom';
        }
        else {
            decoratorShape = (shape).charAt(0).toUpperCase() + (shape).slice(1);
        }
        return decoratorShape;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Convert and render the connector collection from EJ1 to EJ2
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ConnectorProperties.prototype.setConnectorSegments = function (segments) {
        var connectorSegments = [];
        if (segments.length > 0) {
            for (var i = 0; i < segments.length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var segment = {};
                var segmentProp = segments[parseInt(i.toString(), 10)];
                // eslint-disable-next-line max-len
                segment.direction = segmentProp.direction ? segmentProp.direction.charAt(0).toUpperCase() + segmentProp.direction.slice(1) : segmentProp._direction ? segmentProp._direction.charAt(0).toUpperCase() + segmentProp._direction.slice(1) : null;
                segment.length = segmentProp.length;
                segment.point = segmentProp.point ? { x: segmentProp.point.x, y: segmentProp.point.y } : null;
                segment.point1 = segmentProp.point1 ? { x: segmentProp.point1.x, y: segmentProp.point1.y } : null;
                segment.point2 = segmentProp.point2 ? { x: segmentProp.point2.x, y: segmentProp.point2.y } : null;
                // eslint-disable-next-line max-len
                segment.vector1 = segmentProp.vector1 ? { angle: segmentProp.vector1.angle, distance: segmentProp.vector1.distance } : null;
                // eslint-disable-next-line max-len
                segment.vector2 = segmentProp.vector2 ? { angle: segmentProp.vector2.angle, distance: segmentProp.vector2.distance } : null;
                if (segmentProp.points)
                    segment.points = this.getSegmentPoints(segmentProp.points);
                if (segmentProp.type)
                    segment.type = (segmentProp.type).charAt(0).toUpperCase() + (segmentProp.type).slice(1);
                connectorSegments.push(segment);
            }
        }
        return connectorSegments;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Render the connector Segment points from EJ1 to EJ2
    ConnectorProperties.prototype.getSegmentPoints = function (points) {
        var pointsCollection = [];
        if (points.length > 0) {
            for (var i = 0; i < points.length; i++) {
                var newPoint = {};
                var point = points[parseInt(i.toString(), 10)];
                newPoint.x = point.x;
                newPoint.y = point.y;
                pointsCollection.push(newPoint);
            }
        }
        return pointsCollection;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Sets the connector constraints
    ConnectorProperties.prototype.setConnectorConstraints = function (constraints) {
        var connectorConstraints = ConnectorConstraints.None;
        if (constraints & ConnectorConstraints.Select) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.Select;
        }
        if (constraints & ConnectorConstraints.Delete) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.Delete;
        }
        if (constraints & ConnectorConstraints.Drag) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.Drag;
        }
        if (constraints & ConnectorConstraints.DragSourceEnd) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.DragSourceEnd;
        }
        if (constraints & ConnectorConstraints.DragTargetEnd) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.DragTargetEnd;
        }
        if (constraints & ConnectorConstraints.DragSegmentThumb) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.DragSegmentThumb;
        }
        if (constraints & ConnectorConstraints.Bridging) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.Bridging;
        }
        if (constraints & ConnectorConstraints.InheritBridging) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.InheritBridging;
        }
        if (constraints & ConnectorConstraints.AllowDrop) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.AllowDrop;
        }
        if (constraints & ConnectorConstraints.InheritTooltip) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.InheritTooltip;
        }
        if (constraints & ConnectorConstraints.PointerEvents) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.PointerEvents;
        }
        if (constraints & ConnectorConstraints.BridgeObstacle) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.BridgeObstacle;
        }
        if (constraints & ConnectorConstraints.Interaction) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.Interaction;
        }
        if (constraints & ConnectorConstraints.Default) {
            connectorConstraints = connectorConstraints | ConnectorConstraints.Default;
        }
        return connectorConstraints;
    };
    /**
*To destroy the ruler
*
* @returns {void} To destroy the ruler
*/
    ConnectorProperties.prototype.destroy = function () {
        /**
         * Destroys the Node properties module
         */
    };
    /**
 * Get module name.
 */
    ConnectorProperties.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'ConnectorProperties';
    };
    return ConnectorProperties;
}());
export { ConnectorProperties };
