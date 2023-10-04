// import { useEffect, useState } from 'react';
// import { Dropdown, DropdownButton, Form } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { useDispatch, useSelector } from 'react-redux';
// import { SET_FILTERED_DATA } from '../store/slice';
// import { v4 as uid } from 'uuid'
// // import { filterData } from './Worker/filterDataWorker';
// function MyVerticallyCenteredModal(props) {

//     const headers = useSelector(state => state.data.headers)
//     const [data] = useSelector(state => state.data.dataArray)
//     const [customInput, setCustomInput] = useState('');
//     const [filteredData, setFilteredData] = useState()
//     const [headerCondition, setHeaderCondition] = useState('')
//     const [selectedOperator, setSelectedOperator] = useState('isEqual');
//     const [baseHeader, setBaseHeader] = useState('');
//     const [secondHeader, setSecondHeader] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [progress, setProgress] = useState(0);
//     const [worker, setWorker] = useState(null);

//     const [checkboxes, setCheckboxes] = useState([
//         { name: 'isEqual', label: 'is equal to' },
//         { name: 'isNotEqual', label: 'is not equal to' },
//         { name: 'isLessThan', label: 'less than' },
//         { name: 'isGreaterThan', label: 'greater than' },
//         { name: 'isGreaterThanOrEqual', label: 'greater than or equal' },
//         { name: 'isLessThanOrEqual', label: 'less than or equal' },
//     ]);
//     const dispatch = useDispatch()
//     const handleBaseHeaderChange = (event) => {
//         const newValue = event.target.value;
//         setBaseHeader(newValue);
//     };
//     const handleSecondHeaderChange = (event) => {
//         const newValue = event.target.value;
//         setSecondHeader(newValue);
//     };
//     const handleOperatorChange = (event) => {
//         setSelectedOperator(event.target.value);
//     };
//     const handleCustomInputChange = (event) => {
//         setCustomInput(event.target.value);
//     };


//     const handleConditionChange = (event) => {
//         const newValue = event.target.value;
//         setHeaderCondition(newValue);

//         if (newValue === 'HEADER_TO_HEADER') {
//             setCheckboxes([
//                 { name: 'isEqual', label: 'is equal to' },
//                 { name: 'isNotEqual', label: 'is not equal to' },
//                 { name: 'isLessThan', label: 'less than' },
//                 { name: 'isGreaterThan', label: 'greater than' },
//                 { name: 'isGreaterThanOrEqual', label: 'greater than or equal' },
//                 { name: 'isLessThanOrEqual', label: 'less than or equal' },
//             ]);
//         } else if (newValue === 'HEADER_TO_INPUT') {
//             setCheckboxes([
//                 { name: 'isEqual', label: 'is equal to' },
//                 { name: 'isNotEqual', label: 'is not equal to' },
//                 { name: 'isLessThan', label: 'less than' },
//                 { name: 'isGreaterThan', label: 'greater than' },
//                 { name: 'isGreaterThanOrEqual', label: 'greater than or equal' },
//                 { name: 'isLessThanOrEqual', label: 'less than or equal' },
//                 { name: 'isContainsPhrase', label: 'contain the phrase' },
//             ]);
//         }
//     };


//     useEffect(() => {
//         if (!worker) {
//             try {
//                 const workerPath = new URL('./Worker/filterDataWorker.js', import.meta.url);
//                 const newWorker = new Worker(workerPath);

//                 newWorker.onmessage = (event) => {
//                     const { type, payload } = event.data;
//                     if (type === 'FILTERED_DATA') {
//                         setFilteredData(payload);
//                     }
//                 };

//                 setWorker(newWorker);

//             } catch (error) {
//             }
//         }
//         return () => {
//             if (worker) {
//                 worker.terminate();
//             }
//         };
//     }, [worker]);

//     const handleHide = () => {
//         setLoading(true);
//         props.setModalShow(false);

//         if (worker) {
//             worker.postMessage({
//                 type: 'FILTER_DATA',
//                 payload: { data, baseHeader, secondHeader, selectedOperator, headerCondition, customInput },
//             });
//         }
//     };
//     useEffect(() => {
//         dispatch(SET_FILTERED_DATA(filteredData))
//     }, [filteredData])

//     return (
//         <Modal
//             {...props}
//             size="xl"
//             onHide={handleHide}
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     SET RULES
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div className='modal-body'>
//                     <div className='controllers'>
//                         <div className="controller">
//                             <p>base header</p>
//                             <Form.Select
//                                 onChange={handleBaseHeaderChange} >
//                                 <option key={uid()}>Select the header</option>
//                                 {headers.map((header, index) => {
//                                     return <option key={header} value={header}>
//                                         {header}
//                                     </option>
//                                 })}
//                             </Form.Select>
//                         </div>
//                         <div className="controller">
//                             <p>Compare between</p>
//                             <Form.Select

//                                 onChange={handleConditionChange} >
//                                 <option     >Select the header</option>
//                                 <option value={'HEADER_TO_HEADER'}>header to header</option>
//                                 <option value={'HEADER_TO_INPUT'}>header to input</option>
//                             </Form.Select>
//                         </div>

//                         <div className='controller'>
//                             <p>Condition</p>

//                             <Form.Select
//                                 aria-label="Comparison operator"


//                                 value={selectedOperator}
//                                 onChange={handleOperatorChange}
//                             >
//                                 {checkboxes.map((checkbox) => (
//                                     <option key={checkbox.name} value={checkbox.name}>
//                                         {checkbox.label}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </div>

//                         {headerCondition && headerCondition === 'HEADER_TO_HEADER' ? <div className="controller">
//                             <p>secondHeader header</p>
//                             <Form.Select


//                                 onChange={handleSecondHeaderChange} >
//                                 <option>Select the header</option>

//                                 {headers.map((header, index) => {
//                                     return <option key={header} value={header}>
//                                         {header}
//                                     </option>
//                                 })}
//                             </Form.Select>
//                         </div> : <div className="controller">
//                             <p>input</p>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="input text"
//                                 value={customInput} // Bind the input value to the state variable
//                                 onChange={handleCustomInputChange} // Attach the event handler
//                             />
//                         </div>}
//                     </div>
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button onClick={handleHide}>submit</Button>
//             </Modal.Footer>
//         </Modal >
//     );
// }

// function ModalHeader() {
//     const [modalShow, setModalShow] = useState(false);

//     return (
//         <>


//             <Button variant="primary" onClick={() => setModalShow(true)}>
//                 set Rule
//             </Button>

//             <MyVerticallyCenteredModal
//                 show={modalShow}
//                 setModalShow={setModalShow}

//             />
//         </>
//     );
// }

// export default ModalHeader


