import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useEffect, useState } from 'react';

import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditableCell, Row } from './components/columns';

import getColumnSearchProps from './components/getColumnSearchProps'
import { SET_DATA } from '../../store/slice';

const Grid = ({ data, keyOfTab }) => {
    console.log(keyOfTab)
    const [loading, setLoading] = useState(false);
    const newData = useSelector(state => state.data.data)
    const filteredData = useSelector(state => state.data.filteredData)
    const [dataSource, setDataSource] = useState(data);
    console.log(loading)
    useEffect(() => {
        setLoading(true)
        setDataSource(data)
        setLoading(false)
    }, [keyOfTab, data])
    console.log(dataSource)
    const leftPinnedColumns = useSelector(state => state.data.leftPinnedColumns)
    const rightPinnedColumns = useSelector(state => state.data.rightPinnedColumns)
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
        <div>
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


