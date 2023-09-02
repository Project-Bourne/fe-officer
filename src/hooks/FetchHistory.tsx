import { setHistory } from '../redux/reducer/analyzerSlice';
import AnalyzerService from '../services/Analyzer.service';

export async function fetchData(dispatch) {
  try {
    const Data =    await  AnalyzerService.getAnalyzerHistory()
    console.log(Data, "history");
    if (Data.status) {
        dispatch(setHistory(Data.data));
    } else {
      // Handle the case where Data.status is falsy
      console.log("unable to fetch")
    }
  } catch (error) {
    console.log(error);
  }
}