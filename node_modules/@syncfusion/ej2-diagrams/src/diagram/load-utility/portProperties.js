import { PortConstraints, PortVisibility } from "../enum/enum";
var PortProperties = /** @class */ (function () {
    function PortProperties(modelProperties) {
        this.modelProperties = modelProperties;
    }
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Convert and assign EJ1 to EJ2 port properties
    PortProperties.prototype.setPortProperties = function (oldPorts) {
        var portCollection = [];
        if (oldPorts.length > 0) {
            for (var i = 0; i < oldPorts.length; i++) {
                var port = oldPorts[parseInt(i.toString(), 10)];
                var newPort = {};
                newPort.style = {};
                if (port.name) {
                    newPort.id = port.name;
                }
                if (port.addInfo) {
                    newPort.addInfo = port.addInfo;
                }
                if (port.height) {
                    newPort.height = port.height;
                }
                if (port.width) {
                    newPort.width = port.width;
                }
                if (port.horizontalAlignment) {
                    newPort.horizontalAlignment = (port.horizontalAlignment);
                }
                if (port.verticalAlignment) {
                    newPort.verticalAlignment = port.verticalAlignment;
                }
                if (port.margin) {
                    // eslint-disable-next-line max-len
                    newPort.margin = { left: port.margin.left, right: port.margin.right, top: port.margin.top, bottom: port.margin.bottom };
                }
                if (port.offset) {
                    newPort.offset = { x: port.offset.x, y: port.offset.y };
                }
                if (port.borderColor) {
                    newPort.style.strokeColor = port.borderColor;
                }
                if (port.borderWidth) {
                    newPort.style.strokeWidth = port.borderWidth;
                }
                if (port.fillColor) {
                    newPort.style.fill = port.fillColor;
                }
                if (port.constraints) {
                    newPort.constraints = this.setPortConstraints(port.constraints);
                }
                if (port.pathData) {
                    newPort.pathData = port.pathData;
                }
                if (port.shape === 'Custom') {
                    newPort.shape = 'Custom';
                }
                else {
                    newPort.shape = port.shape;
                }
                if (port.visibility) {
                    newPort.visibility = this.setPortVisibility(port.visibility);
                }
                portCollection.push(newPort);
            }
        }
        return portCollection;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Sets the port constraints from EJ1 to EJ2
    PortProperties.prototype.setPortConstraints = function (constraints) {
        var portConstraints = PortConstraints.None;
        if (constraints & PortConstraints.Drag) {
            portConstraints = portConstraints | PortConstraints.Drag;
        }
        if (constraints & PortConstraints.Draw) {
            portConstraints = portConstraints | PortConstraints.Draw;
        }
        if (constraints & PortConstraints.None) {
            portConstraints = PortConstraints.None;
        }
        portConstraints = PortConstraints.Default;
        return portConstraints;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Sets the portVisibility from EJ1 to EJ2
    PortProperties.prototype.setPortVisibility = function (visibility) {
        var portVisibility;
        if (visibility & PortVisibility.Visible) {
            portVisibility = portVisibility | PortVisibility.Visible;
        }
        if (visibility & PortVisibility.Hidden) {
            portVisibility = portVisibility | PortVisibility.Hidden;
        }
        if (visibility & PortVisibility.Hover) {
            portVisibility = portVisibility | PortVisibility.Hover;
        }
        if (visibility & PortVisibility.Connect) {
            portVisibility = portVisibility | PortVisibility.Connect;
        }
        return portVisibility;
    };
    /**
*To destroy the ruler
*
* @returns {void} To destroy the ruler
*/
    PortProperties.prototype.destroy = function () {
        /**
         * Destroys the Port properties module
         */
    };
    /**
 * Get module name.
 */
    PortProperties.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'PortProperties';
    };
    return PortProperties;
}());
export { PortProperties };
