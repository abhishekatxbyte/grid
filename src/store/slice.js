import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    dataArray: [],
    headers: [],
    leftPinnedColumns: [],
    setCurrentFileIndex: 0,
    rightPinnedColumns: [],
    csvData: null,
    filteredData: [],
    fileNames: []
}

export const slice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        SET_DATA: (state, action) => {
            state.data = action.payload
        },
        SET_MULTIPLE_DATA: (state, action) => {
            state.dataArray = [...state.dataArray, action.payload]
        },
        SET_FILE_NAME: (state, action) => {
            state.fileNames = [...state.fileNames, action.payload]
        },
        SET_HEADERS(state, action) {
            state.headers = action.payload
        },
        SET_CSV_DATA(state, action) {
            state.csvData = action.payload
        },
        SET_FILTERED_DATA(state, action) {
            state.filteredData = action.payload
        },
        SET_LEFT_PINNED_COLUMNS(state, action) {
            state.leftPinnedColumns = action.payload
        },
        SET_RIGHT_PINNED_COLUMNS(state, action) {
            state.rightPinnedColumns = action.payload
        },
        SET_CURRENT_FILE_INDEX(state, action) {
            state.setCurrentFileIndex = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { SET_DATA, SET_MULTIPLE_DATA, SET_FILE_NAME, SET_HEADERS, SET_FILTERED_DATA, SET_LEFT_PINNED_COLUMNS, SET_RIGHT_PINNED_COLUMNS, SET_CURRENT_FILE_INDEX, SET_CSV_DATA } = slice.actions

export default slice.reducer