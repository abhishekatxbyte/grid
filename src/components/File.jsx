import * as XLSX from 'xlsx';
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SET_MULTIPLE_DATA, SET_HEADERS, SET_DATA, SET_FILTERED_DATA, SET_FILE_NAME } from '../store/slice';
// import ModalHeader from './ModalHeader';

const File = () => {
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
            const formattedData = jsonData.slice(1).map((row, index) => {
                const obj = {};
                headerRow.forEach((key, index) => {
                    const value = row[index];
                    // Only add the property if it has a non-empty value
                    if (value !== "" && value !== undefined) {
                        obj[key] = value;
                    }
                });
                obj.key = index + 1;
                return obj;
            });
            dispatch(SET_FILE_NAME(file.name.replace(/\.[^/.]+$/, "")))
            dispatch(SET_DATA(formattedData))
            dispatch(SET_MULTIPLE_DATA(formattedData))


        }
    }


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
            {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "1em", width: '100%' }}>
                {dataArray.length !== 0 ? <ModalHeader /> : <></>}
            </div> */}
        </div>
    )
}

export default File;
