import { combineReducers } from "@reduxjs/toolkit";
import AnalyzerSlice from './interrogatorSlice';
import TabSlice from './tabSlice'

const rootReducer = combineReducers({ 
    analyze: AnalyzerSlice,
    tab: TabSlice
});

export default rootReducer;
