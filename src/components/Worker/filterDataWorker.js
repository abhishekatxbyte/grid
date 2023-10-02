// function filterData(data, xProperty, yProperty, condition, headerCondition, customInput) {
//     if (headerCondition === "HEADER_TO_HEADER") {
//         const filteredData = data.filter(item => {
//             const xValue = item[xProperty];
//             const yValue = item[yProperty];

//             switch (condition) {
//                 case 'isEqual':
//                     return xValue === yValue;
//                 case 'isNotEqual':
//                     return xValue !== yValue;
//                 case 'isLessThan':
//                     return xValue < yValue;
//                 case 'isGreaterThan':
//                     return xValue > yValue;
//                 case 'isGreaterThanOrEqual':
//                     return xValue >= yValue;
//                 case 'isLessThanOrEqual':
//                     return xValue <= yValue;
//                 default:
//                     return true; // If condition is not specified, return all data
//             }
//         });
//         return filteredData;
//     } else if (headerCondition === "HEADER_TO_INPUT") {
//         const isNumber = customInput * 1;
//         if (!isNaN(isNumber)) {
//             // Handle numeric comparisons when customInput is a valid number
//             const filteredData = data.filter(item => {
//                 const xValue = item[xProperty];

//                 switch (condition) {
//                     case 'isEqual':
//                         return xValue === isNumber;
//                     case 'isNotEqual':
//                         return xValue !== isNumber;
//                     case 'isLessThan':
//                         return xValue < isNumber;
//                     case 'isGreaterThan':
//                         return xValue > isNumber;
//                     case 'isGreaterThanOrEqual':
//                         return xValue >= isNumber;
//                     case 'isLessThanOrEqual':
//                         return xValue <= isNumber;
//                     default:
//                         return true; // If condition is not specified, return all data
//                 }
//             });
//             return filteredData;
//         } else {
//             // Handle string comparisons when customInput is not a valid number
//             const filteredData = data.filter(item => {
//                 const xValue = item[xProperty].toLowerCase(); // Convert xValue to lowercase
//                 const customInputLowerCase = customInput.toLowerCase(); // Convert customInput to lowercase

//                 switch (condition) {
//                     case 'isEqual':
//                         return xValue === customInputLowerCase;
//                     case 'isNotEqual':
//                         return xValue !== customInputLowerCase;
//                     case 'isContainsPhrase':
//                         return typeof xValue === 'string' && xValue.includes(customInputLowerCase);
//                     default:
//                         return true; // If condition is not specified, return all data
//                 }
//             });
//             return filteredData;
//         }
//     } else {
//         // Invalid headerCondition, return the original data
//         return data;
//     }
// }

// self.addEventListener('message', (event) => {
//     console.log('Received message in worker:', event.data);
//     const { data } = event;
//     const { type, payload } = data;

//     if (type === 'FILTER_DATA') {
//         const { data, xProperty, yProperty, condition, headerCondition, customInput } = payload;
//         console.log('Processing data in worker:', data, xProperty, yProperty, condition, headerCondition, customInput);
//         const filteredData = filterData(data, xProperty, yProperty, condition, headerCondition, customInput);

//         // Post the filtered data back to the main thread
//         self.postMessage({ type: 'FILTERED_DATA', payload: filteredData });
//     }
// });

self.addEventListener('message', (event) => {
    const { data } = event;
    const { type, payload } = data;

    if (type === 'FILTER_DATA') {
        const { data, baseHeader, secondHeader, selectedOperator, headerCondition, customInput } = payload;
        console.log(data, baseHeader, secondHeader, selectedOperator, headerCondition, customInput)
        const filterData = (data, baseHeader, secondHeader, selectedOperator, headerCondition, customInput) => {
            if (headerCondition === 'HEADER_TO_HEADER') {
                return data.filter(item => {
                    const xValue = item[baseHeader];
                    const yValue = item[secondHeader];

                    switch (selectedOperator) {
                        case 'isEqual':
                            return xValue === yValue;
                        case 'isNotEqual':
                            return xValue !== yValue;
                        case 'isLessThan':
                            return xValue < yValue;
                        case 'isGreaterThan':
                            return xValue > yValue;
                        case 'isGreaterThanOrEqual':
                            return xValue >= yValue;
                        case 'isLessThanOrEqual':
                            return xValue <= yValue;
                        default:
                            return true; // If condition is not specified, return all data
                    }
                });
            } else if (headerCondition === 'HEADER_TO_INPUT') {
                const isNumber = customInput * 1;
                return data.filter(item => {
                    const xValue = item[baseHeader];

                    switch (selectedOperator) {
                        case 'isEqual':
                            return xValue === (isNumber ? parseFloat(customInput) : customInput);
                        case 'isNotEqual':
                            return xValue !== (isNumber ? parseFloat(customInput) : customInput);
                        case 'isLessThan':
                            return xValue < (isNumber ? parseFloat(customInput) : customInput);
                        case 'isGreaterThan':
                            return xValue > (isNumber ? parseFloat(customInput) : customInput);
                        case 'isGreaterThanOrEqual':
                            return xValue >= (isNumber ? parseFloat(customInput) : customInput);
                        case 'isLessThanOrEqual':
                            return xValue <= (isNumber ? parseFloat(customInput) : customInput);
                        default:
                            return true; // If condition is not specified, return all data
                    }
                });
            } else {
                // Invalid headerCondition, return the original data
                return data;
            }
        };

        // Call the filterData function with the provided parameters
        const filteredData = filterData(data, baseHeader, secondHeader, selectedOperator, headerCondition, customInput);
        console.log(filteredData)
        // Post the filtered data back to the main thread
        self.postMessage({ type: 'FILTERED_DATA', payload: filteredData });
    }
});
