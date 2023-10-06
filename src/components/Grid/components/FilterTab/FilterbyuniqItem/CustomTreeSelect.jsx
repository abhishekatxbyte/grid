import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import { useSelector } from 'react-redux';

const { TreeNode } = TreeSelect;


const CustomTreeSelect = ({ dataIndex, setDataSource }) => {
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
    const options = uniqueValuesArray.map((value) => ({
        title: value,
        value: value,
    }));
    console.log(options)
    const treeData = [
        {
            title: 'select all',
            value: 'all',
            children: options,
        },
    ];

    const handleChange = (value) => {
        setSelectedValues(value); // Update the selected values in state
        function filterObjectsByProperty(dataArray, propertyName, propertyValues) {
            return dataArray.filter(item => propertyValues.includes(item[propertyName]));
        }
        const filteredObjects = filterObjectsByProperty(dataArray, dataIndex, value);
        console.log(filteredObjects)
        if (filteredObjects.length) {
            setDataSource(filteredObjects)
        } else {
            setDataSource(dataArray)

        }
    };
    return (
        <TreeSelect
            placeholder="Please select"

            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_PARENT}
            value={selectedValues}
            onChange={handleChange}
            style={{ width: '100%' }}
        >
            {treeData.map((node) => (
                <TreeNode

                    key={node.value} title={node.title} value={node.value}>
                    {node.children &&
                        node.children.map((childNode) => (
                            <TreeNode
                                placeholder="Please select"

                                key={childNode.value}
                                title={childNode.title}
                                value={childNode.value}
                            />
                        ))}
                </TreeNode>
            ))}
        </TreeSelect>
    );
};

export default CustomTreeSelect;
