import React from 'react'
import { Button, Divider, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { PushpinOutlined } from '@ant-design/icons'
import { SET_LEFT_PINNED_COLUMNS, SET_RIGHT_PINNED_COLUMNS } from '../../../../../store/slice';


const Content = ({ dataIndex }) => {
    const dispatch = useDispatch()
    const leftPinnedColumns = useSelector(state => state.data.leftPinnedColumns)
    const rightPinnedColumns = useSelector(state => state.data.rightPinnedColumns)
    const toggleColumnPinned = (dataIndex, side) => {
        if (side === 'left') {
            if (leftPinnedColumns.includes(dataIndex)) {
                dispatch(SET_LEFT_PINNED_COLUMNS(leftPinnedColumns.filter((col) => col !== dataIndex)));
            } else {
                dispatch(SET_LEFT_PINNED_COLUMNS([...leftPinnedColumns, dataIndex]));
            }
            // If the column was previously pinned to the right, unpin it from the right
            if (rightPinnedColumns.includes(dataIndex)) {
                dispatch(SET_RIGHT_PINNED_COLUMNS(rightPinnedColumns.filter((col) => col !== dataIndex)));
            }
        } else if (side === 'right') {
            // If the column was previously pinned to the left, unpin it from the left
            if (leftPinnedColumns.includes(dataIndex)) {
                dispatch(SET_LEFT_PINNED_COLUMNS(leftPinnedColumns.filter((col) => col !== dataIndex)));
            }
            if (rightPinnedColumns.includes(dataIndex)) {
                dispatch(SET_RIGHT_PINNED_COLUMNS(rightPinnedColumns.filter((col) => col !== dataIndex)));
            } else {
                dispatch(SET_RIGHT_PINNED_COLUMNS([dataIndex, ...rightPinnedColumns]));
            }
        }
    };
    return <>{!leftPinnedColumns.includes(dataIndex) && !rightPinnedColumns.includes(dataIndex) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
            {/* Button to toggle left pin */}
            <Button
                style={{ display: 'flex', alignItems: 'center' }}
                size="small"
                onClick={() => {
                    toggleColumnPinned(dataIndex, 'left');
                }}
            >
                <PushpinOutlined /> Left
            </Button>
            {/* Button to toggle right pin */}
            <Button
                style={{ display: 'flex', alignItems: 'center' }}

                size="small"
                onClick={() => {
                    toggleColumnPinned(dataIndex, 'right');
                }}
            >
                <PushpinOutlined /> Right


            </Button>
        </div>
    )}

        {leftPinnedColumns.includes(dataIndex) && (
            <Button

                size="large"
                onClick={() => {
                    toggleColumnPinned(dataIndex, 'left');
                }}
            >
                Unpin
            </Button>
        )}

        {rightPinnedColumns.includes(dataIndex) && (
            <Button

                size="large"
                onClick={() => {
                    toggleColumnPinned(dataIndex, 'right');
                }}
            >
                Unpin
            </Button>
        )}</>
}
    ;

const PinPopover = ({ dataIndex }) => {

    return (
        <Popover content={<Content dataIndex={dataIndex} />}>
            <Button style={{ display: 'flex', alignItems: 'center' }} type="secondary"><PushpinOutlined /></Button>
        </Popover>

    )
}

export default PinPopover