import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Input, Select } from 'antd';

function MyInput({ data, dataIndex, condition, isnumber, setDataSource, inputValue, setInputValue }) {

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    useEffect(() => {
        function filterData(data, dataIndex, condition, customInput, isnumber) {
            if (isnumber) {
                const filteredData = data.filter(item => {
                    console.log('hey')
                    const xValue = item[dataIndex];

                    switch (condition) {
                        case 'isEqual':
                            return xValue == customInput;
                        case 'isNotEqual':
                            return xValue != customInput;
                        case 'isLessThan':
                            return xValue < customInput;
                        case 'isGreaterThan':
                            return xValue > customInput;
                        case 'isGreaterThanOrEqual':
                            return xValue >= customInput;
                        case 'isLessThanOrEqual':
                            return xValue <= customInput;
                        default:
                            return true; // If condition is not specified, return all data
                    }
                });
                return filteredData;
            } else if (!isnumber) {
                const filteredData = data.filter(item => {
                    console.log(item[dataIndex])
                    let xValue = item[dataIndex]
                    if (typeof xValue === 'string') {
                        xValue = xValue.toLowerCase();
                    }
                    const customInputLowerCase = customInput.toLowerCase();
                    switch (condition) {
                        case 'isEqual':
                            return xValue === customInputLowerCase;
                        case 'isNotEqual':
                            return xValue !== customInputLowerCase;
                        case 'isContainsPhrase':
                            return typeof xValue === 'string' && xValue.includes(customInputLowerCase);
                        case 'doesNotContainPhrase':
                            return typeof xValue === 'string' && !xValue.includes(customInputLowerCase);
                        case 'beginsWith':
                            return typeof xValue === 'string' && xValue.startsWith(customInputLowerCase);
                        case 'endsWith':
                            return typeof xValue === 'string' && xValue.endsWith(customInputLowerCase);
                        default:
                            return true; // If condition is not specified, return all data
                    }
                });
                return filteredData;
            } else {
                return data
            }
        }
        const filteredData = filterData(data, dataIndex, condition, inputValue, isnumber)
        if (filteredData.length > 0) {
            setDataSource(filteredData)
        } else {
            setDataSource(data)

        }

    }, [inputValue])
    return (
        <div>
            <Input
                allowClear
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Write your input"
            />
        </div>
    );
}

const FilterbyuniqItem = ({ dataIndex, setDataSource }) => {
    const [inputValue, setInputValue] = useState('');

    const [condition, setCondition] = useState(null);
    const data = useSelector(state => state.data.data);
    let isnumber = false
    data.map((obj) => {
        const value = obj[dataIndex]
        if (typeof value === 'string') {
        } else {
            isnumber = true

        }
    })
    const [checkboxes] = data.map((obj) => {
        const value = obj[dataIndex];
        if (typeof value === 'string') {
            isnumber = false
            return [
                { value: 'isEqual', label: 'is equal to' },
                { value: 'isNotEqual', label: 'is not equal to' },
                { value: 'beginsWith', label: 'beginsWith the phrase' },
                { value: 'endsWith', label: 'endsWith the phrase' },
                { value: 'isContainsPhrase', label: 'contain the phrase' },
                { value: 'doesNotContainPhrase', label: 'does not contain the phrase' },
            ];
        } else if (typeof value === 'number') {
            isnumber = true
            return [
                { value: 'isEqual', label: 'is equal to' },
                { value: 'isNotEqual', label: 'is not equal to' },
                { value: 'isLessThan', label: 'less than' },
                { value: 'isGreaterThan', label: 'greater than' },
                { value: 'isGreaterThanOrEqual', label: 'greater than or equal' },
                { value: 'isLessThanOrEqual', label: 'less than or equal' },
            ];
        } else {
            return []; // Empty array if the data type is neither string nor number
        }
    });
    const handleOperatorChange = (value) => {
        setInputValue('')
        setCondition(value);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Select
                showSearch
                style={{
                    width: 400,
                }}
                value={condition}
                placeholder="Search to Select"
                onChange={handleOperatorChange}
                allowClear
                options={checkboxes.map(option => ({
                    value: option.value,
                    label: option.label,
                }))}
            />
            <Divider type="vertical" />
            <MyInput data={data} dataIndex={dataIndex} inputValue={inputValue} setInputValue={setInputValue} condition={condition} isnumber={isnumber} setDataSource={setDataSource} />
        </div>
    );
}

export default FilterbyuniqItem;

