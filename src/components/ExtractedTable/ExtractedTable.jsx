import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SearchOutlined, FilterOutlined, HolderOutlined, MenuOutlined, PushpinOutlined, FileTextOutlined } from '@ant-design/icons'
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useRef, useState } from 'react';

import { Button, Input, Select, Space, Popover, Table, Tabs, Divider } from 'antd';
import { useSelector } from 'react-redux';
import Highlighter from 'react-highlight-words';
import { EditableCell, Row } from './columns';
import { TreeSelect } from 'antd';
const { SHOW_PARENT } = TreeSelect;



const App = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [selectedOperator, setSelectedOperator] = useState('isEqual');
    const [checkboxes, setCheckboxes] = useState([
        { name: 'isEqual', label: 'is equal to' },
        { name: 'isNotEqual', label: 'is not equal to' },
        { name: 'isLessThan', label: 'less than' },
        { name: 'isGreaterThan', label: 'greater than' },
        { name: 'isGreaterThanOrEqual', label: 'greater than or equal' },
        { name: 'isLessThanOrEqual', label: 'less than or equal' },
    ]);
    const handleConditionChange = (event) => {
        const newValue = event.target.value;
        setHeaderCondition(newValue);

        if (newValue === 'HEADER_TO_HEADER') {
            setCheckboxes([
                { name: 'isEqual', label: 'is equal to' },
                { name: 'isNotEqual', label: 'is not equal to' },
                { name: 'isLessThan', label: 'less than' },
                { name: 'isGreaterThan', label: 'greater than' },
                { name: 'isGreaterThanOrEqual', label: 'greater than or equal' },
                { name: 'isLessThanOrEqual', label: 'less than or equal' },
            ]);
        } else if (newValue === 'HEADER_TO_INPUT') {
            setCheckboxes([
                { name: 'isEqual', label: 'is equal to' },
                { name: 'isNotEqual', label: 'is not equal to' },
                { name: 'isLessThan', label: 'less than' },
                { name: 'isGreaterThan', label: 'greater than' },
                { name: 'isGreaterThanOrEqual', label: 'greater than or equal' },
                { name: 'isLessThanOrEqual', label: 'less than or equal' },
                { name: 'isContainsPhrase', label: 'contain the phrase' },
            ]);
        }
    };
    const handleOperatorChange = (event) => {
        setSelectedOperator(event.target.value);
    };
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
    const [dataArray] = useSelector(state => state.data.dataArray);
    const dataSourceWithKeys = dataArray.map((item, index) => ({
        ...item,
        key: index + 1, // Custom key starting from 1
    }));

    const [fixedColumns, setFixedColumns] = useState([]);
    const [dataSource, setDataSource] = useState(dataSourceWithKeys);
    const [pinnedColumn, setPinnedColumn] = useState(null);
    const [leftPinnedColumns, setLeftPinnedColumns] = useState([]);
    const [rightPinnedColumns, setRightPinnedColumns] = useState([]);
    const toggleColumnPinned = (dataIndex, side) => {
        if (side === 'left') {
            if (leftPinnedColumns.includes(dataIndex)) {
                setLeftPinnedColumns(leftPinnedColumns.filter((col) => col !== dataIndex));
            } else {
                setLeftPinnedColumns([...leftPinnedColumns, dataIndex]);
            }
            // If the column was previously pinned to the right, unpin it from the right
            if (rightPinnedColumns.includes(dataIndex)) {
                setRightPinnedColumns(rightPinnedColumns.filter((col) => col !== dataIndex));
            }
        } else if (side === 'right') {
            // If the column was previously pinned to the left, unpin it from the left
            if (leftPinnedColumns.includes(dataIndex)) {
                setLeftPinnedColumns(leftPinnedColumns.filter((col) => col !== dataIndex));
            }
            if (rightPinnedColumns.includes(dataIndex)) {
                setRightPinnedColumns(rightPinnedColumns.filter((col) => col !== dataIndex));
            } else {
                setRightPinnedColumns([dataIndex, ...rightPinnedColumns]);
            }
        }
    };





    const scroll = { x: '100%', y: '100%' };

    const getColumnSearchProps = (dataIndex, isColumnFixed, onToggleColumnFixed) => ({
        filterSearch: true,

        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {

            console.log(dataIndex)
            const onChange = (key) => {
                console.log(key);
            };
            const items = [
                {
                    key: '1',
                    label: <div style={{ width: '100%', margin: 0 }}> <SearchOutlined style={{ margin: 0, padding: '6px' }} /></div>,
                    children: <div
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
                        </Space>
                        <div>
                            <div></div>

                        </div>
                    </div >,
                },
                {
                    key: '2',
                    label: <div style={{ width: '100%', margin: 0 }}> <FilterOutlined style={{ margin: 0, padding: '6px' }} /></div>,
                    children: <>
                        <Popover placement="left" title={<p>Pin Column</p>} content={<>{!leftPinnedColumns.includes(dataIndex) && !rightPinnedColumns.includes(dataIndex) && (
                            <>
                                {/* Button to toggle left pin */}
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => {
                                        toggleColumnPinned(dataIndex, 'left');
                                    }}
                                >
                                    Pin Left
                                </Button>

                                {/* Button to toggle right pin */}
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => {
                                        toggleColumnPinned(dataIndex, 'right');
                                    }}
                                >
                                    Pin Right
                                </Button>
                            </>
                        )}

                            {leftPinnedColumns.includes(dataIndex) && (
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => {
                                        toggleColumnPinned(dataIndex, 'left');
                                    }}
                                >
                                    Unpin Left
                                </Button>
                            )}

                            {rightPinnedColumns.includes(dataIndex) && (
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => {
                                        toggleColumnPinned(dataIndex, 'right');
                                    }}
                                >
                                    Unpin Right
                                </Button>
                            )}</>} >
                            <PushpinOutlined />  <b style={{ cursor: "pointer" }}>Text Filter</b>
                        </Popover>
                        <Divider size="small" />
                        <Popover placement="left" title={'Text Filter'} content={<>
                            <Select
                                aria-label="Comparison operator"
                                value={selectedOperator}
                                onChange={handleOperatorChange}
                                size='large'
                            >
                                {checkboxes.map((checkbox) => (
                                    <Option key={checkbox.name} value={checkbox.name}>
                                        {checkbox.label}
                                    </Option>
                                ))}
                            </Select>
                        </>}>
                            <FileTextOutlined />  <b style={{ cursor: "pointer" }}>Pin column</b>
                        </Popover>

                    </>,
                },

            ];
            return <Tabs defaultActiveKey="1" items={items} style={{
                padding: 8,
                minWidth: 250,
            }} onChange={onChange} />
        },
        filterIcon: (filtered) => (
            <MenuOutlined
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

    const dynamicColumns = Object.keys(dataSource[0]).map((key) => {
        let fixedValue = null;
        if (leftPinnedColumns.includes(key)) {
            fixedValue = 'left';
        } else if (rightPinnedColumns.includes(key)) {
            fixedValue = 'right';
        } else {
            fixedValue = 'null'
        }

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
            ...getColumnSearchProps(key, leftPinnedColumns.includes(key) || rightPinnedColumns.includes(key), toggleColumnPinned),
        };
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
    return (
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
            <SortableContext
                items={dataSource.map((i) => i.key)}
                strategy={verticalListSortingStrategy}
            >
                <Table
                    components={{
                        body: {
                            row: Row,
                            cell: EditableCell
                        },
                    }}
                    scroll={scroll}

                    rowKey="key"
                    columns={columns}
                    dataSource={dataSource}
                />
            </SortableContext>
        </DndContext>
    );
};
export default App;



// import { DndContext } from '@dnd-kit/core';
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
// import { SearchOutlined, FilterOutlined, PushpinOutlined, PushpinTwoTone } from '@ant-design/icons'
// import {
//     arrayMove,
//     SortableContext,
//     verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
// import React, { useRef, useState } from 'react';
// import { Button, Input, Select, Space, Table } from 'antd';
// import { useSelector } from 'react-redux';
// import Highlighter from 'react-highlight-words';
// import { EditableCell, Row } from './columns';
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
//     const [dataArray] = useSelector(state => state.data.dataArray);
//     const dataSourceWithKeys = dataArray.map((item, index) => ({
//         ...item,
//         key: index + 1, // Custom key starting from 1
//     }));

//     const [fixedColumns, setFixedColumns] = useState([]);
//     const [dataSource, setDataSource] = useState(dataSourceWithKeys);
//     const [pinnedColumn, setPinnedColumn] = useState(null);
//     const [leftPinnedColumns, setLeftPinnedColumns] = useState([]);
//     const [rightPinnedColumns, setRightPinnedColumns] = useState([]);
//     const toggleColumnPinned = (dataIndex, side) => {
//         if (side === 'left') {
//             if (leftPinnedColumns.includes(dataIndex)) {
//                 setLeftPinnedColumns(leftPinnedColumns.filter((col) => col !== dataIndex));
//             } else {
//                 setLeftPinnedColumns([...leftPinnedColumns, dataIndex]);
//             }
//             // If the column was previously pinned to the right, unpin it from the right
//             if (rightPinnedColumns.includes(dataIndex)) {
//                 setRightPinnedColumns(rightPinnedColumns.filter((col) => col !== dataIndex));
//             }
//         } else if (side === 'right') {
//             // If the column was previously pinned to the left, unpin it from the left
//             if (leftPinnedColumns.includes(dataIndex)) {
//                 setLeftPinnedColumns(leftPinnedColumns.filter((col) => col !== dataIndex));
//             }
//             if (rightPinnedColumns.includes(dataIndex)) {
//                 setRightPinnedColumns(rightPinnedColumns.filter((col) => col !== dataIndex));
//             } else {
//                 setRightPinnedColumns([dataIndex, ...rightPinnedColumns]);
//             }
//         }
//     };





//     const scroll = { x: '100%', y: '100%' };

//     const getColumnSearchProps = (dataIndex, isColumnFixed, onToggleColumnFixed) => ({
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
//                         Close
//                     </Button>
//                     {/* Button to toggle fixed column */}

//                     {!leftPinnedColumns.includes(dataIndex) && !rightPinnedColumns.includes(dataIndex) && (
//                         <>
//                             {/* Button to toggle left pin */}
//                             <Button
//                                 type="link"
//                                 size="small"
//                                 onClick={() => {
//                                     toggleColumnPinned(dataIndex, 'left');
//                                 }}
//                             >
//                                 Pin Left
//                             </Button>

//                             {/* Button to toggle right pin */}
//                             <Button
//                                 type="link"
//                                 size="small"
//                                 onClick={() => {
//                                     toggleColumnPinned(dataIndex, 'right');
//                                 }}
//                             >
//                                 Pin Right
//                             </Button>
//                         </>
//                     )}

//                     {leftPinnedColumns.includes(dataIndex) && (
//                         <Button
//                             type="link"
//                             size="small"
//                             onClick={() => {
//                                 toggleColumnPinned(dataIndex, 'left');
//                             }}
//                         >
//                             Unpin Left
//                         </Button>
//                     )}

//                     {rightPinnedColumns.includes(dataIndex) && (
//                         <Button
//                             type="link"
//                             size="small"
//                             onClick={() => {
//                                 toggleColumnPinned(dataIndex, 'right');
//                             }}
//                         >
//                             Unpin Right
//                         </Button>
//                     )}

//                 </Space>
//                 <div>
//                     {/* Dropdown 1 */}
//                     <Select
//                         style={{ width: 200, marginBottom: 8 }}
//                         placeholder="Dropdown 1"
//                     // Add your onChange handler and options here
//                     >
//                         {/* Options for Dropdown 1 */}
//                         <Option value="option1">Option 1</Option>
//                         <Option value="option2">Option 2</Option>
//                         <Option value="option3">Option 3</Option>
//                     </Select>

//                     {/* Dropdown 2 */}
//                     <Select
//                         style={{ width: 200, marginBottom: 8 }}
//                     // No placeholder for the second dropdown
//                     // Add your onChange handler and options here
//                     >
//                         {/* Options for Dropdown 2 */}
//                         <Option value="dummy1">Dummy 1</Option>
//                         <Option value="dummy2">Dummy 2</Option>
//                         <Option value="dummy3">Dummy 3</Option>
//                     </Select>
//                 </div>
//             </div>
//         ),
//         filterIcon: (filtered) => (
//             <FilterOutlined
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

//     const dynamicColumns = Object.keys(dataSource[0]).map((key) => {
//         let fixedValue = null;
//         if (leftPinnedColumns.includes(key)) {
//             fixedValue = 'left';
//         } else if (rightPinnedColumns.includes(key)) {
//             fixedValue = 'right';
//         } else {
//             fixedValue = 'null'
//         }

//         return {
//             title: key,
//             dataIndex: key,
//             width: 250,
//             editable: true,
//             sorter: (a, b) => {
//                 const valueA = typeof a[key] === 'number' ? a[key] : parseFloat(a[key]) || 0;
//                 const valueB = typeof b[key] === 'number' ? b[key] : parseFloat(b[key]) || 0;

//                 if (valueA < valueB) {
//                     return -1;
//                 }
//                 if (valueA > valueB) {
//                     return 1;
//                 }

//                 // If numeric comparison didn't determine the order, fall back to string comparison
//                 return String(a[key]).localeCompare(String(b[key]));
//             },
//             sortDirections: ['ascend', 'descend'],
//             ellipsis: {
//                 showTitle: false,
//             },
//             render: (address) => (
//                 <Tooltip placement="topLeft" title={address}>
//                     {address}
//                 </Tooltip>
//             ),
//             filterSearch: true,
//             fixed: fixedValue,
//             ...getColumnSearchProps(key, leftPinnedColumns.includes(key) || rightPinnedColumns.includes(key), toggleColumnPinned),
//         };
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
//         <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
//             <SortableContext
//                 items={dataSource.map((i) => i.key)}
//                 strategy={verticalListSortingStrategy}
//             >
//                 <Table
//                     components={{
//                         body: {
//                             row: Row,
//                             cell: EditableCell
//                         },
//                     }}
//                     scroll={scroll}

//                     rowKey="key"
//                     columns={columns}
//                     dataSource={dataSource}
//                 />
//             </SortableContext>
//         </DndContext>
//     );
// };
// export default App;


