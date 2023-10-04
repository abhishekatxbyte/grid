import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Space, Button } from 'antd';
import { SET_DATA, SET_FILTERED_DATA } from '../../../../../store/slice';


const App = ({ uniqueValuesArray, dataIndex, dataArray }) => {
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

    const handleReset = () => {
        setSelectedValues([]); // Reset the selected values
    };
    useEffect(() => {
        dispatch(SET_FILTERED_DATA(filterObjects))
    }, [filterObjects])
    return (
        <Space
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
            <Button onClick={handleReset}>Reset</Button> {/* Reset button */}
        </Space>
    );
}

const FilterbyuniqItem = ({ dataIndex }) => {
    const data = useSelector(state => state.data.dataArray);
    const currentTabIndex = useSelector(state => state.data.setCurrentFileIndex)
    const dataArray = data[currentTabIndex]
    const uniqueValues = new Set();
    // Use reduce to collect unique values based on dataIndex property
    const uniqueValuesArray = dataArray.reduce((acc, item) => {
        const propertyValue = item[dataIndex];
        if (!uniqueValues.has(propertyValue)) {
            uniqueValues.add(propertyValue);
            acc.push(propertyValue);
        }
        return acc;
    }, []);


    return (
        <div><App uniqueValuesArray={uniqueValuesArray} dataIndex={dataIndex} dataArray={dataArray} /></div>
    );
}

export default FilterbyuniqItem;

