import React, { useState } from 'react'

const Condition = () => {
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
    return (
        <div>Condition</div>
    )
}

export default Condition