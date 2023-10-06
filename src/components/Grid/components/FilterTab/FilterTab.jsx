

import { Divider } from 'antd';
import React from 'react'
import './Popover.css'
import PinPopover from './Popovers/PinPopover';
const FilterTab = ({ dataIndex }) => {
    return (
        <>
            <PinPopover dataIndex={dataIndex} />
            <Divider size="small" />
        </>
    )
}

export default FilterTab





{/* <Popover placement="left" title={'Text Filter'} content={<>
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
                <FileTextOutlined />  <b style={{ cursor: "pointer" }}>Text Filter</b>
            </Popover> */}
