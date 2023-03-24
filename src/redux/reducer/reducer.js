import { createSlice } from "@reduxjs/toolkit";

export const patientSlice = createSlice({
    name:"patient",
    initialState:{
        value: []
    },
    reducers:{
        FETCH_ALL_PATIENT: (state, action)=>{
            state.value.push(...action.payload)
        }
    }
});

export const { ADD_PATIENT, FETCH_ALL_PATIENT } = patientSlice.actions;
export const selectPatient = (state) => state.patient.value;
export default patientSlice.reducer;
