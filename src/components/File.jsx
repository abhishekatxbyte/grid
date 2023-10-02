import * as XLSX from 'xlsx';
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_DATA, SET_HEADERS } from '../store/slice';
import ModalHeader from './ModalHeader';

const File = () => {
    const data = useSelector(state => state.data.data)
    const dataArray = useSelector(state => state.data.dataArray)
    const inputRef = useRef();
    const dispatch = useDispatch()
    const handleFile = async (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                defval: "",
            });

            // Transform the array of arrays into an array of objects
            const headerRow = jsonData[0];
            const formattedData = jsonData.slice(1).map(row => {

                const obj = {};
                headerRow.forEach((key, index) => {
                    obj[key] = row[index];
                    obj.fileName = file.name.replace(/\.[^/.]+$/, "");

                });
                return obj;
            });
            dispatch(ADD_DATA(formattedData))
            function extractHeaders(data) {
                if (!data || data.length === 0) {
                    return [];
                }

                // Get the keys (headers) from the first object in the array
                const firstObject = data[0];
                const headers = Object.keys(firstObject);

                // Remove the "fileName" property from the headers
                const filteredHeaders = headers.filter(header => header !== 'fileName');

                return filteredHeaders;
            }

            // Usage example:
            const headers = extractHeaders(formattedData);
            console.log(headers)
            dispatch(SET_HEADERS(headers))

            console.log(`Data from file ${i + 1}:`, formattedData);
        }
    }

    console.log(data)
    console.log(dataArray)

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="container">
                <div className="card">
                    <h3>Upload Files</h3>
                    <div className="drop_box">
                        <header>
                            <h4>Select File(s) here</h4>
                        </header>
                        <p>Files Supported: csv,excel</p>
                        <input multiple type="file" accept=".csv,.xlsx" id="fileID" style={{ display: "none" }} onChange={e => handleFile(e)} ref={inputRef} />
                        <button className="btn-upload" onClick={() => inputRef.current.click()}>Choose File(s)</button>

                    </div>
                </div>

            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "1em", width: '100%' }}>
                {dataArray.length !== 0 ? <ModalHeader /> : <></>}
            </div>
        </div>
    )
}

export default File;
