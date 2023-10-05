import React from 'react'
import { Button, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { PushpinOutlined } from '@ant-design/icons'
import { SET_LEFT_PINNED_COLUMNS, SET_RIGHT_PINNED_COLUMNS } from '../../../../../store/slice';
const PinPopover = ({ dataIndex }) => {
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
    return (
        <>{!leftPinnedColumns.includes(dataIndex) && !rightPinnedColumns.includes(dataIndex) && (
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
            )}</>

    )
}

export default PinPopover