import { combineReducers } from "@reduxjs/toolkit";
import AnalyzerSlice from './analyzerSlice';
import TabSlice from './tabSlice'

const rootReducer = combineReducers({ 
    analyze: AnalyzerSlice,
    tab: TabSlice
});

export default rootReducer;
