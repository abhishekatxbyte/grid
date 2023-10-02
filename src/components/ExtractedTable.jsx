import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Space, Table, Tooltip, TreeSelect } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};


const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                    userSelect: 'none', // Add userSelect property to prevent text selection
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const ExtractedTable = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        confirm();
        setSearchedColumn('');
        setSearchText('');
    };
    const dataArray = useSelector(state => state.data.dataArray);
    const [fixedColumns, setFixedColumns] = useState([]);


    const [dataSource, setDataSource] = useState(...dataArray);
    const [pinnedColumn, setPinnedColumn] = useState(null);
    const toggleColumnFixed = (dataIndex) => {
        if (pinnedColumn === dataIndex) {
            setPinnedColumn(null); // Unpin the column if it's already pinned
        } else {
            setPinnedColumn(dataIndex); // Pin the column
        }
    };

    const scroll = { x: '100vw', y: '100%' };

    const getColumnSearchProps = (dataIndex, isColumnFixed, onToggleColumnFixed) => ({
        filterSearch: true,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                    {/* Button to toggle fixed column */}
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            onToggleColumnFixed(dataIndex);
                        }}
                    >
                        {isColumnFixed ? 'Unfix Column' : 'Fix Column'}
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : '#22222',
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const dynamicColumns = Object.keys(dataSource[0]).map((key) => ({
        title: key,
        dataIndex: key,
        editable: true,
        ...getColumnSearchProps(key),
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
        fixed: pinnedColumn === key ? 'left' : fixedColumns.includes(key) ? 'left' : null, // Apply the fixed property
        ...getColumnSearchProps(key, pinnedColumn === key || fixedColumns.includes(key), toggleColumnFixed), // Pass isColumnFixed and onToggleColumnFixed
    }));

    // Sort the columns so that the pinned column is always the leftmost column
    const sortedColumns = dynamicColumns.sort((a, b) => {
        if (a.fixed === 'left') return -1;
        if (b.fixed === 'left') return 1;
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

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = sortedColumns.map((col) => {
        console.log(col);
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


    return (
        <div>
            {dataArray.length > 0 && <Table
                scroll={scroll}
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                size="large"
                dataSource={dataSource}
                columns={columns}
            />}


        </div>
    );
};

export default ExtractedTable;

// dynamic version
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { Button, Form, Input, Space, Table, Tooltip } from 'antd';
// import { SearchOutlined, FilterOutlined } from '@ant-design/icons'
// import Highlighter from 'react-highlight-words';
// import { useSelector } from 'react-redux';
// const EditableContext = React.createContext(null);

// const EditableRow = ({ index, ...props }) => {
//     const [form] = Form.useForm();
//     return (
//         <Form form={form} component={false}>
//             <EditableContext.Provider value={form}>
//                 <tr {...props} />
//             </EditableContext.Provider>
//         </Form>
//     );
// };


// const EditableCell = ({
//     title,
//     editable,
//     children,
//     dataIndex,
//     record,
//     handleSave,
//     ...restProps
// }) => {
//     const [editing, setEditing] = useState(false);
//     const inputRef = useRef(null);
//     const form = useContext(EditableContext);

//     useEffect(() => {
//         if (editing) {
//             inputRef.current.focus();
//         }
//     }, [editing]);

//     const toggleEdit = () => {
//         setEditing(!editing);
//         form.setFieldsValue({
//             [dataIndex]: record[dataIndex],
//         });
//     };

//     const save = async () => {
//         try {
//             const values = await form.validateFields();
//             toggleEdit();
//             handleSave({
//                 ...record,
//                 ...values,
//             });
//         } catch (errInfo) {
//             console.log('Save failed:', errInfo);
//         }
//     };

//     let childNode = children;

//     if (editable) {
//         childNode = editing ? (
//             <Form.Item
//                 style={{
//                     margin: 0,
//                 }}
//                 name={dataIndex}
//                 rules={[
//                     {
//                         required: true,
//                         message: `${title} is required.`,
//                     },
//                 ]}
//             >
//                 <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//             </Form.Item>
//         ) : (
//             <div
//                 className="editable-cell-value-wrap"
//                 style={{
//                     paddingRight: 24,
//                     userSelect: 'none', // Add userSelect property to prevent text selection
//                 }}
//                 onClick={toggleEdit}
//             >
//                 {children}
//             </div>
//         );
//     }

//     return <td {...restProps}>{childNode}</td>;
// };

// const App = () => {
//     const [searchText, setSearchText] = useState('');
//     const [searchedColumn, setSearchedColumn] = useState('');
//     const searchInput = useRef(null);
//     const handleSearch = (selectedKeys, confirm, dataIndex) => {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);
//     };
//     const handleReset = (clearFilters, confirm) => {
//         clearFilters();
//         confirm();
//         setSearchedColumn('');
//         setSearchText('');
//     };
//     const dataArray = useSelector(state => state.data.dataArray);
//     console.log(dataArray)
//     const [dataSource, setDataSource] = useState(...dataArray);
//     const getColumnSearchProps = (dataIndex) => ({
//         filterSearch: true,
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
//             <div
//                 style={{
//                     padding: 8,
//                 }}
//                 onKeyDown={(e) => e.stopPropagation()}
//             >
//                 <Input
//                     ref={searchInput}
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                     onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                     style={{
//                         marginBottom: 8,
//                         display: 'block',
//                     }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Search
//                     </Button>
//                     <Button
//                         onClick={() => clearFilters && handleReset(clearFilters, confirm)}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Reset
//                     </Button>

//                     <Button
//                         type="link"
//                         size="small"
//                         onClick={() => {
//                             close();
//                         }}
//                     >
//                         close
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered) => (
//             <SearchOutlined
//                 style={{
//                     color: filtered ? '#1677ff' : '#22222',
//                 }}
//             />
//         ),
//         onFilter: (value, record) =>
//             record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//         onFilterDropdownOpenChange: (visible) => {
//             if (visible) {
//                 setTimeout(() => searchInput.current?.select(), 100);
//             }
//         },
//         render: (text) =>
//             searchedColumn === dataIndex ? (
//                 <Highlighter
//                     highlightStyle={{
//                         backgroundColor: '#ffc069',
//                         padding: 0,
//                     }}
//                     searchWords={[searchText]}
//                     autoEscape
//                     textToHighlight={text ? text.toString() : ''}
//                 />
//             ) : (
//                 text
//             ),
//     });

//     const dynamicColumns = Object.keys(dataSource[0]).map((key) => ({
//         title: key,
//         dataIndex: key,
//         editable: true,
//         ...getColumnSearchProps(key),
//         sorter: (a, b) => {
//             const valueA = typeof a[key] === 'number' ? a[key] : parseFloat(a[key]) || 0;
//             const valueB = typeof b[key] === 'number' ? b[key] : parseFloat(b[key]) || 0;

//             if (valueA < valueB) {
//                 return -1;
//             }
//             if (valueA > valueB) {
//                 return 1;
//             }

//             // If numeric comparison didn't determine the order, fall back to string comparison
//             return String(a[key]).localeCompare(String(b[key]));
//         },

//         sortDirections: ['ascend', 'descend'],
//         ellipsis: {
//             showTitle: false,
//         },
//         render: (address) => (
//             <Tooltip placement="topLeft" title={address}>
//                 {address}
//             </Tooltip>
//         ),
//     }));

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

//     const components = {
//         body: {
//             row: EditableRow,
//             cell: EditableCell,
//         },
//     };

//     const columns = dynamicColumns.map((col) => {
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

//     return (
//         <div>
//             {dataArray.length > 0 && <Table
//                 components={components}
//                 rowClassName={() => 'editable-row'}
//                 bordered
//                 dataSource={dataSource}
//                 columns={columns}
//             />}


//         </div>
//     );
// };

// export default App;





// import React, { useState } from 'react';
// import { Button, Space, Table } from 'antd';
// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     age: 32,
//     address: 'London No. 2 Lake Park',
//   },
// ];
// const App = () => {
//   const [filteredInfo, setFilteredInfo] = useState({});
//   const [sortedInfo, setSortedInfo] = useState({});
//   const handleChange = (pagination, filters, sorter) => {
//     console.log('Various parameters', pagination, filters, sorter);
//     setFilteredInfo(filters);
//     setSortedInfo(sorter);
//   };
//   const clearFilters = () => {
//     setFilteredInfo({});
//   };
//   const clearAll = () => {
//     setFilteredInfo({});
//     setSortedInfo({});
//   };
//   const setAgeSort = () => {
//     setSortedInfo({
//       order: 'descend',
//       columnKey: 'age',
//     });
//   };
//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       filters: [
//         {
//           text: 'Joe',
//           value: 'Joe',
//         },
//         {
//           text: 'Jim',
//           value: 'Jim',
//         },
//       ],
//       filteredValue: filteredInfo.name || null,
//       onFilter: (value, record) => record.name.includes(value),
//       sorter: (a, b) => a.name.length - b.name.length,
//       sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
//       ellipsis: true,
//     },
//     {
//       title: 'Age',
//       dataIndex: 'age',
//       key: 'age',
//       sorter: (a, b) => a.age - b.age,
//       sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
//       ellipsis: true,
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//       filters: [
//         {
//           text: 'London',
//           value: 'London',
//         },
//         {
//           text: 'New York',
//           value: 'New York',
//         },
//       ],
//       filteredValue: filteredInfo.address || null,
//       onFilter: (value, record) => record.address.includes(value),
//       sorter: (a, b) => a.address.length - b.address.length,
//       sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
//       ellipsis: true,
//     },
//   ];
//   return (
//     <>
//       <Space
//         style={{
//           marginBottom: 16,
//         }}
//       >
//         <Button onClick={setAgeSort}>Sort age</Button>
//         <Button onClick={clearFilters}>Clear filters</Button>
//         <Button onClick={clearAll}>Clear filters and sorters</Button>
//       </Space>
//       <Table columns={columns} dataSource={data} onChange={handleChange} />
//     </>
//   );
// };
// export default App;