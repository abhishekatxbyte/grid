// /**
//  * Sample for Column series
//  */
// import * as React from "react";
// import { useEffect } from 'react';
// import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel, Highlight } from '@syncfusion/ej2-react-charts';
// import { Browser } from '@syncfusion/ej2-base';
// import { v4 as uuid } from 'uuid'
// import './style.css'
// import { useSelector } from "react-redux";
// import { Form } from "react-bootstrap";
// import { useState } from "react";
// const SAMPLE_CSS = `
//     .control-fluid {
//         padding: 0px !important;
//     }`;
// const Column = () => {
//     const dataArray = useSelector(state => state.data.dataArray)
//     const headers = useSelector(state => state.data.headers)
//     const [xHeader, setXheader] = useState('');
//     const [yHeader, setYheader] = useState('');
//     console.log(xHeader)
//     console.log(yHeader)
//     // const file_name = ; // Removes the first element (file name)
//     // console.log(dataArray)
//     const handleXHeaderChange = (event) => {
//         const newValue = event.target.value;
//         setXheader(newValue);
//     };
//     const handleYHeaderChange = (event) => {
//         const newValue = event.target.value;
//         setYheader(newValue);
//     };
//     const loaded = (args) => {
//         let chart = document.getElementById('charts');
//         chart.setAttribute('title', '');
//     };
//     const load = (args) => {
//         let selectedTheme = location.hash.split('/')[1];
//         selectedTheme = selectedTheme ? selectedTheme : 'Material';
//         args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
//         if (selectedTheme === 'highcontrast') {
//             args.chart.series[0].marker.dataLabel.font.color = '#000000';
//             args.chart.series[1].marker.dataLabel.font.color = '#000000';
//             args.chart.series[2].marker.dataLabel.font.color = '#000000';
//         }
//     };
//     return (<>
//         <div className='control_pane'>
//             <div className='control_section'>
//                 <ChartComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true }} primaryXAxis={{ labelIntersectAction: Browser.isDevice ? 'None' : 'Trim', labelRotation: Browser.isDevice ? -45 : 0, valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }} primaryYAxis={{ title: 'Medal Count', majorTickLines: { width: 0 }, lineStyle: { width: 0 }, maximum: 50, interval: 10 }} chartArea={{ border: { width: 0 } }} load={load.bind(this)} tooltip={{ enable: true, header: "<b>${point.tooltip}</b>", shared: true }} width={Browser.isDevice ? '100%' : '75%'} title='Olympic Medal Counts - RIO' loaded={loaded.bind(this)}>
//                     <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel, Highlight]} />
//                     <SeriesCollectionDirective key={uuid()}>
//                         {dataArray.map(data => {
//                             console.log(data)
//                             return (<SeriesDirective dataSource={data} key={uuid()} tooltipMappingName='toolTipMappingName' xName='x' columnSpacing={0.1} yName='y' name={data[0].fileName} type='Column' />)
//                         })}
//                     </SeriesCollectionDirective>
//                 </ChartComponent>
//             </div>

//         </div>
//         <div style={{ display: "flex" }}>
//             <Form.Select
//                 onChange={handleXHeaderChange} >
//                 <option>Select the X header</option>

//                 {headers.map((header, index) => {
//                     return <option value={header}>{header}</option>
//                 })}
//             </Form.Select>
//             <Form.Select
//                 onChange={handleYHeaderChange} >
//                 <option>Select the Y header</option>

//                 {headers.map((header, index) => {
//                     return <option value={header}>{header}</option>
//                 })}
//             </Form.Select>
//         </div>
//     </>
//     );
// };
// export default Column;
import * as React from "react";
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel, Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { v4 as uuid } from 'uuid'
import './style.css'
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { useState } from "react";

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const Column = () => {
    const dataArray = useSelector(state => state.data.dataArray);
    const headers = useSelector(state => state.data.headers);
    const [xHeader, setXHeader] = useState(''); // Initialize with empty string or default value
    const [yHeader, setYHeader] = useState(''); // Initialize with empty string or default value

    const handleXHeaderChange = (event) => {
        const newValue = event.target.value;
        setXHeader(newValue);
    };

    const handleYHeaderChange = (event) => {
        const newValue = event.target.value;
        setYHeader(newValue);
    };

    const loaded = (args) => {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };

    const load = (args) => {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
        if (selectedTheme === 'highcontrast') {
            args.chart.series[0].marker.dataLabel.font.color = '#000000';
            args.chart.series[1].marker.dataLabel.font.color = '#000000';
            args.chart.series[2].marker.dataLabel.font.color = '#000000';
        }
    };

    return (
        <>
            <div className='control_pane'>
                <div className='control_section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ enableHighlight: true }} primaryXAxis={{ labelIntersectAction: Browser.isDevice ? 'None' : 'Trim', labelRotation: Browser.isDevice ? -45 : 0, valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }} primaryYAxis={{ title: 'Medal Count', majorTickLines: { width: 0 }, lineStyle: { width: 0 }, maximum: 50, interval: 10 }} chartArea={{ border: { width: 0 } }} load={load.bind(this)} tooltip={{ enable: true, header: "<b>${point.tooltip}</b>", shared: true }} width={Browser.isDevice ? '100%' : '75%'} title='Olympic Medal Counts - RIO' loaded={loaded.bind(this)}>
                        <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel, Highlight]} />
                        <SeriesCollectionDirective key={uuid()}>
                            {dataArray.map(data => (
                                <SeriesDirective dataSource={data} key={uuid()} tooltipMappingName='toolTipMappingName' xName={xHeader} columnSpacing={0.1} yName={yHeader} name={data[0].fileName} type='Column' />
                            ))}
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <Form.Select
                    onChange={handleXHeaderChange}
                    value={xHeader} // Set the selected value
                >
                    <option>Select the X header</option>
                    {headers.map((header, index) => (
                        <option value={header} key={index}>{header}</option>
                    ))}
                </Form.Select>
                <Form.Select
                    onChange={handleYHeaderChange}
                    value={yHeader} // Set the selected value
                >
                    <option>Select the Y header</option>
                    {headers.map((header, index) => (
                        <option value={header} key={index}>{header}</option>
                    ))}
                </Form.Select>
            </div>
        </>
    );
};

export default Column;
