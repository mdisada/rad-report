import './App.css';
import SelectTemplate from './components/SelectTemplate'
import { useState } from 'react'
import { ReportFindingsContext } from './contexts/ReportFindingsContext';
function App() {

  const [reportFindings, setReportFindings] = useState({}); // Initialize your state here

  return (
    <div className="App">
<ReportFindingsContext.Provider value={{ state: reportFindings, dispatch: setReportFindings }}>
      <SelectTemplate />
      </ReportFindingsContext.Provider>
    </div>
  );
}

export default App;
