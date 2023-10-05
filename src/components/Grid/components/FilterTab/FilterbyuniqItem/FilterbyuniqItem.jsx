import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Space, Button } from 'antd';
import { SET_DATA, SET_FILTERED_DATA } from '../../../../../store/slice';


const FilterbyuniqItem = ({ dataIndex }) => {
    const data = useSelector(state => state.data.dataArray);
    const currentTabIndex = useSelector(state => state.data.setCurrentFileIndex)
    const dataArray = data[currentTabIndex]
    const uniqueValues = new Set();
    const uniqueValuesArray = dataArray.reduce((acc, item) => {
        const propertyValue = item[dataIndex];
        if (!uniqueValues.has(propertyValue)) {
            uniqueValues.add(propertyValue);
            acc.push(propertyValue);
        }
        return acc;
    }, []);

    const [selectedValues, setSelectedValues] = useState([]);
    const [filterObjects, setFilterObject] = useState([])
    const options = uniqueValuesArray.map((value) => ({
        label: value,
        value: value,
    }));
    const dispatch = useDispatch()
    const handleChange = (value) => {
        setSelectedValues(value); // Update the selected values in state
        function filterObjectsByProperty(dataArray, propertyName, propertyValues) {
            return dataArray.filter(item => propertyValues.includes(item[propertyName]));
        }
        const filteredObjects = filterObjectsByProperty(dataArray, dataIndex, value);
        setFilterObject(filteredObjects)
    };
    useEffect(() => {
        dispatch(SET_FILTERED_DATA(filterObjects))
    }, [filterObjects])
    return (
        <div> <Space
            style={{
                width: '100%',
            }}
            direction="vertical"
        >
            <Select
                mode="multiple"
                allowClear
                style={{
                    width: '100%',
                }}
                placeholder="Please select"
                value={selectedValues}
                onChange={handleChange}
                options={options}
            />
        </Space></div>
    );
}

export default FilterbyuniqItem;

