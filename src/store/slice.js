import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {},
    dataArray: [],
    headers: [],
    filteredData: []
}

export const slice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        ADD_DATA: (state, action) => {
            state.data = action.payload
            state.dataArray = [...state.dataArray, action.payload]
        },
        SET_HEADERS(state, action) {
            state.headers = action.payload
        },
        SET_FILTERED_DATA(state, action) {
            state.filteredData = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { ADD_DATA, SET_HEADERS, SET_FILTERED_DATA } = slice.actions

export default slice.reducer