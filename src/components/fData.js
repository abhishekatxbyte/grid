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