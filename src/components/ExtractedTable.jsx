import { MenuOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SearchOutlined, FilterOutlined, PushpinOutlined, PushpinTwoTone } from '@ant-design/icons'
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Space, Table } from 'antd';
import { useSelector } from 'react-redux';
const EditableContext = React.createContext(null);

import Highlighter from 'react-highlight-words';

const Row = ({ children, ...props }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props['data-row-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Transform.toString(
            transform && {
                ...transform,
                scaleY: 1,
            },
        ),
        transition,
        ...(isDragging
            ? {
                position: 'relative',
                zIndex: 9999,
            }
            : {}),
    };
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>

            <tr {...props} ref={setNodeRef} style={style} {...attributes}>
                {React.Children.map(children, (child) => {
                    if (child.key === 'sort') {
                        return React.cloneElement(child, {
                            children: (
                                <MenuOutlined
                                    ref={setActivatorNodeRef}
                                    style={{
                                        touchAction: 'none',
                                        cursor: 'move',
                                    }}
                                    {...listeners}
                                />
                            ),
                        });
                    } else {
                        return (<EditableContext.Provider value={form}>{child}</EditableContext.Provider>);
                    }

                })}
            </tr>
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


const App = () => {
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
    const [dataArray] = useSelector(state => state.data.dataArray);
    console.log(dataArray)
    const dataSourceWithKeys = dataArray.map((item, index) => ({
        ...item,
        key: item.ID, // Assuming 'ID' is a unique identifier
    }));
    console.log(dataSourceWithKeys)
    const [fixedColumns, setFixedColumns] = useState([]);
    const [dataSource, setDataSource] = useState(dataSourceWithKeys);
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

                        {isColumnFixed ?
                            'unpin column' : 'pin column'}
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
        width: 150,
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
    dynamicColumns.unshift({
        title: 'Sort',
        dataIndex: 'sort',
        key: 'sort',
        render: () => null,
        width: 60,
        fixed: 'left',
    });
    dynamicColumns.pop()
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
    const columns = sortedColumns.map((col) => {
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
    console.log(dataSource)
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
