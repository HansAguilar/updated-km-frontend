import { configureStore } from '@reduxjs/toolkit';
import patientReducer from '../reducer/reducer';
import thunk from 'redux-thunk';

export default configureStore({
    reducer:{
        patient: patientReducer,
    },
    middleware: [thunk]
})