import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useEffect, useRef, useState } from 'react';

import { Button, Divider, Form, Input, Switch, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditableCell, Row } from './components/columns';

import getColumnSearchProps from './components/getColumnSearchProps'
import { SET_DATA } from '../../store/slice';
import FilterbyuniqItem from './components/FilterTab/FilterbyuniqItem/FilterbyuniqItem';
import PinPopover from './components/FilterTab/Popovers/PinPopover';
import SearchTab from './components/FilterTab/SearchTab';
function filterArrayByProperty(data, propertyName, inputValue) {
    if (!data || !Array.isArray(data)) {
        return [];
    }

    // Create a regular expression to match words containing the input value
    const regex = new RegExp(inputValue, 'i');

    return data.filter(item => {
        const propertyValue = item[propertyName];
        if (typeof propertyValue === 'number') {
            // Convert the input value to a number and check for equality
            const numericInputValue = parseFloat(inputValue);
            return propertyValue === numericInputValue;
        } else if (typeof propertyValue === 'string') {
            // Check if the property value contains the input value
            return regex.test(propertyValue);
        }
        return false;
    });
}

const InputComponent = ({ column, setDataSource }) => {
    const data = useSelector(state => state.data.data);
    const [inputValue, setInputValue] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setInputValue(inputValue);

        // Filter the data based on the 'column' property and inputValue
        const filteredData = filterArrayByProperty(data, column, inputValue);
        setFilteredData(filteredData);
    };

    useEffect(() => {
        // When the 'column' prop changes, reapply the filter
        const filteredData = filterArrayByProperty(data, column, inputValue);
        setFilteredData(filteredData);
        if (filteredData.length > 0) {

            setDataSource(filteredData)
        }
    }, [column, inputValue, data]);

    console.log(filteredData)
    return (
        <div>
            <Input
                type="text"
                placeholder="Type to filter"
                value={inputValue}
                onChange={handleInputChange}
            />


        </div>
    );
};


const Grid = ({ data, keyOfTab }) => {
    console.log(keyOfTab)
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState(data);

    const [editable, setEditable] = useState(false);
    const handleEditChange = (enable) => {
        setEditable(enable);
    };


    const leftPinnedColumns = useSelector(state => state.data.leftPinnedColumns)
    const rightPinnedColumns = useSelector(state => state.data.rightPinnedColumns)
    const childRef = useRef(null);
    const handleChildButtonClick = () => {
        childRef.current.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    };

    const scroll = { x: '100%', y: '100%' };

    const dynamicColumns = Object.keys(dataSource[0]).map((key) => {

        let fixedValue = null;
        if (leftPinnedColumns.includes(key)) {
            fixedValue = 'left';
        } else if (rightPinnedColumns.includes(key)) {
            fixedValue = 'right';
        } else {
            fixedValue = 'null'
        }

        if (editable) {
            return {
                title: key,
                dataIndex: key,
                width: 250,
                editable: true,
                sorter: (a, b) => {
                    const valueA = typeof a[key] === 'number' ? a[key] : parseFloat(a[key]) || 0;
                    const valueB = typeof b[key] === 'number' ? b[key] : parseFloat(b[key]) || 0;

                    if (valueA < valueB) {
                        return -1;
                    }
                    if (valueA > valueB) {
                        return 1;
                    }

                    // If numeric comparison didn't determine the order, fall back to string comparison
                    return String(a[key]).localeCompare(String(b[key]));
                },
                sortDirections: ['ascend', 'descend'],
                ellipsis: {
                    showTitle: false,
                },
                render: (address) => (
                    <Tooltip placement="topLeft" title={address}>
                        {address}
                    </Tooltip>
                ),
                filterSearch: true,
                fixed: fixedValue,
                ...getColumnSearchProps(key),

            }
        }
        else {

            return {

                filters: [
                    {
                        text: 'Joe',
                        value: 'Joe',
                    },
                    {
                        text: 'Category 1',
                        value: 'Category 1',
                    },
                    {
                        text: 'Category 2',
                        value: 'Category 2',
                    },
                ],
                filterMode: 'tree',
                filterSearch: true,
                onFilter: (value, record) => record.name.startsWith(value),
                fixed: fixedValue,

                title: <div><FilterbyuniqItem dataIndex={key} /> <div> <Divider /> <PinPopover dataIndex={key} /></div></div>,

                children: [
                    {

                        fixed: fixedValue,
                        editable: true,
                        title: <InputComponent
                            key={key}
                            column={key}
                            setDataSource={setDataSource}
                        />,
                        children: [{
                            title: key,
                            dataIndex: key,
                            width: 250,
                            editable: true,
                            sorter: (a, b) => {
                                const valueA = typeof a[key] === 'number' ? a[key] : parseFloat(a[key]) || 0;
                                const valueB = typeof b[key] === 'number' ? b[key] : parseFloat(b[key]) || 0;

                                if (valueA < valueB) {
                                    return -1;
                                }
                                if (valueA > valueB) {
                                    return 1;
                                }

                                // If numeric comparison didn't determine the order, fall back to string comparison
                                return String(a[key]).localeCompare(String(b[key]));
                            },
                            sortDirections: ['ascend', 'descend'],
                            ellipsis: {
                                showTitle: false,
                            },
                            render: (address) => (
                                <Tooltip placement="topLeft" title={address}>
                                    {address}
                                </Tooltip>
                            ),
                            filterSearch: true,
                            ...getColumnSearchProps(key),
                            fixed: fixedValue,

                        }]
                    },

                ],

            }
        }
    });
    dynamicColumns.unshift({
        title: 'Sort',
        dataIndex: 'sort',
        key: 'sort',
        render: () => null,
        width: 60,
        fixed: 'left',
    });
    dynamicColumns.pop()

    const sortedColumns = dynamicColumns.sort((a, b) => {
        if (a.fixed === 'left') return -1;
        if (b.fixed === 'left') return 1;
        if (a.fixed === 'right') return 1; // Move right-pinned columns to the end
        if (b.fixed === 'right') return -1; // Move right-pinned columns to the end
        return 0;
    });
    const handleSave = (row) => {
        const newData = dataSource.map((item) => {
            if (item.ID === row.ID) {
                return {
                    ...item,
                    ...row,
                };
            }
            return item;
        });
        setDataSource(newData);
    };
    const filteredColumns = sortedColumns.filter((col) => col.title !== 'fileName');

    const columns = filteredColumns.map((col) => {
        console.log(col)
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setDataSource((previous) => {
                const activeIndex = previous.findIndex((i) => i.key === active.id);
                const overIndex = previous.findIndex((i) => i.key === over?.id);
                return arrayMove(previous, activeIndex, overIndex);
            });
        }
    };
    // useEffect(() => {
    //     dispatch(SET_DATA(filteredData))
    // }, [dataSource])
    return (
        <div>

            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                    items={dataSource.map((i) => i.key)}
                    strategy={verticalListSortingStrategy}
                >
                    <Form.Item label="editable">
                        <Switch checked={editable} onChange={handleEditChange} />
                    </Form.Item>
                    <Table
                        components={{
                            body: {
                                row: Row,
                                cell: EditableCell
                            },
                        }}
                        scroll={scroll}
                        loading={loading}
                        rowKey="key"
                        columns={columns}
                        dataSource={dataSource}

                        pagination={{ position: ['topRight'] }}
                    />
                </SortableContext>
            </DndContext>
        </div>
    );

};
export default Grid;


// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { Table, Checkbox } from "antd";
// import "./index.scss";

// const DifferenceTable = (props) => {
//   const [isChecked, setIsChecked] = useState(false);

//   const data = [
//     {
//       date: "2020-06-17",
//       units: 2353.0,
//       amount: 8891206.27,
//       date: 2323,
//       units: 243234,
//       amount: 234234,
//       units_diff: 0,
//       amount_diff: 0
//     },
//     {
//       date: "2020-06-17",
//       units: 2353.0,
//       amount: 8891206.27,
//       date: 2323,
//       units: 243234,
//       amount: 234234,
//       units_diff: 1,
//       amount_diff: 1
//     }
//   ];

//   const processedData = isChecked
//     ? data.filter((datum) => datum.units_diff || datum.amount_diff)
//     : data;
//   const columns = [
//     {
//       title: "Bank",
//       children: [
//         {
//           title: "Trxn Date",
//           dataIndex: "date",
//           key: "date",
//           width: 100
//         },
//         {
//           title: "Sum Units",
//           dataIndex: "units",
//           key: "units",
//           width: 100
//         },
//         {
//           title: "Sum Amounts",
//           dataIndex: "amount",
//           key: "units",
//           width: 100
//         }
//       ]
//     },
//     {
//       title: "CUSTOMER",
//       children: [
//         {
//           title: "Trxn Date",
//           dataIndex: "date",
//           key: "date",
//           width: 100
//         },
//         {
//           title: "Sum Units",
//           dataIndex: "units",
//           key: "units",
//           width: 100
//         },
//         {
//           title: "Sum Amounts",
//           dataIndex: "amount",
//           key: "amount",
//           width: 100
//         }
//       ]
//     },
//     {
//       title: () => (
//         <div>
//           <span>Difference&nbsp;&nbsp;</span>
//           <Checkbox
//             checked={isChecked}
//             onChange={(e) => {
//               setIsChecked(e.target.checked);
//             }}
//           />
//         </div>
//       ),
//       dataIndex: "units_diff",
//       key: "units_diff",
//       children: [
//         {
//           title: "Units",
//           dataIndex: "units_diff",
//           key: "units_diff",
//           width: 100
//         },
//         {
//           title: "Amounts",
//           dataIndex: "amount_diff",
//           key: "amount_diff",
//           width: 100
//         }
//       ],
//       align: "center"
//     }
//   ];

//   return (
//     <Table
//       // rowKey="uid"
//       className="table diff_table"
//       columns={columns}
//       dataSource={processedData}
//       pagination={false}
//       scroll={{ y: 400, x: 0 }}
//     />
//   );
// };



// import { DndContext } from '@dnd-kit/core';
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
// import {
//     arrayMove,
//     SortableContext,
//     verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
// import React, { useEffect, useRef, useState } from 'react';

// import { Button, Divider, Form, Input, Switch, Table } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { EditableCell, Row } from './components/columns';

// import getColumnSearchProps from './components/getColumnSearchProps'
// import { SET_DATA } from '../../store/slice';
// import FilterbyuniqItem from './components/FilterTab/FilterbyuniqItem/FilterbyuniqItem';
// import PinPopover from './components/FilterTab/Popovers/PinPopover';
// import SearchTab from './components/FilterTab/SearchTab';

// const Grid = ({ data, keyOfTab }) => {
//     console.log(keyOfTab)
//     const [loading, setLoading] = useState(false);
//     const [dataSource, setDataSource] = useState(data);
//     const [editable, setEditable] = useState(false);
//     const handleEditChange = (enable) => {
//         setEditable(enable);
//     };
//     useEffect(() => {
//         setLoading(true)
//         setDataSource(data)
//         setLoading(false)
//     }, [keyOfTab, data])
//     console.log(dataSource)
//     const leftPinnedColumns = useSelector(state => state.data.leftPinnedColumns)
//     const rightPinnedColumns = useSelector(state => state.data.rightPinnedColumns)
//     const childRef = useRef(null);
//     const handleChildButtonClick = () => {
//         // Prevent event propagation to parent elements
//         childRef.current.addEventListener('click', (event) => {
//             event.stopPropagation();
//         });

//         // Your click event handler code for the child element
//         // ...
//     };

//     const scroll = { x: '100%', y: '100%' };
//     const [searchText, setSearchText] = useState('');
//     const [searchedColumn, setSearchedColumn] = useState('');
//     const dynamicColumns = Object.keys(dataSource[0]).map((key) => {

//         let fixedValue = null;
//         if (leftPinnedColumns.includes(key)) {
//             fixedValue = 'left';
//         } else if (rightPinnedColumns.includes(key)) {
//             fixedValue = 'right';
//         } else {
//             fixedValue = 'null'
//         }

//         if (editable) {
//             return {
//                 title: key,
//                 dataIndex: key,
//                 width: 250,
//                 editable: true,
//                 sorter: (a, b) => {
//                     const valueA = typeof a[key] === 'number' ? a[key] : parseFloat(a[key]) || 0;
//                     const valueB = typeof b[key] === 'number' ? b[key] : parseFloat(b[key]) || 0;

//                     if (valueA < valueB) {
//                         return -1;
//                     }
//                     if (valueA > valueB) {
//                         return 1;
//                     }

//                     // If numeric comparison didn't determine the order, fall back to string comparison
//                     return String(a[key]).localeCompare(String(b[key]));
//                 },
//                 sortDirections: ['ascend', 'descend'],
//                 ellipsis: {
//                     showTitle: false,
//                 },
//                 render: (address) => (
//                     <Tooltip placement="topLeft" title={address}>
//                         {address}
//                     </Tooltip>
//                 ),
//                 filterSearch: true,
//                 ...getColumnSearchProps(key),
//                 fixed: fixedValue,

//             }
//         }
//         else {

//             return {

//                 filters: [
//                     {
//                         text: 'Joe',
//                         value: 'Joe',
//                     },
//                     {
//                         text: 'Category 1',
//                         value: 'Category 1',
//                     },
//                     {
//                         text: 'Category 2',
//                         value: 'Category 2',
//                     },
//                 ],
//                 filterMode: 'tree',
//                 filterSearch: true,
//                 onFilter: (value, record) => record.name.startsWith(value),
//                 fixed: fixedValue,

//                 title: <div><FilterbyuniqItem dataIndex={key} /> <div> <Divider /> <PinPopover dataIndex={key} /></div></div>,

//                 children: [
//                     {

//                         fixed: fixedValue,
//                         title: <div><Input />
//                         </div>,
//                         editable: true,

//                         children: [{
//                             title: key,
//                             dataIndex: key,
//                             width: 250,
//                             editable: true,
//                             sorter: (a, b) => {
//                                 const valueA = typeof a[key] === 'number' ? a[key] : parseFloat(a[key]) || 0;
//                                 const valueB = typeof b[key] === 'number' ? b[key] : parseFloat(b[key]) || 0;

//                                 if (valueA < valueB) {
//                                     return -1;
//                                 }
//                                 if (valueA > valueB) {
//                                     return 1;
//                                 }

//                                 // If numeric comparison didn't determine the order, fall back to string comparison
//                                 return String(a[key]).localeCompare(String(b[key]));
//                             },
//                             sortDirections: ['ascend', 'descend'],
//                             ellipsis: {
//                                 showTitle: false,
//                             },
//                             render: (address) => (
//                                 <Tooltip placement="topLeft" title={address}>
//                                     {address}
//                                 </Tooltip>
//                             ),
//                             filterSearch: true,
//                             ...getColumnSearchProps(key),
//                             fixed: fixedValue,

//                         }]
//                     },

//                 ],

//             }
//         }
//     });
//     dynamicColumns.unshift({
//         title: 'Sort',
//         dataIndex: 'sort',
//         key: 'sort',
//         render: () => null,
//         width: 60,
//         fixed: 'left',
//     });
//     dynamicColumns.pop()

//     const sortedColumns = dynamicColumns.sort((a, b) => {
//         if (a.fixed === 'left') return -1;
//         if (b.fixed === 'left') return 1;
//         if (a.fixed === 'right') return 1; // Move right-pinned columns to the end
//         if (b.fixed === 'right') return -1; // Move right-pinned columns to the end
//         return 0;
//     });
//     const handleSave = (row) => {
//         const newData = dataSource.map((item) => {
//             if (item.ID === row.ID) {
//                 return {
//                     ...item,
//                     ...row,
//                 };
//             }
//             return item;
//         });
//         setDataSource(newData);
//     };
//     const filteredColumns = sortedColumns.filter((col) => col.title !== 'fileName');

//     const columns = filteredColumns.map((col) => {
//         console.log(col)
//         if (!col.editable) {
//             return col;
//         }
//         return {
//             ...col,
//             onCell: (record) => ({
//                 record,
//                 editable: col.editable,
//                 dataIndex: col.dataIndex,
//                 title: col.title,
//                 handleSave,
//             }),
//         };
//     });
//     const onDragEnd = ({ active, over }) => {
//         if (active.id !== over?.id) {
//             setDataSource((previous) => {
//                 const activeIndex = previous.findIndex((i) => i.key === active.id);
//                 const overIndex = previous.findIndex((i) => i.key === over?.id);
//                 return arrayMove(previous, activeIndex, overIndex);
//             });
//         }
//     };

//     return (
//         <div>

//             <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
//                 <SortableContext
//                     items={dataSource.map((i) => i.key)}
//                     strategy={verticalListSortingStrategy}
//                 >
//                     <Form.Item label="editable">
//                         <Switch checked={editable} onChange={handleEditChange} />
//                     </Form.Item>
//                     <Table
//                         components={{
//                             body: {
//                                 row: Row,
//                                 cell: EditableCell
//                             },
//                         }}
//                         scroll={scroll}
//                         loading={loading}
//                         rowKey="key"
//                         columns={columns}
//                         dataSource={dataSource}

//                         pagination={{ position: ['topRight'] }}
//                     />
//                 </SortableContext>
//             </DndContext>
//         </div>
//     );

// };
// export default Grid;
