import { combineReducers } from "@reduxjs/toolkit";
import AnalyzerSlice from './interrogatorSlice';
import TabSlice from './tabSlice';
import AuthSlice from './authReducer';

const rootReducer = combineReducers({ 
    analyze: AnalyzerSlice,
    tab: TabSlice,
    auth: AuthSlice
});

export default rootReducer;
