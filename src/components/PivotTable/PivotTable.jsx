import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { useState } from "react";

function PivotTable({ data }) {
    const PlotlyRenderers = createPlotlyRenderers(Plot);
    const [state, setState] = useState([]);
    console.log(data)

    return (
        <div
            style={{ width: '100vw' }}
        >

            <PivotTableUI
                data={data}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                onChange={(s) => {
                    setState(s);
                }}
                {...state}
            />
        </div>
    );
}

export default PivotTable;
